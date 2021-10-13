import React, { Component } from 'react';
import Posts from './Posts';
// import Banner from './Banner';
import Tags from './Tags';
import { ARTICLES_URL } from '../utils/constant';
import Pagination from './Pagination';
import FeedNav from './FeedNav';
export default class Home extends Component {
  state = {
    articles: null,
    error: null,
    articlesCount: 0,
    articlePerPage: 10,
    activePageIndex: 0,
    activeNav: 'global',
    activeTag: '',
  };
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.activePageIndex !== this.state.activePageIndex ||
      prevState.activeTag !== this.state.activeTag ||
      prevState.activeNav !== this.state.activeNav
    ) {
      this.fetchData();
    }
  }
  handleNavigation = (tab) => {
    this.setState({ activeTag: '', activeNav: tab, activePageIndex: 0 });
  };
  addTagTab = (tag) => {
    this.setState({ activeTag: tag, activeNav: '', activePageIndex: 0 });
  };
  fetchData() {
    const limit = this.state.articlePerPage;
    const offset = this.state.activePageIndex * 10;
    const tag = this.state.activeTag;
    let feed = this.state.activeNav === 'your' ? '/feed' : '';
    let token = this.props.user ? 'Token ' + this.props.user.token : '';
    fetch(
      ARTICLES_URL +
        `${feed}/?limit=${limit}
        &offset=${offset}` +
        (tag && `&tag=${tag}`),
      {
        method: 'GET',
        headers: {
          'Conten-Type': 'application/json',
          Authorization: token,
        },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        else return res.json();
      })
      .then((data) =>
        this.setState({
          articles: data.articles,
          articlesCount: data.articlesCount,
        })
      )
      .catch((error) =>
        this.setState({ error: 'Not able to fetch articles!' })
      );
  }
  handlePagination = (pageIndex) => {
    this.setState({ activePageIndex: pageIndex });
  };
  render() {
    let {
      articlesCount,
      articlePerPage,
      activePageIndex,
      activeTag,
      activeNav,
    } = this.state;
    return (
      <main>
        {/* <Banner /> */}
        <div className="px-40">
          <div className="flex">
            <div className="w-8/12">
              <FeedNav
                activeTag={activeTag}
                activeNav={activeNav}
                handleNavigation={this.handleNavigation}
                user={this.props.user}
              />
              <Posts {...this.state} user={this.props.user} />
            </div>
            <div className="w-3/12 ml-12 mt-4">
              <Tags addTagTab={this.addTagTab} activeTag={activeTag} />
            </div>
          </div>
          {articlesCount <= 10 ? (
            ''
          ) : (
            <Pagination
              articlesCount={articlesCount}
              articlePerPage={articlePerPage}
              handlePagination={this.handlePagination}
              activePageIndex={activePageIndex}
            />
          )}
        </div>
      </main>
    );
  }
}
