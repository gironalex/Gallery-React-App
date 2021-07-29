import React, { Component } from 'react';

// Components to Import
import Photo from '../components/Photo.js';
import NotFound from '../components/NotFound.js';

class PhotoContainer extends Component {

  // Calling componentDidUpdate when the state of the searchText, in App.js, changes. 
  componentDidUpdate = () => {
    // Checking if the value of the :query path parameter is not equal to the search value. If true, then the handleSearch, on App.js gets called
    if (this.props.querySearch !== this.props.queryRoute) {
      this.props.update(this.props.queryRoute)
    }
  }

  render () {
      // Using the data from the axios request, the following code will check for the length of the response data to determine what component to render.
      let results = this.props.data;
      let header;
      let photos;
      
  
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