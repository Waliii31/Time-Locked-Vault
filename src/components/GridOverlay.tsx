import { useVault } from '../context/VaultContext';

export const GridOverlay = () => {
  const { showGridLines } = useVault();

  if (!showGridLines) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex justify-center px-4 md:px-8 max-w-[1440px] mx-auto">
      <div className="w-full h-full grid grid-cols-12 gap-4 border-x border-red-500/30">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-full bg-red-500/[0.03] border-r border-red-500/20 flex flex-col justify-between py-2 px-1"
          >
            <span className="font-mono-swiss text-[9px] text-red-600 font-bold">
              COL {String(i + 1).padStart(2, '0')}
            </span>
            <span className="font-mono-swiss text-[9px] text-red-600/50">
              8.33%
            </span>
            <span className="font-mono-swiss text-[9px] text-red-600 font-bold">
              COL {String(i + 1).padStart(2, '0')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
