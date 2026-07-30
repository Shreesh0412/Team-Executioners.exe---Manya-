import api from "./axios";
import type {
  PlannerTask,
  PomodoroSession,
} from "../types";

/**
 * Get all planner tasks
 */
export async function getTasks(): Promise<PlannerTask[]> {
  const response = await api.get("/planner/tasks");
  return response.data;
}

/**
 * Create task
 */
export async function createTask(
  task: Omit<PlannerTask, "id">
): Promise<PlannerTask> {
  const response = await api.post(
    "/planner/tasks",
    task
  );

  return response.data;
}

/**
 * Update task
 */
export async function updateTask(
  id: number,
  task: Partial<PlannerTask>
): Promise<PlannerTask> {
  const response = await api.put(
    `/planner/tasks/${id}`,
    task
  );

  return response.data;
}

/**
 * Delete task
 */
export async function deleteTask(
  id: number
): Promise<void> {
  await api.delete(`/planner/tasks/${id}`);
}

/**
 * Save Pomodoro Session
 */
export async function savePomodoroSession(
  session: Omit<PomodoroSession, "id">
): Promise<PomodoroSession> {

  const response = await api.post(
    "/planner/pomodoro",
    session
  );

  return response.data;
}

/**
 * Get Pomodoro Sessions
 */
export async function getPomodoroSessions(): Promise<
  PomodoroSession[]
> {
  const response = await api.get(
    "/planner/pomodoro"
  );

  return response.data;
}