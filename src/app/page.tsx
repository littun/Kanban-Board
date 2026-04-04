import { KanbanBoard } from "@/components/KanbanBoard";
import { Toaster } from "sonner";
import { LayoutGrid, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen relative p-6 md:p-12 selection:bg-accent-purple/30">
      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 bg-[#050505]" />
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-purple/10 blur-[120px] rounded-full -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-cyan/10 blur-[120px] rounded-full -z-10" />

      <header className="max-w-6xl mx-auto mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-purple/30 bg-accent-purple/5 text-accent-purple text-[10px] font-bold uppercase tracking-widest mb-4">
            <Sparkles size={12} />
            <span>Project Management Suite</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black gradient-text tracking-tighter mb-2">
            Kanban<span className="font-light italic text-white/40 ml-2">Flow</span>
          </h1>
          <p className="text-white/40 max-w-md text-sm md:text-base leading-relaxed">
            A high-performance workspace with <span className="text-white/80 font-medium italic">optimistic state management</span> and real-time failure rollback simulation.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/5 p-1 rounded-xl border border-white/10 self-end md:self-auto">
          <button className="flex items-center gap-2 px-4 py-2 bg-accent-purple/20 text-accent-purple text-xs font-bold rounded-lg border border-accent-purple/30">
            <LayoutGrid size={14} />
            <span>Board View</span>
          </button>
          <button className="px-4 py-2 text-white/40 hover:text-white/70 text-xs font-bold transition-colors">
            List View
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        <KanbanBoard />
      </div>

      <Toaster 
        theme="dark" 
        position="bottom-right" 
        expand={false} 
        richColors 
        closeButton
        toastOptions={{
          style: {
            background: 'rgba(10, 10, 10, 0.8)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#fff',
          }
        }}
      />
    </main>
  );
}
