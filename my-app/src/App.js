import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Axios from 'axios';


//import components
import Nav from './components/Nav';
import Photo from './components/Photo';
import apiKey from './config.js';
import SearchForm from './components/SearchForm'




class App extends Component {
  constructor(){
    super();
    this.state = {
      pictures: [],
      api: apiKey   //replace apiKey with your personal key
    }
  }

  componentDidMount(){
    this.performSearch();
  }

  performSearch = (query = 'flower') => {
    Axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.state.api}&tags=${query}&per_page=24&page=1&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          pictures: response.data.photos.photo,
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });    
  }

  render() {
    return (
      <BrowserRouter>
      <div className="container" >
        <SearchForm onSearch={this.performSearch} />
        <Nav />
        <div class="photo-container">
          <h2>Results</h2>
          <Photo data={this.state.pictures} />
          <Route path="/:topic" component={Photo}/>
        </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
