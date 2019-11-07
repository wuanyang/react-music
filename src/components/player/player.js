import React, { PureComponent } from 'react'
import { getMusic, getSetDetail } from '../../api/PlayList.js'
import { withRouter } from 'react-router-dom';
import './player.less'

class Player extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      list: [],
      initIndex: 0,
      index: 0
    }
  }

  componentDidMount () {
    getSetDetail({ id: this.props.history.location.state.id }).then(res => {
      this.setState({
        list: res.data.playlist.tracks
      })
      this._getMusic(res.data.playlist.tracks[this.props.initIndex || 0].id)
    })
  }

  componentDidUpdate (prep) {
    if (prep.initIndex !== this.props.initIndex) {
      this.setState({
        index: this.props.initIndex
      })
      this._getMusic(this.state.list[this.props.initIndex].id)
    }
  }

  _getMusic (id) {
    getMusic({ id: id || this.state.list[this.state.index].id }).then(res => {
      this.setState({
        musicUrl: res.data.data[0].url
      })
    })
  }

  controlAudio (type) {
    // eslint-disable-next-line default-case
    switch (type) {
      case 'end':
        this.setState({
          index: this.state.index + 1
        })
        this._getMusic(this.state.list[this.state.index + 1].id)
        break;
      default:
        break
    }
  }

  render () {
    return (
      <div className="player">
        <div className="player-bottom">
          <div className="row">
            <img className="play" src={this.state.list[this.state.index] ? this.state.list[this.state.index].al.picUrl : ''} alt="" />
            {
              this.state.list && this.state.list[this.state.index] ? (
                <div className="column ml10">
                  <span className="ft14 player-text">{this.state.list[this.state.index].name}</span>
                  <span className="ft12">{this.state.list[this.state.index].ar[0].name}</span>
                </div>
              ) : ''
            }
          </div>
          <audio
            id="music-audio"
            className="audio"
            src={this.state.musicUrl}
            onCanPlay={() => this.controlAudio('allTime')}
            onTimeUpdate={(e) => this.controlAudio('getCurrentTime')}
            onEnded={() => this.controlAudio('end')}
            ref="audio"
            autoPlay={this.props.initIndex !== undefined || this.state.index ? 'autoPlay' : ''}
            controls="controls"></audio>
        </div>
      </div >
    )
  }
}

export default withRouter(Player)