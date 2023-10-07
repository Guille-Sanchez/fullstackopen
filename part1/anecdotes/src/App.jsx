import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  console.log(points)

  const handleVote = () => {
    const copy = [...points]
    copy[selected] = copy[selected] + 1

    setPoints(copy)
  }

  const handleChangeAnecdote = ()=>{
    const randNum= Math.floor(Math.random() * anecdotes.length)
    setSelected(randNum)
  }
  console.log(Math.max(points))
  return (
    <>
      <header>
        <h1>Anecdote of the day</h1>
      </header>
      <main>
        <p>{anecdotes[selected]}</p>
        <p>has {points[selected]} votes</p>
        <div>
          <button onClick={handleVote}>vote</button>
          <button onClick={handleChangeAnecdote}>next anecdote</button>
        </div>

        <section>
          <header><h2>Anecdote with most votes</h2></header>

          {anecdotes[points.indexOf(Math.max(...points))]}
        </section>
      </main>
    </>
  )
}

export default App