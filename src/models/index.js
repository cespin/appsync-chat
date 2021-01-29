// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const MessageState = {
  "D": "D",
  "U": "U",
  "R": "R",
  "E": "E"
};

const { Message } = initSchema(schema);

export {
  Message,
  MessageState
};