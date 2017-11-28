import React from 'react';


class Album extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            details: {},
            isLoading: false,
            error: null,
        };
        // bind functions that uses setState()
    }


    componentDidMount() {
        this.setState({ isLoading: true });

        const album = this.props.album;

        // console.log("album: ", album.id);

        fetch(`http://localhost:3001/spotify/details/${album.id}`,
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

        console.log("album details: ", details);
        console.log(this.props);

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

        return(
            <div>
                <img src={image.url}/>
                <div className="album-details">
                    <div className="album-name">{album.name}</div>
                    <p className="genre">{genre}</p>
                    <div className="stars">{stars}</div>
                    <div className="date">{releaseDate}</div>
                </div>
                <div className="tracks">
                    <ol>
                    {
                        tracks.map((track) => (
                            <li>
                                {track.name}
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