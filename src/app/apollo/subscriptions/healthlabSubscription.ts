import gql from 'graphql-tag';

export const HEALTHLAB_SUBSCRIPTION = gql`
  subscription HealthlabSubscription {
    healthlabSubscription {
      ageomes
      user
    }
  }
`;
