import gql from 'graphql-tag';

export const AGEOME_HISTORY_QUERY = gql`
  query ageomesHistory($ageomeEntity: String!) {
    ageomesHistory(ageomeEntity: $ageomeEntity)
  }
`;
