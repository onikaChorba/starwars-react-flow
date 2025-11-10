import React, { useState } from 'react';
import { useCharacters } from '../hooks/useCharacters';
import CharacterCard from './CharacterCard';

interface Props { onSelect: (id: string) => void }

export default function CharacterList({ onSelect }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useCharacters(12);
  const [q, setQ] = useState('');

  const all = data?.pages.flatMap(p => p.data) ?? [];
  const filtered = all.filter(c => c.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="card">
      <input className="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Search characters..." />
      <div className="character-list">
        {isLoading && <div className="loader">Loading...</div>}
        {filtered.map(c => (
          <CharacterCard key={c.id} character={c} onOpen={onSelect} />
        ))}
        {!isLoading && filtered.length === 0 && <div className="loader">No characters found</div>}
      </div>
      <div className="pagination">
        {hasNextPage && <button className="button" onClick={() => fetchNextPage()}>Load more</button>}
        {isFetching && <div className="loader">Updating...</div>}
      </div>
    </div>
  );
}