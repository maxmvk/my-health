import gql from 'graphql-tag';

export const UPDATE_PASSWORD_MUTATION = gql`
  mutation updatePassword($token: String, $newPass: String) {
    updatePassword(token: $token, newPass: $newPass) {
      accessToken
      refreshToken
    }
  }
`;