export type Priority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type WatchState = "SAVED" | "STARTED" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED" | string;

export interface Category {
  id: string;
  userId: string;
  name: string;
  slug: string;
  color: string;
  createdAt: Date | string;
  _count?: {
    videos: number;
  };
}

export interface Video {
  id: string;
  userId: string;
  youtubeId: string;
  url: string;
  title: string;
  channelName: string;
  thumbnailUrl: string | null;
  duration: number | null;
  status: WatchState;
  priority: Priority | string;
  progress: number | null;
  startedAt: Date | string | null;
  lastOpenedAt: Date | string | null;
  openCount: number;
  archivedAt: Date | string | null;
  manuallyCompleted: boolean;
  inferredCompletionConfidence: number;
  categoryId: string | null;
  completedAt: Date | string | null;
  lastViewedAt: Date | string | null;
  description: string | null;
  youtubeCategoryId: string | null;
  tags: string[];
  categoryConfidence: number | null;
  isCategoryOverridden: boolean;
  classificationSignals: string | null;
  lastResurfaced: Date | string | null;
  reminderDate: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  category?: Category | null;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  autoSync: boolean;
}

export interface SyncStatus {
  active: boolean;
  count: number;
  lastSyncAt: Date | string | null;
  error?: string | null;
}
