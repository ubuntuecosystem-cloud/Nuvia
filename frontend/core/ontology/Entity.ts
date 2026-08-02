export type EntityType =
  | "person"
  | "identity"
  | "relationship"
  | "community"
  | "contribution"
  | "knowledge"
  | "event";


export type Entity = {
  id: string;

  type: EntityType;

  createdAt: string;

  createdBy: string | null;

  metadata?: Record<string, unknown>;
};
