import gql from 'graphql-tag';

export const SIGN_IN_MUTATION = gql`
  mutation userSignIn($email: String!, $password: String!) {
    userSignIn(email: $email, password: $password) {
      accessToken
      refreshToken
      firstTime
    }
  }
`;
