import React from 'react';

class Search extends React.Component {
    render() {
        return(
            <div>
                <p>
                    <input type="text" placeholder={`Search ${this.props.query}`}/>
                </p>

            </div>
        );
    }
}


export default Search;