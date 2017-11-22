import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

require('../style.scss');

// components
import ArtistList from "./ArtistList";
import Search from "./Search";
import Artist from "./Artist";
import ArtistAPI from "./ArtistAPI";

class App extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <h2>Lenny's music search</h2>
                    <hr/>
                </header>

                <Search query="Artists"/>

                <BrowserRouter>
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={ArtistList}/>
                            <Route
                                path='/artist/:id'
                                render={({match}) => {
                                        const id = match.params.id;
                                        const artist = ArtistAPI.get(id);
                                        return (
                                            <Artist id={id} artist={artist}/>
                                        )
                                    }
                                }/>
                        </Switch>


                    </div>
                </BrowserRouter>
            </div>
        );
    }
}


export default App;
