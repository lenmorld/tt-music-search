import React from 'react';
import ArtistItem from "./ArtistItem";
import {Link} from 'react-router-dom';

import Search from "./Search";


class ArtistList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hits: [],
            isLoading: false,
            error: null,
            headline: "",
            prevQuery: null,
        };

        // bind functions that uses setState()
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {

        console.log(this.props);
        if(this.state.prevQuery) {
            this.handleSearch(this.state.prevQuery);
        }
    }
    

    handleSearch(query) {
        console.log("search query: ", query);

        this.setState({headline: "Search results for: " + query});

        fetch('http://localhost:3001/spotify/search',
            {
                method: 'post',
                body: JSON.stringify({query: query}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                this.setState({hits: JSON.parse(data), isLoading: false, prevQuery: query})
            })
            .catch(error => this.setState({error, isLoading: false}));
    }


    render() {
        const {hits, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        return (
            <div>
            <Search query="Artists"
                    onSearch={this.handleSearch} />
            <h2>{this.state.headline}</h2>
            <ul>
                {
                    hits.map((a) => (
                        <li key={a.id}>
                            <Link to={{pathname: `/artists/${a.id}`, artist: a}}>
                                <div className="artist-search-box">
                                    <ArtistItem artist={a}/>
                                </div>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div> );

    }

}

export default ArtistList;