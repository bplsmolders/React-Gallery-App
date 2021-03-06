import React, {Component} from 'react';
import NoResults from './NoResults'

class SearchPhoto extends Component {
    //componentDidUpdate is used so the function also gets triggered when using the back and forth history functions of the browser
    componentDidUpdate(){
        this.newSubmit()
    }

    createUrl = (server, id, secret) => {
        return `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`
    };

    /* checks if current html matches with the last searchinput. If not, a new Submit is done with the last done Search.
    This adds history functionality */
    newSubmit = () => {
        if(this.props.match.params.topic !== this.props.lastSearch){
            this.props.performSearch(this.props.match.params.topic)
        }
    }
    
    render() {      
        return(
            <div className="photo-container">
                {/* checks for results and adapts title */}
                {
                    (this.props.data.length===0)
                    ? <NoResults />
                    : <h2>{this.props.match.params.topic} pictures</h2>
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

export default SearchPhoto