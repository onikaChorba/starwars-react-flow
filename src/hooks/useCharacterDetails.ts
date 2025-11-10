import { useQueries, useQuery } from '@tanstack/react-query';
import { swApi } from '../api/swApi';
import type { Character, Film, Starship } from '../types';

export function useCharacter(id: string | undefined) {
  return useQuery(['character', id], () => swApi.getCharacter(id as string), { enabled: !!id });
}

export function useFilmsForCharacter(filmIds: string[] | undefined) {
  return useQueries({
    queries: (filmIds ?? []).map((fid) => ({ queryKey: ['film', fid], queryFn: () => swApi.getFilm(fid) }))
  }) as { data?: Film }[];
}

export function useStarshipsForFilm(starshipIds: string[] | undefined) {
  return useQueries({
    queries: (starshipIds ?? []).map((sid) => ({ queryKey: ['starship', sid], queryFn: () => swApi.getStarship(sid) }))
  }) as { data?: Starship }[];
}