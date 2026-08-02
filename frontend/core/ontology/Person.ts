export type PersonId = string;


export type PersonState =
  | "active"
  | "inactive";


export type Person = {

  id: PersonId;

  identityId: string;

  state: PersonState;

  createdAt: string;

};
