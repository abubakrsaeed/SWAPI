import React, { useState, useEffect } from 'react';
import { Table, Button, Select, Row, Col, Switch } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import CharacterModal from './CharacterModal';
import FetchCharacters from '../graphql/FetchCharacters';
import { Character, CharactersData, PageInfo } from '../types';

const { Option } = Select;

const CharacterTable: React.FC = () => {
  const [database, setDatabase] = useState<CharactersData>(JSON.parse(localStorage.getItem('data') || '[]'));

  const [filters, setFilters] = useState({
    gender: '',
    eyeColor: [] as string[],
    species: [] as string[],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>(JSON.parse(localStorage.getItem('favorites') || '[]'));
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);

  const handleDataFetched = (newData: CharactersData) => {
    
    setDatabase((prevData) => {

      if(!prevData.allPeople)
      {
        return newData;
      }

      if(prevData.allPeople.pageInfo.endCursor != newData.allPeople.pageInfo.endCursor)
      {
        const data = {allPeople:{people: [...prevData.allPeople.people , ...newData.allPeople.people], pageInfo: {endCursor: newData.allPeople.pageInfo.endCursor} }}
        return data as CharactersData;
      }

     return prevData;
    });
  };

  const handleViewDetails = (characterId: string) => {
    setSelectedCharacterId(characterId);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedCharacterId(null);
  };

  const handleFavoriteToggle = (characterId: string) => {
    const newFavorites = favorites.includes(characterId)
      ? favorites.filter((id) => id !== characterId)
      : [...favorites, characterId];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (type: string, value: string | string[]) => {
    setFilters({
      ...filters,
      [type]: value,
    });
  };


  const renderValue = (value: any) =>
    value !== undefined && value !== null && value !== '' && value !== 'n/a' ? value : '-';

  const genderOptions = Array.from(new Set(database.allPeople ? database.allPeople.people.map((character) => character.gender) : []));
  const eyeColorOptions = Array.from(new Set(database.allPeople ? database.allPeople.people.map((character) => character.eyeColor): []));
  const speciesOptions = Array.from(new Set(database.allPeople ? database.allPeople.people.map((character) => renderValue(character.species?.name)): []));


  var displayedData : Character[] = []
  
  if(database)
  {
    const filteredData = database.allPeople? database.allPeople.people.filter((character: Character) => {
      const { gender, eyeColor, species } = filters;
      const genderMatch = !gender || character.gender === gender;
      const eyeColorMatch = eyeColor.length === 0 || eyeColor.includes(character.eyeColor);
      const speciesMatch = species.length === 0 || species.includes(renderValue(character.species?.name));
  
      return genderMatch && eyeColorMatch && speciesMatch;
    }) : [];
  
     displayedData = favoritesOnly
      ? filteredData.filter((character) => favorites.includes(character.id))
      : filteredData;

  }
  else{
    throw "this"
  }
  

  const totalCount = 50;

  return (
    <div style={{ padding: 100, backgroundColor: 'white' }}>
      <h1 style={{ textAlign: 'center', marginTop: -70, padding: 30 }}>
        Explore Star Wars Characters: Heroes, Villains, and Legends
      </h1>
      <Row gutter={16} style={{ marginBottom: '16px' }}>
        <Col>
          <Select
            placeholder="Filter by Gender"
            onChange={(value) => handleFilterChange('gender', value)}
            style={{ width: 150 }}
          >
            <Option value="">All</Option>
            {genderOptions.map((gender) => (
              <Option key={gender} value={gender}>
                {gender}
              </Option>
            ))}
          </Select>
        </Col>
        <Col>
          <Select
            mode="multiple"
            placeholder="Filter by Eye Color"
            onChange={(value) => handleFilterChange('eyeColor', value)}
            style={{ width: 200 }}
          >
            {eyeColorOptions.map((color) => (
              <Option key={color} value={color}>
                {color}
              </Option>
            ))}
          </Select>
        </Col>
        <Col>
          <Select
            mode="multiple"
            placeholder="Filter by Species"
            onChange={(value) => handleFilterChange('species', value)}
            style={{ width: 200 }}
          >
            {speciesOptions.map((species) => (
              <Option key={species} value={species}>
                {renderValue(species)}
              </Option>
            ))}
          </Select>
        </Col>
        <Col>
          <Switch
            checked={favoritesOnly}
            onChange={setFavoritesOnly}
            checkedChildren="Favourites Only"
            unCheckedChildren="Favourites Only"
            style={{ backgroundColor: favoritesOnly ? 'red' : '' }}
          />
        </Col>
      </Row>
      <Table
        dataSource={displayedData}
        rowKey="id"
        pagination={
          false
        }
        columns={[
          {
            title: '',
            dataIndex: 'index',
            key: 'index',
            render: (text: string, record: any, index: number) => (
              <span>{index + 1}</span>
            ),
          },
          { title: 'Name', dataIndex: 'name', key: 'name', render: renderValue },
          { title: 'Height', dataIndex: 'height', key: 'height', render: renderValue },
          { title: 'Weight', dataIndex: 'mass', key: 'mass', render: renderValue },
          { title: 'Home Planet', dataIndex: ['homeworld', 'name'], key: 'homeworld', render: renderValue },
          { title: 'Species', dataIndex: ['species', 'name'], key: 'species', render: renderValue },
          { title: 'Gender', dataIndex: 'gender', key: 'gender', render: renderValue },
          { title: 'Eye Color', dataIndex: 'eyeColor', key: 'eyeColor', render: renderValue },
          {
            title: '',
            key: 'actions',
            render: (_, record: Character) => (
              <>
                <Button onClick={() => handleFavoriteToggle(record.id)}>
                  {favorites.includes(record.id) ? (
                    <HeartFilled style={{ color: 'red' }} />
                  ) : (
                    <HeartOutlined />
                  )}
                </Button>
                <Button onClick={() => handleViewDetails(record.id)} style={{ marginLeft: 8 }}>
                  View Details
                </Button>
              </>
            ),
          },
        ]}
      />
      <CharacterModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        characterId={selectedCharacterId}
      />
      <FetchCharacters onDataFetched={handleDataFetched} />
    </div>
  );
};

export default CharacterTable;
