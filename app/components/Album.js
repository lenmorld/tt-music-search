import React from 'react';


class Album extends React.Component {

    render() {

        // console.log(this.props);

        return(
            <div>
                <img />
                <div className="album-name">{this.props.album.name}</div>
            </div>
        )
    }
}

export default  Album;