export const CONTRACT_ADDRESS_BOTCHAIN = "0xFD51797C48f75aF10761F92Bdd639e4518358324";
export const CONTRACT_ADDRESS_SEPOLIA = "0x71C8409e530F6d37651c6bEb21B662057F7dA21F";

export const BOTCHAIN_SCAN_URL = "https://scan.botchain.ai";
export const BOTCHAIN_CONTRACT_SCAN_URL = "https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324";
export const BOTCHAIN_RPC_URL = "https://rpc.botchain.ai";
export const BOTCHAIN_CHAIN_ID_DECIMAL = 677;
export const BOTCHAIN_CHAIN_ID_HEX = "0x2a5";

export const TWITTER_URL = "https://x.com/site_proof__";
export const POWERED_BY_BOTCHAIN_URL = "https://botchain.ai";

export const BOTCHAIN_NETWORK_CONFIG = {
  chainId: BOTCHAIN_CHAIN_ID_HEX,
  chainName: "BOT Chain Mainnet",
  nativeCurrency: {
    name: "BOT",
    symbol: "BOT",
    decimals: 18,
  },
  rpcUrls: [BOTCHAIN_RPC_URL],
  blockExplorerUrls: [BOTCHAIN_SCAN_URL],
};

export const TIME_LOCKED_VAULT_ABI = [
  "function deposit(uint256 unlockTimestamp, address beneficiary, string calldata purpose) external payable returns (uint256 vaultId)",
  "function withdraw(uint256 vaultId) external",
  "function getVault(uint256 vaultId) external view returns (tuple(uint256 id, address owner, address beneficiary, uint256 amount, uint256 createdAt, uint256 unlockTimestamp, bool isWithdrawn, string purpose))",
  "function getUserVaults(address user) external view returns (uint256[])",
  "function totalVaultsCount() external view returns (uint256)",
  "event VaultCreated(uint256 indexed vaultId, address indexed owner, address indexed beneficiary, uint256 amount, uint256 createdAt, uint256 unlockTimestamp, string purpose)",
  "event VaultWithdrawn(uint256 indexed vaultId, address indexed beneficiary, uint256 amount, uint256 executedAt)"
];

export const RAW_SOLIDITY_CODE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title TimeLockedVault
 * @notice Pure dual-transaction deterministic temporal escrow on BOT Chain Mainnet (Chain ID: 677).
 * @dev Deployed at: 0xFD51797C48f75aF10761F92Bdd639e4518358324
 *      Explorer: https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324
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
    bool private _locked;

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

        (bool success, ) = v.beneficiary.call{value: payout}("");
        require(success, "ERROR: TOKEN_TRANSFER_FAILED");
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
}`;
