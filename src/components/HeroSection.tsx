import { useVault } from '../context/VaultContext';

export const HeroSection = () => {
  const { vaults, currentUnixTime, web3State } = useVault();

  // Compute total locked currency
  const totalLocked = vaults
    .filter(v => !v.isWithdrawn)
    .reduce((acc, curr) => acc + parseFloat(curr.amountEth), 0)
    .toFixed(4);

  const activeVaultCount = vaults.filter(v => !v.isWithdrawn).length;

  const scrollToTerminal = (mode: 'deposit' | 'withdraw') => {
    const el = document.getElementById('vault-terminal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('switch-terminal-tab', { detail: mode }));
    }
  };

  return (
    <section className="w-full bg-white border-b-2 border-black">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="border-x border-black">
          {/* Section Indicator Bar */}
          <div className="grid grid-cols-12 border-b border-black py-2 px-4 md:px-6 text-[11px] font-mono-swiss uppercase">
            <div className="col-span-6 md:col-span-3 font-bold text-black flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#ff0000] inline-block"></span>
              <span>SECTION 01 / POSTER MANIFESTO</span>
            </div>
            <div className="hidden md:block md:col-span-5 text-neutral-500">
              KUNSTGEWERBEMUSEUM ZÜRICH // BOT CHAIN MAINNET (CHAIN ID: 677)
            </div>
            <div className="col-span-6 md:col-span-4 text-right text-neutral-700">
              SPECIFICATION REF: BOT-677/VAULT
            </div>
          </div>

          {/* Master 12-Column Hero Poster */}
          <div className="grid grid-cols-12 items-stretch">
            {/* Left 8 Columns: Monumental Typography */}
            <div className="col-span-12 lg:col-span-8 p-6 md:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-black flex flex-col justify-between">
              <div>
                <div className="font-mono-swiss text-xs md:text-sm tracking-widest text-neutral-500 uppercase mb-4">
                  [ CATALOGUE NR. 68 / DUAL-TRANSACTION BOT CHAIN STATE MACHINE ]
                </div>

                {/* Massive 1960s Swiss Typography */}
                <h1 className="font-swiss font-black text-6xl sm:text-7xl md:text-8xl xl:text-9xl tracking-tight leading-[0.88] uppercase text-black">
                  TIME-
                  <br />
                  LOCKED
                  <br />
                  <span className="flex items-baseline">
                    VAULT
                    <span className="inline-block w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-[#ff0000] ml-2 sm:ml-4 self-center"></span>
                  </span>
                </h1>

                <div className="mt-8 max-w-2xl">
                  <p className="font-swiss text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-black leading-snug">
                    Deposit digital assets today. Commit to an immutable future UNIX epoch. Withdraw only after the timestamp has elapsed.
                  </p>
                  <p className="font-swiss text-sm sm:text-base text-neutral-700 mt-4 leading-relaxed max-w-xl">
                    Strict mathematical escrow deployed on <strong>BOT Chain Mainnet</strong> (Chain ID 677). No administrative backdoors, no emergency keys, and no human discretion. In an era of reactive impulse, the Time-Locked Vault enforces programmatic temporal discipline.
                  </p>
                </div>
              </div>

              {/* Poster Meta Footer */}
              <div className="mt-12 pt-8 border-t border-black grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <span className="font-mono-swiss text-[11px] uppercase text-neutral-500 block">
                    01. TRANSACTION A
                  </span>
                  <span className="font-swiss font-bold text-base uppercase text-black mt-1 block">
                    deposit(uint256 unlockTime)
                  </span>
                  <span className="font-mono-swiss text-xs text-neutral-600 block mt-0.5">
                    Locks {web3State.currencySymbol} in immutable escrow storage until T_block &gt;= T_unlock.
                  </span>
                </div>
                <div>
                  <span className="font-mono-swiss text-[11px] uppercase text-neutral-500 block">
                    02. TRANSACTION B
                  </span>
                  <span className="font-swiss font-bold text-base uppercase text-black mt-1 block">
                    withdraw(uint256 vaultId)
                  </span>
                  <span className="font-mono-swiss text-xs text-neutral-600 block mt-0.5">
                    Releases principal strictly to the specified beneficiary address.
                  </span>
                </div>
              </div>
            </div>

            {/* Right 4 Columns: Typographical Data Matrix & Structural CTA */}
            <div className="col-span-12 lg:col-span-4 flex flex-col justify-between bg-white">
              {/* Massive Pure Red Stat Block */}
              <div className="p-6 md:p-8 bg-[#ff0000] text-white border-b border-black">
                <div className="font-mono-swiss text-xs tracking-widest uppercase opacity-90">
                  TOTAL VALUE COMMITTED
                </div>
                <div className="font-swiss font-black text-5xl md:text-6xl tracking-tighter mt-3 leading-none">
                  {totalLocked}
                  <span className="text-2xl md:text-3xl ml-2 font-normal">{web3State.currencySymbol}</span>
                </div>
                <div className="font-mono-swiss text-xs tracking-wider uppercase mt-4 pt-3 border-t border-white/30 flex justify-between">
                  <span>ACTIVE ESCROWS</span>
                  <span className="font-bold">{activeVaultCount} CONTRACTS</span>
                </div>
              </div>

              {/* Structural Specification Grid */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="border-b border-black pb-4">
                  <div className="font-mono-swiss text-[10px] uppercase text-neutral-500">
                    ESCROW DISCIPLINE
                  </div>
                  <div className="font-swiss font-bold text-xl uppercase mt-1">
                    NON-REVERSIBLE
                  </div>
                  <p className="font-mono-swiss text-xs text-neutral-600 mt-1 leading-normal">
                    Once mined into a BOT Chain block, neither validator, owner, nor developer can accelerate block timestamps.
                  </p>
                </div>

                <div className="border-b border-black pb-4">
                  <div className="font-mono-swiss text-[10px] uppercase text-neutral-500">
                    REFERENCE CLOCK
                  </div>
                  <div className="font-mono-swiss font-bold text-lg text-black mt-1">
                    UNIX: {currentUnixTime}
                  </div>
                  <div className="font-mono-swiss text-[11px] text-neutral-600 mt-0.5">
                    Coordinated Universal Time (UTC)
                  </div>
                </div>

                <div>
                  <div className="font-mono-swiss text-[10px] uppercase text-neutral-500 mb-2">
                    EXECUTIVE ACTIONS
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => scrollToTerminal('deposit')}
                      className="w-full bg-black hover:bg-[#ff0000] text-white font-mono-swiss font-bold text-sm py-4 px-6 uppercase text-left transition-colors flex items-center justify-between group"
                    >
                      <span>01 / DEPOSIT &amp; LOCK {web3State.currencySymbol}</span>
                      <span className="font-bold group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                    <button
                      onClick={() => scrollToTerminal('withdraw')}
                      className="w-full bg-white hover:bg-black hover:text-white text-black font-mono-swiss font-bold text-sm py-4 px-6 uppercase text-left transition-colors border border-black flex items-center justify-between group"
                    >
                      <span>02 / WITHDRAW MATURE VAULT</span>
                      <span className="font-bold group-hover:translate-x-1 transition-transform">↓</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Monospace Annotation */}
              <div className="p-4 bg-neutral-100 border-t border-black font-mono-swiss text-[10px] text-neutral-600 flex justify-between items-center">
                <span>GRID: 12-COL MODULAR</span>
                <span className="text-[#ff0000] font-bold">CHAIN ID: 677</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
