export interface Character {
  id: string;
  name: string;
  gender?: string;
  birth_year?: string;
  films: string[];
}

export interface Film {
  id: string;
  title: string;
  episode_id?: number;
  starships: string[];
}

export interface Starship {
  id: string;
  name: string;
  model?: string;
}