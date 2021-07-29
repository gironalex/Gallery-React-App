import React from 'react';

const Photo = ({id, title, secret, server}) => {
  
  let url = `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`;

  return (
    <li>
      <img src={url} alt={title} />
    </li>
  )
}
export default Photo;