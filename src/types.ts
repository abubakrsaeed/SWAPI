export interface Character {
    id: string;
    name: string;
    height: number;
    mass: number;
    homeworld: {
      name: string;
    };
    species: {
      name: string;
    };
    gender: string;
    eyeColor: string;
  }
  
  export interface PageInfo {
    startCurson: string;
    endCursor: string;
    hasNextPage: boolean;
  }
  
  export interface CharactersData {
    allPeople: {
      people: Character[];
      pageInfo: PageInfo;
    };
  }
  
  export interface CharacterDetailsData {
      id: string;
      name: string;
      height: number;
      mass: number;
      homeworld: {
        name: string;
      };
      species: {
        name: string;
      };
      gender: string;
      eyeColor: string;
      filmConnection: {
        films: {
          title: string;
        }[];
      };
    };

    export interface Details {
      allPeople: {
        people: CharacterDetailsData[];
        pageInfo: PageInfo
      }
    }
  
    export interface CharacterFilmData{
      person: {
        id: string;
        filmConnection: {
          films: {
            title: string;
          }[];
        };
      }
    }