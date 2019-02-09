import React, { Component } from "react";
import { connect } from "react-redux";
import { editPost } from "../../store/actions/postActions";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class CreatePost extends Component {
  state = {
    title: this.props.title ? this.props.title : "",
    content: this.props.content ? this.props.content.id : ""
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

  static getDerivedStateFromProps(nextProps, state) {
    const { post } = nextProps;
    return {
      title: post ? post.title : "",
      content: post ? post.content : ""
    };
  }

  render() {
    const { post, auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    } else if (post) {
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
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="content" className="active">
                Post Content
              </label>
              <textarea
                id="content"
                value={this.state.content}
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
  const post = posts ? posts[id] : null;
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
