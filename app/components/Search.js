import React from 'react';

class Search extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            searchText: '',
            queryValue: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.queryValue) {
            // console.log("update query");
            this.setState({
                queryValue: nextProps.queryValue
            });
        }
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

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return(
            <div className="search">
                <input type="search"
                       placeholder={`Search ${this.props.query}`}
                       onKeyPress={this.updateSearchText.bind(this)}
                        value={this.state.queryValue}
                       name="queryValue"
                       onChange={(value) => this.onChange(value)} />
            </div>
        );
    }
}


export default Search;