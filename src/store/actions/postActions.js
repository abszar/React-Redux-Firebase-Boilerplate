export const createPost = post => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // asyns call
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("posts")
      .add({
        ...post,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: "CREATE_POST", post });
      })
      .catch(err => {
        dispatch({ type: "CREATE_POST_ERROR", err });
      });
  };
};

export const deletePost = (id, history) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // asyns call
    const firestore = getFirestore();
    firestore
      .collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_POST", id });
        history.push("/");
      })
      .catch(err => {
        dispatch({ type: "CDELETE_POST_ERROR", err });
      });
  };
};

export const editPost = (id, post, history) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // asyns call
    const firestore = getFirestore();
    firestore
      .collection("posts")
      .doc(id)
      .update(post)
      .then(() => {
        dispatch({ type: "EDIT_POST", id });
        history.push("/");
      })
      .catch(err => {
        dispatch({ type: "EDIT_POST_ERROR", err });
      });
  };
};
