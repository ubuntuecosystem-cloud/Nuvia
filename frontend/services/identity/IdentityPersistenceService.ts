import { supabase } from "@/lib/supabase";


class IdentityPersistenceService {

  async ensureIdentity(
    userId: string
  ) {

    const {
      data,
      error,
    } = await supabase
      .from("identities")
      .select("id")
      .eq("id", userId)
      .maybeSingle();


    if (error) {
      throw error;
    }


    if (data) {
      return data;
    }


    const {
      data: created,
      error: createError,
    } =
      await supabase
        .from("identities")
        .insert({
          id: userId,
        })
        .select()
        .single();


    if (createError) {
      throw createError;
    }


    return created;
  }
}


export const identityPersistenceService =
  new IdentityPersistenceService();
