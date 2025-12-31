import Sidebar from '@/components/Sidebar';
import Controls from '@/components/Controls';
import Visualizer from '@/components/Visualizer';
import TheorySection from '@/components/TheorySection';
import { AlgorithmProvider } from '@/context/AlgorithmContext';

export default function Home() {
  return (
    <AlgorithmProvider>
      <main className="flex h-screen w-full bg-background overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <section className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Header / Top Bar (Optional, can be merged with controls) */}
          <header className="h-14 border-b border-border flex items-center px-6 bg-card/50 backdrop-blur-sm z-10">
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Visualizer</span>
                <span>/</span>
                <span className="text-foreground font-medium">Dashboard</span>
             </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
            <div className="max-w-5xl mx-auto flex flex-col gap-6">
              
              {/* Controls */}
              <Controls />

              {/* Main Visualization Canvas */}
              <div className="min-h-[400px] flex flex-col">
                <Visualizer />
              </div>

              {/* Theory */}
              <TheorySection />
              
            </div>
          </div>
        </section>
      </main>
    </AlgorithmProvider>
  );
}