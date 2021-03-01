import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { fb } from '../firebase';

const Navbar = () => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <nav className="navbar is-black">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item is-size-4" to="/">
            The Major Pool
          </Link>
          <div
            className={classNames('navbar-burger', { 'is-active': expanded })}
            onClick={() => setExpanded(!expanded)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={classNames('navbar-menu', { 'is-active': expanded })}>
          <div className="navbar-end">
            <div className="navbar-item">
              <button
                className="button is-ghost is-small"
                onClick={() => fb.auth().signOut()}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
