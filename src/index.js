import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const changeQuote = () =>{
    const randomnum = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomnum)
  }
  const increaseVote = () => {
    const newVotes = [...votes]
    newVotes[selected] ++
    setVotes(newVotes)
  }
  return (
    <div>
      <div>
        {props.anecdotes[selected]}<br/>
        has {votes[selected]} Votes
      </div>
      <div>
        <button onClick={increaseVote}>Vote</button>
        <button onClick={changeQuote}>next Anecdote</button>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
