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


        // get param artist from router link
        // const artistId = this.props.match.params.id;
        const artist = this.props.location.artist;

        return(
            <div>
                <h3>{artist.name}</h3>
                <div>
                    <ul>
                    {
                        albums.map((al) => (
                            <li key={al.id}>
                                <div className="album">
                                    <Album album={al} />
                                </div>
                            </li>
                        ))
                    }
                    </ul>
                </div>

            </div>
        );
    }
}


export default Artist;