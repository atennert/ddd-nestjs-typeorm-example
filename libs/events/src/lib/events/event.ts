export abstract class Event {
  abstract id: string;
  occurredAt = new Date();
}
