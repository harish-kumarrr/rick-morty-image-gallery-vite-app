
import React from 'react';
import { Character } from '../types/api';
import CharacterCard from './CharacterCard';

interface CharactersGridProps {
  characters: Character[];
  loading: boolean;
}

const CharactersGrid: React.FC<CharactersGridProps> = ({ characters, loading }) => {
  if (loading) {
    return (
      <div className="characters-container">
        <div className="loading">Loading characters...</div>
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="characters-container">
        <div className="no-characters">
          <div>
            <div>No characters found</div>
            <div>Try selecting a different episode</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="characters-container">
      <div className="characters-grid">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(CharactersGrid);
