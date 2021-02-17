import * as React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar is-black">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item is-size-4" to="/">
            The Major Pool
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
