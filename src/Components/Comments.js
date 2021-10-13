import React, { Component } from 'react';
import Loader from './Loader';
import Comment from './Comment';
import { ARTICLES_URL } from '../utils/constant';
export default class Comments extends Component {
  componentDidMount() {
    this.props.fetchComments();
  }
  handleDelete = (id) => {
    // DELETE /api/articles/:slug/comments/:id
    fetch(ARTICLES_URL + `/${this.props.slug}/comments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + this.props.user.token,
      },
    }).then(this.props.fetchComments)
  };
  render() {
    if (this.props.state.errors)
      return (
        <p className="text-red-500 text-center mt-4">
          {this.props.state.errors}
        </p>
      );
    if (!this.props.state.comments) return <Loader />;
    return (
      <ul className="mt-4">
        {this.props.state.comments.map((comment) => {
          console.log(comment);
          return (
            <Comment
              comment={comment}
              key={comment.id}
              handleDelete={this.handleDelete}
              user = {this.props.user}
            />
          );
        })}
      </ul>
    );
  }
}
