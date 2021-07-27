import React from 'react';

const Photo = (props) => {
  return (
    <li>
      {// NOTE: May Have to change the props paths}
      <img src={props.url} alt="" />
    </li>
  )
}
export default Photo;