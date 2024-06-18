import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../graphql/queries';
import { CharactersData } from '../types';
import { Button } from 'antd';

interface FetchCharactersProps {
  onDataFetched: (data: CharactersData) => void;
}

const FetchCharacters: React.FC<FetchCharactersProps> = ({ onDataFetched }) => {

  const [pageInfo] = useState<{ endCursor: string | null; hasNextPage: boolean }>({
    endCursor: null,
    hasNextPage: false,
  });

  const { loading, error, data, fetchMore } = useQuery<CharactersData>(GET_CHARACTERS, {
    variables: { after: null, first: 20 }
  });

  useEffect(() => {
    if (data) {
      console.log(data)
      const newCharacters = data.allPeople.people;
      const newPageInfo = data.allPeople.pageInfo;

      onDataFetched(data);
      console.log("running?")
      localStorage.setItem('data', JSON.stringify(data));
    }
    else{
      console.log(error)
    }
  }, [data]);

  return <div style={{ textAlign: 'center', margin: '20px 0' }}>
    <Button onClick={()=>{fetchMore(
    {
      variables: {after: data?.allPeople.pageInfo.endCursor, first: 20},
      updateQuery: (prevData, {fetchMoreResult}) => {
        return fetchMoreResult
      }
    }
  )}}>Load More</Button></div>
};

export default FetchCharacters;
