export interface PokemonSprite {
  id: number;
  instanceId: string;
  name: string;
  sprite: string;
  caught?: boolean;
  position?: {
    x: number;
    y: number;
  };
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  requirement: number;
  progress: number;
  completed: boolean;
  claimed: boolean;
}

export interface PokemonResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export interface WaveState {
  active: boolean;
  timeLeft: number;
  pokemon: PokemonSprite[];
}