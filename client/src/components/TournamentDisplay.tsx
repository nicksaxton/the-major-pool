import * as React from 'react';

import { Golfers } from '../types';

type TournamentDisplayProps = {
    color: 'danger' | 'info' | 'success' | 'warning';
    golfers: Golfers;
    name: string;
    picks: number[];
};

const TournamentDisplay = ({
    color,
    golfers,
    name,
    picks
}: TournamentDisplayProps) => {
    return (
        <div className={`message is-${color}`} style={{ height: '100%' }}>
            <div className="message-body" style={{ height: '100%' }}>
                <h3 className="has-text-weight-bold mb-1">{name}</h3>
                {picks.map((pick) => {
                    const golfer = golfers[pick];

                    if (!golfer) {
                        return null;
                    }

                    // TODO - Add current scores
                    return (
                        <div
                            className="py-2"
                            key={golfer.golferId}
                            style={{ borderTop: '1px solid' }}
                        >
                            {golfer.firstName} {golfer.lastName}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TournamentDisplay;
