export type IdentityCreatedEvent = {
  type: "identity.created";

  identityId: string;

  occurredAt: string;
};


export type IdentityAuthenticatedEvent = {
  type: "identity.authenticated";

  identityId: string;

  occurredAt: string;
};


export type IdentityEvent =
  | IdentityCreatedEvent
  | IdentityAuthenticatedEvent;
