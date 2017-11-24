import React from 'react';


class Artist extends React.Component {
    render() {

        return(
            <div>
                <h3>{this.props.id} - {this.props.artist.name}</h3>
                <div>
                {
                    this.props.artist.albums.map((item) => `${item.name} - ${item.year}`)
                }
                </div>


            </div>
        );
    }
}


export default Artist;