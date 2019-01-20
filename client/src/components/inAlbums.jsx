import React, { Component } from 'react';

class InAlbums extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let background = this.props.album.imageurl;
    return (
      // component container
      <div style={{ margin: 5, width: 300 }}>
        {/* component header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            color: 'gray',
            borderBottom: 'solid',
            borderWidth: 1,
          }}
        >
          <span
            style={{
              backgroundImage: `url(https://s3.us-east-2.amazonaws.com/feccompimgs/relatedTracks%3AalbumsSquares.png)`,
              width: 20,
              height: 20,
              opacity: 1,
              paddingRight: 10,
            }}
          />
          <span style={{ flex: 1 }}>Albums</span>
          <span style={{}}>View All</span>
        </div>

        {/* album li container */}
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, paddingTop: 5 }}>
          {/* album li object */}
          <li style={{ width: 300, height: 72.19 }}>
            {/* album art */}
            <div style={{ display: 'flex', flexDirection: 'row', width: 306, height: 62.19 }}>
              <span style={{ flex: 1, width: 62, height: 60 }}>
                <div
                  style={{
                    // backgroundImage: `url(${})`,
                    width: 50,
                    height: 50,
                    opacity: 1,
                  }}
                >
                  <img src={this.props.album.imageurl} style={{ width: 50, height: 50 }} />
                </div>
              </span>
              {/* album information */}
              <div style={{ flex: 3 }}>
                <div style={{ color: 'gray' }}>{this.props.album.artist}</div>
                <div>
                  <span>{this.props.album.name} </span>
                </div>
                <div style={{ fontSize: 14 }}>
                  <span>
                    <span
                      style={{
                        backgroundImage: `url(https://s3.us-east-2.amazonaws.com/feccompimgs/playsIcon.png)`,
                        width: 15,
                        height: 20,
                        opacity: 1,
                        paddingRight: 2,
                      }}
                    />

                    <span style={{ margin: 1 }}>Album · {this.props.album.year} </span>
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default InAlbums;
