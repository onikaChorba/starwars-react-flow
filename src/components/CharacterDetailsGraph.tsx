import React, { useMemo } from "react";
import ReactFlow, { MiniMap, Controls, Background, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import { useCharacter, useFilmsForCharacter } from "../hooks/useCharacterDetails";
import { mapCharacterToGraph } from "../utils/mapToGraph";
import { useQueries } from "@tanstack/react-query";

interface Props {
  id?: string;
}

export default function CharacterDetailsGraph({ id }: Props) {
  const { data: character, isLoading: charLoading } = useCharacter(id);

  const filmQueries = useFilmsForCharacter(character?.films ?? []);
  const films = filmQueries.map((q) => q.data).filter(Boolean) as any[];

  const starshipQueries = useQueries({
    queries: films.flatMap((f) =>
      (f.starships ?? []).map((url: string) => ({
        queryKey: ["starship", url],
        queryFn: async () => {
          const res = await fetch(url);
          return res.json();
        },
      }))
    ),
  });

  const starshipsByFilm: Record<string, any[]> = {};
  let queryIndex = 0;
  films.forEach((film) => {
    const starshipsForFilm = (film.starships ?? []).map(() => {
      const result = starshipQueries[queryIndex];
      queryIndex++;
      return result?.data;
    }).filter(Boolean);
    starshipsByFilm[film.id] = starshipsForFilm;
  });

  const { nodes, edges } = useMemo(() => {
    if (!character) return { nodes: [], edges: [] };
    return mapCharacterToGraph(character, films, starshipsByFilm);
  }, [character, films, starshipsByFilm]);

  if (!id) return <div className="card">Select a character to view details</div>;
  if (charLoading) return <div className="card loader">Loading character...</div>;

  return (
    <div className="card graph-area">
      <ReactFlow
        nodes={nodes as Node[]}
        edges={edges as Edge[]}
        fitView
        attributionPosition="bottom-left"
      >
        <MiniMap />
        <Controls />
        <Background gap={12} />
      </ReactFlow>
    </div>
  );
}
