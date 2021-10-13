import React, { Component } from 'react';
export default class FeedNav extends Component {
  render() {
    let { activeTag, handleNavigation, activeNav } = this.props;
    return (
      <nav className="mt-8">
        <ul className="border-b flex">
          {this.props.user && (
            <li
              className={`text-gray-400 px-6 pb-2 ${
                !activeTag && activeNav === 'your'
                  ? 'border-b-2 border-green-500'
                  : ''
              }`}
              onClick={() => {
                handleNavigation('your');
              }}
            >
              Your Feed
            </li>
          )}
          <li
            className={`text-gray-400 px-6 pb-2 ${
              !activeTag && activeNav === 'global'
                ? 'border-b-2 border-green-500'
                : ''
            }`}
            onClick={() => {
              handleNavigation('global');
            }}
          >
            Global Feed
          </li>
          {activeTag && (
            <li
              className={`text-gray-400 px-6 pb-2 ${
                activeTag ? 'border-b-2 border-green-500' : ''
              }`}
            >
              {activeTag}
            </li>
          )}
        </ul>
      </nav>
    );
  }
}
