/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion {
    onCreateQuestion {
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
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion {
    onUpdateQuestion {
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
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion {
    onDeleteQuestion {
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
export const onCreateStudent = /* GraphQL */ `
  subscription OnCreateStudent {
    onCreateStudent {
      id
      answered_questions
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateStudent = /* GraphQL */ `
  subscription OnUpdateStudent {
    onUpdateStudent {
      id
      answered_questions
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteStudent = /* GraphQL */ `
  subscription OnDeleteStudent {
    onDeleteStudent {
      id
      answered_questions
      createdAt
      updatedAt
    }
  }
`;
export const onCreateContentFiles = /* GraphQL */ `
  subscription OnCreateContentFiles {
    onCreateContentFiles {
      url
      S3_URL
      title
      lastUpdateUser
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateContentFiles = /* GraphQL */ `
  subscription OnUpdateContentFiles {
    onUpdateContentFiles {
      url
      S3_URL
      title
      lastUpdateUser
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteContentFiles = /* GraphQL */ `
  subscription OnDeleteContentFiles {
    onDeleteContentFiles {
      url
      S3_URL
      title
      lastUpdateUser
      createdAt
      updatedAt
    }
  }
`;
