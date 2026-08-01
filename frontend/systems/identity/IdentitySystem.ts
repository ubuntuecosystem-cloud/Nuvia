import { supabase } from "@/lib/supabase";

export type IdentityStatus =
  | "initializing"
  | "ready";

export type SessionStatus =
  | "authenticated"
  | "unauthenticated";

class IdentitySystem {
  private status: IdentityStatus = "initializing";

  private sessionStatus: SessionStatus =
    "unauthenticated";

  private userId: string | null = null;

  async initialize() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      this.sessionStatus = "authenticated";
      this.userId = session.user.id;
    }

    supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          this.sessionStatus = "authenticated";
          this.userId = session.user.id;
        } else {
          this.sessionStatus = "unauthenticated";
          this.userId = null;
        }
      }
    );

    this.status = "ready";
  }

  getStatus(): IdentityStatus {
    return this.status;
  }

  getSessionStatus(): SessionStatus {
    return this.sessionStatus;
  }

  getUserId(): string | null {
    return this.userId;
  }
}

export const identitySystem =
  new IdentitySystem();
