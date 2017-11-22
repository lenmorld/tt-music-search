import React from 'react';
import ArtistItem from "./ArtistItem";
import {Link, Route} from 'react-router-dom';

import ArtistAPI from './ArtistAPI';
import Artist from "./Artist";


class ArtistList extends React.Component {
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