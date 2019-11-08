import React, { PureComponent } from 'react'
import Header from '../components/Header/Header';
import Recommend from './Recommend';
import { withRouter } from 'react-router-dom';
import Rank from './rank';
// import MusicList from './MusicList';

class Home extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      nav: 1
    }
  }

  handleNav (code) {
    this.setState({ nav: code })
  }

  getNav (code) {
    if (code === 1) {
      return <Recommend />
    } else if (code === 2) {
      return <Rank />
    }
  }

  render () {
    return (
      <div>
        <Header handleNav={(e) => this.handleNav(e)} />
        {
          this.getNav(this.state.nav)
        }
        {/* <MusicList /> */}
      </div>
    )
  }
}

export default withRouter(Home)