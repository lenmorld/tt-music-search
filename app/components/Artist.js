import React from 'react';
import Album from "./Album";


class Artist extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            albums: [],
            isLoading: false,
            error: null,
        };
        // bind functions that uses setState()
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        // artistId = this.props.id
        const artistId = this.props.match.params.id;

        fetch(`http://localhost:3001/spotify/albums/${artistId}`,
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


    render() {

        const { albums, isLoading } = this.state;

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        const artist = this.props.location.artist;

        return(
            <div>
                <h3>{artist.name}</h3>
                <div class="album-container">
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