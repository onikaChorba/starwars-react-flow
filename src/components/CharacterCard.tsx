import React from 'react';
import type { Character } from '../types';


interface Props { character: Character; onOpen: (id: string) => void }


export default function CharacterCard({ character, onOpen }: Props) {
  const imgSrc = `https://starwars-visualguide.com/assets/img/characters/${character.id}.jpg`;

  return (
    <div className="character-card" onClick={() => onOpen(character.id)} role="button">
      <img src={imgSrc} alt={character.name} className="avatar" onError={(e) => (e.currentTarget.style.display = 'none')} />
      <div>
        <div className="name">{character.name}</div>
        <div className="meta">{character.gender ?? 'unknown'} • {character.birth_year ?? '—'}</div>
      </div>
    </div>
  );
}