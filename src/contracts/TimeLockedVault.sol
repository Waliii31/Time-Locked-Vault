// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title TimeLockedVault
 * @notice Pure dual-transaction deterministic temporal escrow.
 * @dev Designed according to Swiss Typographic & Cryptographic Standards:
 *      1. TX 01: deposit(unlockTimestamp) -> locks ETH until block.timestamp >= unlockTimestamp.
 *      2. TX 02: withdraw(vaultId) -> sends ETH back to beneficiary only after lock expired.
 *      Zero admin backdoors. Non-custodial. Immutable.
 */
contract TimeLockedVault {
    struct Vault {
        uint256 id;
        address owner;
        address payable beneficiary;
        uint256 amount;
        uint256 createdAt;
        uint256 unlockTimestamp;
        bool isWithdrawn;
        string purpose;
    }

    uint256 private _vaultCounter;
    mapping(uint256 => Vault) public vaults;
    mapping(address => uint256[]) private _userVaults;

    // Mutex lock against reentrancy
    bool private _locked;

    // Events
    event VaultCreated(
        uint256 indexed vaultId,
        address indexed owner,
        address indexed beneficiary,
        uint256 amount,
        uint256 createdAt,
        uint256 unlockTimestamp,
        string purpose
    );

    event VaultWithdrawn(
        uint256 indexed vaultId,
        address indexed beneficiary,
        uint256 amount,
        uint256 executedAt
    );

    modifier nonReentrant() {
        require(!_locked, "MUTEX: REENTRANCY_DETECTED");
        _locked = true;
        _;
        _locked = false;
    }

    /**
     * @notice TRANSACTION 01: Commit ETH to vault until future UNIX timestamp.
     * @param unlockTimestamp Future UNIX timestamp in seconds. Must be > block.timestamp.
     * @param beneficiary Address entitled to withdraw upon maturity. If address(0), defaults to msg.sender.
     * @param purpose Descriptive annotation / memo for this lock.
     */
    function deposit(
        uint256 unlockTimestamp,
        address payable beneficiary,
        string calldata purpose
    ) external payable returns (uint256 vaultId) {
        require(msg.value > 0, "ERROR: VALUE_MUST_BE_GREATER_THAN_ZERO");
        require(unlockTimestamp > block.timestamp, "ERROR: UNLOCK_MUST_BE_IN_FUTURE");

        address payable actualBeneficiary = beneficiary == address(0) 
            ? payable(msg.sender) 
            : beneficiary;

        _vaultCounter++;
        vaultId = _vaultCounter;

        vaults[vaultId] = Vault({
            id: vaultId,
            owner: msg.sender,
            beneficiary: actualBeneficiary,
            amount: msg.value,
            createdAt: block.timestamp,
            unlockTimestamp: unlockTimestamp,
            isWithdrawn: false,
            purpose: purpose
        });

        _userVaults[msg.sender].push(vaultId);
        if (actualBeneficiary != msg.sender) {
            _userVaults[actualBeneficiary].push(vaultId);
        }

        emit VaultCreated(
            vaultId,
            msg.sender,
            actualBeneficiary,
            msg.value,
            block.timestamp,
            unlockTimestamp,
            purpose
        );
    }

    /**
     * @notice TRANSACTION 02: Withdraw mature ETH once block.timestamp >= unlockTimestamp.
     * @param vaultId The sequential identifier of the vault.
     */
    function withdraw(uint256 vaultId) external nonReentrant {
        Vault storage v = vaults[vaultId];

        require(v.amount > 0, "ERROR: VAULT_DOES_NOT_EXIST");
        require(!v.isWithdrawn, "ERROR: VAULT_ALREADY_LIQUIDATED");
        require(msg.sender == v.beneficiary || msg.sender == v.owner, "ERROR: UNAUTHORIZED_CALLER");
        require(block.timestamp >= v.unlockTimestamp, "ERROR: TEMPORAL_LOCK_ACTIVE");

        uint256 payout = v.amount;
        v.isWithdrawn = true;
        v.amount = 0;

        emit VaultWithdrawn(vaultId, v.beneficiary, payout, block.timestamp);

        // State change executed before transfer (CEI pattern)
        (bool success, ) = v.beneficiary.call{value: payout}("");
        require(success, "ERROR: ETH_TRANSFER_FAILED");
    }

    function getVault(uint256 vaultId) external view returns (Vault memory) {
        return vaults[vaultId];
    }

    function getUserVaults(address user) external view returns (uint256[] memory) {
        return _userVaults[user];
    }

    function totalVaultsCount() external view returns (uint256) {
        return _vaultCounter;
    }
}
