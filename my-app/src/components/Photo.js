import React, {Component} from 'react';
import NotFound from './NotFound'

class Photo extends Component {
    createUrl = (server, id, secret) => {
        return `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`
    };

    render() {
        return (
            <div className="photo-container">
                {
                    (this.props.data.length===0)
                    ?    <NotFound />
                    : <h2>Results</h2>
                }
                
                    <ul>
                        {this.props.data.map(picture => 
                            <li key={picture.id}>
                                <img src={this.createUrl(picture.server, picture.id, picture.secret)} alt=""></img>
                            </li>
                        )}
                    </ul>
            </div>
        )
    }
}

export default Photo