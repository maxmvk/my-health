import gql from 'graphql-tag';

export const SIGN_UP_MUTATION = gql`
  mutation userSignUp(
    $firstName: String!,
    $lastName: String!,
    $phoneNumber: String!,
    $email: String!,
    $password: String!,
    $dateOfBirthday: Date!
  ) {
    userSignUp(
      firstName: $firstName,
      lastName: $lastName,
      phoneNumber: $phoneNumber,
      email: $email,
      password: $password,
      dateOfBirthday: $dateOfBirthday
    )
  }
`;
