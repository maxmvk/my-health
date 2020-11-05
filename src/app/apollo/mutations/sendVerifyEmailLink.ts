import gql from 'graphql-tag';

export const SEND_VERIFY_EMAIL_LINK_MUTATION = gql`
  mutation sendVerifyEmailLink(
    $email: String,
  ) {
    sendVerifyEmailLink(
      email: $email
    )
  }
`;
