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
            query: "",
        };

        // bind functions that uses setState()
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        const query = this.props.location.state;
        // if query is set, redo search
        if(query) {
            this.handleSearch(query.artistQuery);
            this.setState({query: query.artistQuery});
        }
    }


    handleSearch(query) {
        // console.log("search query: ", query);

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
                this.setState({
                    hits: JSON.parse(data),
                    isLoading: false,
                })

                if(this.state.hits.length) {
                    this.props.history.push(`/artists?q=${query}`, {artistQuery: query});  // push query on history

                    this.setState({ headline: "Search results for: " + query});
                } else {
                    this.setState({ headline: "No results found for: " + query});
                }

            })
            .catch(error => this.setState({error, isLoading: false}));
    }


    render() {
        const {query, hits, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        return (
            <div>
            <Search query="Artists"
                    onSearch={this.handleSearch}
                    queryValue={query}/>
            <h2>{this.state.headline}</h2>
            <div className="artists-container">
            {
                hits.map((a) => (
                    <Link key={a.id} to={{pathname: `/artists/${a.id}`}}>
                        <div className="artist">
                            <ArtistItem artist={a}/>
                        </div>
                    </Link>
                ))
            }
            </div>
        </div> );

    }

}

export default ArtistList;