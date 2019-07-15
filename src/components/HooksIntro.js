/*
Hooks in other words, are functions that let you use React without classes. 
They let you use React state and lifecycle features within function components.
*/

/**
 * BASIC RULES
 * - Only call Hooks at the top level
 * - Only call Hooks from React function components (not regular JavaScript functions) or from custom Hooks
 */
import React, { useState, useEffect } from 'react'

// WITHOUT HOOKS we need to make a class component so we can use state
export class TodoNOHooks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [{ text: 'Write blog post' }]
        }
    }
    componentDidMount() {
        document.title = document.title = `Remember to ${this.state.todos[0].text}`
    }
    componentDidUpdate() {
        document.title = document.title = `Remember to ${this.state.todos[0].text}`
    }
    handleSubmit = event => {
        event.preventDefault()
        this.setState({
            todos: [...this.state.todos, { text: this.state.value }],
            value: ''
        })
    }

    handleChange = event => {
        event.preventDefault()
        this.setState({
            value: event.target.value
        })
    }
    render() {
        return (
            <div>
                <h3>Todos:</h3>
                <div className="todo-list">
                    {this.state.todos.map((todo, index) => (
                        <li key={index}>{todo.text}</li>
                    ))}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" className="input" value={this.state.value} onChange={this.handleChange} />
                </form>
            </div>
        )
    }
}

export function TodoWithHooks() {
    // useState declares a “state variable”.
    // Here we have declared 2 state variables, todos and value
    const [todos, setTodos] = useState([{ text: 'Write blog post' }]) // parameter passed to useState is initial value
    const [value, setValue] = useState('')

    const handleSubmit = event => {
        event.preventDefault()
        if (!value) return
        setTodos([...todos, { text: value }])
        setValue('')
    }

    // useEffect is the new way to add stuff you would have added in
    // componentWillMount, componentDidMount
    // This one executrs on mount and on any re-render
    useEffect(function() {
        window.addEventListener('scroll', () => {})

        // Your callback function should return a cleanup function
        // if you need to clean anything up (remove event listeners, cancel API requests, etc)
        return function cleanup() {
            window.removeEventListener('scroll', () => {})
        }
    })

    // useEffect also accepts a second argument,
    // a “conditions array”. Think of it as “the pieces of data that this callback depends upon”.
    // this one executes on mount and anytime 'value' changes
    useEffect(function() {}, [value])

    // This one executes only on mount
    useEffect(function() {}, [])

    return (
        <div>
            <h3>Todos:</h3>
            <div className="todo-list">
                {todos.map((todo, index) => (
                    <li key={index}>{todo.text}</li>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" className="input" value={value} onChange={event => setValue(event.target.value)} />
            </form>
        </div>
    )
}
