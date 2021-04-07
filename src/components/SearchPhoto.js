import React, {Component} from 'react';
import NoResults from './NoResults'

class SearchPhoto extends Component {

    // componentDidUpdate(){
    //  this.checkHistory()
    // }

    createUrl = (server, id, secret) => {
        return `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`
    };
    
    // checkHistory = () => {
    //         if(this.props.match.params.topic !== this.props.lastSearch){
    //             return this.props.performSearch(this.props.lastSearch);
    //         } 
    // }

    render() {
        console.log(this.props.match.params.topic)
        console.log(this.props.lastSearch)

        return (
            <div className="photo-container">
                {
                    (this.props.data.length===0)
                    ?    <NoResults />
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

export default SearchPhoto