export type RelationshipId =
  string;


export type RelationshipState =
  | "initiated"
  | "active"
  | "inactive"
  | "ended";


export type Relationship = {

  id: RelationshipId;

  fromPersonId: string;

  toPersonId: string;

  state: RelationshipState;

  createdAt: string;

};
