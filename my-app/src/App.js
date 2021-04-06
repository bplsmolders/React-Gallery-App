import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Axios from 'axios';


//import components
import Nav from './components/Nav';
import Photo from './components/Photo';
import apiKey from './config.js';
import SearchForm from './components/SearchForm'
import NotFound404 from './components/NotFound404'


class App extends Component {
  constructor(){
    super();
    this.state = {
      pictures: [],
      Drumspictures: [],
      Basspictures: [],
      Guitarspictures: [],
      api: apiKey,  //replace apiKey with your personal key
      loading: false
    }
  }

  componentDidMount(){
    this.performSearch();

    Axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.state.api}&tags=drums&per_page=24&page=1&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        Drumspictures: response.data.photos.photo,
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });    

    Axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.state.api}&tags=Bass&per_page=24&page=1&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        Basspictures: response.data.photos.photo,
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });    

    Axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.state.api}&tags=guitars&per_page=24&page=1&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        Guitarspictures: response.data.photos.photo,
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  performSearch = (query = 'music') => {
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

  resetLoading = () => {
    this.setState({
      loading: true
    });
  }

  render() {
    return (
      <BrowserRouter>
      <div className="container" >
        <Route  render={() => <SearchForm onSearch={this.performSearch} />} />
        <Nav />
        {(this.state.loading)
        ? <p>Loading...</p>
        : 
          <Switch>
            <Route exact path="/" render={() => <Photo data={this.state.pictures} />} />
            <Route exact path="/drums" render={() => <Photo data={this.state.Drumspictures} />} />
            <Route exact path="/bass" render={() => <Photo data={this.state.Basspictures} />} />
            <Route exact path="/guitars" render={() => <Photo data={this.state.Guitarspictures} />} />
            <Route exact path="/search/:topic" render={() => <Photo data={this.state.pictures} />} />
            <Route component={NotFound404} />
          </Switch>
        }
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
