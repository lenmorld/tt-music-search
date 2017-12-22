import React from 'react';
import Album from "./Album";
const PORT = 80;

class NewReleases extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newAlbums: [],
            isLoading: false,
            error: null,
            headline: "New releases:"
        };

    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch(`http://localhost:${PORT}/spotify/newrelease`,
            {})
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                this.setState({newAlbums: JSON.parse(data), isLoading: false})
            })
            .catch(error => this.setState({error, isLoading: false}));
    }


    render() {

        const {newAlbums, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        return (
            <div>
                <h2>{this.state.headline}</h2>
                <div className="album-container">
                {
                    newAlbums.map((al) => (
                        <div className="album" key={al.id}>
                            <Album album={al} newrelease={true}/>
                        </div>
                    ))
                }
                </div>
            </div>
        );
    }
}

export default NewReleases;
