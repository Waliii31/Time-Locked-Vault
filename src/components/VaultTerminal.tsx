import { useState, useEffect } from 'react';
import { useVault } from '../context/VaultContext';
import type { VaultItem } from '../types/vault';
import { BOTCHAIN_SCAN_URL } from '../contracts/contractData';

export const VaultTerminal = () => {
  const {
    web3State,
    vaults,
    currentUnixTime,
    depositEth,
    withdrawEth,
    fastForwardTime,
    resetSimulationTime,
  } = useVault();

  // Active terminal tab: 'deposit' or 'vaults'
  const [activeTab, setActiveTab] = useState<'deposit' | 'vaults'>('deposit');

  // Listen for custom event from hero buttons
  useEffect(() => {
    const handleSwitch = (e: Event) => {
      const customEvent = e as CustomEvent<'deposit' | 'withdraw'>;
      if (customEvent.detail === 'deposit') {
        setActiveTab('deposit');
      } else if (customEvent.detail === 'withdraw') {
        setActiveTab('vaults');
      }
    };
    window.addEventListener('switch-terminal-tab', handleSwitch);
    return () => window.removeEventListener('switch-terminal-tab', handleSwitch);
  }, []);

  // Form State for TX 01
  const [depositAmount, setDepositAmount] = useState<string>('5.0');
  const [lockDurationSeconds, setLockDurationSeconds] = useState<number>(300); // default +5 mins
  const [customUnixInput, setCustomUnixInput] = useState<string>('');
  const [beneficiaryInput, setBeneficiaryInput] = useState<string>('');
  const [purposeInput, setPurposeInput] = useState<string>('BOTCHAIN_COLD_LOCK');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [txMessage, setTxMessage] = useState<{
    type: 'success' | 'error';
    text: string;
    hash?: string;
  } | null>(null);

  // Sync unlock timestamp calculation
  const computedUnlockTime = customUnixInput
    ? parseInt(customUnixInput, 10) || currentUnixTime + lockDurationSeconds
    : currentUnixTime + lockDurationSeconds;

  const secondsRemainingInSelection = Math.max(0, computedUnlockTime - currentUnixTime);

  // Format date helper
  const formatEpoch = (epoch: number) => {
    if (!epoch || isNaN(epoch)) return '—';
    const d = new Date(epoch * 1000);
    return d.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  };

  const formatCountdown = (diffSeconds: number) => {
    if (diffSeconds <= 0) return 'MATURED (00:00:00)';
    const d = Math.floor(diffSeconds / 86400);
    const h = Math.floor((diffSeconds % 86400) / 3600);
    const m = Math.floor((diffSeconds % 3600) / 60);
    const s = Math.floor(diffSeconds % 60);
    if (d > 0) return `${d}D ${h}H ${m}M ${s}S`;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Submit TX 01: Deposit
  const handleDepositSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTxMessage(null);
    setIsSubmitting(true);

    try {
      const res = await depositEth({
        amountEth: depositAmount,
        unlockTimestamp: computedUnlockTime,
        beneficiary: beneficiaryInput.trim() || undefined,
        purpose: purposeInput.trim(),
      });

      if (res.success) {
        setTxMessage({
          type: 'success',
          text: `TRANSACTION 01 COMMITTED: Vault #${String(res.vaultId).padStart(3, '0')} initialized with ${depositAmount} ${web3State.currencySymbol} until UNIX ${computedUnlockTime}.`,
          hash: res.txHash,
        });
        setActiveTab('vaults');
      } else {
        setTxMessage({
          type: 'error',
          text: `EXECUTION REVERTED: ${res.error}`,
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'UNEXPECTED_TRANSACTION_REVERT';
      setTxMessage({
        type: 'error',
        text: `TRANSACTION FAILED: ${msg}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit TX 02: Withdraw
  const handleWithdrawClick = async (vault: VaultItem) => {
    setTxMessage(null);
    setIsSubmitting(true);

    try {
      const res = await withdrawEth(vault.vaultIndex);
      if (res.success) {
        setTxMessage({
          type: 'success',
          text: `TRANSACTION 02 EXECUTED: Released ${vault.amountEth} ${web3State.currencySymbol} from Vault #${String(vault.vaultIndex).padStart(3, '0')}. Funds transferred to beneficiary.`,
          hash: res.txHash,
        });
      } else {
        setTxMessage({
          type: 'error',
          text: `WITHDRAWAL REVERTED: ${res.error}`,
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'UNEXPECTED_REVERT';
      setTxMessage({
        type: 'error',
        text: `EXECUTION FAILED: ${msg}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Durations presets
  const durationPresets = [
    { label: '+2 MIN', seconds: 120, tag: 'DEMO TEST' },
    { label: '+5 MIN', seconds: 300, tag: 'SHORT' },
    { label: '+1 HOUR', seconds: 3600, tag: '60 MIN' },
    { label: '+24 HOURS', seconds: 86400, tag: '1 DAY' },
    { label: '+7 DAYS', seconds: 86400 * 7, tag: '1 WEEK' },
    { label: '+30 DAYS', seconds: 86400 * 30, tag: '1 MONTH' },
    { label: '+365 DAYS', seconds: 86400 * 365, tag: '1 YEAR' },
  ];

  return (
    <section id="vault-terminal" className="w-full bg-white border-b-2 border-black">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="border-x border-black">
          {/* Section Indicator Bar */}
          <div className="grid grid-cols-12 border-b border-black py-2 px-4 md:px-6 text-[11px] font-mono-swiss uppercase">
            <div className="col-span-12 sm:col-span-4 font-bold text-black flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#ff0000] inline-block"></span>
              <span>SECTION 02 / DUAL-TRANSACTION ENGINE</span>
            </div>
            <div className="hidden sm:block sm:col-span-5 text-neutral-500">
              BOT CHAIN MAINNET // TRANSACTIONS 01 &amp; 02
            </div>
            <div className="col-span-12 sm:col-span-3 text-left sm:text-right text-neutral-700">
              WALLET BALANCE: <strong className="text-black">{web3State.balanceEth} {web3State.currencySymbol}</strong>
            </div>
          </div>

          {/* Temporal Warp Simulator Toolbar */}
          <div className="bg-neutral-100 border-b border-black p-3 md:px-6 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-swiss">
            <div className="flex items-center gap-2">
              <span className="bg-black text-white px-2 py-0.5 font-bold text-[10px]">
                TESTNET CLOCK ACCELERATOR
              </span>
              <span className="text-neutral-600 hidden md:inline">
                Offset: <strong className="text-black">{web3State.simulatedTimeOffset}s</strong>
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-neutral-500 text-[10px] uppercase mr-1">FAST FORWARD:</span>
              <button
                onClick={() => fastForwardTime(60)}
                className="bg-white hover:bg-black hover:text-white border border-black px-2 py-1 text-[11px] font-bold"
              >
                +1 MIN
              </button>
              <button
                onClick={() => fastForwardTime(300)}
                className="bg-white hover:bg-black hover:text-white border border-black px-2 py-1 text-[11px] font-bold"
              >
                +5 MIN
              </button>
              <button
                onClick={() => fastForwardTime(3600)}
                className="bg-white hover:bg-black hover:text-white border border-black px-2 py-1 text-[11px] font-bold"
              >
                +1 HOUR
              </button>
              <button
                onClick={() => fastForwardTime(86400)}
                className="bg-white hover:bg-black hover:text-white border border-black px-2 py-1 text-[11px] font-bold"
              >
                +24 HOURS
              </button>
              {web3State.simulatedTimeOffset > 0 && (
                <button
                  onClick={resetSimulationTime}
                  className="bg-[#ff0000] text-white border border-[#ff0000] px-2 py-1 text-[11px] font-bold hover:bg-black hover:border-black"
                >
                  RESET CLOCK
                </button>
              )}
            </div>
          </div>

          {/* Tab Selector Bar */}
          <div className="grid grid-cols-12 border-b border-black">
            <button
              onClick={() => setActiveTab('deposit')}
              className={`col-span-6 py-4 px-6 text-left font-swiss font-black text-lg md:text-2xl tracking-tight uppercase transition-colors border-r border-black flex items-center justify-between ${
                activeTab === 'deposit'
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-neutral-50'
              }`}
            >
              <span>01. DEPOSIT &amp; TIME-LOCK</span>
              <span className="font-mono-swiss text-xs font-normal opacity-70">
                [TX-01]
              </span>
            </button>

            <button
              onClick={() => setActiveTab('vaults')}
              className={`col-span-6 py-4 px-6 text-left font-swiss font-black text-lg md:text-2xl tracking-tight uppercase transition-colors flex items-center justify-between ${
                activeTab === 'vaults'
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-neutral-50'
              }`}
            >
              <span>02. ACTIVE VAULTS &amp; WITHDRAWAL</span>
              <span className="font-mono-swiss text-xs font-normal opacity-70">
                [{vaults.length} ESCROWS]
              </span>
            </button>
          </div>

          {/* Transaction Notification / Alert Banner */}
          {txMessage && (
            <div
              className={`p-4 border-b border-black font-mono-swiss text-xs flex flex-col md:flex-row md:items-center justify-between gap-2 ${
                txMessage.type === 'success'
                  ? 'bg-[#ff0000] text-white'
                  : 'bg-black text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">
                  {txMessage.type === 'success' ? '✓ SETTLED:' : '✕ REVERTED:'}
                </span>
                <span>{txMessage.text}</span>
              </div>
              {txMessage.hash && (
                <a
                  href={`${BOTCHAIN_SCAN_URL}/tx/${txMessage.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-90 underline break-all text-[11px] hover:text-black transition-colors"
                >
                  VIEW ON BOTCHAIN SCAN ↗
                </a>
              )}
            </div>
          )}

          {/* TAB 01: DEPOSIT & TIME-LOCK (TX 01) */}
          {activeTab === 'deposit' && (
            <div className="grid grid-cols-12">
              {/* Form Column: 7 Cols */}
              <div className="col-span-12 lg:col-span-7 p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-black">
                <form onSubmit={handleDepositSubmit} className="space-y-8">
                  {/* Step 1: Amount */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <label className="font-swiss font-black text-sm uppercase tracking-wider text-black">
                        01. COMMIT AMOUNT ({web3State.currencySymbol})
                      </label>
                      <span className="font-mono-swiss text-xs text-neutral-500">
                        AVAILABLE: {web3State.balanceEth} {web3State.currencySymbol}
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        type="number"
                        step="0.0001"
                        min="0.0001"
                        value={depositAmount}
                        onChange={e => setDepositAmount(e.target.value)}
                        placeholder="0.00"
                        required
                        className="w-full bg-white border-2 border-black p-4 text-3xl md:text-4xl font-mono-swiss font-bold text-black focus:outline-none focus:border-[#ff0000] transition-colors"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-swiss font-bold text-xl text-neutral-400 pointer-events-none">
                        {web3State.currencySymbol}
                      </span>
                    </div>

                    {/* Quick amount chips */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {['1.0', '5.0', '10.0', '25.0', '50.0'].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setDepositAmount(val)}
                          className={`font-mono-swiss text-xs font-bold px-3 py-1 border border-black uppercase ${
                            depositAmount === val
                              ? 'bg-black text-white'
                              : 'bg-white text-black hover:bg-neutral-100'
                          }`}
                        >
                          {val} {web3State.currencySymbol}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setDepositAmount(web3State.balanceEth)}
                        className="font-mono-swiss text-xs font-bold px-3 py-1 border border-black uppercase bg-neutral-100 hover:bg-black hover:text-white"
                      >
                        MAX BALANCE
                      </button>
                    </div>
                  </div>

                  {/* Step 2: Lock Duration */}
                  <div>
                    <label className="font-swiss font-black text-sm uppercase tracking-wider text-black block mb-2">
                      02. LOCK PERIOD / TARGET TIMESTAMP
                    </label>

                    {/* Preset duration chips */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                      {durationPresets.map(preset => (
                        <button
                          key={preset.seconds}
                          type="button"
                          onClick={() => {
                            setLockDurationSeconds(preset.seconds);
                            setCustomUnixInput('');
                          }}
                          className={`p-3 text-left border border-black transition-all ${
                            lockDurationSeconds === preset.seconds && !customUnixInput
                              ? 'bg-black text-white'
                              : 'bg-white text-black hover:bg-neutral-50'
                          }`}
                        >
                          <div className="font-mono-swiss font-bold text-sm">
                            {preset.label}
                          </div>
                          <div className="font-mono-swiss text-[9px] opacity-70">
                            {preset.tag}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Raw UNIX Timestamp Input Option */}
                    <div className="border border-black p-4 bg-neutral-50">
                      <div className="flex justify-between text-xs font-mono-swiss mb-1">
                        <span className="font-bold text-black uppercase">
                          CUSTOM UNIX TIMESTAMP
                        </span>
                        <span className="text-neutral-500">
                          NOW: {currentUnixTime}
                        </span>
                      </div>
                      <input
                        type="number"
                        value={customUnixInput}
                        onChange={e => {
                          setCustomUnixInput(e.target.value);
                        }}
                        placeholder={`e.g. ${currentUnixTime + 3600}`}
                        className="w-full bg-white border border-black p-2 font-mono-swiss text-sm text-black focus:outline-none focus:border-[#ff0000]"
                      />
                      <div className="mt-2 text-[11px] font-mono-swiss text-neutral-600 flex justify-between">
                        <span>CALCULATED EXPIRATION:</span>
                        <strong className="text-black font-bold">
                          {formatEpoch(computedUnlockTime)}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Beneficiary (Optional) */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <label className="font-swiss font-black text-sm uppercase tracking-wider text-black">
                        03. BENEFICIARY (EXTRACTION RECIPIENT)
                      </label>
                      <span className="font-mono-swiss text-[10px] text-neutral-500">
                        DEFAULTS TO CALLER
                      </span>
                    </div>
                    <input
                      type="text"
                      value={beneficiaryInput}
                      onChange={e => setBeneficiaryInput(e.target.value)}
                      placeholder={web3State.address || '0x...'}
                      className="w-full bg-white border border-black p-3 font-mono-swiss text-xs text-black focus:outline-none focus:border-[#ff0000]"
                    />
                    <span className="font-mono-swiss text-[10px] text-neutral-500 mt-1 block">
                      Upon unlock, only this address or the creator can execute Transaction 02.
                    </span>
                  </div>

                  {/* Step 4: Purpose Memo */}
                  <div>
                    <label className="font-swiss font-black text-sm uppercase tracking-wider text-black block mb-2">
                      04. COMMITMENT CLASSIFICATION / MEMO
                    </label>
                    <input
                      type="text"
                      value={purposeInput}
                      onChange={e => setPurposeInput(e.target.value)}
                      placeholder="e.g. BOTCHAIN_VESTING_LOCK"
                      className="w-full bg-white border border-black p-3 font-mono-swiss text-xs uppercase text-black focus:outline-none focus:border-[#ff0000]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black hover:bg-[#ff0000] text-white font-swiss font-black text-xl md:text-2xl py-6 px-8 uppercase tracking-tight transition-colors border-2 border-black flex items-center justify-between group disabled:opacity-50"
                  >
                    <span>
                      {isSubmitting
                        ? 'TRANSMITTING STATE CHANGE...'
                        : `TRANSMIT TRANSACTION 01: LOCK ${web3State.currencySymbol}`}
                    </span>
                    <span className="font-mono-swiss text-2xl group-hover:translate-x-2 transition-transform">
                      →
                    </span>
                  </button>
                </form>
              </div>

              {/* Inspection & Cryptographic Proof Column: 5 Cols */}
              <div className="col-span-12 lg:col-span-5 p-6 md:p-10 flex flex-col justify-between bg-neutral-50">
                <div className="space-y-6">
                  <div className="border-b border-black pb-4">
                    <span className="font-mono-swiss text-[10px] text-neutral-500 uppercase">
                      PRE-FLIGHT STATE INSPECTION
                    </span>
                    <h2 className="font-swiss font-black text-2xl uppercase mt-1 tracking-tight">
                      CRYPTO SPECIFICATION
                    </h2>
                  </div>

                  {/* Dynamic Calculation Block */}
                  <div className="p-4 bg-white border border-black space-y-3 font-mono-swiss text-xs">
                    <div className="flex justify-between border-b border-neutral-200 pb-2">
                      <span className="text-neutral-500">LOCK VALUE:</span>
                      <strong className="text-black text-sm">{depositAmount} {web3State.currencySymbol}</strong>
                    </div>
                    <div className="flex justify-between border-b border-neutral-200 pb-2">
                      <span className="text-neutral-500">CURRENT BLOCK EPOCH:</span>
                      <strong className="text-black">{currentUnixTime}</strong>
                    </div>
                    <div className="flex justify-between border-b border-neutral-200 pb-2">
                      <span className="text-neutral-500">TARGET UNLOCK EPOCH:</span>
                      <strong className="text-[#ff0000] font-bold">
                        {computedUnlockTime}
                      </strong>
                    </div>
                    <div className="flex justify-between border-b border-neutral-200 pb-2">
                      <span className="text-neutral-500">COUNTDOWN DURATION:</span>
                      <strong className="text-black font-bold">
                        {formatCountdown(secondsRemainingInSelection)}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">ESTIMATED GAS:</span>
                      <span className="text-black">~46,210 UNITS</span>
                    </div>
                  </div>

                  {/* Warning Box */}
                  <div className="p-4 bg-black text-white space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#ff0000] inline-block"></span>
                      <span className="font-swiss font-bold text-xs uppercase tracking-wider text-[#ff0000]">
                        BOT CHAIN IMMUTABILITY NOTICE
                      </span>
                    </div>
                    <p className="font-mono-swiss text-[11px] text-neutral-300 leading-normal">
                      Once confirmed on BOT Chain Mainnet, neither the depositor nor validators can override the timestamp condition. Funds remain inaccessible until block timestamp satisfies <span className="text-white font-bold">T_block ≥ {computedUnlockTime}</span>.
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-black font-mono-swiss text-[10px] text-neutral-500 flex justify-between">
                  <span>BYTECODE: IMMUTABLE</span>
                  <span>BOT CHAIN (677)</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 02: ACTIVE VAULTS & WITHDRAWAL (TX 02) */}
          {activeTab === 'vaults' && (
            <div className="p-6 md:p-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-black pb-4 mb-6 gap-4">
                <div>
                  <span className="font-mono-swiss text-[10px] uppercase text-neutral-500">
                    ESCROW DIRECTORY
                  </span>
                  <h2 className="font-swiss font-black text-3xl md:text-4xl uppercase tracking-tight text-black mt-1">
                    ACTIVE &amp; HISTORICAL VAULTS
                  </h2>
                </div>
                <div className="font-mono-swiss text-xs text-neutral-600">
                  TOTAL VAULTS REGISTERED: <strong className="text-black">{vaults.length}</strong>
                </div>
              </div>

              {vaults.length === 0 ? (
                <div className="p-12 text-center border border-black bg-neutral-50">
                  <p className="font-swiss font-bold text-lg uppercase text-neutral-500">
                    NO ACTIVE VAULTS COMMITTED
                  </p>
                  <button
                    onClick={() => setActiveTab('deposit')}
                    className="mt-4 bg-black text-white font-mono-swiss text-xs font-bold px-4 py-2 uppercase"
                  >
                    CREATE FIRST VAULT (TX 01)
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {vaults.map(vault => {
                    const diff = vault.unlockTimestamp - currentUnixTime;
                    const isMatured = diff <= 0;
                    const totalDuration = vault.unlockTimestamp - vault.createdAt;
                    const elapsed = Math.max(0, currentUnixTime - vault.createdAt);
                    const progressPercent = Math.min(
                      100,
                      Math.max(0, Math.floor((elapsed / (totalDuration || 1)) * 100))
                    );

                    return (
                      <div
                        key={vault.id}
                        className={`border-2 border-black p-5 md:p-6 transition-all ${
                          vault.isWithdrawn
                            ? 'bg-neutral-100 opacity-60'
                            : isMatured
                            ? 'bg-white shadow-[4px_4px_0px_0px_#ff0000]'
                            : 'bg-white'
                        }`}
                      >
                        <div className="grid grid-cols-12 gap-4 items-center">
                          {/* Vault Index & Purpose: Cols 1 - 4 */}
                          <div className="col-span-12 md:col-span-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="bg-black text-white font-mono-swiss text-xs font-bold px-2 py-0.5">
                                #{String(vault.vaultIndex).padStart(3, '0')}
                              </span>
                              <span
                                className={`text-[10px] font-mono-swiss font-bold px-2 py-0.5 uppercase ${
                                  vault.isWithdrawn
                                    ? 'bg-neutral-300 text-black'
                                    : isMatured
                                    ? 'bg-[#ff0000] text-white animate-pulse'
                                    : 'bg-neutral-200 text-black'
                                }`}
                              >
                                {vault.isWithdrawn
                                  ? 'WITHDRAWN / CLOSED'
                                  : isMatured
                                  ? '● READY TO UNLOCK (TX-02)'
                                  : 'TEMPORALLY LOCKED'}
                              </span>
                            </div>
                            <div className="font-swiss font-bold text-base uppercase text-black truncate">
                              {vault.purpose}
                            </div>
                            <div className="font-mono-swiss text-[10px] text-neutral-500 mt-0.5">
                              BENEFICIARY: {vault.beneficiary.substring(0, 8)}...{vault.beneficiary.substring(36)}
                            </div>
                          </div>

                          {/* Amount: Cols 5 - 6 */}
                          <div className="col-span-6 md:col-span-2">
                            <span className="font-mono-swiss text-[10px] uppercase text-neutral-500 block">
                              PRINCIPAL
                            </span>
                            <span className="font-swiss font-black text-2xl md:text-3xl text-black">
                              {vault.amountEth}
                            </span>
                            <span className="font-mono-swiss text-xs ml-1 text-neutral-500">{web3State.currencySymbol}</span>
                          </div>

                          {/* Time & Countdown: Cols 7 - 9 */}
                          <div className="col-span-6 md:col-span-3">
                            <span className="font-mono-swiss text-[10px] uppercase text-neutral-500 block">
                              {isMatured ? 'MATURITY REACHED' : 'COUNTDOWN REMAINING'}
                            </span>
                            <div className="font-mono-swiss font-bold text-base md:text-lg text-black mt-0.5">
                              {vault.isWithdrawn
                                ? 'LIQUIDATED'
                                : formatCountdown(diff)}
                            </div>
                            <div className="font-mono-swiss text-[10px] text-neutral-500 mt-0.5">
                              UNIX: {vault.unlockTimestamp}
                            </div>

                            {/* Minimal Linear Progress bar */}
                            {!vault.isWithdrawn && (
                              <div className="w-full bg-neutral-200 h-1.5 mt-2 border border-black/30 overflow-hidden">
                                <div
                                  className={`h-full transition-all duration-500 ${
                                    isMatured ? 'bg-[#ff0000]' : 'bg-black'
                                  }`}
                                  style={{ width: `${progressPercent}%` }}
                                ></div>
                              </div>
                            )}
                          </div>

                          {/* Transaction 02 Action Button: Cols 10 - 12 */}
                          <div className="col-span-12 md:col-span-3 flex justify-end">
                            {vault.isWithdrawn ? (
                              <div className="text-right font-mono-swiss text-xs text-neutral-500">
                                <div className="font-bold text-black uppercase">FUNDS EXTRACTED</div>
                                <div className="text-[10px]">
                                  AT UNIX: {vault.withdrawnAt || '—'}
                                </div>
                              </div>
                            ) : isMatured ? (
                              <button
                                onClick={() => handleWithdrawClick(vault)}
                                disabled={isSubmitting}
                                className="w-full md:w-auto bg-[#ff0000] hover:bg-black text-white font-mono-swiss font-bold text-xs py-3 px-5 uppercase transition-colors border border-black flex items-center justify-center gap-2 group"
                              >
                                <span>EXECUTE WITHDRAWAL (TX 02)</span>
                                <span className="group-hover:translate-x-1 transition-transform font-bold">
                                  →
                                </span>
                              </button>
                            ) : (
                              <button
                                disabled
                                className="w-full md:w-auto bg-neutral-100 text-neutral-400 border border-neutral-300 font-mono-swiss text-xs py-3 px-5 uppercase cursor-not-allowed text-center"
                              >
                                LOCKED UNTIL {new Date(vault.unlockTimestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
