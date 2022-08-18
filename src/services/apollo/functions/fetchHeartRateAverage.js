//get query heartRates from heartRates.js
import  createClient from '../apolloClient';
import HEART_RATE_AVERAGE_QUERY from "../queries/heartRateAverage";

const fetchHeartRateAverage = async (start, stop,utcOffset) => {
  const client = await createClient();
  try {
    const result = await client.query({
      query: HEART_RATE_AVERAGE_QUERY,
      variables: 
      {
        start: parseFloat(start),
        stop: parseFloat(stop),
        utcOffset: utcOffset
      }
    });
    const { data } = result;
    const {heartRateAverage} = data;
    return data;
  } catch (error) {
    throw error;
  }
}

export default fetchHeartRateAverage;