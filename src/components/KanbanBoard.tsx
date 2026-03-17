import { useState } from 'react';
import { Task, Column } from '../types';
import { KanbanColumn } from './KanbanColumn';

interface KanbanBoardProps {
  columns: Column[];
  tasks: Task[];
  onMoveTask: (taskId: string, newColumnId: string) => void;
  onAddTask: (columnId: string, content: string, priority: Task['priority']) => void;
  onDeleteTask: (taskId: string) => void;
}

export function KanbanBoard({ columns, tasks, onMoveTask, onAddTask, onDeleteTask }: KanbanBoardProps) {
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const handleDrop = (columnId: string) => {
    if (draggedTask) {
      onMoveTask(draggedTask, columnId);
      setDraggedTask(null);
    }
  };

  return (
    <div className="h-full p-3 md:p-6 lg:p-8 overflow-x-auto">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 min-h-full md:min-w-max">
        {columns.map((column, index) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={tasks.filter(t => t.columnId === column.id)}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
            onAddTask={onAddTask}
            onDeleteTask={onDeleteTask}
            isDragging={!!draggedTask}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
