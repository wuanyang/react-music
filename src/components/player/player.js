import React, { PureComponent } from 'react'
import { getMusic } from '../../api/PlayList.js'
import './player.less';
import { connect } from 'react-redux';

@connect(
  state => {
    return {
      index: state.index,
      list: state.list
    }
  },
  {
    toIndex: (i) => {
      return { type: 'index', index: i }
    },
    toList: (i) => {
      return { type: 'list', list: i }
    }
  }
)

class Player extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      status: false,
      collection: false,
      isHide: false
    }
  }

  componentDidMount () {
  }

  componentDidUpdate (prep) {
    if ((prep.index !== this.props.index || prep.list.length !== this.props.list.length) && this.props.list.length) {
      this._getMusic(this.props.list[this.props.index || 0].id)
    }
  }

  _getMusic (id) {
    getMusic({ id: id || this.props.list[this.props.index].id }).then(res => {
      this.setState({
        musicUrl: res.data.data[0].url
      })
    })
  }

  controlAudio (type) {
    // eslint-disable-next-line default-case
    switch (type) {
      case 'next':
        let len = this.props.index >= this.props.list.length ? this.props.index : this.props.index + 1
        this.props.toIndex(len)
        this._getMusic(this.props.list[len].id)
        break;
      case 'previous':
        let minus = this.props.index === 0 ? 0 : this.props.index - 1
        this.props.toIndex(minus)
        this._getMusic(this.props.list[minus].id)
        break;
      default:
        break
    }
  }

  handleMusic (name) {
    this.setState({
      [name]: !this.state[name]
    })
    if (name === 'status') {
      this.state.status ? this.refs.audio.pause() : this.refs.audio.play()
    }
  }

  render () {
    return (
      this.props.index !== undefined && this.props.list.length ?
        <div className="player">
          <div className={this.state.isHide ? 'player-content column ' : 'player-content column hide'}>
            <div className="background">
              <div className="filter"></div>
              <img width="100%" height="100%" src="http://p2.music.126.net/wXCDRc4YPvuI-TJJMC4Lmg==/6637751697892582.jpg" alt="" />
            </div>
            <div className="player-content-top row center">
              <i onClick={() => this.handleMusic('isHide')}
                className="player-content-top-icon iconfont iconDown ft20"></i>
              {
                this.props.list && this.props.list[this.props.index] ? (
                  <div className="column ml10 txt-center">
                    <span className="ft18">{this.props.list[this.props.index].name}</span>
                    <span className="ft12">{this.props.list[this.props.index].ar[0].name}</span>
                  </div>
                ) : ''
              }
            </div>
            <div className="player-content-middle">
              <div className="player-content-middle-l">
                <div className="cd-wrapper">
                  <div className={this.state.status ? 'cd play' : 'cd play pause'}>
                    <img className="image" src={this.props.list[this.props.index] ? this.props.list[this.props.index].al.picUrl : ''} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="player-content-bottom row">
              <i className="iconfont iconxunhuanbofang ft24"></i>
              <img className="player-content-bottom-img"
                onClick={() => this.controlAudio('previous')}
                src={require('../../assets/images/left.png')} alt="" />
              <div className="row center player-content-bottom-max" onClick={() => this.handleMusic('status')} >
                <img className={this.state.status ? 'player-content-bottom-min' : 'player-content-bottom-max'}
                  src={this.state.status ? require('../../assets/images/pause.png') : require('../../assets/images/play.png')}
                  alt="" />
              </div>
              <img className="player-content-bottom-img"
                onClick={() => this.controlAudio('next')}
                src={require('../../assets/images/right.png')} alt="" />
              <div className="row center player-content-bottom-img" onClick={() => this.handleMusic('collection')}>
                {
                  this.state.collection ?
                    <img className="player-content-bottom-heart" src={require('../../assets/images/heart.png')} alt="" /> :
                    <i className="iconfont iconxin ft24"></i>
                }
              </div>
            </div>
          </div>
          <div onClick={() => this.handleMusic('isHide')}
            className={this.state.isHide ? 'player-bottom hide' : 'player-bottom'}>
            <div className="row">
              <img className={this.state.status ? 'player-bottom-img play' : 'player-bottom-img play pause'}
                src={this.props.list[this.props.index] ? this.props.list[this.props.index].al.picUrl : ''} alt="" />
              {
                this.props.list && this.props.list[this.props.index] ? (
                  <div className="column ml10">
                    <span className="ft14 player-text">{this.props.list[this.props.index].name}</span>
                    <span className="ft12">{this.props.list[this.props.index].ar[0].name}</span>
                  </div>
                ) : ''
              }
            </div>
            <audio
              id="music-audio"
              className="audio"
              src={this.state.musicUrl}
              onEnded={() => this.controlAudio('next')}
              onPause={() => this.state.status ? this.handleMusic('status') : null}
              onPlay={() => !this.state.status ? this.handleMusic('status') : null}
              ref="audio"
              autoPlay={this.props.index !== undefined ? 'autoPlay' : ''}
              controls="controls"></audio>
          </div>
        </div> : ''
    )
  }
}

export default Player