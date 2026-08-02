import { supabase } from "@/lib/supabase";


export type RelationshipState =
  | "initiated"
  | "active"
  | "inactive"
  | "ended";


export type RelationshipRecord = {

  id: string;

  from_person_id: string;

  to_person_id: string;

  state: RelationshipState;

  created_at: string;

};



class RelationshipPersistenceService {


  async createRelationship(
    fromPersonId: string,
    toPersonId: string
  ) {


    const {
      data,
      error,
    } =
      await supabase
        .from("relationships")
        .insert({

          from_person_id:
            fromPersonId,

          to_person_id:
            toPersonId,

        })
        .select()
        .single();



    if (error) {

      throw error;

    }


    return data;

  }



  async getRelationships(
    personId: string
  ) {


    const {
      data,
      error,
    } =
      await supabase
        .from("relationships")
        .select("*")
        .or(
          `from_person_id.eq.${personId},to_person_id.eq.${personId}`
        );


    if (error) {

      throw error;

    }


    return data ?? [];

  }



  async updateState(
    relationshipId: string,
    state: RelationshipState
  ) {


    const {
      data,
      error,
    } =
      await supabase
        .from("relationships")
        .update({
          state,
        })
        .eq(
          "id",
          relationshipId
        )
        .select()
        .single();



    if (error) {

      throw error;

    }


    return data;

  }

}



export const relationshipPersistenceService =
  new RelationshipPersistenceService();
