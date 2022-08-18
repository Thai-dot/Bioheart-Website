//get query heartRates from heartRates.js
import  createClient from '../apolloClient';
import NEAREST_TIME_HAS_ACTIVITY_QUERY from "../queries/nearestTimeHasActivity";

const fetchNearestTimeHasActivity = async (utcOffset) => {
  const client = await createClient();
  try {
    const result = await client.query({
      query: NEAREST_TIME_HAS_ACTIVITY_QUERY,
      variables: 
      {
        utcOffset
      }
    });
    const { data } = result;
    const {nearestTimeHasActivity} = data;
    return nearestTimeHasActivity;
  } catch (error) {
    throw error;
  }
}

export default fetchNearestTimeHasActivity;