/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
      id
      question
      choices
      correct
      question_type
      question_difficulty
      note
      createdAt
      updatedAt
    }
  }
`;
export const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        question
        choices
        correct
        question_type
        question_difficulty
        note
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStudent = /* GraphQL */ `
  query GetStudent($id: ID!) {
    getStudent(id: $id) {
      id
      answered_questions
      createdAt
      updatedAt
    }
  }
`;
export const listStudents = /* GraphQL */ `
  query ListStudents(
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        answered_questions
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getContentFiles = /* GraphQL */ `
  query GetContentFiles($url: String!) {
    getContentFiles(url: $url) {
      url
      S3_URL
      title
      lastUpdateUser
      createdAt
      updatedAt
    }
  }
`;
export const listContentFiless = /* GraphQL */ `
  query ListContentFiless(
    $url: String
    $filter: ModelContentFilesFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listContentFiless(
      url: $url
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        url
        S3_URL
        title
        lastUpdateUser
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
