import React, { Component } from 'react';

// Components to Import
import Photo from './components/Photo.js';
import NotFound from '../components/NotFound.js';

class PhotoContainer extends Component {

    handleAxiosFlickerReq = () => {
      let results = this.props.data;
      let photos;
      
      // NOTE May Have to change the props paths
      if (results.length > 0) {
          photos = results.map(photo => {
                    <Photo url={this.props.url} key={this.props.id}
                   })
      } else {
          photos = <NotFound />
      }
    }

    render () {
      return (
        <div className="photo-container">
          <h2>Results</h2>
          <ul>
            {this.handleAxiosFlickerReq}
          </ul>
        </div>
      )
    }
}

export default PhotoContainer;