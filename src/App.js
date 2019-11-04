import React from 'react';
import './App.css';
import './assets/css/index.less';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Recommend from './pages/Recommend';
import ErrorPage from './pages/ErrorPage';

function App () {
  return (
    <div className="page">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/recommend" component={Recommend}></Route>
          <Route component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
