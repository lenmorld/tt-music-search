import React from 'react';

import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';

require('../style.scss');

// components
import ArtistList from "./ArtistList";
import Artist from "./Artist";
import NewReleases from "./NewReleases";

class App extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <header>
                            <Link to="/"><h1 className="banner">Lenny's music search</h1></Link>
                            <nav>
                                <ul>
                                    <Link to="/"><li><h3>Search Artists</h3></li></Link>
                                    <Link to="/newreleases"><li><h3>New Releases</h3></li></Link>
                                </ul>
                            </nav>
                            <hr/>
                        </header>
                        <div className="container">
                            <Switch>
                                <Route exact path="/" component={ArtistList}/>
                                <Route exact path="/artists" component={ArtistList}/>
                                <Route exact path="/newreleases" component={NewReleases}/>
                                <Route path='/artists/:id' component={Artist}/>
                            </Switch>
                        </div>
                    </div>

                </BrowserRouter>
            </div>
        );
    }
}


export default App;
