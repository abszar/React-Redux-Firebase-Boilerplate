import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";

const Navbar = props => {
  const { auth, profile } = props;
  // testing if the user is signed in or not to show the proper links in the nav menu
  const links = auth.uid ? (
    <SignedInLinks profile={profile} />
  ) : (
    <SignedOutLinks />
  );
  return (
    <nav className="nav-warpper red">
      <div className="container">
        <Link to="/" className="brand-logo">
          B&S
        </Link>
        {links}
      </div>
    </nav>
  );
};

// getting the auth + profile informations if the user is signed in
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(Navbar);
