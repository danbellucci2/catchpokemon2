import React from 'react';
import { Users, Scroll } from 'lucide-react';
import type { PokemonSprite, Quest } from '../types/pokemon';

interface SidebarProps {
  pokemon: PokemonSprite[];
  activeTab: 'inventory' | 'quests';
  onTabChange: (tab: 'inventory' | 'quests') => void;
  quests: Quest[];
  onClaimQuest: (questId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  pokemon, 
  activeTab, 
  onTabChange,
  quests,
  onClaimQuest
}) => {
  const caughtPokemon = pokemon.filter(p => p.caught);
  
  // Group Pokémon by ID and count them
  const groupedPokemon = caughtPokemon.reduce((acc, p) => {
    acc[p.id] = acc[p.id] || { ...p, count: 0 };
    acc[p.id].count++;
    return acc;
  }, {} as Record<number, PokemonSprite & { count: number }>);

  return (
    <div className="absolute left-4 top-4 bottom-24 w-64 bg-black/30 rounded-xl backdrop-blur-md border border-white/10 flex flex-col">
      <div className="flex border-b border-white/10">
        <button
          onClick={() => onTabChange('inventory')}
          className={`flex-1 p-4 text-white font-semibold ${
            activeTab === 'inventory' ? 'bg-white/10' : ''
          }`}
        >
          Inventory
        </button>
        <button
          onClick={() => onTabChange('quests')}
          className={`flex-1 p-4 text-white font-semibold ${
            activeTab === 'quests' ? 'bg-white/10' : ''
          }`}
        >
          Quests
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'inventory' ? (
          <div className="grid grid-cols-3 gap-2">
            {Object.values(groupedPokemon).map((p) => (
              <div 
                key={p.id}
                className="relative group"
                title={p.name}
              >
                <img
                  src={p.sprite}
                  alt={p.name}
                  className="w-12 h-12 bg-white/5 rounded-lg p-1"
                  style={{ imageRendering: 'pixelated' }}
                />
                <span className="absolute bottom-0 right-0 bg-black/75 text-white text-xs px-1 rounded">
                  x{p.count}
                </span>
                <span className="absolute bottom-0 left-0 right-0 text-center text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-white space-y-4">
            {quests.map((quest) => (
              <div key={quest.id} className="bg-white/5 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{quest.title}</h3>
                <p className="text-sm text-gray-300">{quest.description}</p>
                <div className="mt-2 h-2 bg-white/10 rounded-full">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${Math.min((quest.progress / quest.requirement) * 100, 100)}%` }}
                  />
                </div>
                <div className="mt-2 text-sm text-gray-300">
                  Progress: {quest.progress}/{quest.requirement}
                </div>
                {quest.completed && !quest.claimed && (
                  <button
                    onClick={() => onClaimQuest(quest.id)}
                    className="mt-2 w-full py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
                  >
                    Claim Reward
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};