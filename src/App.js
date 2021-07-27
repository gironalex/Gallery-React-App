import React, { Component } from 'react';
import {
  BrowserRouter, 
  Route, Switch
} from 'react-router-dom';

// Components to Import
import SearchForm from './components/SearchForm.js';
import Nav from './components/Nav.js';
import PhotoContainer from './components/PhotoContainer.js'
import ErrorRoute from './components/ErrorRoute.js';

class App extends Component {
  
  state = {
    photos: [],
    loading: true
  }

  render () {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm />
          <Nav />
          <Switch>
            <Route exact path="/" render={() => <PhotoContainer data={this.state.photos}/>}/>
            <Route component={ErrorRoute} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;