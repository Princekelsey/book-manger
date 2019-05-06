import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Components/Layout/NavBar";
import SignUp from "./Components/SignUp";
import Landing from "./Components/Layout/Landing";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utilities/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";
import Login from "./Components/Login";
import Dashboard from "./Components/dashboard/Dashboard";
import "./App.css";
import { clearProfile } from "./actions/profileActions";
import PrivateRoute from "./Components/common/PrivateRoute";
import CreateProfile from "./Components/profile-form/CreateProfile";
import EditProfile from "./Components/edit-profile/EditProfile";
import CreateBookRecord from "./Components/profile-form/CreateBookRecord";
import Profile from "./Components/profiles/Profile";
import PageNotFound from "./Components/PageNotFound";

//check for token
if (localStorage.jwtToken) {
  // set the auth token header
  setAuthToken(localStorage.jwtToken);
  // decode the token and get user data
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired login token
  const currenTime = Date.now() / 1000;
  if (decoded.exp < currenTime) {
    // logout user
    store.dispatch(logoutUser());

    // clear  current profile
    store.dispatch(clearProfile());
    // redirect to login
    window.location.href = "/Login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <NavBar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/signUp" component={SignUp} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-bookrecord"
                  component={CreateBookRecord}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/profile/:handle"
                  component={Profile}
                />
              </Switch>
              <Route exact path="/not-found" component={PageNotFound} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
