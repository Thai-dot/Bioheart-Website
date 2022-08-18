import gql from 'graphql-tag';

const HEARTRATES_QUERY = gql`
  query heartRates($input: HeartRatesFilter!){
    heartRates(filter: $input) {
      avgs{
        time
        value
      }
      maxs
      {
        time
        value
      }
      mins{
        time  
        value
      }
      endTime
      fromTime
    }
  }
`;

export default HEARTRATES_QUERY;