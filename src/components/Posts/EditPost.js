import React, { Component } from "react";
import { connect } from "react-redux";
import { editPost } from "../../store/actions/postActions";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class CreatePost extends Component {
  state = {
    title: "",
    content: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    const id = this.props.match.params.id;
    e.preventDefault();
    this.props.editPost(id, this.state);
    this.props.history.push("/");
  };

  render() {
    const { post, auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    } else if (post) {
      //redirect if the user does not own the post
      if (auth.uid !== post.authorId) return <Redirect to="/" />;
      return (
        <div className="container z-depth-1">
          <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Edit Post</h5>
            <div className="input-field">
              <label htmlFor="title" className="active">
                Title
              </label>
              <input
                type="text"
                id="title"
                defaultValue={post.title}
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="content" className="active">
                Post Content
              </label>
              <textarea
                id="content"
                defaultValue={post.content}
                className="materialize-textarea "
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0">Edit</button>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className="container center">
          <p>Loading post...</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;

  const posts = state.firestore.data.posts;
  const post = posts ? posts[id] : null; // if we already have the posts from firebase we will select the specific post to edit
  return {
    post: post,
    auth: state.firebase.auth
  };
};

const mapDispatshToProps = (dispatch, ownProps) => {
  return {
    editPost: (id, post) => dispatch(editPost(id, post, ownProps.history))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatshToProps
  ),
  firestoreConnect([{ collection: "posts" }])
)(CreatePost);
