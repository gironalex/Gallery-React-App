// Photo Component - displays the structure of a single image based on the response from Flicker.

import React from 'react';

const Photo = ( { id, title, secret, server } ) => {
  
  // URL formula provided by Flicker
  let url = `https://live.staticflickr.com/${ server }/${ id }_${ secret }.jpg`;

  return (
    <li>
      <img src={ url } alt={ title } />
    </li>
  )
}
export default Photo;