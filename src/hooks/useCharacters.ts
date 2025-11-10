import { useInfiniteQuery } from '@tanstack/react-query';
import { swApi } from '../api/swApi';

export function useCharacters(limit = 12) {
  return useInfiniteQuery(
    ['characters', limit],
    async ({ pageParam = 1 }) => {
      const data = await swApi.getCharacters(pageParam, limit);
      return { data: data.results ?? [], nextPage: pageParam + 1, hasMore: !!data.next };
    },
    { getNextPageParam: (last) => (last.hasMore ? last.nextPage : undefined) }
  );
}