/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const sendMessage = /* GraphQL */ `
  mutation SendMessage($input: String!, $recipientSub: String!) {
    sendMessage(input: $input, recipientSub: $recipientSub)
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
      createdAt
      s
      t
      _version
      _deleted
      _lastChangedAt
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
      createdAt
      s
      t
      _version
      _deleted
      _lastChangedAt
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
      createdAt
      s
      t
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
