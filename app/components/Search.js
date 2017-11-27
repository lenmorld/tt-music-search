import React from 'react';

class Search extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            searchText: '',
        };
    }

    updateSearchText(e) {
        // console.log(this.state.searchText);
        if (e.key === 'Enter') {
            this.setState({
                searchText: e.target.value
            });

            this.props.onSearch(e.target.value);
        }
    }

    render() {
        return(
            <div>
                <div>
                    <input type="search"
                           placeholder={`Search ${this.props.query}`}
                           onKeyPress={this.updateSearchText.bind(this)}  />
                </div>
                <p>
                    {/*{this.state.searchText}*/}
                </p>
            </div>
        );
    }
}


export default Search;