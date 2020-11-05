import gql from 'graphql-tag';

export const MY_INFO_MUTATION = gql`
  mutation MyInfo(
    $dateOfBirth: Date
    $email: String
    $firstName: String
    $gender: String
    $height: Int
    $lastName: String
    $phoneNumber: String
    $silhouetteId: String
    $skip: Boolean
    $weight: Int
  ) {
    myInfo(
      dateOfBirth: $dateOfBirth
      email: $email
      firstName: $firstName
      gender: $gender
      height: $height
      lastName: $lastName
      phoneNumber: $phoneNumber
      silhouetteId: $silhouetteId
      skip: $skip
      weight: $weight
    ) {
      avatar
      dateOfBirth
      email
      firstName
      gender
      hairColor
      height
      lastName
      phoneNumber
      silhouetteId
      weight
    }
  }
`;
