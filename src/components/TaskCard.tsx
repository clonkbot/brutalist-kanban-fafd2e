import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onDragStart: (taskId: string) => void;
  onDragEnd: () => void;
  onDelete: (taskId: string) => void;
  index: number;
}

const priorityStyles = {
  high: {
    border: '#FF3300',
    badge: 'bg-[#FF3300] text-white',
    label: 'HIGH',
  },
  medium: {
    border: '#FFE500',
    badge: 'bg-[#FFE500] text-black',
    label: 'MED',
  },
  low: {
    border: '#888',
    badge: 'bg-[#888] text-white',
    label: 'LOW',
  },
};

function formatTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return 'now';
}

export function TaskCard({ task, onDragStart, onDragEnd, onDelete, index }: TaskCardProps) {
  const priority = priorityStyles[task.priority];

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = 'move';
    onDragStart(task.id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      className="group bg-white border-4 border-black relative cursor-grab active:cursor-grabbing
                 hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#000]
                 transition-all duration-100"
      style={{
        animationDelay: `${index * 50}ms`,
        borderLeftColor: priority.border,
        borderLeftWidth: '6px',
      }}
    >
      {/* Task ID stamp */}
      <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-black text-white
                      font-mono text-[8px] md:text-[10px] px-1 md:px-2 py-0.5 md:py-1
                      transform rotate-3">
        #{task.id.slice(-4).toUpperCase()}
      </div>

      {/* Content */}
      <div className="p-2 md:p-3 pt-3 md:pt-4">
        <p className="font-mono text-xs md:text-sm text-black leading-snug pr-6 md:pr-8">
          {task.content}
        </p>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-black/20 px-2 md:px-3 py-1.5 md:py-2 flex items-center justify-between bg-[#F8F8F8]">
        <span className={`font-mono text-[9px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 ${priority.badge}`}>
          {priority.label}
        </span>
        <span className="font-mono text-[9px] md:text-[10px] text-[#888] uppercase">
          {formatTime(task.createdAt)}
        </span>
      </div>

      {/* Delete button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}
        className="absolute top-1 right-1 md:top-2 md:right-2 w-5 h-5 md:w-6 md:h-6
                   border-2 border-black bg-white
                   opacity-0 group-hover:opacity-100
                   hover:bg-[#FF3300] hover:text-white hover:border-[#FF3300]
                   transition-all duration-100
                   font-mono text-xs md:text-sm font-bold
                   flex items-center justify-center"
        aria-label="Delete task"
      >
        X
      </button>
    </div>
  );
}
