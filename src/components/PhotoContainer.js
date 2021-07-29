import React, { Component } from 'react';

// Components to Import
import Photo from '../components/Photo.js';
import NotFound from '../components/NotFound.js';

class PhotoContainer extends Component {

  componentDidUpdate = () => {
    if (this.props.querySearch !== this.props.queryRoute) {
      this.props.update(this.props.queryRoute)
    }
  }

  render () {

      let results = this.props.data;
      let header;
      let photos;
      
      // NOTE May Have to change the props paths
      if (results.length > 0) {
          header = `Photos of ${this.props.name || this.props.querySearch}`
          photos = results.map((photo) => (
                    <Photo 
                      id={photo.id} 
                      key={photo.id}
                      title={photo.title} 
                      secret={photo.secret}
                      server={photo.server} 
                      />
                    ));
      } else {
          header = '';
          photos = <NotFound />
      }



    return (
      <div className="photo-container">
        <h2>{ header }</h2>
        <ul>
          { photos }
        </ul>
      </div>
    )
  }
}

export default PhotoContainer;