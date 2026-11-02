import { VaultProvider } from './context/VaultContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { VaultTerminal } from './components/VaultTerminal';
import { ContractSpec } from './components/ContractSpec';
import { LedgerSection } from './components/LedgerSection';
import { ManifestoSection } from './components/ManifestoSection';
import { FooterSection } from './components/FooterSection';
import { GridOverlay } from './components/GridOverlay';

export function App() {
  return (
    <VaultProvider>
      <div className="min-h-screen bg-white text-black font-swiss selection:bg-[#ff0000] selection:text-white relative">
        {/* Toggleable 12-Column Blueprint Grid Overlay */}
        <GridOverlay />

        {/* 00: Header & Navigation */}
        <Header />

        <main>
          {/* Section 01: Poster Manifesto Hero */}
          <HeroSection />

          {/* Section 02: The Dual-Transaction Interactive Engine (TX-01 & TX-02) */}
          <VaultTerminal />

          {/* Section 03: Mathematical Axioms & Smart Contract Specification */}
          <ContractSpec />

          {/* Section 04: 12-Column Public Audit Ledger */}
          <LedgerSection />

          {/* Section 05: Curatorial Essay & Canonical Use-Cases */}
          <ManifestoSection />
        </main>

        {/* Section 06: Exhibition Colophon & Specification Index */}
        <FooterSection />
      </div>
    </VaultProvider>
  );
}

export default App;
