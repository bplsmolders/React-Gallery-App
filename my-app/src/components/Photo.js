import React, {Component} from 'react';
import Axios from 'axios';
import apiKey from '../config.js';


class Photo extends Component {
    createUrl = (server, id, secret) => {
        return `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`
    };

    render() {
        return (
            <div class="photo-container">
            
            <h2>Results</h2>
                <ul>
                    {this.props.data.map(picture => 
                        <li>
                            <img src= {this.createUrl(picture.server, picture.id, picture.secret)} alt= "" ></img>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default Photo