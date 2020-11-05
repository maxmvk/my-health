import gql from 'graphql-tag';

export const CHANGE_HL_STATUS = gql`
  mutation changeHLStatusConn(
    $status: Boolean
  ) {
    changeHLStatusConn(status: $status)
  }
`;
