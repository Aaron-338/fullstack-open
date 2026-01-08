import { useState } from 'react'

const Button = ({onclick, text}) => (
  <div>
    <button onClick={onclick}>{text}</button>
  </div>
)

const Header = ({header}) => <h1>{header}</h1> 

const Statistics = ({item, count}) => <p>{item} {count}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let all = good + bad + neutral
  let average = all === 0 ?  0 : (good - bad)/all
  let positive = all === 0 ? 0 : ((good / all) * 100) + '%'

  return (
    <div>
      <Header header="give feedback" />
      <Button onclick={() => setGood(good + 1)} text="good"/>
      <Button onclick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button onclick={() => setBad(bad + 1)} text="bad"/>
      <Header header="statistics" />
      <Statistics item="good" count={good} />
      <Statistics item="neutral" count={neutral} />
      <Statistics item="bad" count={bad} />
      <Statistics item= "all" count={all} />
      <Statistics item="average" count={ average} />
      <Statistics item="positive" count={positive} />
    </div>
  )
}

export default App