import { useState } from 'react';
import { Task } from '../types';

interface AddTaskFormProps {
  onAdd: (content: string, priority: Task['priority']) => void;
  onCancel: () => void;
}

export function AddTaskForm({ onAdd, onCancel }: AddTaskFormProps) {
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onAdd(content.trim(), priority);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 md:space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="ENTER TASK..."
        className="w-full font-mono text-xs md:text-sm p-2 md:p-3 border-2 border-black
                   bg-white resize-none focus:outline-none focus:ring-2 focus:ring-[#FFE500]
                   placeholder:text-[#AAA] min-h-[60px] md:min-h-[80px]"
        autoFocus
      />

      {/* Priority selector */}
      <div className="flex gap-1 md:gap-2">
        {(['low', 'medium', 'high'] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPriority(p)}
            className={`flex-1 font-mono text-[10px] md:text-xs uppercase py-2 md:py-2.5
                       border-2 border-black transition-all duration-100
                       ${priority === p
                         ? p === 'high'
                           ? 'bg-[#FF3300] text-white'
                           : p === 'medium'
                             ? 'bg-[#FFE500] text-black'
                             : 'bg-[#888] text-white'
                         : 'bg-white hover:bg-[#F0F0F0]'
                       }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 font-mono text-xs uppercase py-2 md:py-3
                     border-2 border-black bg-white hover:bg-[#F0F0F0]
                     transition-all duration-100"
        >
          CANCEL
        </button>
        <button
          type="submit"
          disabled={!content.trim()}
          className="flex-1 font-mono text-xs uppercase py-2 md:py-3
                     border-2 border-black bg-black text-white
                     hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-100"
        >
          CREATE
        </button>
      </div>
    </form>
  );
}
