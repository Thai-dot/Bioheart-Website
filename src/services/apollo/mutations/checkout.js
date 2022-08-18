import gql from 'graphql-tag';

const CHECKOUT_MUTATION = gql`
  mutation checkout($autoRenew: Boolean, $billingInfo: BillingInfoInput, $priceId: String!) {
    checkout(autoRenew: $autoRenew, billingInfo: $billingInfo, priceId: $priceId) {
      isSuccess
      message
      sessionUrl
    }
  }
`;

export default CHECKOUT_MUTATION;
