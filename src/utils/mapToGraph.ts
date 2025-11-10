import type { Node, Edge } from 'reactflow';
import type { Character, Film, Starship } from '../types';

export function mapCharacterToGraph(character: Character, films: Film[], starshipsByFilm: Record<string, Starship[]>) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  nodes.push({ id: `char-${character.id}`, data: { label: character.name, type: 'character' }, position: { x: 300, y: 40 }, style: { padding: 10 } });

  films.forEach((film, fidx) => {
    const filmId = `film-${film.id}`;
    nodes.push({ id: filmId, data: { label: film.title, type: 'film' }, position: { x: 100 + fidx * 220, y: 200 } });
    edges.push({ id: `e-c-f-${film.id}`, source: `char-${character.id}`, target: filmId });

    const ships = starshipsByFilm[film.id] ?? [];
    ships.forEach((ship, sidx) => {
      const shipId = `ship-${ship.id}`;
      nodes.push({ id: shipId, data: { label: ship.name, type: 'starship' }, position: { x: 50 + fidx * 220 + sidx * 120, y: 360 } });
      edges.push({ id: `e-f-s-${film.id}-${ship.id}`, source: filmId, target: shipId });
    });
  });


  return { nodes, edges };
}