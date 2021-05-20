import React from 'react';

import {
  Golfers,
  GolferScoreMap,
  RankedEntry,
  TournamentType,
  UserMap
} from '../types';

interface Props {
  cutScores: {
    masters?: number;
    pga?: number;
  };
  entry: RankedEntry;
  golfers: Golfers;
  scoreMap: {
    masters?: GolferScoreMap;
    pga?: GolferScoreMap;
  };
  type: TournamentType;
  userMap: UserMap;
}

const cellStyle = {
  verticalAlign: 'middle'
};

const formatScore = (score: number): string => {
  if (score > 0) {
    return '+' + score;
  } else if (score === 0) {
    return 'E';
  }

  return String(score);
};

export const LeaderboardRow = ({
  cutScores,
  entry,
  golfers,
  scoreMap,
  type,
  userMap
}: Props) => {
  const [expanded, setExpanded] = React.useState(false);

  const mastersGolfers = React.useMemo(() => {
    const mastersScores = scoreMap.masters;
    if (mastersScores) {
      return entry.masters
        .map((pick) => {
          return {
            ...mastersScores[pick],
            name: `${golfers[pick].firstName} ${golfers[pick].lastName}`,
            overallPar: mastersScores[pick]
              ? mastersScores[pick].overallPar
              : (cutScores.masters || 0) + 1
          };
        })
        .sort((a, b) => a.overallPar - b.overallPar);
    } else {
      return [];
    }
  }, [cutScores, entry, golfers, scoreMap]);

  const pgaGolfers = React.useMemo(() => {
    const pgaScores = scoreMap.pga;
    if (pgaScores) {
      return entry.pga
        .map((pick) => {
          return {
            ...pgaScores[pick],
            name: `${golfers[pick].firstName} ${golfers[pick].lastName}`,
            overallPar: pgaScores[pick]
              ? pgaScores[pick].overallPar
              : (cutScores.pga || 0) + 1
          };
        })
        .sort((a, b) => a.overallPar - b.overallPar);
    } else {
      return [];
    }
  }, [cutScores, entry, golfers, scoreMap]);

  return (
    <tr onClick={() => setExpanded((e) => !e)}>
      <td
        className="has-text-centered is-size-4"
        style={{ ...cellStyle, textAlign: 'center' }}
      >
        {entry.place}
      </td>
      <td style={cellStyle}>
        <div className={`${expanded ? 'mt-3' : ''}`}>
          {entry.name}&nbsp;
          <span className="has-text-grey">{`(${
            userMap[entry.userId].firstName
          } ${userMap[entry.userId].lastName})`}</span>
        </div>
        {expanded && (
          <>
            {(type === TournamentType.Masters ||
              type === TournamentType.Overall) && (
              <>
                {type === TournamentType.Overall && (
                  <p className="mb-0 is-size-7 mt-3">The Masters</p>
                )}
                <table
                  className={`table is-bordered is-fullwidth is-narrow ${
                    type !== TournamentType.Overall ? 'mt-3' : ''
                  }`}
                >
                  <tbody>
                    {mastersGolfers.map((golfer) => (
                      <tr
                        className={`${golfer.status ? 'has-text-danger' : ''}`}
                      >
                        <td>{golfer.name}</td>
                        <td className="has-text-centered">
                          {formatScore(golfer.overallPar)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            {(type === TournamentType.PGA ||
              type === TournamentType.Overall) && (
              <>
                {type === TournamentType.Overall && (
                  <p className="mb-0 is-size-7 mt-3">PGA Championship</p>
                )}
                <table
                  className={`table is-bordered is-fullwidth is-narrow ${
                    type !== TournamentType.Overall ? 'mt-3' : ''
                  }`}
                >
                  <tbody>
                    {pgaGolfers.map((golfer) => (
                      <tr
                        className={`${golfer.status ? 'has-text-danger' : ''}`}
                      >
                        <td>{golfer.name}</td>
                        <td className="has-text-centered">
                          {formatScore(golfer.overallPar)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </>
        )}
      </td>
      <td className="is-size-3 has-text-centered" style={cellStyle}>
        {formatScore(entry.overallScore)}
      </td>
    </tr>
  );
};
