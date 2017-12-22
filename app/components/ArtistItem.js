import React from 'react';
const PORT = 80;
const HOST = '127.0.0.1';

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
