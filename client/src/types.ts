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

export type User = {
    firstName: string;
    lastName: string;
    userId: string;
};

export type UserMap = {
    [key: string]: User;
};
