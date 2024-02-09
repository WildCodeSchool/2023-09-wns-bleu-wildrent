import gql from 'graphql-tag';

export default gql`
  query Categories {
    categories {
      id
      name
      description
      image
    }
  }
`;
