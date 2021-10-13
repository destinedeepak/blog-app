import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PROFILE_URL } from '../utils/constant';
export default class ToggleFollowButton extends Component {
  state = {
    following: null,
    error: null,
  };
  componentDidMount() {
    this.setState({ following: this.props.profile.following });
  }
  handleFollow = (username) => {
    let method = this.state.following ? 'DELETE' : 'POST';
    fetch(PROFILE_URL + `/${username}/follow`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + this.props.currentUser.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((profile) => {
        this.setState({ following: profile.profile.following });
      })
      .catch((error) => {
        this.setState({ error: 'Unable to fetch data!' });
      });
  };
  render() {
    let currentUsername =
      this.props.currentUser && this.props.currentUser.username;
    let { username } = this.props.profile;
    let { error } = this.state;
    if (error)
      return <p className="text-right text-center mt-4 text-red-500">{error}</p>;
    if (!currentUsername) {
      return '';
    } else if (currentUsername === username) {
      return (
        <button className="text-gray-400 border border-gray-500 rounded py-1 px-2 text-sm hover:bg-gray-500">
          <Link to="/setting">
            {' '}
            <i className="fas fa-cog"></i> Edit Profile Setting
          </Link>
        </button>
      );
    }
    return (
      <button
        className="text-gray-400 border border-gray-500 rounded py-1 px-2 text-sm hover:bg-gray-500"
        onClick={() => {
          this.handleFollow(username);
        }}
      >
        <i className="fas fa-user-plus"></i>
        <span className="ml-1">
          {' '}
          {this.state.following ? 'unfollow' : 'follow'} {username}
        </span>
      </button>
    );
  }
}
