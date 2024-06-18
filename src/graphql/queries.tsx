import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters($after: String, $first: Int) {
    allPeople(after: $after, first: $first) {
      people {
        id
        name
        height
        mass
        homeworld {
          name
        }
        species {
          name
        }
        gender
        eyeColor
      }
      pageInfo {
        startCursor,
        endCursor,
        hasNextPage
      }
    }
  }
`;

export const GET_CHARACTER_FILMS = gql`
  query GetCharacterFilms( $personId: ID) {
    person(id: $personId) {
      id
      filmConnection {
        films {
          title
        }
      }
    }
  }
`;

