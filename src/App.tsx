import React, { useState, useEffect, useCallback } from 'react';
import { usePokemon } from './hooks/usePokemon';
import { GameTarget } from './components/GameTarget';
import { ScoreBoard } from './components/ScoreBoard';
import { GameOver } from './components/GameOver';
import { Sidebar } from './components/Sidebar';
import { OnlinePlayers } from './components/OnlinePlayers';
import { WaveStats } from './components/WaveStats';
import { WaveTimer } from './components/WaveTimer';
import type { Quest } from './types/pokemon';

const WAVE_DURATION = 10; // seconds
const WAVE_INTERVAL = 15; // seconds

const initialQuest: Quest = {
  id: '1',
  title: 'Wave Master',
  description: 'Catch 10 Pokémon in a single wave',
  requirement: 10,
  progress: 0,
  completed: false,
  claimed: false,
};

function App() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [waveActive, setWaveActive] = useState(false);
  const [waveTimeLeft, setWaveTimeLeft] = useState(WAVE_INTERVAL);
  const [activeTab, setActiveTab] = useState<'inventory' | 'quests'>('inventory');
  const [waveStats, setWaveStats] = useState({ spawned: 0, caught: 0 });
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('highScore');
    return saved ? parseInt(saved) : 0;
  });
  const [pokecoins, setPokecoins] = useState(() => {
    const saved = localStorage.getItem('pokecoins');
    return saved ? parseInt(saved) : 0;
  });
  const [quests, setQuests] = useState<Quest[]>([initialQuest]);
  const [waveCatchCount, setWaveCatchCount] = useState(0);

  const { pokemon, isLoading, fetchNewWave, catchPokemon, clearUncaughtPokemon } = usePokemon();

  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(30);
    setGameStarted(true);
    setGameOver(false);
    setWaveActive(false);
    setWaveTimeLeft(WAVE_INTERVAL);
    setWaveStats({ spawned: 0, caught: 0 });
    setWaveCatchCount(0);
    setQuests([initialQuest]);
    fetchNewWave();
  }, [fetchNewWave]);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && gameStarted) {
      setGameStarted(false);
      setGameOver(true);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('highScore', score.toString());
      }
    }
  }, [gameStarted, timeLeft, score, highScore]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const waveTimer = setInterval(() => {
      setWaveTimeLeft(prev => {
        if (waveActive && prev <= 1) {
          setWaveActive(false);
          clearUncaughtPokemon();
          setWaveCatchCount(0);
          return WAVE_INTERVAL;
        } else if (!waveActive && prev <= 1) {
          setWaveActive(true);
          fetchNewWave();
          setWaveStats(prev => ({ ...prev, spawned: prev.spawned + 15 }));
          return WAVE_DURATION;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(waveTimer);
  }, [gameStarted, gameOver, waveActive, fetchNewWave, clearUncaughtPokemon]);

  const handleTargetClick = useCallback((instanceId: string) => {
    setScore((prev) => prev + 1);
    setWaveStats(prev => ({ ...prev, caught: prev.caught + 1 }));
    setWaveCatchCount(prev => prev + 1);
    catchPokemon(instanceId);
  }, [catchPokemon]);

  useEffect(() => {
    setQuests(prev => 
      prev.map(quest => ({
        ...quest,
        progress: waveCatchCount,
        completed: waveCatchCount >= quest.requirement
      }))
    );
  }, [waveCatchCount]);

  const handleClaimQuest = useCallback((questId: string) => {
    setPokecoins(prev => {
      const newBalance = prev + 10;
      localStorage.setItem('pokecoins', newBalance.toString());
      return newBalance;
    });

    setQuests(prev => {
      const currentQuest = prev.find(q => q.id === questId);
      if (!currentQuest) return prev;

      const newRequirement = currentQuest.requirement + 5;
      
      return [{
        id: (parseInt(questId) + 1).toString(),
        title: 'Wave Master',
        description: `Catch ${newRequirement} Pokémon in a single wave`,
        requirement: newRequirement,
        progress: 0,
        completed: false,
        claimed: false,
      }];
    });
  }, []);

  const activePokemon = pokemon.filter(p => !p.caught);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="relative z-10 w-full h-screen px-4">
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-white mb-8 tracking-tight">
                Catch the Pokémon!
              </h1>
              <div className="flex items-center justify-center gap-4 mb-8">
                {pokemon.slice(0, 3).map((p) => (
                  <img 
                    key={p.instanceId}
                    src={p.sprite}
                    alt={p.name}
                    className="w-12 h-12"
                    style={{ imageRendering: 'pixelated' }}
                  />
                ))}
              </div>
              <button
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg text-xl font-semibold transform hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
              >
                Start Game
              </button>
              {highScore > 0 && (
                <p className="mt-4 text-yellow-400 text-xl">
                  High Score: {highScore}
                </p>
              )}
            </div>
          </div>
        )}

        {gameStarted && !isLoading && (
          <>
            <ScoreBoard score={score} timeLeft={timeLeft} />
            <WaveTimer waveTimeLeft={waveTimeLeft} isWaveActive={waveActive} />
            <Sidebar 
              pokemon={pokemon}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              quests={quests}
              onClaimQuest={handleClaimQuest}
            />
            <OnlinePlayers />
            <WaveStats 
              spawned={waveStats.spawned}
              caught={waveStats.caught}
              isWaveActive={waveActive}
              pokecoins={pokecoins}
            />
            <div className="absolute left-72 right-72 top-4 bottom-24 bg-black rounded-xl shadow-2xl border border-white/10">
              {waveActive && activePokemon.map((p) => (
                <GameTarget
                  key={p.instanceId}
                  onClick={() => handleTargetClick(p.instanceId)}
                  difficulty={Math.min(1 + score / 15, 3)}
                  pokemon={p}
                  position={p.position!}
                />
              ))}
            </div>
          </>
        )}

        {gameOver && (
          <GameOver
            score={score}
            highScore={highScore}
            onRestart={startGame}
          />
        )}
      </div>
    </div>
  );
}

export default App;