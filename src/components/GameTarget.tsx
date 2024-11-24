import React from 'react';
import type { PokemonSprite } from '../types/pokemon';

interface GameTargetProps {
  onClick: () => void;
  difficulty: number;
  pokemon: PokemonSprite;
  position: { x: number; y: number };
}

export const GameTarget: React.FC<GameTargetProps> = ({ onClick, pokemon, position }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`
      }}
      onClick={handleClick}
    >
      <div className="relative group">
        <div 
          className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20" 
          style={{ width: 64, height: 64 }}
        />
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          style={{ 
            width: 64,
            height: 64,
            imageRendering: 'pixelated'
          }}
          className="transform group-hover:scale-110 transition-transform duration-200"
        />
      </div>
    </div>
  );
};