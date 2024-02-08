import gql from 'graphql-tag';

export default gql`
  query CategoryById($categoryId: Int!) {
    categoryById(categoryId: $categoryId) {
      id
      name
      description
      image
    }
  }
`;
