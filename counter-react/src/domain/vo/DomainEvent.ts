
interface DomainEvent{}
export class FetchStartEvent implements DomainEvent {
  constructor(public value: number) {}
}

export class FetchFinishEvent implements DomainEvent {
  constructor(public value: number) {}
}

export class FailEvent implements DomainEvent {
  constructor(public error: number) {}
}