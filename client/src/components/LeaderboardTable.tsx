import axios from 'axios';
import * as React from 'react';

import {
  Entry,
  GolferScoreMap,
  ScoresResponse,
  TournamentType,
  UserMap
} from '../types';

import Loader from './Loader';

type LeaderboardTableProps = {
  entries: Entry[];
  type: TournamentType;
  userMap: UserMap;
};

const LeaderboardTable = ({
  entries,
  type,
  userMap
}: LeaderboardTableProps) => {
  const [cutScore, setCutScore] = React.useState(0);
  const [loadingScores, setLoadingScores] = React.useState(true);
  const [scores, setScores] = React.useState<GolferScoreMap>({});

  React.useEffect(() => {
    const getScores = async () => {
      try {
        const response = await axios.get<ScoresResponse>(`/${type}`);
        setCutScore(response.data.cutScore);
        setScores(response.data.scoreMap);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingScores(false);
      }
    };

    getScores();
  }, [type]);

  const rankedEntries = React.useMemo(() => {
    if (type !== 'overall') {
      let place = 1;
      return entries
        .map((entry) => {
          const totalScore = entry[type].reduce((total, curr) => {
            return (
              total + (scores[curr] ? scores[curr].overallPar : cutScore + 1)
            );
          }, 0);

          return {
            ...entry,
            totalScore
          };
        })
        .sort((a, b) => a.totalScore - b.totalScore)
        .map((entry, index, sortedEntries) => {
          let previousScore = -1,
            nextScore = -1;
          if (index > 0) {
            previousScore = sortedEntries[index - 1].totalScore;
          }
          if (index < sortedEntries.length - 1) {
            nextScore = sortedEntries[index + 1].totalScore;
          }

          let placeText = '';
          if (entry.totalScore === previousScore) {
            placeText = 'T' + place;
          } else {
            place = index + 1;
            placeText = String(place);
          }

          if (entry.totalScore === nextScore) {
            placeText = 'T' + place;
          }

          return {
            ...entry,
            place: placeText
          };
        });
    } else {
      return [];
    }
  }, [cutScore, entries, scores, type]);

  if (loadingScores) {
    return <Loader />;
  }

  if (!Object.keys(scores).length) {
    return <p>This tournament hasn't started yet.</p>;
  }

  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>Place</th>
          <th>Name</th>
          <th className="has-text-right">Total Score</th>
        </tr>
      </thead>
      {rankedEntries.length > 0 && (
        <tbody>
          {rankedEntries.map((entry) => {
            const user = userMap[entry.userId];

            return (
              <tr key={entry.entryId}>
                <td>{entry.place}</td>
                <td>
                  {entry.name} ({user?.firstName} {user?.lastName})
                </td>
                <td className="has-text-right">{entry.totalScore || 'E'}</td>
              </tr>
            );
          })}
        </tbody>
      )}
    </table>
  );
};

export default LeaderboardTable;
