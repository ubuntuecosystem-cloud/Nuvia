import type {
  SystemEvent,
  SystemEventSource,
} from "./SystemEvent";


export function createSystemEvent(
  source: SystemEventSource,
  type: string,
  actorId: string | null,
  metadata?: Record<string, unknown>
): SystemEvent {

  return {
    id: crypto.randomUUID(),

    source,

    actorId,

    occurredAt:
      new Date().toISOString(),

    type,

    metadata,
  };
}
