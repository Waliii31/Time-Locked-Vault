export const ManifestoSection = () => {
  return (
    <section className="w-full bg-white border-b-2 border-black">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="border-x border-black">
          {/* Section Indicator Bar */}
          <div className="grid grid-cols-12 border-b border-black py-2 px-4 md:px-6 text-[11px] font-mono-swiss uppercase">
            <div className="col-span-12 sm:col-span-4 font-bold text-black flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#ff0000] inline-block"></span>
              <span>SECTION 05 / CURATORIAL ESSAY &amp; USE-CASES</span>
            </div>
            <div className="hidden sm:block sm:col-span-5 text-neutral-500">
              SCHWEIZER TYPOGRAPHIE // JOSEF MÜLLER-BROCKMANN SYSTEM
            </div>
            <div className="col-span-12 sm:col-span-3 text-left sm:text-right font-mono-swiss text-neutral-700">
              ESSAY REF: ZH-1960/2026
            </div>
          </div>

          <div className="grid grid-cols-12">
            {/* Left 4 Cols: Massive Typographic Anchors */}
            <div className="col-span-12 lg:col-span-4 p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-black flex flex-col justify-between">
              <div>
                <span className="font-mono-swiss text-[10px] uppercase text-neutral-500">
                  PHILOSOPHISCHE GRUNDLAGEN
                </span>
                <h2 className="font-swiss font-black text-4xl sm:text-5xl uppercase tracking-tighter text-black mt-2 leading-[0.9]">
                  THE
                  <br />
                  ARCHITECTURE
                  <br />
                  OF TIME
                  <br />
                  <span className="text-[#ff0000]">&amp; DISCIPLINE.</span>
                </h2>

                <div className="mt-8 space-y-6">
                  <div>
                    <span className="font-swiss font-black text-3xl text-black">01.</span>
                    <h3 className="font-swiss font-bold text-lg uppercase tracking-tight text-black mt-1">
                      ABSOLUTE DETERMINISM
                    </h3>
                    <p className="font-swiss text-xs text-neutral-600 mt-1 leading-normal">
                      The blockchain state machine eliminates subjective interpretation. What is locked cannot be unlocked early through persuasion, litigation, or impulse.
                    </p>
                  </div>

                  <div>
                    <span className="font-swiss font-black text-3xl text-black">02.</span>
                    <h3 className="font-swiss font-bold text-lg uppercase tracking-tight text-black mt-1">
                      RADICAL SUBTRACTION
                    </h3>
                    <p className="font-swiss text-xs text-neutral-600 mt-1 leading-normal">
                      By stripping all unnecessary SaaS decoration—gradients, floating tokens, soft shadows—we align visual interface with cryptographic truth.
                    </p>
                  </div>

                  <div>
                    <span className="font-swiss font-black text-3xl text-black">03.</span>
                    <h3 className="font-swiss font-bold text-lg uppercase tracking-tight text-black mt-1">
                      MATHEMATICAL PATIENCE
                    </h3>
                    <p className="font-swiss text-xs text-neutral-600 mt-1 leading-normal">
                      High-time-preference human emotion is superseded by monotonic block increments. Wealth is safeguarded against its own owner.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-black font-mono-swiss text-[10px] text-neutral-500 uppercase mt-8">
                NEUE GRAPHIK // ZÜRICH 1958 // BOT CHAIN 2026
              </div>
            </div>

            {/* Middle 4 Cols: Curatorial Discourse */}
            <div className="col-span-12 lg:col-span-4 p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-black flex flex-col justify-between bg-neutral-50">
              <div className="space-y-6">
                <div>
                  <span className="font-mono-swiss text-[10px] uppercase text-neutral-500">
                    MANIFESTO EXCERPT
                  </span>
                  <h3 className="font-swiss font-black text-xl uppercase tracking-tight text-black mt-1">
                    WHY SWISS TYPOGRAPHY SUITS BOT CHAIN
                  </h3>
                </div>

                <p className="font-swiss text-sm text-black leading-relaxed">
                  In 1957, Max Miedinger and Eduard Hoffmann designed Helvetica to purge graphic communication of subjective sentimentality. The goal was transparent legibility: the typography does not decorate the message; it <strong className="font-black">is</strong> the message.
                </p>

                <p className="font-swiss text-sm text-neutral-800 leading-relaxed">
                  On BOT Chain Mainnet, smart contracts represent immutable agreements. A smart contract is not a casino or a playful game; it is an unforgiving mathematical contract executed across nodes without compromise.
                </p>

                <div className="p-4 bg-white border border-black">
                  <span className="font-mono-swiss text-[10px] text-[#ff0000] font-bold uppercase block mb-1">
                    THE ANTI-SAAS PRINCIPLE
                  </span>
                  <p className="font-mono-swiss text-xs text-black leading-normal">
                    Standard Web3 apps drown users in glowing neon gradients, bubbly rounded cards, and cartoonish illustrations. We reject this infantilization. We return to the cold, stark beauty of black ink, pure red accents, and the 12-column mathematical grid.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-black font-mono-swiss text-[10px] text-neutral-500 uppercase mt-8">
                FONTS: INTER 900 / SPACE MONO 700 / PAPER WHITE
              </div>
            </div>

            {/* Right 4 Cols: Institutional Use-Cases Matrix */}
            <div className="col-span-12 lg:col-span-4 p-6 md:p-10 flex flex-col justify-between">
              <div>
                <span className="font-mono-swiss text-[10px] uppercase text-neutral-500">
                  APPLICATIONS IN PRACTICE
                </span>
                <h3 className="font-swiss font-black text-xl uppercase tracking-tight text-black mt-1">
                  FOUR CANONICAL USE-CASES
                </h3>

                <div className="mt-6 space-y-4">
                  <div className="border border-black p-4">
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono-swiss text-xs font-bold text-black">CASE A</span>
                      <span className="font-mono-swiss text-[10px] text-[#ff0000] font-bold">PSYCHOLOGICAL</span>
                    </div>
                    <div className="font-swiss font-bold text-sm uppercase text-black mt-1">
                      ANTI-PANIC MARKET LOCK
                    </div>
                    <p className="font-mono-swiss text-xs text-neutral-600 mt-1">
                      Lock reserve funds during bull runs or market turmoil. Emotion cannot execute panic liquidations when the contract forbids it.
                    </p>
                  </div>

                  <div className="border border-black p-4">
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono-swiss text-xs font-bold text-black">CASE B</span>
                      <span className="font-mono-swiss text-[10px] text-black font-bold">GOVERNANCE</span>
                    </div>
                    <div className="font-swiss font-bold text-sm uppercase text-black mt-1">
                      DAO &amp; TREASURY VESTING
                    </div>
                    <p className="font-mono-swiss text-xs text-neutral-600 mt-1">
                      Founders and contributors lock their allocations without multi-sig trust dependencies or counterparty custody risk.
                    </p>
                  </div>

                  <div className="border border-black p-4">
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono-swiss text-xs font-bold text-black">CASE C</span>
                      <span className="font-mono-swiss text-[10px] text-[#ff0000] font-bold">HERITAGE</span>
                    </div>
                    <div className="font-swiss font-bold text-sm uppercase text-black mt-1">
                      CRYPTO INHERITANCE
                    </div>
                    <p className="font-mono-swiss text-xs text-neutral-600 mt-1">
                      Specify an heir’s wallet address as beneficiary with an unlock date 5, 10, or 20 years in the future.
                    </p>
                  </div>

                  <div className="border border-black p-4">
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono-swiss text-xs font-bold text-black">CASE D</span>
                      <span className="font-mono-swiss text-[10px] text-black font-bold">COMMERCIAL</span>
                    </div>
                    <div className="font-swiss font-bold text-sm uppercase text-black mt-1">
                      DISPUTE-FREE ESCROW
                    </div>
                    <p className="font-mono-swiss text-xs text-neutral-600 mt-1">
                      Automatic milestone releases governed purely by chronological progress without human arbitration.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-black font-mono-swiss text-[10px] text-neutral-500 uppercase mt-8">
                PROVABLE EXECUTION // ZERO DISCRETION
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
