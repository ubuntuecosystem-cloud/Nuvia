import type { Entity } from "../ontology/Entity";


export type IdentityRecord = Entity & {
  type: "identity";

  personId: string;
};
