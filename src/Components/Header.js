import React from 'react';
import { NavLink, Link } from 'react-router-dom';
export default function Header(props) {
  return (
    <header className="px-40 flex justify-between items-center">
      <button className="text-primary font-bold text-2xl py-3">
        <Link to="/">conduit</Link>
      </button>
      {props.isUserLogged ? (
        <AuthHeader user={props.user} />
      ) : (
        <NonAuthHeader />
      )}
    </header>
  );
}

function NonAuthHeader() {
  return (
    <div>
      <button className="text-gray-400 ml-6">
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </button>
      <button className="text-gray-400 ml-6">
        <NavLink activeClassName="active" to="/login">
          Sign In
        </NavLink>
      </button>
      <button className="text-gray-400 ml-6">
        <NavLink activeClassName="active" to="/signup">
          Sign Up
        </NavLink>
      </button>
    </div>
  );
}

function AuthHeader(props) {
  return (
    <div className="font-roboto"> 
      <button className="text-gray-400 ml-6">
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </button>
      <button className="text-gray-400 ml-6">
        <NavLink activeClassName="active" to="/new-post">
          <i className="fas fa-edit"></i>New Article
        </NavLink>
      </button>
      <button className="text-gray-400 ml-6">
        <NavLink activeClassName="active" to="/setting">
          <i className="fas fa-cog"></i> Setting
        </NavLink>
      </button>
      <button className="text-gray-400 ml-6">
        <NavLink
          activeClassName="active"
          to={`/profile/${props.user.username}`}
        >
          <i className="fas fa-user"></i> {props.user.username}
        </NavLink>
      </button>
    </div>
  );
}
