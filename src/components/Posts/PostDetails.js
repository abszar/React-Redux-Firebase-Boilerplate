import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { deletePost } from "../../store/actions/postActions";
import { Link } from "react-router-dom";

const PostDetails = props => {
  const { post, auth } = props;
  if (!auth.uid) return <Redirect to="/signin" />;
  if (post) {
    const id = props.match.params.id;
    // we will display the deleteBtn and editBtn buttons in case the signed in user own the post
    // you have to use the function bind. Thus, the handler will be triggered only when you click on the delete button
    const deleteBtn = (
      <a
        onClick={props.deletePost.bind(this, id)}
        className="waves-effect waves-teal btn-flat red-text"
      >
        <b>
          <i className="material-icons left">clear</i>Delete
        </b>
      </a>
    );
    const editBtn = (
      <Link
        to={"/post/edit/" + id}
        className="waves-effect waves-teal btn-flat green-text"
      >
        <i className="material-icons left">create</i>Edit
      </Link>
    );

    return (
      <div className="container section post-details post-container">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{post.title}</span>
            <p>{post.content}</p>
            {auth.uid === post.authorId ? deleteBtn : null}
            {auth.uid === post.authorId ? editBtn : null}
          </div>
          <div className="card-action lightn-4 grey-text">
            <div>
              Posted By {post.authorFirstName} {post.authorLastName}
            </div>
            <div>{moment(post.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center post-container">
        <h4>Loading post...</h4>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const posts = state.firestore.data.posts;
  const post = posts ? posts[id] : null;
  return {
    post: post,
    auth: state.firebase.auth
  };
};

const mapDispatshToProps = (dispatch, ownProps) => {
  return {
    deletePost: id => dispatch(deletePost(id, ownProps.history))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatshToProps
  ),
  firestoreConnect([{ collection: "posts" }])
)(PostDetails);
