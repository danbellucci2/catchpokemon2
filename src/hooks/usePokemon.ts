import { useState, useCallback } from 'react';
import type { PokemonSprite } from '../types/pokemon';

const POKEMON_COUNT = 151; // Gen 1 Pokémon

function generateRandomPosition() {
  return {
    x: Math.random() * 90,
    y: Math.random() * 90
  };
}

export function usePokemon() {
  const [pokemon, setPokemon] = useState<PokemonSprite[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNewWave = useCallback(async () => {
    try {
      const waveSize = Math.floor(Math.random() * 21) + 10; // Random number between 10 and 30
      const randomIds = Array.from({ length: waveSize }, () => 
        Math.floor(Math.random() * POKEMON_COUNT) + 1
      );

      const responses = await Promise.all(
        randomIds.map(id => 
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => res.json())
        )
      );

      const pokemonData = responses.map((data, index) => ({
        id: data.id,
        instanceId: `${data.id}-${Date.now()}-${index}`,
        name: data.name,
        sprite: data.sprites.front_default,
        caught: false,
        position: generateRandomPosition()
      }));

      setPokemon(prev => [...prev, ...pokemonData]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
      setIsLoading(false);
    }
  }, []);

  const catchPokemon = useCallback((instanceId: string) => {
    setPokemon(prev => 
      prev.map(p => 
        p.instanceId === instanceId && !p.caught ? { ...p, caught: true } : p
      )
    );
  }, []);

  const clearUncaughtPokemon = useCallback(() => {
    setPokemon(prev => prev.filter(p => p.caught));
  }, []);

  return { pokemon, isLoading, fetchNewWave, catchPokemon, clearUncaughtPokemon };
}