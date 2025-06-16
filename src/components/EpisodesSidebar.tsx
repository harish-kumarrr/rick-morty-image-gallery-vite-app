
import React from 'react';
import { Episode } from '../types/api';

interface EpisodesSidebarProps {
  episodes: Episode[];
  selectedEpisodeId: number | null;
  onEpisodeSelect: (episodeId: number | null) => void;
}

const EpisodesSidebar: React.FC<EpisodesSidebarProps> = ({
  episodes,
  selectedEpisodeId,
  onEpisodeSelect
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Episodes</h2>
        <p className="sidebar-subtitle">{episodes.length} episodes available</p>
      </div>
      
      <ul className="episode-list">
        {episodes.map((episode) => (
          <li key={episode.id} className="episode-item">
            <button
              className={`episode-button ${selectedEpisodeId === episode.id ? 'selected' : ''}`}
              onClick={() => onEpisodeSelect(episode.id)}
            >
              <div className="episode-name">{episode.name}</div>
              <div className="episode-details">
                {episode.episode} • {episode.air_date}
              </div>
              <div className="episode-details">
                {episode.characters.length} characters
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(EpisodesSidebar);
