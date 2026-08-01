import { supabase } from "@/lib/supabase";

class AuthenticationService {
  async createAccount(
    email: string,
    password: string
  ) {
    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    if (error) {
      throw error;
    }

    return data;
  }

  async signIn(
    email: string,
    password: string
  ) {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      throw error;
    }

    return data;
  }

  async signOut() {
    const { error } =
      await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }

  async requestPasswordReset(
    email: string
  ) {
    const { data, error } =
      await supabase.auth.resetPasswordForEmail(
        email
      );

    if (error) {
      throw error;
    }

    return data;
  }

  async updatePassword(
    password: string
  ) {
    const { data, error } =
      await supabase.auth.updateUser({
        password,
      });

    if (error) {
      throw error;
    }

    return data;
  }

  async getSession() {
    const { data, error } =
      await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return data.session;
  }
}

export const authenticationService =
  new AuthenticationService();
