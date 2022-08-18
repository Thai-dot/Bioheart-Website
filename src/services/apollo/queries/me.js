import gql from 'graphql-tag';

const ME_QUERY = gql`
  query me{
    me {
      _id
      address {
        address
      }
      dateOfBirth
      email
      firstName
      lastName
      gender
      height
      weight
      role
      isProfileCompleted
    }
  }
`;

export default ME_QUERY;
