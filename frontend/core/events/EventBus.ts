export type EventHandler<T> =
  (event: T) => void;

class EventBus {

  private handlers =
    new Map<
      string,
      EventHandler<unknown>[]
    >();

  subscribe<T>(
    eventType: string,
    handler: EventHandler<T>
  ) {

    const handlers =
      this.handlers.get(
        eventType
      ) ?? [];

    handlers.push(
      handler as EventHandler<unknown>
    );

    this.handlers.set(
      eventType,
      handlers
    );
  }

  unsubscribe<T>(
    eventType: string,
    handler: EventHandler<T>
  ) {

    const handlers =
      this.handlers.get(
        eventType
      );

    if (!handlers) {
      return;
    }

    this.handlers.set(
      eventType,
      handlers.filter(
        existing =>
          existing !==
          (handler as EventHandler<unknown>)
      )
    );
  }

  publish<T>(
    eventType: string,
    event: T
  ) {

    const handlers =
      this.handlers.get(
        eventType
      );

    if (!handlers) {
      return;
    }

    handlers.forEach(
      handler =>
        handler(event)
    );
  }
}

export const eventBus =
  new EventBus();
