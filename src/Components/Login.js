import React, { Component } from 'react';
import { LOGIN_URL } from '../utils/constant';
import validate from '../utils/validate';
import { withRouter } from 'react-router';
import UserContext from './UserContext';
class Login extends Component {
  state = {
    email: 'username5@gmail.com',
    password: 'username5',
    errors: {
      email: '',
      password: '',
    },
  };
  static contextType = UserContext;
  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = this.state.errors;
    validate(errors, name, value);
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      user: {
        email: this.state.email,
        password: this.state.password,
      },
    };
    fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errors) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then((user) => {
        this.context.updateUser(user.user);
        this.setState({ email: '', password: '' });
        this.props.history.push('/');
      })
      .catch((errors) =>
        this.setState({
          errors: { email: 'Email or password is incorrect!' },
        })
      );
  };
  render() {
    let { email, password, errors } = this.state;
    return (
      <section className="text-center pt-14">
        <h2 className="text-4xl">Sign In</h2>
        <button className="text-primary mt-2">Need an account?</button>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            name="email"
            className="block w-132 border rounded-lg border-gray-300 px-2  py-3 mx-auto mt-4 text-lg"
            placeholder="Email"
            value={email}
          />
          <span className="text-red-500">{errors.email}</span>
          <input
            onChange={this.handleChange}
            name="password"
            type="password"
            className="block w-132 border rounded-lg border-gray-300 px-2  py-3 mx-auto mt-4 text-lg"
            placeholder="Password"
            value={password}
          />
          <span className="text-red-500 block">{errors.password}</span>
          <button
            className="bg-primary px-6 py-3 rounded text-white text-lg inline-block ml-108 mt-6 submit"
            type="submit"
            disabled={errors.email || errors.password}
          >
            Sign In
          </button>
        </form>
      </section>
    );
  }
}

export default withRouter(Login);
