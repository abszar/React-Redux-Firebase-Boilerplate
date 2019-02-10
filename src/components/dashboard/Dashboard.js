import React, { Component } from "react";
import Notifications from "./Notifications";
import PostList from "../Posts/PostList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
  render() {
    const { posts, auth, notifications } = this.props;
    // if the user is not signed in we will redirect to the sign in page
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <PostList posts={posts} />
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications notifications={notifications} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.firestore.ordered.posts,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  };
};

// getting the posts and notifications collections from the firebase DB using firestoreConnect
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "posts", orderBy: ["createdAt", "desc"] },
    { collection: "notifications", limit: 4, orderBy: ["time", "desc"] }
  ])
)(Dashboard);
