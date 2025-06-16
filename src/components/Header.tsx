
import React from 'react';
import { Episode } from '../types/api';

interface HeaderProps {
  selectedEpisode: Episode | null;
  totalCharacters: number;
}

const Header: React.FC<HeaderProps> = ({ selectedEpisode, totalCharacters }) => {
  return (
    <div className="header">
      <h1 className="header-title">
        {selectedEpisode ? selectedEpisode.name : 'Rick and Morty Characters'}
      </h1>
      <p className="header-subtitle">
        {selectedEpisode 
          ? `${selectedEpisode.episode} • ${selectedEpisode.air_date} • ${totalCharacters} characters`
          : `Showing ${totalCharacters} characters`
        }
      </p>
    </div>
  );
};

export default React.memo(Header);
