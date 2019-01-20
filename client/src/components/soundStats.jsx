import React, { Component } from 'react';

class SoundStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      shared: false,
    };
  }

  handleClick(event, stateProp) {
    if (this.state.stateProp === false) {
      event.target.innerHTML++;
      this.setState({ stateProp: true });
    } else {
      event.target.innerHTML--;
      this.setState({ stateProp: false });
    }
  }

  render() {
    return (
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

          <span style={{ margin: 1 }}> {this.props.stats[0]} </span>
        </span>

        <span>
          <span
            style={{
              backgroundImage: `url(https://s3.us-east-2.amazonaws.com/feccompimgs/statsLikeHeart.png)`,
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
              onClick={e => this.handleClick(e, 'liked')}
            >
              {' '}
              {this.props.stats[1]}{' '}
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
              {this.props.stats[2]}{' '}
            </a>{' '}
          </span>
        </span>

        <span>
          <span
            style={{
              backgroundImage: `url(https://s3.us-east-2.amazonaws.com/feccompimgs/commentsIcon.png)`,
              width: 30,
              height: 20,
              opacity: 1,
              paddingRight: 22,
            }}
          />
          <span style={{ margin: 1 }}> {this.props.stats[3]} </span>
        </span>
      </div>
    );
  }
}
export default SoundStats;
