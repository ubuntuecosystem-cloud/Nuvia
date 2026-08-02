import type {
  SystemEvent,
} from "./SystemEvent";


class EventStore {

  private events:
    SystemEvent[] = [];


  append(
    event: SystemEvent
  ) {

    this.events.push(
      event
    );
  }


  getAll():

  SystemEvent[] {

    return [
      ...this.events,
    ];
  }


  getByActor(
    actorId: string
  ):

  SystemEvent[] {

    return this.events.filter(
      event =>
        event.actorId === actorId
    );
  }


  clear() {

    this.events = [];
  }
}


export const eventStore =
  new EventStore();
