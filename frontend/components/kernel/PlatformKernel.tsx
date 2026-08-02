"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  identitySystem,
} from "@/systems/identity/IdentitySystem";


type PlatformState =
  | "initializing"
  | "ready"
  | "error";


type PlatformContextType = {
  state: PlatformState;
  userId: string | null;
  authenticated: boolean;
};


const PlatformContext =
  createContext<PlatformContextType>({
    state: "initializing",
    userId: null,
    authenticated: false,
  });



export function PlatformKernel({
  children,
}: {
  children: React.ReactNode;
}) {

  const [state, setState] =
    useState<PlatformState>(
      "initializing"
    );


  const [userId, setUserId] =
    useState<string | null>(
      null
    );


  const [authenticated, setAuthenticated] =
    useState(false);



  useEffect(() => {

    async function boot() {

      try {

        await identitySystem.initialize();


        function syncIdentity() {

          const currentUserId =
            identitySystem.getUserId();


          const sessionStatus =
            identitySystem.getSessionStatus();


          setUserId(
            currentUserId
          );


          setAuthenticated(
            sessionStatus ===
            "authenticated"
          );

        }


        syncIdentity();


        const interval =
          setInterval(
            syncIdentity,
            500
          );


        setState(
          "ready"
        );


        return () => {
          clearInterval(interval);
        };


      } catch (error) {

        console.error(
          "Platform initialization failed:",
          error
        );


        setState(
          "error"
        );

      }

    }


    boot();

  }, []);



  return (

    <PlatformContext.Provider
      value={{
        state,
        userId,
        authenticated,
      }}
    >

      {children}

    </PlatformContext.Provider>

  );

}



export function usePlatformState() {

  return useContext(
    PlatformContext
  );

}
