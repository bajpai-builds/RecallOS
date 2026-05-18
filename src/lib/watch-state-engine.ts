export type WatchState = "SAVED" | "STARTED" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED"

export type WatchEvent =
  | "OPEN_VIDEO"
  | "EXPLICIT_COMPLETE"
  | "EXPLICIT_STILL_WATCHING"
  | "EXPLICIT_SAVE_FOR_LATER"
  | "EXPLICIT_ARCHIVE"

export interface VideoStateFields {
  status: string
  startedAt: Date | null
  lastOpenedAt: Date | null
  openCount: number
  completedAt: Date | null
  archivedAt: Date | null
  manuallyCompleted: boolean
  inferredCompletionConfidence: number
}

/**
 * Reusable watch lifecycle state machine engine.
 * Takes the current video fields and the triggered event,
 * and returns the computed next fields according to strict transition rules.
 */
export function transitionWatchState(
  current: VideoStateFields,
  event: WatchEvent
): VideoStateFields {
  // Create a clean shallow copy of fields to mutate safely
  const next = { ...current }

  switch (event) {
    case "OPEN_VIDEO":
      next.openCount = current.openCount + 1
      next.lastOpenedAt = new Date()

      // Transition rules on video opened
      if (current.status === "SAVED") {
        next.status = "STARTED"
        next.startedAt = new Date()
      } else if (current.status === "STARTED" && next.openCount >= 2) {
        // If they open it multiple times, transition to IN_PROGRESS (Continue Watching)
        next.status = "IN_PROGRESS"
      } else if (current.status === "IN_PROGRESS") {
        // Soft behavioral inference: increment completion confidence on repeated openings
        next.inferredCompletionConfidence = Math.min(
          0.9,
          current.inferredCompletionConfidence + 0.15
        )
      }
      break

    case "EXPLICIT_COMPLETE":
      next.status = "COMPLETED"
      next.completedAt = new Date()
      next.manuallyCompleted = true
      next.inferredCompletionConfidence = 1.0
      break

    case "EXPLICIT_STILL_WATCHING":
      next.status = "IN_PROGRESS"
      // Soft behavioral inference: set a base confidence of 30% if they state they are still watching
      next.inferredCompletionConfidence = Math.max(
        0.3,
        current.inferredCompletionConfidence
      )
      break

    case "EXPLICIT_SAVE_FOR_LATER":
      next.status = "SAVED"
      next.startedAt = null
      next.lastOpenedAt = null
      next.openCount = 0
      next.completedAt = null
      next.manuallyCompleted = false
      next.inferredCompletionConfidence = 0.0
      break

    case "EXPLICIT_ARCHIVE":
      next.status = "ARCHIVED"
      next.archivedAt = new Date()
      break

    default:
      throw new Error(`Unhandled WatchEvent triggered: ${event}`)
  }

  return next
}
