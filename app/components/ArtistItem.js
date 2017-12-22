import React from 'react';
import connection from '../api/connection';

class ArtistItem extends React.Component {
    render() {

        const artist = this.props.artist;
        let image = "";

        if (artist.images && artist.images.length) {
            image = artist.images[0];
        }

        return(
            <div>
                <img src={image.url}/>
                <div className="artist-name">{artist.name}</div>
            </div>
        );
    }
}


export default ArtistItem;
