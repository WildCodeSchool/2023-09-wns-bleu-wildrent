import gql from 'graphql-tag';

export default gql`
  query allCategories {
    allCategories {
      id
      name
      description
      image
    }
  }
`;
