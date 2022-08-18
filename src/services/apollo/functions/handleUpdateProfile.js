import createClient from '../apolloClient';
import UPDATEPROFILE_MUTATION from '../mutations/updateProfile';

const handleUpdateProfile = async (myInput) => {
  const client = await createClient();
  try {
   
    const result = await client.mutate({
      mutation: UPDATEPROFILE_MUTATION,
      variables: 
      {
        input: myInput
      }
    });
    console.log("i'm reached here")
    const { data } = result;

    return data;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export default handleUpdateProfile;