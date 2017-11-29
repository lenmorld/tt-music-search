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
                            <Link to="/"><h2>Lenny's music search</h2></Link>
                            <Link to="/artists"><h2>Search</h2></Link>
                            <hr/>
                        </header>
                        <div className="container">
                            <Switch>
                                <Route exact path="/" component={NewReleases}/>
                                <Route exact path="/artists" component={ArtistList}/>
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
