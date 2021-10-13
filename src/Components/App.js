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
        <ErrorBoundary>
          <Header isUserLogged={isUserLogged} user={user} />
        </ErrorBoundary>
        <ErrorBoundary>
          {this.state.isUserLogged ? (
            <AuthenticatedApp
              user={user}
              isUserLogged={isUserLogged}
              updateUser={this.updateUser}
            />
          ) : (
            <UnAuthenticatedApp
              updateUser={this.updateUser}
              isUserLogged={isUserLogged}
            />
          )}
        </ErrorBoundary>
      </div>
    );
  }
}

function AuthenticatedApp(props) {
  return (
    <Switch>
      <Route exact path="/">
        <Home user={props.user} />
      </Route>
      <Route path="/articles/:slug">
        <SinglePost isUserLogged={props.isUserLogged} user={props.user} />
      </Route>
      <Route path="/new-post">
        <NewPost user={props.user} />
      </Route>
      <Route path="/edit-article/:slug">
        <EditArticle user={props.user} />
      </Route>
      <Route path="/setting">
        <Setting user={props.user} updateUser={props.updateUser} />
      </Route>
      <Route path="/profile/:username" exact>
        <Profile user={props.user} />
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
        <Home user={props.user} />
      </Route>
      <Route path="/articles/:slug">
        <SinglePost isUserLogged={props.isUserLogged} user={props.user} />
      </Route>
      <Route path="/login">
        <Login updateUser={props.updateUser} />
      </Route>
      <Route path="/signup">
        <SignUp updateUser={props.updateUser} />
      </Route>
      <Route path="/profile/:username" exact>
        <Profile user={props.user} />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

export default App;
