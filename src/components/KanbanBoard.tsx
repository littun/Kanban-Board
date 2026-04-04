"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { INITIAL_COLUMNS, INITIAL_TASKS, Task, ColumnId } from "@/types";
import { ColumnContainer } from "./ColumnContainer";
import { TaskCard } from "./TaskCard";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { updateTaskOnServer } from "@/services/api";

export const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  
  // Use a ref to store a snapshot of the tasks for rollback
  const tasksSnapshot = useRef<Task[]>(INITIAL_TASKS);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px movement before drag starts (to allow clicks)
      },
    })
  );

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      // Capture the snapshot before the move
      tasksSnapshot.current = [...tasks];
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Moving a task over another task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column" || INITIAL_COLUMNS.some(c => c.id === overId);

    // Moving a task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        tasks[activeIndex].columnId = overId as ColumnId;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as ColumnId;
    
    // Check if the task actually moved to a different column
    // The columns are already updated fundamentally by onDragOver for smoother UI
    const findActiveTask = tasks.find(t => t.id === activeId);
    if (!findActiveTask) return;

    const targetColumnId = findActiveTask.columnId;
    const originalTask = tasksSnapshot.current.find(t => t.id === activeId);

    if (originalTask && originalTask.columnId !== targetColumnId) {
        // PERFOM OPTIMISTIC API CALL
        try {
            toast.promise(updateTaskOnServer(activeId, targetColumnId), {
                loading: `Saving movement to ${targetColumnId}...`,
                success: 'Board updated successfully',
                error: (err) => {
                    // ROLLBACK logic
                    setTasks(tasksSnapshot.current);
                    return `Rollback: ${err.message}`;
                },
            });
        } catch (error) {
            console.error("Critical movement error:", error);
        }
    }
  };

  return (
    <div className="flex gap-8 overflow-x-auto pb-12 pt-8 px-4 justify-center min-h-[80vh]">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <div className="flex gap-8">
          {INITIAL_COLUMNS.map((col) => (
            <ColumnContainer
              key={col.id}
              column={col}
              tasks={tasks.filter((t) => t.columnId === col.id)}
            />
          ))}
        </div>

        {typeof document !== "undefined" &&
          createPortal(
            <DragOverlay dropAnimation={{
                sideEffects: defaultDropAnimationSideEffects({
                  styles: {
                    active: {
                      opacity: "0.5",
                    },
                  },
                }),
              }}>
              {activeTask ? <TaskCard task={activeTask} /> : null}
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </div>
  );
};
