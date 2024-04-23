export class userCreateEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string
  ) {}
}
