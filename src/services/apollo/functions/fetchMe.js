//get query Me from me.js
import  createClient from '../apolloClient';
import ME_QUERY from '../queries/me';

const fetchMe = async () => {
  const client = await createClient();
  try {
    const result = await client.query({
      query: ME_QUERY,
    });
    const { data } = result;
    const { me } = data;
    return me;
  } catch (error) {
    throw error;
  }
}

export default fetchMe;
