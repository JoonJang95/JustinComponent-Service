import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Sources from './src/components/sources.jsx';
import axios from 'axios';

class Related extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      album: '',
      relatedTracks: '',
      playlists: '',
      id: '',
    };
  }
  componentDidMount() {
    console.log('component mounted');
    var songId;
    var id = window.location.pathname.slice(1, window.location.pathname.length - 1);

    id ? (songId = Number(id)) : (songId = this.state.id);

    this.getRelatedTracks(songId);
  }

  getRelatedTracks(id) {
    console.log('called!');
    axios
      .get(`/tracks/${id}`)
      .then(res => {
        console.log(res);
        this.setState({
          album: res.data.album,
          relatedTracks: res.data.relatedTracks,
          playlists: res.data.playlists,
        });
        console.log(this.state);
      })
      .catch(err => console.log('get err: ', err));
  }

  render() {
    if (this.state.currentTrack === null) {
      return <div>Loading ...</div>;
    } else {
      return (
        <div
          style={{
            width: 300,
            borderLeft: 'groove',
            borderWidth: 1,
            borderColor: 'gray',
            paddingLeft: 30,
          }}
        >
          <Sources
            album={this.state.album}
            playlists={this.state.playlists}
            relatedTracks={this.state.relatedTracks}
          />
        </div>
      );
    }
  }
}

ReactDOM.render(<Related />, document.getElementById('Related'));
