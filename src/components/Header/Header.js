import React, { PureComponent } from 'react'
import './Header.less'
class Header extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        {
          name: '推荐',
          code: 1
        },
        {
          name: '排行',
          code: 2
        },
        {
          name: '歌手',
          code: 3
        }
      ],
      code: 1
    }
  }

  handleNav (code) {
    this.setState({
      code
    })
  }

  render () {
    return (
      <div className="header">
        <div className="header-top">
          <span>
            <i className="iconfont iconcaidan ft18"></i>
          </span>
          <span>React-Music</span>
          <span>
            <i className="iconfont iconsousuo ft18"></i>
          </span>
        </div>
        <nav className="header-nav">
          {
            this.state.list.map(item => {
              return (
                <span onClick={() => this.handleNav(item.code)}
                  key={item.code}
                  className={this.state.code === item.code ? 'header-nav-check header-nav-item' : 'header-nav-item'}>
                  {item.name}
                </span>
              )
            })
          }
        </nav>
      </div>
    )
  }
}

export default Header