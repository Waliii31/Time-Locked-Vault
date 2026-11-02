import { useVault } from '../context/VaultContext';
import {
  CONTRACT_ADDRESS_BOTCHAIN,
  BOTCHAIN_CONTRACT_SCAN_URL,
  TWITTER_URL,
  POWERED_BY_BOTCHAIN_URL,
  BOTCHAIN_RPC_URL,
} from '../contracts/contractData';

export const FooterSection = () => {
  const { showGridLines, setShowGridLines, currentUnixTime } = useVault();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-white border-b-8 border-black">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="border-x border-black">
          {/* Section Indicator Bar */}
          <div className="grid grid-cols-12 border-b border-black py-2 px-4 md:px-6 text-[11px] font-mono-swiss uppercase">
            <div className="col-span-12 sm:col-span-4 font-bold text-black flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#ff0000] inline-block"></span>
              <span>SECTION 06 / COLOPHON &amp; TECHNICAL INDEX</span>
            </div>
            <div className="hidden sm:block sm:col-span-5 text-neutral-500">
              SCHWEIZERISCHER WERKBUND // BOT CHAIN MAINNET
            </div>
            <div className="col-span-12 sm:col-span-3 text-left sm:text-right font-mono-swiss text-neutral-700">
              TIMESTAMP: {currentUnixTime}
            </div>
          </div>

          {/* Master 12-Column Footer Content */}
          <div className="grid grid-cols-12 border-b border-black">
            {/* Col 1-4: Colophon & Ecosystem Links */}
            <div className="col-span-12 lg:col-span-4 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-black flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 bg-[#ff0000] flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl leading-none select-none">+</span>
                </div>
                <h3 className="font-swiss font-black text-2xl uppercase tracking-tight text-black">
                  ZEITSPERRE PROTOCOL
                </h3>
                <p className="font-swiss text-xs text-neutral-600 mt-2 leading-relaxed">
                  A pure dual-transaction time-locked escrow smart contract. Conceived and constructed under the structural discipline of the Swiss International Typographic Style.
                </p>

                {/* Powered by Botchain & Twitter links */}
                <div className="mt-5 pt-4 border-t border-black space-y-2">
                  <div className="font-mono-swiss text-xs">
                    <span className="text-neutral-500 uppercase mr-1">ECOSYSTEM:</span>
                    <a
                      href={POWERED_BY_BOTCHAIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-black hover:text-[#ff0000] underline uppercase transition-colors"
                    >
                      POWERED BY BOTCHAIN (BOTCHAIN.AI) ↗
                    </a>
                  </div>

                  <div className="font-mono-swiss text-xs">
                    <span className="text-neutral-500 uppercase mr-1">SOCIAL:</span>
                    <a
                      href={TWITTER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-black hover:text-[#ff0000] underline uppercase transition-colors"
                    >
                      X (TWITTER): @SITE_PROOF__ ↗
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-black font-mono-swiss text-[10px] text-neutral-500">
                NO TRACKERS // ZERO ILLUSIONS // DETERMINISTIC TIME
              </div>
            </div>

            {/* Col 5-8: Contract Directory & Endpoints with Scan link */}
            <div className="col-span-12 lg:col-span-4 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-black space-y-4">
              <span className="font-mono-swiss text-[10px] uppercase text-neutral-500 block">
                DEPLOYED CONTRACT COORDINATES
              </span>

              {/* Verified BOT Chain Mainnet Box */}
              <div className="border-2 border-black p-4 bg-neutral-50">
                <div className="flex justify-between items-baseline font-mono-swiss text-[10px]">
                  <span className="font-bold text-black uppercase">BOT CHAIN MAINNET</span>
                  <span className="bg-[#ff0000] text-white px-1.5 py-0.5 font-bold">CHAIN ID 677</span>
                </div>
                <div className="font-mono-swiss text-xs font-bold text-black mt-2 break-all">
                  {CONTRACT_ADDRESS_BOTCHAIN}
                </div>
                <div className="mt-3 pt-2 border-t border-neutral-300">
                  <a
                    href={BOTCHAIN_CONTRACT_SCAN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono-swiss font-bold text-[#ff0000] hover:text-black uppercase underline transition-colors"
                  >
                    <span>VIEW CONTRACT ON BOTCHAIN SCAN</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>

              {/* Network Parameters */}
              <div className="space-y-1 font-mono-swiss text-[11px] text-neutral-600">
                <div className="flex justify-between border-b border-neutral-200 pb-1">
                  <span>RPC ENDPOINT:</span>
                  <strong className="text-black">{BOTCHAIN_RPC_URL}</strong>
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-1">
                  <span>CURRENCY:</span>
                  <strong className="text-black">BOT (18 DECIMALS)</strong>
                </div>
                <div className="flex justify-between">
                  <span>EXPLORER:</span>
                  <a
                    href="https://scan.botchain.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-[#ff0000] underline"
                  >
                    SCAN.BOTCHAIN.AI ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Col 9-12: Typographic Specimen & Utility Actions */}
            <div className="col-span-12 lg:col-span-4 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <span className="font-mono-swiss text-[10px] uppercase text-neutral-500 block">
                  TYPOGRAPHIC SPECIMEN
                </span>

                <div className="mt-3 space-y-2 font-mono-swiss text-xs text-neutral-800">
                  <div className="flex justify-between border-b border-neutral-200 pb-1">
                    <span>PRIMARY TYPEFACE:</span>
                    <strong className="text-black">Inter / Helvetica</strong>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200 pb-1">
                    <span>METRIC TYPEFACE:</span>
                    <strong className="text-black">Space Mono</strong>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200 pb-1">
                    <span>GRID SYSTEM:</span>
                    <strong className="text-black">12-Column Modular</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>ACCENT CHROMATICITY:</span>
                    <strong className="text-[#ff0000]">#FF0000 (Pure Red)</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-black flex flex-wrap gap-2">
                <button
                  onClick={() => setShowGridLines(!showGridLines)}
                  className={`font-mono-swiss text-xs font-bold px-3 py-1.5 uppercase border ${
                    showGridLines
                      ? 'bg-[#ff0000] text-white border-[#ff0000]'
                      : 'bg-white text-black border-black hover:bg-neutral-100'
                  }`}
                >
                  GRID {showGridLines ? 'ON' : 'OFF'}
                </button>
                <button
                  onClick={scrollToTop}
                  className="font-mono-swiss text-xs font-bold px-3 py-1.5 uppercase border border-black bg-black text-white hover:bg-[#ff0000] transition-colors"
                >
                  TOP ↑
                </button>
              </div>
            </div>
          </div>

          {/* Micro Legal & Exhibition Credits */}
          <div className="p-4 md:px-8 flex flex-wrap justify-between items-center font-mono-swiss text-[10px] text-neutral-500 uppercase gap-2 bg-neutral-100">
            <div>
              BOT CHAIN MAINNET // EVM COMPATIBLE // CHAIN ID: 677
            </div>
            <div>
              OPEN ACCESS // POWERED BY BOTCHAIN // MIT LICENSE
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
