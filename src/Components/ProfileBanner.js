import React, { Component } from 'react';
import { PROFILE_URL } from '../utils/constant';
import ToggleFollowButton from './ToggleFollowButton';
import Loader from './Loader';

export default class ProfileBanner extends Component {
  state = {
    profile: null,
    error: null,
  };
  componentDidMount() {
    let { username, currentUser } = this.props;
    let token = currentUser ? 'Token ' + currentUser.token : '';
    fetch(PROFILE_URL + '/' + username, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject('Unable to fetch profile!');
        }
        return res.json();
      })
      .then((profile) => this.setState({ profile: profile.profile }))
      .catch((error) => this.setState({ error }));
  }
  render() {
    if (!this.state.profile) return <Loader />;
    let { username, image} = this.state.profile;
    return (
      <div className="bg-gray-200 py-4 text-center">
        <img
          className="w-24 h-24 rounded-full inline-block mt-4 object-cover"
          src={image}
          alt=""
        />
        <h3 className="font-bold text-xl text-gray-700 mt-4">{username}</h3>
        <div className="text-right pr-60">
          <ToggleFollowButton
            profile={this.state.profile}
            currentUser={this.props.currentUser}
          />
        </div>
      </div>
    );
  }
}


