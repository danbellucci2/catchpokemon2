import React from 'react';

interface ScoreBoardProps {
  score: number;
  timeLeft: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, timeLeft }) => {
  return (
    <div className="absolute left-72 right-72 top-4 flex justify-between items-center mb-6 px-4">
      <div className="text-3xl font-bold text-white">
        Score: <span className="text-pink-400">{score}</span>
      </div>
      <div className="text-3xl font-bold text-white">
        Time: <span className="text-yellow-400">{timeLeft}s</span>
      </div>
    </div>
  );
};