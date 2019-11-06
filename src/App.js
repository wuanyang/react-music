import React from 'react';
import './assets/css/index.less';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import MusicList from './pages/MusicList';

function App () {
  return (
    <div className="page">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/music-list" component={MusicList}></Route>
          <Route component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
