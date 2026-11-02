import { useVault } from '../context/VaultContext';

export const Header = () => {
  const {
    web3State,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    currentUnixTime,
    showGridLines,
    setShowGridLines,
  } = useVault();

  // Format UTC string
  const utcDate = new Date(currentUnixTime * 1000);
  const formattedUtc = utcDate.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

  return (
    <header className="w-full bg-white border-b-2 border-black sticky top-0 z-40">
      {/* Micro Status Bar */}
      <div className="border-b border-black text-[11px] font-mono-swiss uppercase tracking-wider bg-black text-white px-4 md:px-8 py-1.5 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 bg-[#ff0000]"></span>
          <span>BOT CHAIN MAINNET // CHAIN ID: 677</span>
          <span className="hidden sm:inline text-neutral-400">|</span>
          <span className="hidden sm:inline text-neutral-300">RPC: RPC.BOTCHAIN.AI</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-neutral-300">
            TIME: <strong className="text-white">{formattedUtc}</strong>
          </span>
          <span className="bg-[#ff0000] text-white px-1.5 py-0.5 font-bold">
            UNIX {currentUnixTime}
          </span>
        </div>
      </div>

      {/* Main 12-Column Swiss Navigation Bar */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-12 min-h-[72px] items-stretch border-x border-black">
          {/* Logo & Identity: Cols 1 - 4 */}
          <div className="col-span-12 md:col-span-4 p-4 flex items-center border-b md:border-b-0 md:border-r border-black gap-3">
            <div className="w-8 h-8 bg-[#ff0000] flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xl leading-none select-none">+</span>
            </div>
            <div>
              <div className="font-black text-lg md:text-xl tracking-tighter leading-none uppercase font-swiss">
                ZEITSPERRE
              </div>
              <div className="font-mono-swiss text-[10px] text-neutral-600 uppercase tracking-widest mt-0.5">
                TIME-LOCKED VAULT // BOT CHAIN
              </div>
            </div>
          </div>

          {/* Temporal Invariant Axiom: Cols 5 - 7 */}
          <div className="col-span-12 sm:col-span-6 md:col-span-3 p-4 flex flex-col justify-center border-b md:border-b-0 md:border-r border-black">
            <span className="font-mono-swiss text-[10px] text-neutral-500 uppercase">
              FORMAL INVARIANT
            </span>
            <span className="font-mono-swiss text-xs font-bold text-black mt-0.5">
              T_UNLOCK ≥ T_BLOCK
            </span>
            <span className="text-[10px] text-neutral-600 font-swiss">
              Zero admin intervention allowed.
            </span>
          </div>

          {/* Network Selector: Cols 8 - 9 */}
          <div className="col-span-6 md:col-span-2 p-3 sm:p-4 flex flex-col justify-center border-r border-black">
            <span className="font-mono-swiss text-[10px] text-neutral-500 uppercase">
              NETWORK
            </span>
            <div className="flex flex-wrap gap-1 mt-1">
              <button
                onClick={() => switchNetwork('BOT_MAINNET')}
                className={`text-[10px] font-mono-swiss px-1.5 py-0.5 font-bold border ${
                  web3State.network === 'BOT_MAINNET'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-neutral-300 hover:border-black'
                }`}
              >
                BOT (677)
              </button>
              <button
                onClick={() => switchNetwork('SANDBOX')}
                className={`text-[10px] font-mono-swiss px-1.5 py-0.5 font-bold border ${
                  web3State.network === 'SANDBOX'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-neutral-300 hover:border-black'
                }`}
              >
                LOCAL
              </button>
            </div>
          </div>

          {/* Wallet & Grid Toggle: Cols 10 - 12 */}
          <div className="col-span-6 md:col-span-3 p-3 sm:p-4 flex items-center justify-end gap-2">
            {/* 12-col grid toggle */}
            <button
              onClick={() => setShowGridLines(!showGridLines)}
              title="Toggle Swiss 12-Column Blueprint Grid"
              className={`text-[11px] font-mono-swiss font-bold px-2.5 py-1.5 border transition-all ${
                showGridLines
                  ? 'bg-[#ff0000] text-white border-[#ff0000]'
                  : 'bg-white text-black border-black hover:bg-neutral-100'
              }`}
            >
              GRID {showGridLines ? 'ON' : 'OFF'}
            </button>

            {/* Wallet button */}
            {web3State.isConnected ? (
              <div className="flex items-center gap-1.5">
                <div className="text-right hidden xl:block">
                  <div className="font-mono-swiss text-[11px] font-bold">
                    {web3State.balanceEth} {web3State.currencySymbol}
                  </div>
                  <div className="font-mono-swiss text-[9px] text-neutral-500">
                    {web3State.address.substring(0, 6)}...{web3State.address.substring(38)}
                  </div>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="bg-black hover:bg-[#ff0000] text-white font-mono-swiss text-[11px] font-bold px-3 py-1.5 border border-black uppercase transition-colors"
                >
                  <span className="hidden sm:inline">DISCONNECT</span>
                  <span className="sm:hidden">EXIT</span>
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="bg-black hover:bg-[#ff0000] text-white font-mono-swiss text-[11px] font-bold px-3 py-1.5 border border-black uppercase transition-colors"
              >
                CONNECT
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
