import { useState, useCallback } from 'react';
import { KanbanBoard } from './components/KanbanBoard';
import { Task, Column } from './types';

const initialColumns: Column[] = [
  { id: 'backlog', title: 'BACKLOG', color: '#888' },
  { id: 'todo', title: 'TO DO', color: '#FFE500' },
  { id: 'progress', title: 'IN PROGRESS', color: '#FF3300' },
  { id: 'done', title: 'DONE', color: '#00FF66' },
];

const initialTasks: Task[] = [
  { id: '1', content: 'Design system architecture', columnId: 'backlog', priority: 'high', createdAt: Date.now() - 86400000 * 3 },
  { id: '2', content: 'Set up CI/CD pipeline', columnId: 'todo', priority: 'medium', createdAt: Date.now() - 86400000 * 2 },
  { id: '3', content: 'Write unit tests', columnId: 'todo', priority: 'low', createdAt: Date.now() - 86400000 },
  { id: '4', content: 'Code review PR #42', columnId: 'progress', priority: 'high', createdAt: Date.now() - 3600000 * 5 },
  { id: '5', content: 'Deploy to staging', columnId: 'done', priority: 'medium', createdAt: Date.now() - 3600000 * 2 },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [columns] = useState<Column[]>(initialColumns);

  const handleMoveTask = useCallback((taskId: string, newColumnId: string) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, columnId: newColumnId } : task
    ));
  }, []);

  const handleAddTask = useCallback((columnId: string, content: string, priority: Task['priority']) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      content,
      columnId,
      priority,
      createdAt: Date.now(),
    };
    setTasks(prev => [...prev, newTask]);
  }, []);

  const handleDeleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }, []);

  return (
    <div className="min-h-screen bg-[#E8E8E8] relative overflow-hidden flex flex-col">
      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Construction stripe top */}
      <div className="w-full h-3 md:h-4 bg-repeat-x flex-shrink-0" style={{
        backgroundImage: `repeating-linear-gradient(
          -45deg,
          #1A1A1A,
          #1A1A1A 10px,
          #FFE500 10px,
          #FFE500 20px
        )`,
      }} />

      {/* Header */}
      <header className="border-b-4 md:border-b-6 border-black bg-[#D4D4D4] px-4 md:px-8 py-4 md:py-6 flex-shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-6">
          <h1 className="font-mono text-3xl md:text-5xl lg:text-6xl font-black tracking-[-0.05em] uppercase text-black leading-none">
            KANBAN
          </h1>
          <div className="flex items-center gap-2 md:gap-4">
            <span className="font-mono text-xs md:text-sm text-[#666] uppercase tracking-widest">[TASK_BOARD]</span>
            <div className="h-2 w-2 md:h-3 md:w-3 bg-[#00FF66] animate-pulse" />
            <span className="font-mono text-[10px] md:text-xs text-[#666]">SYSTEM:ACTIVE</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-hidden">
        <KanbanBoard
          columns={columns}
          tasks={tasks}
          onMoveTask={handleMoveTask}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
        />
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-[#D4D4D4] px-4 md:px-8 py-3 flex-shrink-0">
        <p className="font-mono text-[10px] md:text-xs text-[#888] tracking-wider text-center">
          Requested by @web-user · Built by @clonkbot
        </p>
      </footer>
    </div>
  );
}
