import React from 'react';
import ArtistItem from "./ArtistItem";
import {Link, Route} from 'react-router-dom';

const util = require('util');
const fetch = require ('node-fetch');

import ArtistAPI from '../api/ArtistAPI';

class ArtistList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hits: [],
            isLoading: false,
            error: null,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        fetch('http://localhost:3001/spotify',
            {})
            .then(response => response.json())
            .then(data => console.log(data));

        fetch('http://localhost:3001/spotify/search',
            {})
            .then(response => response.json())
            .then(data => console.log(data));
    }

    render() {

        return (
            <div>
                Search results:
                <ul>
                    {
                        ArtistAPI.all().map((a) => (
                            <li key={a.id}>
                                <Link to={`/artist/${a.id}`}>
                                    <div className="artist-search-box">
                                        <ArtistItem name={a.name}/>
                                    </div>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}


export default ArtistList;