import React from 'react';
const PORT = 80;

class Track extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showPopup: false,
        };
    }

    toggleTrackPopup() {
        this.setState( { showPopup: !this.state.showPopup } );
    }


    msToMinutesSeconds(ms){
        let minutes = Math.floor(ms / 60000);
        let seconds = Math.floor((ms % 60000)/1000);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }


    render() {

        const track = this.props.track;
        const albumName = this.props.albumName;
        const image = this.props.image;
        // console.log(track);

        return(
            <div>
                <a onClick={this.toggleTrackPopup.bind(this)}>
                    {track.name}
                </a>
                <div className="track"
                     style={{visibility: this.state.showPopup ? "visible" : "hidden" }}  >
                    <div className='popup'>
                        <div className='popup_inner'>
                            <div className="popup_container">
                                <div className="close-button-right">
                                    <button onClick={this.toggleTrackPopup.bind(this)}>
                                        [ X ]
                                    </button>
                                </div>
                                <div className="details-left">
                                    <h1>{track.name}</h1>
                                    <h2>{track.artists[0].name}</h2>
                                    <h3>{albumName}</h3>
                                    <h3>Track #{track.track_number} Duration: {this.msToMinutesSeconds(track.duration_ms)}</h3>
                                </div>
                                <div className="media-bottom">
                                    <img src={image}/>
                                    <div className="player">
                                        {
                                            track.is_playable ?
                                                <audio controls="controls">
                                                    <source src={track.preview_url} type="audio/mpeg"/>
                                                </audio>
                                                : <div>Not playable</div>
                                        }
                                    </div>

                                    <h3>
                                        <a href={track.external_urls.spotify}
                                            target="_blank">
                                            Open in Spotify
                                        </a>
                                    </h3>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Track;
