import React, { PureComponent } from 'react'
import { getMusic } from '../../api/PlayList.js'
import './player.less'

class Player extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      info: {}
    }
  }

  componentDidMount () {

  }

  componentDidUpdate (prep) {
    // eslint-disable-next-line no-unused-expressions
    prep.id !== this.props.info.id ? this._getMusic() : null
  }

  _getMusic () {
    getMusic({ id: this.props.info.id }).then(res => {
      this.setState({
        musicUrl: res.data.data[0].url
      })
    })
  }

  render () {
    let imgUrl = this.props.info && this.props.info.al ? this.props.info.al.picUrl : 'http://p2.music.126.net/SVVrgH67hZ6O6-DEf6G7vQ==/109951163830796696.jpg'
    return (
      <div className="player">
        <div className="player-bottom">
          <div className="row">
            <img className="play" src={imgUrl} alt="" />
            {
              this.props.info && this.props.info.name ? (
                <div className="column ml10">
                  <span className="ft14 player-text">{this.props.info.name}</span>
                  <span className="ft12">{this.props.info.ar[0].name}</span>
                </div>
              ) : ''
            }
          </div>
          <audio
            id="music-audio"
            className="audio"
            src={this.state.musicUrl}
            ref="audio"
            controls="controls"></audio>
        </div>
      </div >
    )
  }
}

export default Player