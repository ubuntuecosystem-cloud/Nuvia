export type SystemEventSource =
  | "authentication"
  | "identity"
  | "relationship"
  | "contribution"
  | "community";


export type SystemEvent = {
  id: string;

  source: SystemEventSource;

  actorId: string | null;

  occurredAt: string;

  type: string;

  metadata?: Record<string, unknown>;
};
