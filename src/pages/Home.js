import React, { PureComponent } from 'react'
import Header from '../components/Header/Header';
import Recommend from './Recommend';

class Home extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render () {
    return (
      <div>
        <Header />
        <Recommend />
      </div>
    )
  }
}

export default Home