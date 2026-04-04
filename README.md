# 🌊 KanbanFlow | Frontend Assignment

A premium, high-performance Kanban board built with **Next.js 15**, **React**, and **dnd-kit**. This application demonstrates **Optimistic UI Updates** and **State Rollback Logic** in a mission-critical environment.

## 🚀 Features

- **Optimistic UI:** Tasks move instantly on drag-and-drop, providing a latency-free experience.
- **Robust Rollback Engine:** Uses a "Snapshot & Revert" pattern. If the mock API fails (20% probability), the task seamlessly snaps back to its original position with a detailed error toast.
- **Premium Aesthetics:** Zero-config Vanilla CSS glassmorphism, dark mode, and Framer Motion micro-animations.
- **Mock API Simulation:** Built-in 1.5s network delay and random failure generator to test real-world edge cases.

## 🛠 Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **State & DND:** [@dnd-kit](https://dnd-kit.com/) for drag-and-drop.
- **Animations:** [Framer Motion](https://www.framer.com/motion/) for layout transitions.
- **Icons:** [Lucide React](https://lucide.dev/) for consistent UI language.
- **Notifications:** [Sonner](https://sonner.stevenly.me/) for elegant status updates.

## 📁 Project Structure

```text
src/
├── app/               # Next.js App Router (Layout & Home)
├── components/        # KanbanBoard, Column, TaskCard
├── services/          # Mock API Engine (1.5s delay, 20% fail rate)
├── types/             # TypeScript interfaces and Column/Task schemas
└── lib/               # Mock data seeds
```

## ⚙️ How to Run Locally

1. **Clone the project**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## 🧠 Core Logic Explained: Optimistic Updates

1. **Snapshot:** Before any movement is applied, a deep copy of the current state (`tasksSnapshot.current`) is captured using a `useRef`.
2. **Instant Update:** The `onDragOver` and `onDragEnd` handlers update the local state immediately, allowing the task to transition visually without waiting for the server.
3. **Async Verification:** The `updateTaskOnServer` mock function is triggered.
4. **Conflict Resolution:** 
   - **Success:** The promise resolves, and the "Saving..." toast turns green.
   - **Failure (20% Chance):** The catch block is triggered, the `tasks` state is reverted to the `tasksSnapshot.current`, and a red error toast explains the failure.

---
Built by Antigravity AI.
