import React, { unstable_Profiler as Profiler } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'typeface-roboto'
import App from './App'
import * as serviceWorker from './serviceWorker'

//Extra Routes
import FlexStuff from './components/FlexStuff'
import { TodoWithHooks, TodoNOHooks } from './components/HooksIntro'
import CompanySelector from './components/CompanySelector'

// Routing
import { Route, /*Link,*/ Switch, BrowserRouter as Router } from 'react-router-dom'

if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render')
    whyDidYouRender(React)
}

const Notfound = () => <h1>Not found</h1>
// This is an easy way to profile the app
const logProfiler = (id: string, phase: string, actualTime: number, baseTime: number, startTime: number, commitTime: number) => {
    console.log(`<${id}> render time: ${actualTime.toFixed(1)}ms`)
}

//Put Profiler in any component you wanna profile and see the time it took to render
const routing = (
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            {/* <Profiler id="Flex" onRender={logProfiler}> */}
            <Route path="/flex/:number" component={FlexStuff} />
            {/* </Profiler> */}
            <Route path="/todo_no_hooks" component={TodoNOHooks} />
            <Route path="/todo_with_hooks" component={TodoWithHooks} />
            <Route path="/company" component={CompanySelector} />
            <Route component={Notfound} />
        </Switch>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
