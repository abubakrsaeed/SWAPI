import React from 'react';
import AppLayout from '../components/AppLayout';
import CharacterTable from '../components/CharacterTable';
import HeroSection from '../components/HeroSection';

const HomePage: React.FC = () => {
  return (
    <div>
    
    <AppLayout>
      <HeroSection />
      <CharacterTable />
    </AppLayout>

    </div>
  );
};

export default HomePage;
