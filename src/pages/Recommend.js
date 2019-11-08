import React, { PureComponent } from 'react'
import { getBanner, getRecommendList } from '../api/Recommend.js'
import Slider from 'react-slick'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
@connect(
  state => {
    return { counter: state }
  },
  {
    toIndex: (index) => {
      return { type: 'index', index }
    },
    toList: (list) => {
      return { type: 'list', list }
    }
  }
)

class Recommend extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      banners: [],
      musicList: []
    }
  }

  componentDidMount () {
    this._getBanner()
    this._getRecommendList()
  }

  _getBanner () {
    getBanner().then(res => {
      this.setState({
        banners: res.data.banners
      })
    })
  }

  _getRecommendList () {
    getRecommendList().then(res => {
      this.setState({
        musicList: res.data.result
      })
    })
  }

  toList (data) {
    this.props.toIndex(0)
    this.props.history.push('/music-list', { id: data.id })
  }

  add () {
    this.props.toIndex()
  }

  render () {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false
    };
    return (
      <div>
        <div className="recommend-content bg-base">
          <Slider {...settings}>
            {
              this.state.banners.map((item, index) => {
                return (
                  <div key={index}>
                    <img className="banner-img" src={item.imageUrl} alt="" />
                  </div>
                )
              })
            }
          </Slider>
        </div>
        <div className="recommend-content">
          <div className="recommend-title" onClick={() => { this.add() }}>推荐歌曲</div>
          <div className="recommend-list">
            {
              this.state.musicList.map((item, index) => {
                return (
                  <div key={index} className="recommend-list-item column">
                    <div className="recommend-list-active">
                      <img onClick={() => this.toList(item)} src={item.picUrl} alt="" />
                    </div>
                    <span>{item.name}</span>
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

export default withRouter(Recommend)