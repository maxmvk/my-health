import gql from 'graphql-tag';

export const REMIND_PASSWORD_MUTATION = gql`
  mutation remindPassword($email: String) {
    remindPassword(email: $email) 
  }
`;