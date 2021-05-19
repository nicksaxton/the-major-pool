import axios from 'axios';
import React from 'react';

import { Entry, ScoresResponse, TournamentType } from '../types';
import Loader from './Loader';
import useEntries from '../hooks/useEntries';
import useUsers from '../hooks/useUsers';

type RankedEntry = {
  overallScore: number;
  place: string;
} & Entry;

const formatScore = (score: number): string => {
  if (score > 0) {
    return '+' + score;
  } else if (score === 0) {
    return 'E';
  }

  return String(score);
};

const cellStyle = {
  verticalAlign: 'middle'
};

type Props = {
  type: TournamentType;
};

export const OverallLeaderboard = ({ type }: Props) => {
  const { entries, loadingEntries } = useEntries();

  const [loadingScores, setLoadingScores] = React.useState(true);
  const [mastersScoreData, setMastersScoreData] =
    React.useState<ScoresResponse | null>(null);
  const [pgaScoreData, setPGAScoreData] =
    React.useState<ScoresResponse | null>(null);

  const { loadingUsers, userMap } = useUsers();

  React.useEffect(() => {
    let mounted = true;
    const fetchScores = async () => {
      try {
        const { data: mastersData } = await axios.get<ScoresResponse>(
          `/masters`
        );
        setMastersScoreData(mastersData);

        const { data: pgaData } = await axios.get<ScoresResponse>(`/pga`);
        setPGAScoreData(pgaData);
      } finally {
        if (mounted) {
          setLoadingScores(false);
        }
      }
    };

    fetchScores();

    return () => {
      mounted = false;
    };
  }, []);

  const rankedEntries = React.useMemo<RankedEntry[]>(() => {
    if (
      entries.length === 0 ||
      mastersScoreData === null ||
      pgaScoreData === null
    ) {
      return [];
    }

    return entries
      .map((entry) => {
        let overallScore = 0;

        if (type === 'overall' || type === 'masters') {
          overallScore += entry.masters.reduce((total, golferID) => {
            const pick = mastersScoreData.scoreMap[golferID];
            return (total += pick
              ? pick.overallPar
              : mastersScoreData.cutScore + 1);
          }, 0);
        }

        if (type === 'overall' || type === 'pga') {
          overallScore += entry.pga.reduce((total, golferID) => {
            const pick = pgaScoreData.scoreMap[golferID];
            return (total += pick
              ? pick.overallPar
              : pgaScoreData.cutScore + 1);
          }, 0);
        }

        return {
          ...entry,
          place: '-',
          overallScore
        };
      })
      .sort((a, b) => a.overallScore - b.overallScore)
      .map((entry, index, allEntries) => {
        let place = '';

        if (index === 0) {
          if (entry.overallScore === allEntries[index + 1].overallScore) {
            place = 'T1';
          } else {
            place = '1';
          }
        } else {
          if (entry.overallScore === allEntries[index - 1].overallScore) {
            place = allEntries[index - 1].place;
          } else {
            place = String(index + 1);
          }
        }

        return {
          ...entry,
          place
        };
      });
  }, [entries, mastersScoreData, pgaScoreData, type]);

  if (loadingEntries || loadingScores || loadingUsers) {
    return <Loader />;
  }

  return (
    <table className="table is-fullwidth is-narrow is-striped">
      <thead>
        <tr>
          <th className="has-text-centered">Place</th>
          <th>Name</th>
          <th className="has-text-centered">Total Score</th>
        </tr>
      </thead>
      <tbody>
        {rankedEntries.map((entry, index) => (
          <tr key={entry.entryId}>
            <td
              className="has-text-centered is-size-4"
              style={{ ...cellStyle, textAlign: 'center' }}
            >
              {entry.place}
            </td>
            <td style={cellStyle}>
              {entry.name}&nbsp;
              <span className="has-text-grey">{`(${
                userMap[entry.userId].firstName
              } ${userMap[entry.userId].lastName})`}</span>
            </td>
            <td className="is-size-3 has-text-centered">
              {formatScore(entry.overallScore)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
