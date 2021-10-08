import React, { Component } from 'react';
import { ARTICLES_URL } from '../utils/constant';
import validate from '../utils/validate';
import { withRouter } from 'react-router-dom';

class NewPost extends Component {
  state = {
    title: '',
    description: '',
    article: '',
    tagList: '',
    errors: {
      title: '',
      description: '',
      article: '',
      tagList: '',
    },
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = this.state.errors;
    validate(errors, name, value);
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.fetchData();
  };
  fetchData() {
    let { title, description, article, tagList } = this.state;
    tagList = tagList.split(',').map((ele) => ele.trim());
    let data = {
      article: {
        title,
        description,
        article,
        tagList,
      },
    };
    fetch(ARTICLES_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + this.props.user.token,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => Promise.reject(error));
        }
        return res.json();
      })
      .then((article) => {
        console.log(article);
        this.setState({ title: '', description: '', article: '', tagList: '' });
        this.props.history.push('/');
      })
      .catch((errors) => {
        console.log(errors);
      });
  }
  render() {
    let { errors, title, description, article, tagList } = this.state;
    return (
      <section className="text-center pt-14 px-64">
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            name="title"
            className="block w-full border rounded-lg border-gray-300 px-2  py-3 mx-auto mt-4 text-lg"
            placeholder="Article Title"
            value={title}
          />
          <span className="text-red-500 block">{errors.title}</span>
          <input
            onChange={this.handleChange}
            type="text"
            name="description"
            className="block w-full border rounded-lg border-gray-300 px-2 py-3 mx-auto mt-4 h-10 h-10"
            placeholder="description"
            value={description}
          />
          <span className="text-red-500 block">{errors.description}</span>
          <textarea
            onChange={this.handleChange}
            name="article"
            className="block w-full border rounded-lg border-gray-300 px-2 py-3 mx-auto mt-4  text-gray-400"
            rows="6"
            placeholder="Write your article (in markdown)"
            value={article}
          ></textarea>
          <span className="text-red-500 block">{errors.article}</span>
          <input
            onChange={this.handleChange}
            name="tagList"
            type="text"
            className="block w-full border rounded-lg border-gray-300 px-2  py-3 mx-auto mt-4 h-10"
            placeholder="Enter tags sperated by a comma"
            value={tagList}
          />
          <span className="text-red-500 block">{errors.tagList}</span>
          <div className="text-right pt-8">
            <button
              className="bg-primary px-6 rounded text-white h-10 inline-block submit hover:bg-green-700 submit"
              type="submit"
              disabled={
                errors.title ||
                errors.description ||
                errors.article ||
                errors.tagList
              }
            >
              Publish Article
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default withRouter(NewPost);