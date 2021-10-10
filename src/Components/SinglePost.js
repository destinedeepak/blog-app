import React, { Component } from 'react';
import { ARTICLES_URL } from '../utils/constant';
import Loader from './Loader';
import CommentBox from './CommentBox';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
class SinglePost extends Component {
  state = { article: null, error: null };
  componentDidMount() {
    let slug = this.props.match.params.slug;
    fetch(ARTICLES_URL + '/' + slug)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        else return res.json();
      })
      .then((data) => {
        this.setState({ article: data.article });
      })
      .catch((error) => {
        this.setState({ error: 'Unable to fetch article!' });
      });
  }
  handleDelete = (slug) => {
    // DELETE /api/articles/:slug
    fetch(ARTICLES_URL + '/' + slug, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + this.props.user.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject('Unable to delete!');
        }
      })
      .then(this.props.history.push('/'))
      .catch((error) => this.setState({ error }));
  };
  render() {
    if (this.state.error)
      return (
        <p className="text-red-500 mt-8 text-lg text-center">
          {this.state.error}
        </p>
      );
    if (!this.state.article) return <Loader />;
    let { author, createdAt, title, tagList, body, slug } = this.state.article;
    return (
      <section className="px-40">
        <div className="bg-secondary py-8 pl-40 shadow">
          <h1 className="text-white text-5xl mb-8">{title}</h1>
          <div className="flex items-center">
            <img
              className="w-8 rounded-full h-8 object-cover"
              src={author.image}
              alt={author.username}
            />
            <div className="ml-1">
              <h4 className="text-primary neg-mb-10">{author.username}</h4>
              <time dateTime="" className="text-xs text-gray-400 inline-block">
                {moment(createdAt).format('ddd MMM D YYYY')}
              </time>
            </div>
            {this.props.user.username === author.username ? (
              <div>
                <button className="border border-gray-400 rounded ml-6 px-3 text-sm py-1 text-gray-400 hover:bg-gray-400 hover:text-white">
                  <Link to={`/edit-article/${slug}`}>
                    <i class="fas fa-edit"></i> Edit Article
                  </Link>
                </button>
                <button
                  className="border border-red-400 rounded ml-2 px-3 text-sm py-1 text-red-400 hover:bg-red-400 hover:text-white"
                  onClick={() => {
                    this.handleDelete(slug);
                  }}
                >
                  <i class="fas fa-trash-alt"></i> Delete Article
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <p className="px-40 py-10 text-lg text-gray-600">{body}</p>
        <div>
          <ul className="pl-40">
            {tagList.map((tag) => (
              <li
                key={tag}
                className="text-gray-400 font-light border rounded-lg inline-block px-2 text-xs ml-1"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-gray-300 w-full mx-auto mt-8"></div>
        {!this.props.isUserLogged ? (
          <h4 className="text-center mt-8">
            <Link className="text-primary text-lg" to="/login">
              Sign in
            </Link>{' '}
            or{' '}
            <Link className="text-primary text-lg" to="/singup">
              Sign up
            </Link>{' '}
            to add comments on this article
          </h4>
        ) : (
          ''
        )}
        <CommentBox
          slug={this.props.match.params.slug}
          user={this.props.user}
        />
      </section>
    );
  }
}

export default withRouter(SinglePost);
