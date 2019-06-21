import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Extra Routes
import FlexStuff from './components/FlexStuff';
import CompanySelector from './components/CompanySelector';

// Routing
import { Route, /*Link,*/ Switch, BrowserRouter as Router } from 'react-router-dom'


const Notfound = () => <h1>Not found</h1>

const routing = (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/flex/:number" component={FlexStuff} />
        <Route path="/company" component={CompanySelector} />
        <Route component={Notfound} />
      </Switch>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
