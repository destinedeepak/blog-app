import { Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import SignUp from './SignUp';
import Login from './Login';
import NoMatch from './NoMatch';
import NewPost from './NewPost';
import { Switch } from 'react-router-dom';
import SinglePost from './SinglePost';
import Setting from './Setting';
import React, { Component } from 'react';
import { LocalStorageKey, CURRENT_USER_URL } from '../utils/constant';
import Loader from './Loader';
import Profile from './Profile';
import EditArticle from './EditArticle';
import ErrorBoundary from './ErrorBoundary';
import UserContext from './UserContext';

class App extends Component {
  state = {
    user: null,
    isUserLogged: false,
    userVerifying: true,
  };
  componentDidMount() {
    let token = localStorage[LocalStorageKey];
    if (token) {
      fetch(CURRENT_USER_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((errors) => Promise.reject(errors));
          }
          return res.json();
        })
        .then((user) => {
          this.updateUser(user.user);
        })
        .catch((errors) => {
          console.log(errors);
        });
    } else {
      this.setState({ userVerifying: false });
    }
  }
  updateUser = (user) => {
    this.setState({ user, isUserLogged: true, userVerifying: false });
    localStorage.setItem(LocalStorageKey, user.token);
  };
  render() {
    if (this.state.userVerifying) {
      return <Loader />;
    }
    let { isUserLogged, user } = this.state;
    return (
      <div>
        <UserContext.Provider
          value={{ isUserLogged, user, updateUser: this.updateUser }}
        >
          <ErrorBoundary>
            <Header />
          </ErrorBoundary>
          <ErrorBoundary>
            {this.state.isUserLogged ? (
              <AuthenticatedApp />
            ) : (
              <UnAuthenticatedApp />
            )}
          </ErrorBoundary>
        </UserContext.Provider>
      </div>
    );
  }
}

function AuthenticatedApp(props) {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/articles/:slug">
        <SinglePost />
      </Route>
      <Route path="/new-post">
        <NewPost />
      </Route>
      <Route path="/edit-article/:slug">
        <EditArticle />
      </Route>
      <Route path="/setting">
        <Setting />
      </Route>
      <Route path="/profile/:username" exact>
        <Profile />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}
function UnAuthenticatedApp(props) {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/articles/:slug">
        <SinglePost />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/profile/:username" exact>
        <Profile />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

export default App;
