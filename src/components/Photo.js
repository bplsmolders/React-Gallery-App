import React, {Component} from 'react';
import NoResults from './NoResults'

class Photo extends Component {
    createUrl = (server, id, secret) => {
        return `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`
    };

    // renders picture
    render() {
        return (
            <div className="photo-container">

                {/* checks for results and adapts title */}
                {
                    (this.props.data.length===0)
                    ?    <NoResults />
                    : <h2 key={this.props.title} > {this.props.title} Pictures </h2>
                }

                {/* Creates a list item for each image */}
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