import React from 'react';
import Track from "./Track";
import {Link} from 'react-router-dom';
const PORT = 80;
const HOST = '54.164.244.153';

class Album extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            details: {},
            isLoading: false,
            error: null,
            // showPopup: false,
        };
        // bind functions that uses setState()
    }


    componentDidMount() {
        this.setState({ isLoading: true });

        const album = this.props.album;

        // console.log("album: ", album.id);



        fetch(`http://${HOST}:${PORT}/spotify/details/${album.id}`,
            {})
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
            })
            .then(data =>  {
                this.setState({ details: JSON.parse(data), isLoading: false })
            })
            .catch(error => this.setState( { error, isLoading: false } ));
    }


    getStarsFromPopularity(popularity){
        const popularityOutOf5 = Math.floor(popularity * 0.05);
        const stars = [];

        let i=0;

        for(i=0; i<popularityOutOf5;i++) {
            stars.push(<span className="star" key={i}>★</span>);
        }

        for(let j=i; j<5;j++) {
            stars.push(<span className="star" key={j}>☆</span>);
        }
        return stars;
    }





    render() {

        const { details, isLoading } = this.state;

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        // console.log("album details: ", details);
        // console.log(this.props);

        const album = this.props.album;

        const genreArray =  details.genre || this.props.artistGenre || [];      // if album has no genre, take artist's
        let genre = genreArray.length ? genreArray[0] : "";     // take first genre

        const releaseDate = details.release_date ? (new Date(details.release_date)).getFullYear() : 0;
        const stars = this.getStarsFromPopularity(details.popularity);
        const tracks = details.tracks ? details.tracks.items : [];

        let image = "";
        if (album.images && album.images.length) {
            image = album.images[0];
        }

        const artist = (this.props.newrelease && album.artists.length) ? album.artists[0] : null ;

        return(
            <div>
                <img src={image.url}/>
                <div className="album-details">
                    {
                        artist ?
                            <div className="artist-link">
                                <Link key={artist.id} to={{pathname: `/artists/${artist.id}`}}>
                                    {artist.name}
                                </Link>
                            </div>
                            : null
                    }
                    <div className="album-name">{album.name}</div>
                    <p className="genre">{genre}</p>
                    <div className="stars">{stars}</div>
                    <div className="date">{releaseDate}</div>
                </div>
                <div className="arrowDown">⇓</div>
                <div className="tracks">
                    <ol>
                    {
                        tracks.map((track) => (
                            <li key={track.id}>
                                <Track track={track} albumName={album.name} image={image.url} />
                            </li>
                        ))
                    }
                    </ol>
                </div>
            </div>
        );
    }
}

export default Album;
