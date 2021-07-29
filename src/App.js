import React, { Component } from 'react';
import {
  BrowserRouter, Redirect, 
  Route, Switch
} from 'react-router-dom';
import axios from 'axios';

// Components to Import
import SearchForm from './components/SearchForm.js';
import Nav from './components/Nav.js';
import PhotoContainer from './components/PhotoContainer.js'
import ErrorRoute from './components/ErrorRoute.js';

// Api Key to Import
import apiKey from './config.js';

class App extends Component {
  // Initializing state and creating arrays to hold the data from the request
  state = {
    sunsets: [],
    waterfalls: [],
    rivers: [],
    searchPhotos: [],
    searchText: "",
    loading: true
  }

  //Calling ComponentDidMount on the flickerRequest function to ensure that the data from the API request gets stored in their respective states.
  componentDidMount = () => {
    this.flickerRequest();
  }

  flickerRequest = () => {
    const navIcons = ["sunsets", "waterfalls", "rivers"];
    // eslint-disable-next-line array-callback-return
    navIcons.map( nav => {
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${nav}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          [nav]: response.data.photos.photo,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
    });
  }
  
  // Calls on the Flicker API when the search form has been submitted, stores values in their respective state
  handleSearch = (query) => {
    this.setState( { loading: true } );
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({ 
          searchPhotos: response.data.photos.photo,
          searchText: query,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render () {
    return (
      // Rendering components and routing to their appropiate paths
      <BrowserRouter>
        <div className="container">
          <SearchForm  onSearch={this.handleSearch}/>
          <Nav />
          {this.state.loading ? <h1>Loading...</h1> :
            <Switch>
              {/* Redirecting to the /sunsets path, this ensures images are always displayed */}
              <Route exact path="/" render={ () => < Redirect to="/sunsets" /> } />
             
              <Route exact path="/sunsets" render={ () => 
                                          < PhotoContainer 
                                            data={this.state.sunsets} 
                                            name={'Sunsets'}/> } />
              
              <Route exact path="/waterfalls" render={ () => 
                                          < PhotoContainer 
                                            data={this.state.waterfalls} 
                                            name={'Waterfalls'}/> } />
              
              <Route exact path="/rivers" render={ () => 
                                          < PhotoContainer 
                                            data={this.state.rivers} 
                                            name={'Rivers'}/> } />
              
              <Route exact path="/search/:query" render={ ({ match }) => 
                                          < PhotoContainer 
                                            data={this.state.searchPhotos}
                                            update={this.handleSearch}
                                            querySearch={this.state.searchText}
                                            queryRoute={match.params.query} /> } />
              {/* Catches the routes that are not valid */}
              <Route component={ ErrorRoute } />
            </Switch>
          }
        </div>
      </BrowserRouter>
    )
  }
}

export default App;