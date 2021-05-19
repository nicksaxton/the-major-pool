import classNames from 'classnames';
import * as React from 'react';
import {
  Link,
  Route,
  Switch,
  useLocation,
  useRouteMatch
} from 'react-router-dom';

import useEntries from '../hooks/useEntries';
import useUsers from '../hooks/useUsers';

import LeaderboardTable from '../components/LeaderboardTable';
import Loader from '../components/Loader';
import { TournamentType } from '../types';
import { OverallLeaderboard } from '../components/OverallLeaderboard';

const Leaderboard = () => {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();

  const { entries, loadingEntries } = useEntries();
  const { loadingUsers, userMap } = useUsers();

  if (loadingEntries || loadingUsers) {
    return <Loader />;
  }

  return (
    <>
      <div className="mb-2">
        <h1 className="has-text-weight-bold is-size-2">Leaderboard</h1>
      </div>
      <div className="tabs">
        <ul>
          <li
            className={classNames({
              'is-active': pathname === '/leaderboard'
            })}
          >
            <Link to={path}>Overall</Link>
          </li>
          <li
            className={classNames({
              'is-active': pathname === '/leaderboard/masters'
            })}
          >
            <Link to={`${path}/masters`}>The Masters</Link>
          </li>
          <li
            className={classNames({
              'is-active': pathname === '/leaderboard/pga'
            })}
          >
            <Link to={`${path}/pga`}>PGA Championship</Link>
          </li>
          <li
            className={classNames({
              'is-active': pathname === '/leaderboard/us'
            })}
          >
            <Link to={`${path}/us`}>U.S. Open</Link>
          </li>
          <li
            className={classNames({
              'is-active': pathname === '/leaderboard/open'
            })}
          >
            <Link to={`${path}/open`}>The Open Championship</Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route path={`${path}/masters`}>
          <OverallLeaderboard type={TournamentType.Masters} />
        </Route>
        <Route path={`${path}/open`}>
          <LeaderboardTable
            entries={entries}
            type={TournamentType.Open}
            userMap={userMap}
          />
        </Route>
        <Route path={`${path}/pga`}>
          <OverallLeaderboard type={TournamentType.PGA} />
        </Route>
        <Route path={`${path}/us`}>
          <LeaderboardTable
            entries={entries}
            type={TournamentType.US}
            userMap={userMap}
          />
        </Route>
        <Route path={`${path}`}>
          <OverallLeaderboard type={TournamentType.Overall} />
        </Route>
      </Switch>
    </>
  );
};

export default Leaderboard;
