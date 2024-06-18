import React, { useState } from 'react';
import { Modal } from 'antd';
import FetchCharacterFilms from '../graphql/FetchCharacterDetails';
import { CharacterDetailsData, CharacterFilmData, CharactersData } from '../types';

interface CharacterModalProps {
  visible: boolean;
  onClose: () => void;
  characterId: string | null;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ visible, onClose, characterId }) => {
  const [characterDetails, setCharacterDetails] = useState<CharacterFilmData | null>(null);

  const renderValue = (value: any) =>
    value !== undefined && value !== null && value !== '' && value !== 'n/a' ? value : '-';

    const database = JSON.parse(localStorage.getItem('data') || '[]') as CharactersData;
    const character = database.allPeople ? database.allPeople.people.filter(p => p.id == characterId).at(0) : null

  return (
    <Modal title="Character Details" visible={visible} onCancel={onClose} footer={null}>
      <FetchCharacterFilms characterId={characterId} onFetch={setCharacterDetails} />
      {characterDetails && character ? (
        <div key={characterDetails.person.id}>
          <p><strong>Name:</strong> {renderValue(character?.name)}</p>
          <p><strong>Height:</strong> {renderValue(character?.height)}</p>
          <p><strong>Weight:</strong> {renderValue(character?.mass)}</p>
          <p><strong>Home Planet:</strong> {renderValue(character?.homeworld.name)}</p>
          <p><strong>Species:</strong> {renderValue(character?.species? character?.species?.name: "-")}</p>
          <p><strong>Gender:</strong> {renderValue(character?.gender)}</p>
          <p><strong>Eye Color:</strong> {renderValue(character?.eyeColor)}</p>
          <div>
            <p><strong>Movies:</strong></p>
            {characterDetails.person.filmConnection?.films && characterDetails.person.filmConnection.films.length > 0 ? (
              <ul>
                {characterDetails.person.filmConnection.films.map((film) => (
                  <li key={film.title}>{film.title}</li>
                ))}
              </ul>
            ) : (
              <p>No films available</p>
            )}
          </div>
        </div>
      ) : (
        <p>No character data available</p>
      )}
    </Modal>
  );
};

export default CharacterModal;
