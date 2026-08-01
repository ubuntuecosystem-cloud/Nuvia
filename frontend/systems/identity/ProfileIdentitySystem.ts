export type ProfileIdentityStatus =
  | "uninitialized"
  | "connected";

class ProfileIdentitySystem {
  private status: ProfileIdentityStatus =
    "uninitialized";

  private authenticatedUserId: string | null =
    null;

  connect(userId: string) {
    this.authenticatedUserId = userId;
    this.status = "connected";
  }

  disconnect() {
    this.authenticatedUserId = null;
    this.status = "uninitialized";
  }

  getStatus(): ProfileIdentityStatus {
    return this.status;
  }

  getUserId(): string | null {
    return this.authenticatedUserId;
  }
}

export const profileIdentitySystem =
  new ProfileIdentitySystem();
