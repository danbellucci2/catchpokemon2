import React from 'react';
import { Trophy } from 'lucide-react';

interface GameOverProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ score, highScore, onRestart }) => {
  const isNewHighScore = score > highScore;

  return (
    <div className="text-center bg-black/30 p-8 rounded-xl backdrop-blur-md border border-white/10">
      <h2 className="text-4xl font-bold text-white mb-4">Game Over!</h2>
      
      <div className="mb-6">
        <p className="text-2xl text-white mb-2">Pokémon Caught: <span className="text-blue-400">{score}</span></p>
        {isNewHighScore ? (
          <div className="flex items-center justify-center gap-2 text-yellow-400">
            <Trophy size={24} />
            <p className="text-xl">New High Score!</p>
          </div>
        ) : (
          <p className="text-xl text-yellow-400">High Score: {highScore}</p>
        )}
      </div>

      <button
        onClick={onRestart}
        className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg text-xl font-semibold transform hover:scale-105 transition-transform duration-200"
      >
        Try to Catch More!
      </button>
    </div>
  );
};