import React from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

require('../style.scss');

// components
import ArtistList from "./ArtistList";
import Artist from "./Artist";

class App extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <a href="/"><h2>Lenny's music search</h2></a>
                    <hr/>
                </header>
                <BrowserRouter>
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={ArtistList}/>
                            <Route path='/artist/:id' component={Artist}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}


export default App;
