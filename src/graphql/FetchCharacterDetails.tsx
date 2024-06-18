import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTER_FILMS } from './queries';
import { CharacterFilmData } from '../types';

interface FetchCharacterDetailsProps {
  characterId: string | null;
  onFetch: (data: CharacterFilmData | null) => void;
}

const FetchCharacterDetails: React.FC<FetchCharacterDetailsProps> = ({ characterId, onFetch }) => {
  const { data, refetch } = useQuery<CharacterFilmData>(GET_CHARACTER_FILMS, {
    variables: { personId: characterId }
  });

  useEffect(() => {
    if (characterId && data) {
      console.log("fetched data");
      console.log(data)
      onFetch(data);
    }
    else{
      console.log("no data fetched:")
      console.log(characterId)
//      refetch();
    }
  }, [data, onFetch]);

  return null;
};

export default FetchCharacterDetails;
