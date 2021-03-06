// Not Found Component - displays a message when a search does not yield a data response from Flicker

import React from 'react';

const NotFound = () => {
  return (
    <li className="not-found">
      <h1>No Results Found</h1>
      <p>Your search did not yield any results. Please try again.</p>
    </li>
  )
}

export default NotFound;