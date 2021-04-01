import React from 'react';
import Axios from 'axios';
import apiKey from '../config.js';


const Photo = ({match}) => {
    const topic = match.params.topic;
    const api = apiKey

    let pictures=[];
    const performSearch = (query = 'flower') => {
        Axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api}&tags=${query}&per_page=24&page=1&format=json&nojsoncallback=1`)
          .then(response => {
              pictures= response.data.photos.photo
          })
          .catch(error => {
            console.log('Error fetching and parsing data', error);
          });    
      }
      const results = performSearch(topic)

      const createUrl = (server, id, secret) => {
        return `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`
    };


    return (
        <ul>
            {pictures.map(picture => 
                <li>
                    <img src= {createUrl(picture.server, picture.id, picture.secret)} alt= "" ></img>
                </li>
            )}
        </ul>
    )
}

export default Photo