import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Axios from 'axios';


//import components
import Nav from './components/Nav';
import Photo from './components/Photo';
import SearchPhoto from './components/SearchPhoto'
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
      loading: true,
      lastSearch: ''
    }
  }

  // the component perfoms the searches, inclusive the default searches 'drums', 'guitars' and 'bass'.
  componentDidMount(){
    this.performSearch();

    Axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.state.api}&tags=Drums&per_page=24&page=1&format=json&nojsoncallback=1`)
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

    Axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.state.api}&tags=Guitar&per_page=24&page=1&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        Guitarspictures: response.data.photos.photo,
        loading: false
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  //performs the search whenever the searchbar is used and displays default pictures when entering the site. 
  performSearch = (query = 'music') => {
    this.setState({
      lastSearch: query,
    })
    Axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.state.api}&tags=${query}&per_page=24&page=1&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          pictures: response.data.photos.photo
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });  
  }
  
  // Note that in the path routes for the component Photo, there is an almost simular extra component "SearchPhoto".
  // This component handles specific data for history functionality.
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
            <Route exact path="/drum" render={() => <Photo data={this.state.Drumspictures} title='drum' />} />
            <Route exact path="/bass" render={() => <Photo data={this.state.Basspictures} title='bass' />} />
            <Route exact path="/guitar" render={() => <Photo data={this.state.Guitarspictures} title='guitar' />} />
            <Route exact path="/:topic" render={(props) => <SearchPhoto data={this.state.pictures} lastSearch={this.state.lastSearch} performSearch={this.performSearch} {...props}/>} />
            <Route component={NotFound404} />
          </Switch>
        }
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
