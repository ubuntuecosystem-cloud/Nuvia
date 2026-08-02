import {
  eventBus,
} from "@/core/events/EventBus";

import {
  eventStore,
} from "@/core/events/EventStore";

import type {
  SystemEvent,
} from "@/core/events/SystemEvent";


class IdentityEventService {


  recordIdentityEvent(
    event: SystemEvent
  ) {

    eventStore.append(
      event
    );


    eventBus.publish(
      event.type,
      event
    );

  }

}


export const identityEventService =
  new IdentityEventService();
