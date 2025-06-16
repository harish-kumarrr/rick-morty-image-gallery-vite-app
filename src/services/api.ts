
import { Character, Episode, ApiResponse } from '../types/api';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchEpisodes = async (): Promise<ApiResponse<Episode>> => {
  const response = await fetch(`${BASE_URL}/episode`);
  if (!response.ok) {
    throw new Error('Failed to fetch episodes');
  }
  return response.json();
};

export const fetchCharacters = async (page = 1): Promise<ApiResponse<Character>> => {
  const response = await fetch(`${BASE_URL}/character?page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  return response.json();
};

export const fetchCharactersByUrls = async (urls: string[]): Promise<Character[]> => {
  if (urls.length === 0) return [];
  
  const ids = urls.map(url => url.split('/').pop()).filter(Boolean);
  
  if (ids.length === 0) return [];
  console.log("idsidsids",ids)
  const response = await fetch(`${BASE_URL}/character/${ids.join(',')}`);
  if (!response.ok) {
    throw new Error('Failed to fetch episode characters');
  }
  
  const data = await response.json();
  console.log("response",data)
  return Array.isArray(data) ? data : [data];
};
