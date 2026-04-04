"use client";

import React from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Column, Task } from "@/types";
import { TaskCard } from "./TaskCard";
import { MoreHorizontal, Plus } from "lucide-react";

interface ColumnContainerProps {
  column: Column;
  tasks: Task[];
}

export const ColumnContainer: React.FC<ColumnContainerProps> = ({ column, tasks }) => {
  return (
    <div className="flex flex-col h-full min-h-[500px] w-full max-w-[350px]">
      <div className="flex items-center justify-between px-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-purple shadow-[0_0_8px_var(--accent-purple)]" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-white/60">
            {column.title}
          </h2>
          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-white/50 font-mono">
            {tasks.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-white/5 rounded-md transition-colors text-white/30 hover:text-white/70">
            <Plus size={16} />
          </button>
          <button className="p-1.5 hover:bg-white/5 rounded-md transition-colors text-white/30 hover:text-white/70">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-2 bg-white/[0.02] rounded-xl border border-white/[0.05]">
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-1 min-h-[100px]">
             {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};
