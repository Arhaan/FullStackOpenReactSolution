import React from 'react'

const Header = (props) => {
    return(
        <h1>{props.course}</h1>
    )
  }

  const Total = (props) => {
    return(
      <p><b>Total number of exercises {props.sum}</b></p>
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

export default Course
