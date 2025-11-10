import type { Character, Film, Starship } from '../types';

const BASE = 'https://sw-api.starnavi.io';

async function request<T>(path: string) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json() as Promise<T>;
}

export const swApi = {
  async getCharacters(page = 1, limit = 12) {
    return request<{ results: Character[]; next?: string }>(`/people?page=${page}&limit=${limit}`);
  },

  async getCharacter(id: string) {
    return request<Character>(`/people/${id}`);
  },

  async getFilm(id: string) {
    return request<Film>(`/films/${id}`);
  },

  async getStarship(id: string) {
    return request<Starship>(`/starships/${id}`);
  }
};