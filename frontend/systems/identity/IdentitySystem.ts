import { supabase } from "@/lib/supabase";
import { profileIdentitySystem } from "./ProfileIdentitySystem";

export type IdentityStatus =
  | "initializing"
  | "ready";

export type SessionStatus =
  | "authenticated"
  | "unauthenticated";

class IdentitySystem {
  private status: IdentityStatus =
    "initializing";

  private sessionStatus: SessionStatus =
    "unauthenticated";

  private userId: string | null = null;

  async initialize() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    this.updateSession(session);

    supabase.auth.onAuthStateChange(
      (_event, session) => {
        this.updateSession(session);
      }
    );

    this.status = "ready";
  }

  private updateSession(session: any) {
    if (session?.user) {
      this.sessionStatus =
        "authenticated";

      this.userId =
        session.user.id;

      profileIdentitySystem.connect(
        session.user.id
      );
    } else {
      this.sessionStatus =
        "unauthenticated";

      this.userId = null;

      profileIdentitySystem.disconnect();
    }
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
