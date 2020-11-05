import gql from 'graphql-tag';

export const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      accessToken
      refreshToken
    }
  }
`;
