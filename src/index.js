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
  const total = props.course.parts.reduce((s,p) =>s+p.exercises, 0)
  return(
    <>
      <Header course={props.course.name}/>
      {props.course.parts.map(part => <Part key={part.id} part = {part}/>)}
      <Total sum={total}/>
    </>
  )
}

const Total = (props) => {
  return(
    <p><b>Total number of exercises {props.sum}</b></p>
  )
}
const App = () => {
  const courses = [
      {
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
  ]

  return (
    <div>
      {courses.map(course => <Course key={course.id} course={course}/>)}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
