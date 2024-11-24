import React from 'react';
import { Users } from 'lucide-react';

const MOCK_PLAYERS = [
  { id: 1, name: 'Ash', score: 150 },
  { id: 2, name: 'Misty', score: 120 },
  { id: 3, name: 'Brock', score: 90 },
];

export const OnlinePlayers: React.FC = () => {
  return (
    <div className="absolute right-4 top-4 bottom-24 w-64 bg-black/30 rounded-xl backdrop-blur-md border border-white/10">
      <div className="p-4 border-b border-white/10 flex items-center gap-2">
        <Users size={20} className="text-blue-400" />
        <h3 className="text-white font-semibold">Online Trainers</h3>
      </div>
      <div className="p-4 space-y-3">
        {MOCK_PLAYERS.map((player) => (
          <div 
            key={player.id}
            className="flex items-center justify-between bg-white/5 p-3 rounded-lg"
          >
            <span className="text-white">{player.name}</span>
            <span className="text-blue-400 text-sm">{player.score} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};