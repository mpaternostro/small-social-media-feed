import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  logo: {},
});

function Navbar() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((st) => !st);
  };

  return (
    <nav
      className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          Posts
        </Link>
        <div
          role="button"
          className={`navbar-burger burger ${isOpen ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={toggleMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isOpen ? "is-active" : ""}`}
      >
        <div className="navbar-start">
          <Link to="/users" className="navbar-item">
            Users
          </Link>
          <Link to="/notifications" className="navbar-item">
            Notifications
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <button className="button is-light">Refresh Notifications</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
