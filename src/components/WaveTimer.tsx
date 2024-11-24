import React from 'react';

interface WaveTimerProps {
  waveTimeLeft: number;
  isWaveActive: boolean;
}

export const WaveTimer: React.FC<WaveTimerProps> = ({ waveTimeLeft, isWaveActive }) => {
  return (
    <div className="absolute left-4 top-4 bg-black/30 p-4 rounded-xl backdrop-blur-md border border-white/10">
      <div className="text-white">
        {isWaveActive ? (
          <span className="text-green-400">Wave Active: {waveTimeLeft}s</span>
        ) : (
          <span className="text-yellow-400">Next Wave: {waveTimeLeft}s</span>
        )}
      </div>
    </div>
  );
};