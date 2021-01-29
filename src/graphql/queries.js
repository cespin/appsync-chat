/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncMessages = /* GraphQL */ `
  query SyncMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMessages(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!, $recipientSub: String!, $createdAt: AWSDateTime!) {
    getMessage(id: $id, recipientSub: $recipientSub, createdAt: $createdAt) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $id: ID
    $recipientSubCreatedAt: ModelMessagePrimaryCompositeKeyConditionInput
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMessages(
      id: $id
      recipientSubCreatedAt: $recipientSubCreatedAt
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
        createdAt
        s
        t
        _version
        _deleted
        _lastChangedAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
