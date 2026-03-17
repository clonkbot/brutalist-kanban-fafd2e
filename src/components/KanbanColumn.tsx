import { useState } from 'react';
import { Task, Column } from '../types';
import { TaskCard } from './TaskCard';
import { AddTaskForm } from './AddTaskForm';

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onDragStart: (taskId: string) => void;
  onDragEnd: () => void;
  onDrop: (columnId: string) => void;
  onAddTask: (columnId: string, content: string, priority: Task['priority']) => void;
  onDeleteTask: (taskId: string) => void;
  isDragging: boolean;
  index: number;
}

export function KanbanColumn({
  column,
  tasks,
  onDragStart,
  onDragEnd,
  onDrop,
  onAddTask,
  onDeleteTask,
  isDragging,
  index
}: KanbanColumnProps) {
  const [isOver, setIsOver] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    onDrop(column.id);
  };

  return (
    <div
      className={`
        w-full md:w-72 lg:w-80 flex-shrink-0 flex flex-col
        border-4 border-black bg-[#F5F5F5]
        transition-all duration-150
        ${isOver && isDragging ? 'border-dashed bg-[#FFE500]/20 scale-[1.02]' : ''}
      `}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column header */}
      <div
        className="border-b-4 border-black p-3 md:p-4 relative overflow-hidden"
        style={{ backgroundColor: column.color }}
      >
        {/* Hatched pattern overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 4px,
              #000 4px,
              #000 5px
            )`,
          }}
        />

        <div className="relative flex items-center justify-between">
          <h2 className="font-mono text-sm md:text-base font-black tracking-widest text-black uppercase">
            {column.title}
          </h2>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs md:text-sm font-bold text-black/70 px-2 py-1 bg-white/50 border-2 border-black">
              {tasks.length}
            </span>
          </div>
        </div>
      </div>

      {/* Tasks container */}
      <div className="flex-1 p-2 md:p-3 space-y-2 md:space-y-3 overflow-y-auto max-h-[40vh] md:max-h-[60vh]">
        {tasks
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((task, taskIndex) => (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onDelete={onDeleteTask}
              index={taskIndex}
            />
          ))}

        {tasks.length === 0 && !showAddForm && (
          <div className="border-2 border-dashed border-[#AAA] p-4 md:p-6 text-center">
            <span className="font-mono text-xs md:text-sm text-[#888] uppercase tracking-wider">
              [EMPTY_QUEUE]
            </span>
          </div>
        )}
      </div>

      {/* Add task button/form */}
      <div className="border-t-4 border-black p-2 md:p-3 bg-[#E8E8E8]">
        {showAddForm ? (
          <AddTaskForm
            onAdd={(content, priority) => {
              onAddTask(column.id, content, priority);
              setShowAddForm(false);
            }}
            onCancel={() => setShowAddForm(false)}
          />
        ) : (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full font-mono text-xs md:text-sm uppercase tracking-wider py-3 md:py-4
                       border-2 border-black bg-white hover:bg-black hover:text-white
                       transition-all duration-100 active:translate-y-[2px]
                       flex items-center justify-center gap-2"
          >
            <span className="text-lg md:text-xl leading-none">+</span>
            <span>ADD TASK</span>
          </button>
        )}
      </div>
    </div>
  );
}
