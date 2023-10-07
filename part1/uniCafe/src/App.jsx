import { useState } from 'react'

const Button = ({handlefeedback, text})=> {
  return <button onClick={handlefeedback}>{text}</button>
}


const Statistics = (props) => {
  const handlefeedback = (setValue) => {
    setValue(prev => prev + 1)
  }

  return (
    <section>
      <div>
        <Button handlefeedback={() => handlefeedback(props.setGood)} text={'good'} />
        <Button handlefeedback={() => handlefeedback(props.setNeutral)} text={'neutral'} />
        <Button handlefeedback={() => handlefeedback(props.setBad)} text={'bad'} />
      </div>

      <h2>Statistics</h2>
      {
        props.total > 0
          ?
            <table>
              <tbody>
                <tr>
                  <td>good</td>
                  <td>{props.good}</td>
                </tr>
                <tr>
                  <td>neutral</td>
                  <td>{props.neutral}</td>
                </tr>
                <tr>
                  <td>bad</td>
                  <td>{props.bad}</td>
                </tr>
                <tr>
                  <td>all</td>
                  <td>{props.total}</td>
                </tr>
                <tr>
                  <td>average</td>
                  <td>{(props.good - props.bad) / (props.total)}</td>
                </tr>
                <tr>
                  <td>positive</td>
                  <td>{props.good / (props.total) * 100} %</td>
                </tr>
              </tbody>
            </table>
          :
            <p>No feedback given</p>
      }
    </section>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad

  return (
    <>
      <header>
        <h1>give feedback</h1>
      </header>

      <main>
        <Statistics
          good={good}
          setGood={setGood}
          neutral={neutral}
          setNeutral={setNeutral}
          bad={bad}
          setBad={setBad}
          total={total}
        />
      </main>
    </>
  )
}

export default App