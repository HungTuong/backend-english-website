/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
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
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
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
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
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
export const createStudent = /* GraphQL */ `
  mutation CreateStudent(
    $input: CreateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    createStudent(input: $input, condition: $condition) {
      id
      answered_questions
      createdAt
      updatedAt
    }
  }
`;
export const updateStudent = /* GraphQL */ `
  mutation UpdateStudent(
    $input: UpdateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    updateStudent(input: $input, condition: $condition) {
      id
      answered_questions
      createdAt
      updatedAt
    }
  }
`;
export const deleteStudent = /* GraphQL */ `
  mutation DeleteStudent(
    $input: DeleteStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    deleteStudent(input: $input, condition: $condition) {
      id
      answered_questions
      createdAt
      updatedAt
    }
  }
`;
export const createContentFiles = /* GraphQL */ `
  mutation CreateContentFiles(
    $input: CreateContentFilesInput!
    $condition: ModelContentFilesConditionInput
  ) {
    createContentFiles(input: $input, condition: $condition) {
      url
      S3_URL
      title
      lastUpdateUser
      createdAt
      updatedAt
    }
  }
`;
export const updateContentFiles = /* GraphQL */ `
  mutation UpdateContentFiles(
    $input: UpdateContentFilesInput!
    $condition: ModelContentFilesConditionInput
  ) {
    updateContentFiles(input: $input, condition: $condition) {
      url
      S3_URL
      title
      lastUpdateUser
      createdAt
      updatedAt
    }
  }
`;
export const deleteContentFiles = /* GraphQL */ `
  mutation DeleteContentFiles(
    $input: DeleteContentFilesInput!
    $condition: ModelContentFilesConditionInput
  ) {
    deleteContentFiles(input: $input, condition: $condition) {
      url
      S3_URL
      title
      lastUpdateUser
      createdAt
      updatedAt
    }
  }
`;
