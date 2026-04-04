import { ColumnId } from "@/types";

const DELAY = 1500;
const FAIL_RATE = 0.2; // 20% fail rate as per requirements

export const updateTaskOnServer = async (
  taskId: string,
  newColumnId: ColumnId
): Promise<{ success: boolean; taskId: string; newColumnId: ColumnId }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isFailed = Math.random() < FAIL_RATE;
      if (isFailed) {
        reject(new Error(`Server error: Unable to move task ${taskId}.`));
      } else {
        resolve({ success: true, taskId, newColumnId });
      }
    }, DELAY);
  });
};
