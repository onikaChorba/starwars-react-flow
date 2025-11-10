import React, { useState } from 'react';
import CharacterList from './components/CharacterList';
import CharacterDetailsGraph from './components/CharacterDetailsGraph';

export default function App() {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  return (
    <div className="app">
      <header className="header">
        <div className="logo">StarWars Graph Explorer</div>
      </header>

      <div className="container">
        <div>
          <CharacterList onSelect={id => setSelectedId(id)} />
        </div>
        <div>
          <CharacterDetailsGraph id={selectedId} />
        </div>
      </div>
    </div>
  );
}