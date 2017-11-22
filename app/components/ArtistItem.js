import React from 'react';
import ReactDOM from 'react-dom';


class ArtistItem extends React.Component {
    render() {
        return(
            <div>
                <img />
                <div className="artist-name">{this.props.name}</div>
            </div>
        );
    }
}


export default ArtistItem;