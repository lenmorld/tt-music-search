import React from 'react';
import Album from "./Album";
import connection from '../api/connection';

class Artist extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            artist: {},
            albums: [],
            isLoading: false,
            error: null,
        };
        // bind functions that uses setState()
    }

    fetchArtist(artistId) {
        fetch(`http://${connection.HOST}:${connection.PORT}/spotify/artists/${artistId}`,
            {})
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
            })
            .then(data =>  {
                this.setState({ artist: JSON.parse(data), isLoading: false })
            })
            .catch(error => this.setState( { error, isLoading: false } ));
    }

    fetchArtistAlbums(artistId) {
        fetch(`http://${connection.HOST}:${connection.PORT}/spotify/albums/${artistId}`,
            {})
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
            })
            .then(data =>  {
                this.setState({ albums: JSON.parse(data), isLoading: false })
            })
            .catch(error => this.setState( { error, isLoading: false } ));
    }


    componentDidMount() {
        this.setState({ isLoading: true });

        const artistId = this.props.match.params.id;

        this.fetchArtist(artistId);
        this.fetchArtistAlbums(artistId);
    }


    render() {

        const { artist, albums, isLoading } = this.state;

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        // console.log("artist", artist);

        return(
            <div>
                <h1>{artist.name}</h1>
                <div className="album-container">
                    {
                        albums.map((al) => (
                            <div className="album" key={al.id}>
                                <Album album={al} artistGenre={artist.genres}/>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}


export default Artist;
