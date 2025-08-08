// Entities
import { Message } from "src/entities/message";

export class Notification {
  async send(messages: Message[]) {
    for (const message of messages) {
      console.log(`${message.to}: ${message.subject} - ${message.content}`);
    }
  }
}
