import React from 'react';
import logo from './logo.svg';
import './App.css';
import MyFunctionComponent from './MyFunctionComponent'
import MyClassComponent from './MyClassComponent'
import store from './store'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bienvenido!!!
        </p>
        <MyClassComponent></MyClassComponent>
        <button onClick={() => {store.totals = 20}}>Click me</button>
      </header>
    </div>
  );
}

export default App;
