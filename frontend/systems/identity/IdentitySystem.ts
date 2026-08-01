export type IdentityStatus =
  | "initializing"
  | "ready";

class IdentitySystem {
  private status: IdentityStatus = "initializing";

  initialize() {
    this.status = "ready";
  }

  getStatus(): IdentityStatus {
    return this.status;
  }
}

export const identitySystem = new IdentitySystem();
