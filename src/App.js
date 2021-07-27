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
    rainbows: [],
    photos: [],
    loading: true
  }

  handleSearch = (query) => {
    axios.get(``)
      .then(response => {
        this.setState({
          photos: ,
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
          <SearchForm onSearch={this.handleSearch} />
          <Nav />
          {this.state.loading ? <p>Loading...</p> :
            <Switch>
              <Route exact path="/" render={ () => < Redirect to="/sunsets" /> } />
              <Route exact path="/sunsets" render={ () => < PhotoContainer data={this.state.sunsets} /> } />
              <Route exact path="/waterfalls" render={ () => < PhotoContainer data={this.state.waterfalls} /> } />
              <Route exact path="/rainbows" render={ () => < PhotoContainer data={this.state.rainbows} /> } />
              <Route exact path="/search/:query" render={ () => < PhotoContainer data={this.state.photos} /> } />
              <Route component={ErrorRoute} />
            </Switch>
          }
        </div>
      </BrowserRouter>
    )
  }
}

export default App;