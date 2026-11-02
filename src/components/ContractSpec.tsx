import { useState } from 'react';
import {
  RAW_SOLIDITY_CODE,
  CONTRACT_ADDRESS_BOTCHAIN,
  BOTCHAIN_CONTRACT_SCAN_URL,
} from '../contracts/contractData';

export const ContractSpec = () => {
  const [copied, setCopied] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'source' | 'interface' | 'invariants'>('source');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(RAW_SOLIDITY_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const interfaceCode = `interface ITimeLockedVault {
    function deposit(
        uint256 unlockTimestamp, 
        address payable beneficiary, 
        string calldata purpose
    ) external payable returns (uint256 vaultId);

    function withdraw(uint256 vaultId) external;

    function getVault(uint256 vaultId) external view returns (Vault memory);
    function totalVaultsCount() external view returns (uint256);
}`;

  const invariantsSpec = `// MATHEMATICAL INVARIANT SPECIFICATION - BOT CHAIN (CHAIN ID: 677)
// 1. TEMPORAL INEQUALITY
// ∀ tx ∈ withdraw(vaultId):
//    block.timestamp ≥ vaults[vaultId].unlockTimestamp
//    Otherwise REVERT("ERROR: TEMPORAL_LOCK_ACTIVE")

// 2. CONSERVATION OF SOLVENCY
// ∑_{i=1}^{N} (vaults[i].amount) == address(this).balance
// Under all execution paths, contract is 100% fully reserved.

// 3. MUTEX & CEI CONFORMANCE
// vaults[vaultId].isWithdrawn := true
// vaults[vaultId].amount := 0
// Occurs BEFORE any call{value: payout} external invocation.`;

  return (
    <section className="w-full bg-white border-b-2 border-black">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="border-x border-black">
          {/* Section Indicator Bar */}
          <div className="grid grid-cols-12 border-b border-black py-2 px-4 md:px-6 text-[11px] font-mono-swiss uppercase">
            <div className="col-span-12 sm:col-span-4 font-bold text-black flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#ff0000] inline-block"></span>
              <span>SECTION 03 / CODE SPECIFICATION &amp; PROOFS</span>
            </div>
            <div className="hidden sm:block sm:col-span-5 text-neutral-500">
              FORMAL VERIFICATION // SOLIDITY 0.8.20 // BOT CHAIN MAINNET (677)
            </div>
            <div className="col-span-12 sm:col-span-3 text-left sm:text-right font-mono-swiss text-neutral-700">
              HASH: 0xFD51...8324
            </div>
          </div>

          <div className="grid grid-cols-12">
            {/* Left Column: Mathematical Axioms (4 cols) */}
            <div className="col-span-12 lg:col-span-4 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-black flex flex-col justify-between">
              <div>
                <span className="font-mono-swiss text-[10px] uppercase text-neutral-500">
                  PROOF OF IMMUTABILITY
                </span>
                <h2 className="font-swiss font-black text-3xl md:text-4xl uppercase tracking-tight text-black mt-1 leading-none">
                  MATHEMATICAL
                  <br />
                  AXIOMS
                </h2>
                <p className="font-swiss text-sm text-neutral-700 mt-4 leading-normal">
                  The Time-Locked Vault implements deterministic escrow mathematics. Trust is replaced by immutable bytecode verification on BOT Chain Mainnet.
                </p>

                <div className="mt-8 space-y-6">
                  {/* Axiom 1 */}
                  <div className="border-l-2 border-black pl-4">
                    <span className="font-mono-swiss text-xs font-bold text-[#ff0000] uppercase block">
                      AXIOM 01: MONOTONIC TIME
                    </span>
                    <h3 className="font-swiss font-bold text-base text-black mt-0.5">
                      T_block &gt; T_prev
                    </h3>
                    <p className="font-mono-swiss text-xs text-neutral-600 mt-1 leading-normal">
                      BOT Chain block timestamps are strictly monotonic. Deterministic consensus guarantees slot progression without backdating.
                    </p>
                  </div>

                  {/* Axiom 2 */}
                  <div className="border-l-2 border-black pl-4">
                    <span className="font-mono-swiss text-xs font-bold text-[#ff0000] uppercase block">
                      AXIOM 02: COMPLETE SOLVENCY
                    </span>
                    <h3 className="font-swiss font-bold text-base text-black mt-0.5">
                      Σ(Vaults.amount) ≡ Balance
                    </h3>
                    <p className="font-mono-swiss text-xs text-neutral-600 mt-1 leading-normal">
                      Zero re-hypothecation. The contract cannot lend, yield-farm, or liquidate vault deposits under any circumstances.
                    </p>
                  </div>

                  {/* Axiom 3 */}
                  <div className="border-l-2 border-black pl-4">
                    <span className="font-mono-swiss text-xs font-bold text-[#ff0000] uppercase block">
                      AXIOM 03: CEI PATTERN
                    </span>
                    <h3 className="font-swiss font-bold text-base text-black mt-0.5">
                      Checks-Effects-Interactions
                    </h3>
                    <p className="font-mono-swiss text-xs text-neutral-600 mt-1 leading-normal">
                      Storage balance is zeroed and status set to withdrawn before initiating external value calls, mathematically precluding reentrancy vectors.
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified deployment badge */}
              <div className="mt-8 pt-4 border-t border-black">
                <div className="font-mono-swiss text-[10px] uppercase text-neutral-500">
                  BOT CHAIN MAINNET DEPLOYMENT (CHAIN ID: 677)
                </div>
                <div className="font-mono-swiss text-xs font-bold text-black break-all mt-1">
                  {CONTRACT_ADDRESS_BOTCHAIN}
                </div>
                <div className="mt-2">
                  <a
                    href={BOTCHAIN_CONTRACT_SCAN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs font-mono-swiss font-bold text-[#ff0000] underline uppercase hover:text-black transition-colors"
                  >
                    VIEW ON BOTCHAIN SCAN ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Code Viewer (8 cols) */}
            <div className="col-span-12 lg:col-span-8 p-6 md:p-8 bg-neutral-50 flex flex-col justify-between">
              <div>
                {/* Code Tabs Header */}
                <div className="flex flex-wrap items-center justify-between border-b border-black pb-3 gap-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveCodeTab('source')}
                      className={`text-xs font-mono-swiss font-bold px-3 py-1 uppercase border ${
                        activeCodeTab === 'source'
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-neutral-300 hover:border-black'
                      }`}
                    >
                      TimeLockedVault.sol
                    </button>
                    <button
                      onClick={() => setActiveCodeTab('interface')}
                      className={`text-xs font-mono-swiss font-bold px-3 py-1 uppercase border ${
                        activeCodeTab === 'interface'
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-neutral-300 hover:border-black'
                      }`}
                    >
                      ITimeLockedVault.sol
                    </button>
                    <button
                      onClick={() => setActiveCodeTab('invariants')}
                      className={`text-xs font-mono-swiss font-bold px-3 py-1 uppercase border ${
                        activeCodeTab === 'invariants'
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-neutral-300 hover:border-black'
                      }`}
                    >
                      Formal_Invariants.spec
                    </button>
                  </div>

                  <button
                    onClick={copyToClipboard}
                    className="text-xs font-mono-swiss font-bold px-3 py-1 bg-white hover:bg-black hover:text-white border border-black uppercase transition-colors"
                  >
                    {copied ? 'COPIED TO CLIPBOARD' : 'COPY RAW CODE'}
                  </button>
                </div>

                {/* Swiss Pure Monospaced Code Display */}
                <div className="mt-4 p-4 md:p-6 bg-white border border-black font-mono-swiss text-xs md:text-[13px] leading-relaxed text-black max-h-[500px] overflow-y-auto">
                  <pre className="whitespace-pre overflow-x-auto">
                    {activeCodeTab === 'source' && RAW_SOLIDITY_CODE}
                    {activeCodeTab === 'interface' && interfaceCode}
                    {activeCodeTab === 'invariants' && invariantsSpec}
                  </pre>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-black flex flex-wrap justify-between items-center text-xs font-mono-swiss text-neutral-600 gap-2">
                <span>COMPILER: solc v0.8.20</span>
                <span className="text-[#ff0000] font-bold">NETWORK: BOT CHAIN MAINNET (CHAIN ID 677)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
