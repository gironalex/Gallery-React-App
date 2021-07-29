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
  
  state = {
    sunsets: [],
    waterfalls: [],
    rivers: [],
    searchPhotos: [],
    searchText: "",
    loading: true
  }

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
      <BrowserRouter>
        <div className="container">
          <SearchForm  onSearch={this.handleSearch}/>
          <Nav />
          {this.state.loading ? <h1>Loading...</h1> :
            <Switch>
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
              
              <Route component={ ErrorRoute } />
            </Switch>
          }
        </div>
      </BrowserRouter>
    )
  }
}

export default App;