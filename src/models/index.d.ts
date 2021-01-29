import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum MessageState {
  D = "D",
  U = "U",
  R = "R",
  E = "E"
}



export declare class Message {
  readonly id: string;
  readonly inboxId?: string;
  readonly senderSub: string;
  readonly recipientSub: string;
  readonly createdAt: string;
  readonly s: MessageState | keyof typeof MessageState;
  readonly t: string;
  constructor(init: ModelInit<Message>);
  static copyOf(source: Message, mutator: (draft: MutableModel<Message>) => MutableModel<Message> | void): Message;
}