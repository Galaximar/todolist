import { ErrorResponse, SuccessResponse, Task } from "@/api/types";
import fetchService from "@/utils/fetchService";

const getTasks = async () => {
  try {
    const res: Task[] = await fetchService.get("/tasks");
    const pending: Task[] = [];
    const completed: Task[] = [];
    res.forEach((task) => {
      if (task.completed) {
        completed.push(task);
      } else {
        pending.push(task);
      }
    });

    const response: SuccessResponse<{ completed: Task[]; pending: Task[] }> = {
      success: true,
      data: { completed, pending },
    };
    return response;
  } catch {
    const error: ErrorResponse = {
      success: false,
    };
    return error;
  }
};
const createTask = async (task: Task) => {
  try {
    const data: Task = await fetchService.post("/tasks", task);

    return { success: true, data };
  } catch {
    const error: ErrorResponse = {
      success: false,
    };
    return error;
  }
};
const updateTask = async (task: Task) => {
  try {
    const data: Task = await fetchService.put(`/tasks/${task.id}`, task);

    return { success: true, data };
  } catch {
    const error: ErrorResponse = {
      success: false,
    };
    return error;
  }
};
export { getTasks, createTask, updateTask };
