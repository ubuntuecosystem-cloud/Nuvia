import { supabase } from "@/lib/supabase";


class PersonPersistenceService {


  async ensurePerson(
    identityId: string
  ) {

    const {
      data,
      error,
    } =
      await supabase
        .from("persons")
        .select("*")
        .eq(
          "identity_id",
          identityId
        )
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
        .from("persons")
        .insert({
          identity_id:
            identityId,
        })
        .select()
        .single();


    if (createError) {
      throw createError;
    }


    return created;

  }


  async getPerson(
    identityId: string
  ) {

    const {
      data,
      error,
    } =
      await supabase
        .from("persons")
        .select("*")
        .eq(
          "identity_id",
          identityId
        )
        .maybeSingle();


    if (error) {
      throw error;
    }


    return data;

  }

}


export const personPersistenceService =
  new PersonPersistenceService();
