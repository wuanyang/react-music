import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom';
import { getSetDetail } from '../api/PlayList.js'
import { connect } from 'react-redux';

@connect(
  state => {
    return { data: state }
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
class MusicList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      info: {},
      list: [],
      id: ''
    }
  }

  componentDidMount () {
    this._getSetDetail()
  }

  async _getSetDetail () {
    let res = await getSetDetail({ id: this.props.history.location.state.id })
    const { name, id, coverImgUrl, playCount } = { ...res.data.playlist }
    this.setState({
      info: { name, id, coverImgUrl, playCount },
      list: res.data.playlist.tracks,
      item: {}
    })
  }

  play (index) {
    this.props.toIndex(index)
    this.props.toList(this.state.list)
    this.setState({ index })
  }

  render () {
    return (
      <div className="list">
        <div className="list-top">
          <div className="list-top-title">
            <i onClick={() => this.props.history.push('/')} className="iconfont iconleft"></i>
            <span className="ml5">歌单</span>
          </div>
          <div className="list-top-bottom column">
            <span>{this.state.info.name}</span>
            <span>
              <i className="iconfont iconerji ft12"></i>
              <span className="ml10 ft14">{parseInt(this.state.info.playCount / 10000)}万</span>
            </span>
          </div>
          <img className="list-top-img" src={this.state.info.coverImgUrl} alt="" />
        </div>
        <div className="list-content">
          <div className="list-container">
            <div className="list-content-top" onClick={() => this.play(0)}>
              <i className="iconfont iconbofang"></i>
              <span className="ml10">播放全部</span>
              <span className="ft12">（共{this.state.list.length}首）</span>
            </div>
            {
              this.state.list.map((item, index) => {
                let str = index < this.state.list.length - 1 ? 'list-content-item list-content-border' : 'list-content-item'
                return (
                  <div key={index} className={str} onClick={() => this.play(index)} >
                    <span className="ft16">{index + 1}</span>
                    <div className="column ml15">
                      <span>{item.name}</span>
                      <span className="ft12">{item.ar[0].name}</span>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(MusicList)