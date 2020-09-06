import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
      <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return(
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}
const Course = (props) => {
  return(
    <>
      <Header course={props.course.name}/>
      {props.course.parts.map(part => <Part key={part.id} part = {part}/>)}
    </>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.sum}</p>
  )
}
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
