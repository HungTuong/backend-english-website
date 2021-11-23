export const listContentFiless = /* GraphQL */ `
  query ListContentFiless(
    $url: String
    $filter: ModelContentFilesFilterInput
    $limit: Int
  ) {
    listContentFiless(
      url: $url
      filter: $filter
      limit: $limit
    ) {
      items {
        url
        title
        lastUpdateUser
        updatedAt
      }
    }
  }
`;