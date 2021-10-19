import React, { Component } from 'react';
import { ARTICLES_URL } from '../utils/constant';
import Comment from './Comments';
import UserContext from './UserContext';
export default class CommentBox extends Component {
  state = {
    comments: null,
    errors: null,
    body: '',
  };
  static contextType = UserContext;
  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    let body = {
      comment: {
        body: this.state.body,
      },
    };
    fetch(ARTICLES_URL + `/${this.props.slug}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + this.context.user.token,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok)
          return res.json((error) =>
            Promise.reject('Unable to post comments!')
          );
        return res.json();
      })
      .then(() => {
        this.fetchComments();
        this.setState({ body: '' });
      })
      .catch((errors) => {
        this.setState({ errors: errors });
      });
  };

  fetchComments = () => {
    fetch(ARTICLES_URL + `/${this.props.slug}/comments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + this.context.user.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errors) => Promise.reject());
        }
        return res.json();
      })
      .then((data) => this.setState({ comments: data.comments }))
      .catch((errors) =>
        this.setState({ errors: 'Unable to fetch comments!' })
      );
  };
  render() {
    return (
      <section className="px-48 pt-12">
        <form
          className="border rounded border-gray-200"
          onSubmit={this.handleSubmit}
        >
          <textarea
            name="body"
            rows="3"
            className=" w-full text-gray-400 p-4"
            onChange={this.handleChange}
            placeholder="Write a comment..."
            value={this.state.body}
            required={true}
          ></textarea>
          <div className="flex bg-tertiary flex justify-between p-4 border-t border-gray-200">
            <div>
              <img
                className="w-6 rounded-full h-6 object-cover"
                src="https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg"
                alt=""
              />
            </div>
            <button
              className="bg-primary text-white text-sm px-2 rounded"
              type="submit"
            >
              Post Comment
            </button>
          </div>
        </form>
        <Comment
          slug={this.props.slug}
          fetchComments={this.fetchComments}
          state={this.state}
        />
      </section>
    );
  }
}
