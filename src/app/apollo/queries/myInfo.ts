import gql from 'graphql-tag';

export const MY_INFO_QUERY = gql`
  query {
    myInfo {
      avatar
      dateOfBirth
      email
      firstName
      gender
      height
      lastName
      phoneNumber
      weight
      silhouetteId
      firstTimePassword
    }
  }
`;
