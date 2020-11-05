import gql from 'graphql-tag';

export const HEALTH_LAB_INFO_QUERY = gql`
  query {
    getHlStatus
  }
`;
