import React from 'react';
const PORT = 80;
const HOST = '54.164.244.153';

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
