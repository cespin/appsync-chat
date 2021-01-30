/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($owner: String!) {
    onCreateMessage(owner: $owner) {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($owner: String!) {
    onUpdateMessage(owner: $owner) {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($owner: String!) {
    onDeleteMessage(owner: $owner) {
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
