import { useState } from 'react';
import { useVault } from '../context/VaultContext';
import type { LedgerEvent } from '../types/vault';
import { BOTCHAIN_SCAN_URL } from '../contracts/contractData';

export const LedgerSection = () => {
  const { ledgerEvents, currentUnixTime, web3State } = useVault();
  const [filterType, setFilterType] = useState<'ALL' | 'LOCK_COMMITTED' | 'RELEASE_EXECUTED'>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredEvents = ledgerEvents.filter(ev => {
    const matchesFilter = filterType === 'ALL' || ev.eventType === filterType;
    const matchesSearch =
      ev.txHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(ev.vaultId).includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const exportAuditReport = () => {
    const exportData = {
      system: 'ZEITSPERRE TIME-LOCKED VAULT PROTOCOL',
      network: 'BOT CHAIN MAINNET (CHAIN ID: 677)',
      contract: '0xFD51797C48f75aF10761F92Bdd639e4518358324',
      generationTimestamp: currentUnixTime,
      totalEventsRecorded: ledgerEvents.length,
      events: ledgerEvents,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BOTCHAIN_ZEITSPERRE_AUDIT_${currentUnixTime}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="w-full bg-white border-b-2 border-black">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="border-x border-black">
          {/* Section Indicator Bar */}
          <div className="grid grid-cols-12 border-b border-black py-2 px-4 md:px-6 text-[11px] font-mono-swiss uppercase">
            <div className="col-span-12 sm:col-span-4 font-bold text-black flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#ff0000] inline-block"></span>
              <span>SECTION 04 / CHRONO-CRYPTOGRAPHIC LEDGER</span>
            </div>
            <div className="hidden sm:block sm:col-span-5 text-neutral-500">
              AUDIT REGISTER // BOT CHAIN MAINNET (677)
            </div>
            <div className="col-span-12 sm:col-span-3 text-left sm:text-right font-mono-swiss text-neutral-700">
              RECORDS: {ledgerEvents.length}
            </div>
          </div>

          <div className="p-6 md:p-10">
            {/* Header with Search and Export */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-black pb-6 gap-4">
              <div>
                <span className="font-mono-swiss text-[10px] uppercase text-neutral-500">
                  PUBLIC BROADCAST REGISTER
                </span>
                <h2 className="font-swiss font-black text-3xl md:text-4xl uppercase tracking-tight text-black mt-1">
                  HISTORICAL TRANSACTION LEDGER
                </h2>
                <p className="font-swiss text-sm text-neutral-700 mt-2 max-w-xl">
                  Every deposit (TX 01) and withdrawal (TX 02) emits an immutable BOT Chain log. Verify timestamps, cryptographic state transitions, and gas costs.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={exportAuditReport}
                  className="bg-black hover:bg-[#ff0000] text-white font-mono-swiss text-xs font-bold py-2.5 px-4 uppercase transition-colors border border-black flex items-center gap-2"
                >
                  <span>EXPORT AUDIT PROOF (.JSON)</span>
                  <span>↓</span>
                </button>
              </div>
            </div>

            {/* Filter Controls Bar */}
            <div className="grid grid-cols-12 py-4 border-b border-black gap-4 items-center">
              <div className="col-span-12 md:col-span-6 flex flex-wrap gap-2">
                {(['ALL', 'LOCK_COMMITTED', 'RELEASE_EXECUTED'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setFilterType(tab)}
                    className={`font-mono-swiss text-xs font-bold px-3 py-1.5 uppercase border ${
                      filterType === tab
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-neutral-300 hover:border-black'
                    }`}
                  >
                    {tab === 'ALL'
                      ? 'ALL EVENTS'
                      : tab === 'LOCK_COMMITTED'
                      ? 'TX-01 DEPOSITS'
                      : 'TX-02 WITHDRAWALS'}
                  </button>
                ))}
              </div>

              <div className="col-span-12 md:col-span-6 flex justify-start md:justify-end">
                <input
                  type="text"
                  placeholder="FILTER BY HASH, ACTOR OR VAULT ID..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full md:w-80 bg-neutral-50 border border-black p-2 font-mono-swiss text-xs text-black focus:outline-none focus:border-[#ff0000]"
                />
              </div>
            </div>

            {/* Stark 12-Column Ledger Table */}
            <div className="mt-4 overflow-x-auto border border-black">
              <table className="w-full border-collapse text-left font-mono-swiss text-xs">
                <thead>
                  <tr className="bg-black text-white uppercase text-[11px] border-b border-black">
                    <th className="p-3 border-r border-neutral-700">BLOCK</th>
                    <th className="p-3 border-r border-neutral-700">EVENT TYPE</th>
                    <th className="p-3 border-r border-neutral-700">VAULT</th>
                    <th className="p-3 border-r border-neutral-700">PRINCIPAL</th>
                    <th className="p-3 border-r border-neutral-700">TARGET EPOCH</th>
                    <th className="p-3 border-r border-neutral-700">TRANSACTION HASH</th>
                    <th className="p-3 border-r border-neutral-700">GAS</th>
                    <th className="p-3">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black">
                  {filteredEvents.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-neutral-500 font-bold uppercase">
                        NO LOGS MATCHING ACTIVE CRITERIA
                      </td>
                    </tr>
                  ) : (
                    filteredEvents.map((ev: LedgerEvent) => (
                      <tr key={ev.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="p-3 border-r border-black font-bold">
                          #{ev.blockNumber}
                        </td>
                        <td className="p-3 border-r border-black font-bold">
                          <span className="flex items-center gap-1.5">
                            <span
                              className={`w-2 h-2 inline-block ${
                                ev.eventType === 'RELEASE_EXECUTED'
                                  ? 'bg-[#ff0000]'
                                  : 'bg-black'
                              }`}
                            ></span>
                            <span
                              className={
                                ev.eventType === 'RELEASE_EXECUTED'
                                  ? 'text-[#ff0000]'
                                  : 'text-black'
                              }
                            >
                              {ev.eventType === 'RELEASE_EXECUTED'
                                ? 'TX-02 RELEASE'
                                : 'TX-01 COMMIT'}
                            </span>
                          </span>
                        </td>
                        <td className="p-3 border-r border-black">
                          #{String(ev.vaultId).padStart(3, '0')}
                        </td>
                        <td className="p-3 border-r border-black font-bold text-sm">
                          {ev.valueEth} {web3State.currencySymbol}
                        </td>
                        <td className="p-3 border-r border-black">
                          <div>UNIX: {ev.unlockTimestamp}</div>
                          <div className="text-[10px] text-neutral-500">
                            {new Date(ev.unlockTimestamp * 1000).toISOString().substring(0, 16)}
                          </div>
                        </td>
                        <td className="p-3 border-r border-black font-mono-swiss text-[11px]">
                          <a
                            href={`${BOTCHAIN_SCAN_URL}/tx/${ev.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={ev.txHash}
                            className="underline text-black hover:text-[#ff0000] transition-colors"
                          >
                            {ev.txHash.substring(0, 8)}...{ev.txHash.substring(58)} ↗
                          </a>
                        </td>
                        <td className="p-3 border-r border-black text-neutral-600">
                          {ev.gasUsed.toLocaleString()}
                        </td>
                        <td className="p-3">
                          <span className="bg-black text-white px-1.5 py-0.5 text-[10px] font-bold">
                            {ev.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Colophon */}
            <div className="mt-4 flex flex-wrap justify-between items-center text-[10px] font-mono-swiss text-neutral-500 uppercase">
              <span>CONSENSUS: BOT CHAIN MAINNET</span>
              <span>EXPLORER: SCAN.BOTCHAIN.AI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
