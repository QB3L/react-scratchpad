import React from 'react';
import logo from './logo.svg';
import './App.css';
import MyFunctionComponent from './MyFunctionComponent'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bienvenido!!!
        </p>
        {/* <MyFunctionComponent total={15}></MyFunctionComponent> */}
      </header>
    </div>
  );
}

export default App;
