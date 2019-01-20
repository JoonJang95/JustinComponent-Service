import React, { Component } from 'react';
import SoundStats from './soundStats.jsx';

class InPlaylists extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ margin: 5, width: 300 }}>
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
          <span style={{ flex: 1 }}>Playlists</span>
          <span>View All</span>
        </div>

        <ul style={{ listStyle: 'none', margin: 0, padding: 0, paddingTop: 5 }}>
          {this.props.playlists
            ? this.props.playlists.map(playlist => {
                let background = playlist.imageurl;
                return (
                  <li style={{ width: 300, height: 72.19 }}>
                    <div
                      style={{ display: 'flex', flexDirection: 'row', width: 306, height: 62.19 }}
                    >
                      <span style={{ flex: 1, width: 62, height: 60 }}>
                        <div
                          style={{
                            backgroundImage: `url(${background})`,
                            width: 50,
                            height: 50,
                            opacity: 1,
                          }}
                        />
                      </span>

                      <div style={{ flex: 3 }}>
                        <div style={{ color: 'gray' }}>{playlist.owner}</div>
                        <div>{playlist.description}</div>
                        <div style={{ fontSize: 14 }}>
                          <span>
                            <span>
                              <span
                                style={{
                                  backgroundImage: `url(https://s3.us-east-2.amazonaws.com/feccompimgs/statsLikeHeart.png)`,
                                  width: 30,
                                  height: 20,
                                  opacity: 1,
                                }}
                              />
                            </span>
                            <span style={{ margin: 1 }}>
                              {' '}
                              <a
                                style={{ background: 'none', border: 'none' }}
                                onClick={e => this.handleClick(e, 'liked')}
                              >
                                {' '}
                                ♥ {playlist.likes}{' '}
                              </a>{' '}
                            </span>
                          </span>

                          <span>
                            <span
                              style={{
                                backgroundImage: `url(https://s3.us-east-2.amazonaws.com/feccompimgs/reshareIcon.png)`,
                                width: 30,
                                height: 20,
                                opacity: 1,
                                paddingRight: 22,
                              }}
                            />
                            <span style={{ margin: 1 }}>
                              {' '}
                              <a
                                style={{ background: 'none', border: 'none' }}
                                onClick={e => this.handleClick(e, 'shared')}
                              >
                                {' '}
                                {playlist.shares}{' '}
                              </a>{' '}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })
            : ''}
        </ul>
      </div>
    );
  }
}

export default InPlaylists;
