import { supabase } from "@/lib/supabase";

import {
  profileIdentitySystem,
} from "./ProfileIdentitySystem";

import {
  identityPersistenceService,
} from "@/services/identity/IdentityPersistenceService";

import {
  personPersistenceService,
} from "@/services/person/PersonPersistenceService";


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


  private userId: string | null =
    null;


  private initialized =
    false;


  private authSubscription:
    | {
        unsubscribe: () => void;
      }
    | null = null;



  async initialize() {

    if (this.initialized) {
      return;
    }


    const {
      data: {
        session,
      },
    } =
      await supabase.auth.getSession();


    await this.updateSession(
      session
    );


    const {
      data: {
        subscription,
      },
    } =
      supabase.auth.onAuthStateChange(
        async (
          _event,
          session
        ) => {

          await this.updateSession(
            session
          );

        }
      );


    this.authSubscription =
      subscription;


    this.status =
      "ready";


    this.initialized =
      true;
  }



  private async updateSession(
    session: any
  ) {

    if (
      session?.user
    ) {

      const userId =
        session.user.id;


      await identityPersistenceService
        .ensureIdentity(
          userId
        );


      await personPersistenceService
        .ensurePerson(
          userId
        );


      this.sessionStatus =
        "authenticated";


      this.userId =
        userId;


      profileIdentitySystem.connect(
        userId
      );


      return;

    }



    this.sessionStatus =
      "unauthenticated";


    this.userId =
      null;


    profileIdentitySystem.disconnect();

  }



  getStatus():
    IdentityStatus {

    return this.status;

  }



  getSessionStatus():
    SessionStatus {

    return this.sessionStatus;

  }



  getUserId():
    string | null {

    return this.userId;

  }



  destroy() {

    this.authSubscription?.unsubscribe();


    this.authSubscription =
      null;


    this.initialized =
      false;


    this.status =
      "initializing";


    this.sessionStatus =
      "unauthenticated";


    this.userId =
      null;


    profileIdentitySystem.disconnect();

  }

}


export const identitySystem =
  new IdentitySystem();
