const initState = {
  posts: [
    {
      id: "1",
      title: "Title",
      content:
        "this is the content of the post that will be shown in the index by the reducer"
    },
    {
      id: "2",
      title: "Seconde Title",
      content:
        "this is the content of the post that will be shown in the index by the reducer"
    },
    {
      id: "3",
      title: "Third Title",
      content:
        "this is the content of the post that will be shown in the index by the reducer"
    }
  ]
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_POST":
      console.log("post created", action.post);
      return state;
    case "CREATE_POST_ERROR":
      console.log("create ost error", action.err);
      return state;
    default:
      return state;
  }
};

export default postReducer;
