import gql from 'graphql-tag';

const UPDATEPROFILE_MUTATION = gql`
  mutation updateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      isSuccess
      message
      profile{
        _id
        isProfileCompleted
      }
    }
  }
`;

export default UPDATEPROFILE_MUTATION;