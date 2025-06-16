
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Episode, Character } from '../types/api';
import { fetchEpisodes, fetchCharacters, fetchCharactersByUrls } from '../services/api';
import EpisodesSidebar from './EpisodesSidebar';
import CharactersGrid from './CharactersGrid';
import Header from './Header';

const RickAndMortyApp: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load episodes and initial characters
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const [episodesData, charactersData] = await Promise.all([
          fetchEpisodes(),
          fetchCharacters(1)
        ]);
        console.log("wedfgvwedrfg",episodesData, charactersData)
        setEpisodes(episodesData.results);
        setCharacters(charactersData.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Get selected episode
  const selectedEpisode = useMemo(() => {
    return episodes.find(ep => ep.id === selectedEpisodeId) || null;
  }, [episodes, selectedEpisodeId]);

  // Load characters for selected episode
  useEffect(() => {
    const loadEpisodeCharacters = async () => {
      if (!selectedEpisode) return;
      console.log("selectedEpisode",selectedEpisode)
      try {
        setLoading(true);
        const episodeCharacters = await fetchCharactersByUrls(selectedEpisode.characters);
        setCharacters(episodeCharacters);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load episode characters');
      } finally {
        setLoading(false);
      }
    };

    loadEpisodeCharacters();
  }, [selectedEpisode]);

  // Handle episode selection
  const handleEpisodeSelect = useCallback(async (episodeId: number | null) => {
    if (episodeId === selectedEpisodeId) {
      // Unselect episode - reload initial characters
      setSelectedEpisodeId(null);
      try {
        setLoading(true);
        const charactersData = await fetchCharacters(1);
        setCharacters(charactersData.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load characters');
      } finally {
        setLoading(false);
      }
    } else {
      // Select new episode
      setSelectedEpisodeId(episodeId);
    }
  }, [selectedEpisodeId]);

  if (error) {
    return (
      <div className="app-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <EpisodesSidebar
        episodes={episodes}
        selectedEpisodeId={selectedEpisodeId}
        onEpisodeSelect={handleEpisodeSelect}
      />
      <div className="main-content">
        <Header
          selectedEpisode={selectedEpisode}
          totalCharacters={characters.length}
        />
        <CharactersGrid
          characters={characters}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default RickAndMortyApp;
