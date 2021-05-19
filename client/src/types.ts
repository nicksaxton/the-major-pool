export type Entry = {
  entryId: string;
  masters: number[];
  name: string;
  open: number[];
  pga: number[];
  us: number[];
  userId: string;
};

export type Golfer = {
  currentRank: number;
  firstName: string;
  golferId: number;
  imageUrl: string;
  lastName: string;
};

export type Golfers = {
  [key: string]: Golfer;
};

export enum TournamentType {
  Masters = 'masters',
  Open = 'open',
  Overall = 'overall',
  PGA = 'pga',
  US = 'us'
}

export type User = {
  firstName: string;
  lastName: string;
  userId: string;
};

export type UserMap = {
  [key: string]: User;
};

export type ScoresResponse = {
  cutScore: number;
  scoreMap: GolferScoreMap;
};

export type GolferScore = {
  golferId: number;
  overallPar: number;
  status: string;
};

export type GolferScoreMap = {
  [golferId: number]: GolferScore;
};
