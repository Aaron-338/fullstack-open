import { useState } from 'react'

const Button = ({onclick, text}) => (
  <div>
    <button onClick={onclick}>{text}</button>
  </div>
)

const Header = ({header}) => <h1>{header}</h1> 

const Statistics = (props) => props.items.map(
                              (key, index) => 
                              <p key={index}>{key.item} {key.count}</p>)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + bad + neutral
  const average = all === 0 ?  0 : (good - bad)/all
  const positive = all === 0 ? "0 %" : ((good / all) * 100) + ' %'
  const statistics = [ {item : "good" , count : good}
                      ,{item : "neutral" , count : neutral}
                      ,{item : "bad" , count : bad}
                      ,{item : "all" , count : all}
                      ,{item : "average" , count : average}
                      ,{item : "positive" , count : positive}]
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