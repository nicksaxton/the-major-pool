import classNames from 'classnames';
import * as React from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';

const Leaderboard = () => {
    const { path } = useRouteMatch();
    const { pathname } = useLocation();

    console.log(pathname);

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
        </>
    );
};

export default Leaderboard;
