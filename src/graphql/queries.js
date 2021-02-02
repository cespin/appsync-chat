/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!, $createdAt: AWSDateTime!) {
    getMessage(id: $id, createdAt: $createdAt) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $id: ID
    $createdAt: ModelStringKeyConditionInput
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMessages(
      id: $id
      createdAt: $createdAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const messagesByInbox = /* GraphQL */ `
  query MessagesByInbox(
    $inboxId: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByInbox(
      inboxId: $inboxId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
