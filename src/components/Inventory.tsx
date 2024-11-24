import React from 'react';
import type { PokemonSprite } from '../types/pokemon';

interface InventoryProps {
  pokemon: PokemonSprite[];
}

export const Inventory: React.FC<InventoryProps> = ({ pokemon }) => {
  const caughtPokemon = pokemon.filter(p => p.caught);

  return (
    <div className="absolute right-4 top-4 bg-black/30 p-4 rounded-xl backdrop-blur-md border border-white/10 w-48">
      <h3 className="text-white font-bold mb-2 text-center">Caught Pokémon</h3>
      <div className="grid grid-cols-3 gap-2">
        {caughtPokemon.map((p) => (
          <div 
            key={`${p.id}-${p.caught}`} 
            className="relative group"
            title={p.name}
          >
            <img
              src={p.sprite}
              alt={p.name}
              className="w-12 h-12"
              style={{ imageRendering: 'pixelated' }}
            />
            <span className="absolute bottom-0 left-0 right-0 text-center text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded">
              {p.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};