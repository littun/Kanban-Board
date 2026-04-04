"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/types";
import { Clock, GripVertical } from "lucide-react";
import { motion } from "framer-motion";

interface TaskCardProps {
  task: Task;
}

const PriorityBadge = ({ priority }: { priority: Task["priority"] }) => {
  const colors = {
    high: "bg-red-500/20 text-red-400 border-red-500/30",
    medium: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    low: "bg-green-500/20 text-green-400 border-green-500/30",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold border ${colors[priority]}`}
    >
      {priority}
    </span>
  );
};

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="glass-morphism h-[110px] border-2 border-accent-purple/50 opacity-40 mb-4"
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      layout
      ref={setNodeRef}
      style={style}
      className="task-card glass-morphism p-4 group cursor-grab active:cursor-grabbing mb-4 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-accent-purple/30 to-transparent" />
      
      <div className="flex justify-between items-start mb-2">
        <PriorityBadge priority={task.priority} />
        <div {...attributes} {...listeners} className="opacity-0 group-hover:opacity-50 transition-opacity">
          <GripVertical size={16} />
        </div>
      </div>

      <h3 className="text-sm font-semibold text-white/90 mb-1 leading-tight">{task.title}</h3>
      <p className="text-xs text-white/50 line-clamp-2 leading-normal mb-3">{task.description}</p>

      <div className="flex items-center gap-1.5 text-[10px] text-white/40 uppercase font-medium">
        <Clock size={12} />
        <span>{new Date(task.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
      </div>
    </motion.div>
  );
};
