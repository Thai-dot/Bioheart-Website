//get query heartRates from heartRates.js
import  createClient from '../apolloClient';
import HEARTRATES_QUERY from "../queries/heartRates";

const fetchHeartRates = async (myInput) => {
  const client = await createClient();
  try {
    const result = await client.query({
      query: HEARTRATES_QUERY,
      variables: 
      {
        input: myInput
      }
    });
    const { data } = result;
    const {heartRates} = data;
    return heartRates;
  } catch (error) {
    throw error;
  }
}

export default fetchHeartRates;