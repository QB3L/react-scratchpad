import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Extra Routes
import FlexStuff from './FlexStuff';

// Routing
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/flex" component={FlexStuff} />
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
