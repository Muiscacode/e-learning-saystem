import React, { useState } from "react";

import { Link } from "react-router-dom";
import { auth, db } from "../config";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selectors";
import { connect } from "react-redux";

const Nav = ({ currentUser }) => {
  const [rol, setRol] = useState(false);
  if (currentUser) {
    const rolref = db.ref(`users/${currentUser.id}`);
    rolref.once("value").then(function (snapshot) {
      if (snapshot.child("rol").val() === "Impulsor") {
        setRol(true);
      } else {
        setRol(false);
      }
    });
  }

  return (
    <nav className="navbar navbar-primary bg-primary container fixed-top">
      <Link to="/">
        <span className="navbar-brand text-white">Home</span>
      </Link>
      {rol && currentUser ? (
        <Link to="/NewPost">
          <span className="text-decoration-none nav-link text-white">
            New Post
          </span>
        </Link>
      ) : (
        <span></span>
      )}
      {currentUser ? (
        <Link to="/">
          <div
            className="option text-decoration-none nav-link text-white"
            onClick={() => {
              auth.signOut();
            }}
          >
            SIGN OUT
          </div>
        </Link>
      ) : (
        <Link to="/Login">
          <span className="navbar-brand text-white">Login</span>
        </Link>
      )}
    </nav>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Nav);
