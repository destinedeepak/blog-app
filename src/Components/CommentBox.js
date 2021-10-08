import React, { Component } from 'react';
import { ARTICLES_URL } from '../utils/constant';
import validate from '../utils/validate';
import Comment from './Comments';
export default class CommentBox extends Component {
  state = {
    body: '',
  };
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
        Authorization: 'Token ' + this.props.user.token,
      },
      body: JSON.stringify(body),
    }).then(res=>res.json()).then(console.log)
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
        <Comment slug={this.props.slug} user={this.props.user} />
      </section>
    );
  }
}