export class Todo {
  createdAt: Date
  constructor (
    public text: string,
    public done: boolean = false
  ) {
    this.createdAt = new Date()
  }

  isEqual(received: Todo) {
    const sameText = received.text === this.text
    const sameDone = received.done === this.done
    const receivedTime = new Date(received.createdAt).getTime()
    const thisTime = new Date(this.createdAt).getTime()
    const sameCreatedAt = receivedTime === thisTime
    return sameText && sameDone && sameCreatedAt
  }
}
