import { useState } from 'react'

const Button = ({onclick, text}) => (
  <button onClick={onclick}>{text}</button>
)

// StatisticLine displays ONE statistic - that's it!
const StatisticLine = ({text, value}) => {
  return <p>{text} {value}</p>
}

const Statistics = ({items}) => {
  // Check if there's any feedback
  if (items[0].count + items[1].count + items[2].count === 0) {
    return <p>No feedback given</p>
  }

  // Map through and create a StatisticLine for EACH statistic
  return (
    <div>
      {items.map((stat, index) => (
        <StatisticLine key={index} text={stat.item} value={stat.count} />
      ))}
    </div>
  )
}

const Header = ({header}) => <h1>{header}</h1> 

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + bad + neutral
  const average = all === 0 ? 0 : (good - bad)/all
  const positive = all === 0 ? "0 %" : ((good / all) * 100) + ' %'
  
  const statistics = [
    {item: "good", count: good},
    {item: "neutral", count: neutral},
    {item: "bad", count: bad},
    {item: "all", count: all},
    {item: "average", count: average},
    {item: "positive", count: positive}
  ]

  return (
    <div>
      <Header header="give feedback" />
      <Button onclick={() => setGood(good + 1)} text="good"/>
      <Button onclick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button onclick={() => setBad(bad + 1)} text="bad"/>
      <Header header="statistics" />
      <Statistics items={statistics}/>
    </div>
  )
}

export default App