import React from 'react'
import logo from './logo.svg'
import './App.css'
import MyFunctionComponent from './components/MyFunctionComponent'
import MyClassComponent from './components/MyClassComponent'
import store from './store'
import { Link } from 'react-router-dom'
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Bienvenido!!!</p>
                <MyClassComponent />
                <MyFunctionComponent store={store} />
                <br />
                Links
                <Link to="/flex/10">'Flex' Component</Link>
                <Link to="/todo_no_hooks">TODO List (NO Hooks)</Link>
                <Link to="/todo_with_hooks">TODO List (WITH Hooks!)</Link>
                <Link to="/company">Company Selector Test</Link>
                <br />
                <br />
                <button
                    onClick={() => {
                        store.totals = store.getTotals + 1
                    }}>
                    Press Me
                </button>
            </header>
        </div>
    )
}

export default App
