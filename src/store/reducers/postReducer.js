// the reducer get executed after applying an action to update the state and give an error message if its the case
const initState = {};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_POST":
      console.log("post created", action.post);
      return state;
    case "CREATE_POST_ERROR":
      console.log("create post error", action.err);
      return state;
    case "DELETE_POST":
      console.log("post deleted", action.id);
      return state;
    case "CDELETE_POST_ERROR":
      console.log("create post error", action.err);
      return state;
    case "EDIT_POST":
      console.log("post edited", action.id);
      return state;
    case "EDIT_POST_ERROR":
      console.log("edit post error", action.err);
      return state;
    default:
      return state;
  }
};

export default postReducer;
