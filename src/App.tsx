import { ThemeProvider } from './theme/ThemeProvider';
import { Background, PointerHalo, ScrollRail } from './components/Background';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrendsIndex } from './components/Trends';
import { AgenticDemo } from './components/AgenticDemo';
import { GenerativeDemo } from './components/GenerativeDemo';
import { AdaptiveDemo } from './components/AdaptiveDemo';
import { ProfileSection, StackSection } from './components/StackProfile';
import { Closing, Footer } from './components/Closing';

export default function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen" style={{ background: 'var(--app)', color: 'var(--ink)' }}>
        <Background />
        <PointerHalo />
        <ScrollRail />
        <Navbar />

        <main className="relative z-10">
          <Hero />
          <TrendsIndex />
          <AgenticDemo />
          <GenerativeDemo />
          <AdaptiveDemo />
          <StackSection />
          <ProfileSection />
          <Closing />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
