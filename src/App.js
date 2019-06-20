import React from 'react';
import logo from './logo.svg';
import './App.css';
import MyFunctionComponent from './MyFunctionComponent'
import MyClassComponent from './MyClassComponent'
import store from './store'
import { Link } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bienvenido!!!
        </p>
        <MyClassComponent></MyClassComponent>
        <MyFunctionComponent store={store}></MyFunctionComponent>
        <Link to="/flex/10">PRESS TO GO TO 'Flex'</Link>

        <button onClick={() => {store.totals = store.getTotals + 1}}>
          
        </button>
      </header>
    </div>
  );
}

export default App;
