import gql from 'graphql-tag';

export const UPLOAD_USER_AVATAR = gql`
  mutation uploadUserAvatar(
    $file: Upload!
  ) {
    uploadUserAvatar(file: $file)
  }
`;
