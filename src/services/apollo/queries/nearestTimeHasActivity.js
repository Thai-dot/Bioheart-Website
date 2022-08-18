import gql from 'graphql-tag';

const NEAREST_TIME_HAS_ACTIVITY_QUERY = gql`
  query nearestTimeHasActivity($utcOffset: Int){
    nearestTimeHasActivity(utcOffset: $utcOffset) {
      isSuccess
      time
    }
  }
`;

export default NEAREST_TIME_HAS_ACTIVITY_QUERY;