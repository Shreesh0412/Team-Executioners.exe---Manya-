import api from "./axios";
import type { Notification } from "../types";

/**
 * Get Notifications
 */
export async function getNotifications(): Promise<
  Notification[]
> {

  const response = await api.get(
    "/notifications"
  );

  return response.data;
}

/**
 * Mark notification as read
 */
export async function markNotificationRead(
  id: number
): Promise<void> {

  await api.put(
    `/notifications/${id}/read`
  );
}

/**
 * Delete Notification
 */
export async function deleteNotification(
  id: number
): Promise<void> {

  await api.delete(
    `/notifications/${id}`
  );
}