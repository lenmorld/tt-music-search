import React from 'react';


class ArtistItem extends React.Component {
    render() {

        // console.log(this.props);

        return(
            <div>
                <img />
                <div className="album-name">{this.props.name}</div>
            </div>
        );
    }
}


export default ArtistItem;