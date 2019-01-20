import React, { Component } from 'react';
import RelatedTracks from './relatedTracks.jsx';
import InPlaylists from './inPlaylists.jsx';
import InAlbums from './inAlbums.jsx';

class Sources extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: 300, height: 1114.13 }}>
        <RelatedTracks style={{ flex: 1 }} relatedTracks={this.props.relatedTracks} />
        <InPlaylists style={{ flex: 1 }} playlists={this.props.playlists} />
        <InAlbums style={{ flex: 1 }} album={this.props.album} />
      </div>
    );
  }
}
export default Sources;
