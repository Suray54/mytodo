import React, { Component } from "react";

import { Homepage } from "./component/homepage.componenst";
import Login from "./component/auth/login/login.components";
import Signup from "./component/auth/signup/signup.components";
import Spinner from "./spinner";

import { Switch, Route, withRouter } from "react-router-dom";

import { auth, firestore } from "./firebase/firebase.utils";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setCurrentUser, clearUser } from "./redux/user/user.actions";
import { selectLoading } from "./redux/user/user.selector";
export class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, clearUser, history } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await firestore.doc(`users/${userAuth.uid}`);
        await userRef.onSnapshot((snapShot) => {
          console.log(snapShot.data());
          setCurrentUser({
            ...snapShot.data(),
          });
        });
        history.push("/");
      } else {
        await clearUser();
        history.push("/login");
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    const { isLoading } = this.props;
    return isLoading ? (
      <Spinner />
    ) : (
      <div>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  clearUser: () => dispatch(clearUser()),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
