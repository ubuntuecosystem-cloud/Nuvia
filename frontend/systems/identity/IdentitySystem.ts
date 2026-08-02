import { supabase } from "@/lib/supabase";

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

  private initialized = false;

  private authSubscription:
    | { unsubscribe: () => void }
    | null = null;

  async initialize() {
    if (this.initialized) {
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    this.updateSession(session);

    const {
      data: { subscription },
    } =
      supabase.auth.onAuthStateChange(
        (_event, session) => {
          this.updateSession(session);
        }
      );

    this.authSubscription = subscription;

    this.status = "ready";
    this.initialized = true;
  }

  private updateSession(session: any) {
    if (session?.user) {
      this.sessionStatus =
        "authenticated";

      this.userId =
        session.user.id;

      return;
    }

    this.sessionStatus =
      "unauthenticated";

    this.userId = null;
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

  destroy() {
    this.authSubscription?.unsubscribe();

    this.authSubscription = null;
    this.initialized = false;

    this.status = "initializing";

    this.sessionStatus =
      "unauthenticated";

    this.userId = null;
  }
}

export const identitySystem =
  new IdentitySystem();
