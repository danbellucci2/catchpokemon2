import React from 'react';
import { Target, CheckCircle, Coins } from 'lucide-react';

interface WaveStatsProps {
  spawned: number;
  caught: number;
  isWaveActive: boolean;
  pokecoins: number;
}

export const WaveStats: React.FC<WaveStatsProps> = ({ spawned, caught, isWaveActive, pokecoins }) => {
  const catchRate = spawned > 0 ? Math.round((caught / spawned) * 100) : 0;

  return (
    <div className="absolute left-4 right-4 bottom-4 h-16 bg-black/30 rounded-xl backdrop-blur-md border border-white/10">
      <div className="h-full flex items-center justify-around px-4">
        <div className="flex items-center gap-2">
          <Target size={20} className="text-blue-400" />
          <div>
            <div className="text-sm text-gray-400">Spawned</div>
            <div className="text-white font-bold">{spawned}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle size={20} className="text-green-400" />
          <div>
            <div className="text-sm text-gray-400">Caught</div>
            <div className="text-white font-bold">{caught}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full border-4 border-blue-500 flex items-center justify-center">
            <span className="text-white font-bold">{catchRate}%</span>
          </div>
          <div className="text-sm text-gray-400">
            Catch<br />Rate
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Coins size={20} className="text-yellow-400" />
          <div>
            <div className="text-sm text-gray-400">Pokecoins</div>
            <div className="text-yellow-400 font-bold">{pokecoins}</div>
          </div>
        </div>
      </div>
    </div>
  );
};