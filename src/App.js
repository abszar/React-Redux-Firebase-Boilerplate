import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import PostDetails from "./components/Posts/PostDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreatePost from "./components/Posts/CreatePost";
import EditPost from "./components/Posts/EditPost";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/post/:id" component={PostDetails} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/createpost" component={CreatePost} />
            <Route path="/post/edit/:id" component={EditPost} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
