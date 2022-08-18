import gql from 'graphql-tag';

const HEART_RATE_AVERAGE_QUERY = gql`
  query heartRateAverage($start: Float!, $stop: Float!,$utcOffset: Int){
    heartRateAverage(start: $start, stop: $stop, utcOffset: $utcOffset) {
      hrv
      resting
      ceiledActiveMinutes{
        duration
        time
      }
      activity

    }
  }
`;

export default HEART_RATE_AVERAGE_QUERY;