
import React, { useState } from 'react';
import { Character } from '../types/api';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'status-alive';
      case 'dead':
        return 'status-dead';
      default:
        return 'status-unknown';
    }
  };

  return (
    <div className="character-card">
      {!imageError ? (
        <img
          src={character.image}
          alt={character.name}
          className="character-image"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          style={{ opacity: imageLoaded ? 1 : 0.5 }}
        />
      ) : (
        <div className="character-image" style={{ 
          backgroundColor: '#f0f0f0', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#666'
        }}>
          Image not available
        </div>
      )}
      
      <div className="character-info">
        <h3 className="character-name">{character.name}</h3>
        
        <div className="character-status">
          <div className={`status-dot ${getStatusClass(character.status)}`} />
          <span>{character.status} - {character.species}</span>
        </div>
        
        <div className="character-detail">
          Gender: {character.gender}
        </div>
        
        <div className="character-detail" title={character.location.name}>
          Location: {character.location.name}
        </div>
      </div>
    </div>
  );
};

export default React.memo(CharacterCard);
