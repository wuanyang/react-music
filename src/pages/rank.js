import React, { PureComponent } from 'react'
import { getRank } from '../api/PlayList.js'
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

class Rank extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      list: [],
      ranks: [0, 1, 2, 3, 4, 22, 23]
    }
  }

  async componentDidMount () {
    let arr = []
    for (let i = 0; i < this.state.ranks.length; i++) {
      let res = await getRank({ idx: this.state.ranks[i] })
      let list = res.data.playlist
      let obj = {
        url: list.coverImgUrl,
        id: list.id,
        list: list.tracks.slice(0, 3)
      }
      arr.push(obj)
    }
    this.setState({
      list: arr
    })
  }

  toList (data) {
    this.props.toIndex(0)
    this.props.history.push('/music-list', { id: data.id })
  }

  render () {
    return (
      <div className="rank">
        {
          this.state.list.map((item, index) => {
            return (
              <div className={index < this.state.list.length - 1 ? 'rank-item row border' : 'rank-item row'}
                onClick={() => this.toList(item)}
                key={index}>
                <img className="rank-item-img" src={item.url} alt="" />
                <div className="column rank-item-right">
                  {
                    item.list.map((msg, Index) => {
                      return (
                        <span className="rank-item-text" key={Index}>
                          {Index + 1}.{msg.name}-{msg.ar[0].name}
                        </span>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default withRouter(Rank)