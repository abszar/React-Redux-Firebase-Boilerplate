// the reducer get executed after applying an action to update the state and give an error message if its the case
const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("login error");
      return { ...state, authError: "Login failed" };
    case "LOGIN_SUCCESS":
      console.log("login success");
      return { ...state, authError: null };
    case "SIGNOUT_SUCCESS":
      console.log("signout success");
      return state;
    case "SIGNUP_SUCCESS":
      console.log("signUp success");
      return { ...state, authError: null };
    case "SIGNUP_ERROR":
      console.log("signUp error");
      return { ...state, authError: action.err.message };
    default:
      return state;
  }
};

export default authReducer;
