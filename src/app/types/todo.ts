export class Todo {
  readonly createdAt: Date
  constructor (
    public text: string,
    public done: boolean = false
  ) {
    this.createdAt = new Date()
  }
}
