import {
  ubuntuPrinciples,
} from "@/core/governance/UbuntuPrinciples";


export type ProfileIdentityStatus =
  | "uninitialized"
  | "connected"
  | "rejected";


class ProfileIdentitySystem {

  private status:
    ProfileIdentityStatus =
      "uninitialized";


  private authenticatedUserId:
    string | null =
      null;



  connect(
    userId: string
  ) {

    const allowed =
      ubuntuPrinciples.validateIdentityAction();


    if (!allowed) {

      this.status =
        "rejected";

      this.authenticatedUserId =
        null;

      return;
    }


    this.authenticatedUserId =
      userId;


    this.status =
      "connected";
  }



  disconnect() {

    this.authenticatedUserId =
      null;


    this.status =
      "uninitialized";
  }



  getStatus():
    ProfileIdentityStatus {

    return this.status;
  }



  getUserId():
    string | null {

    return this.authenticatedUserId;
  }



  isConnected():
    boolean {

    return (
      this.status ===
      "connected"
    );
  }
}


export const profileIdentitySystem =
  new ProfileIdentitySystem();
