import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css';

const Statistics = (props) => {
  return(
    <div>
        <h1>Statistics</h1>

        <p>Good {props.good}</p>
        <p>Neutral {props.neutral}</p>
        <p>Bad {props.bad}</p>
        <p>All {props.all}</p>
        <p>Average {props.average}</p>
        <p>positive {props.positive} %</p>
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

  const updateAllAvgPositive = () =>{
    setAll(all+1)
    setAverage((good-bad)/all)
    setPositive(good*100/all)
  }
  const increaseGood = () => {
    setGood(good+1)
    updateAllAvgPositive()
  }
  const increaseNeutral = () => {
    setNeutral(neutral+1)
    updateAllAvgPositive()
  }
  const increaseBad = () => {
    setBad(bad+1)
    updateAllAvgPositive()
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
