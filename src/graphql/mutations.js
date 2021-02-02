/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const sendMessage = /* GraphQL */ `
  mutation SendMessage($text: String!, $recipientSub: String!) {
    sendMessage(text: $text, recipientSub: $recipientSub) {
      id
      inboxId
      senderSub
      recipientSub
      owner
      createdAt
      s
      t
      updatedAt
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      inboxId
      senderSub
      recipientSub
      owner
      createdAt
      s
      t
      updatedAt
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      inboxId
      senderSub
      recipientSub
      owner
      createdAt
      s
      t
      updatedAt
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      inboxId
      senderSub
      recipientSub
      owner
      createdAt
      s
      t
      updatedAt
    }
  }
`;
