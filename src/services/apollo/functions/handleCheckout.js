import createClient from '../apolloClient';
import CHECKOUT_MUTATION from '../mutations/checkout';

const handleCheckout = async (autoRenew, billingInfo, priceId) => {
  const client = await createClient();
  try {
    const result = await client.mutate({
      mutation: CHECKOUT_MUTATION,
      variables: {
        autoRenew,
        billingInfo,
        priceId,
      },
    });
    const { data } = result;
    const { checkout } = data;
    return checkout;
  } catch (error) {
    throw error;
  }
};

export default handleCheckout;
