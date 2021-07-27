import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = ({match}) => {
  return (
    <nav class="main-nav">
      <ul>
        <li><NavLink exact to='/'>Northern Lights</NavLink></li>
        <li><NavLink to={'/dogs'}>Mtn. Everest</NavLink></li>
        <li><NavLink to='/computers'>Victoria Falls</NavLink></li>
      </ul>
    </nav>
  )
}
export default Nav;
