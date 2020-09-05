import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css';

const Statistic = (props) =>
    <tr><td>{props.text.charAt(0).toUpperCase() + props.text.slice(1)}</td><td>{props.value}</td></tr>
const Statistics = (props) => {
  if (props.all === 0){
    return(
      <div>
          <h1>Statistics</h1>
          <p>No feedback given</p>
      </div>
    )
  }

  return(
    <div>
        <h1>Statistics</h1>
        <table>
        <tbody>
        <Statistic text="good" value={props.good}/>
        <Statistic text="bad" value={props.bad}/>
        <Statistic text="neutral" value={props.neutral}/>
        <Statistic text="all" value={props.all}/>
        <Statistic text="average" value={props.average}/>
        <Statistic text="positive" value={props.positive}/>
        </tbody>
        </table>
    </div>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const updateAllAvgPositive = (newgood, newbad) =>{
    const newall = all+1
    setAll(newall)
    setAverage((newgood-newbad)/newall)
    setPositive(newgood*100/newall)
  }
  const increaseGood = () => {
    const newgood = good+1
    const newbad = bad
    setGood(newgood)
    updateAllAvgPositive(newgood, newbad)

  }
  const increaseNeutral = () => {
    setNeutral(neutral+1)
    updateAllAvgPositive(good, bad)

  }
  const increaseBad = () => {
    const newgood = good
    const newbad = bad+1
    setBad(newbad)
    updateAllAvgPositive(newgood, newbad)

  }
  return (
    <div>
      <div>
        <h1>Give FeedBack</h1>
        <div>
          <button onClick={increaseGood}>Good</button>
          <button onClick={increaseNeutral}>neutral</button>
          <button onClick={increaseBad}>Bad</button>
        </div>
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} average={average} positive={positive}/>

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
