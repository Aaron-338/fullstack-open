const Header = (props) => {
  return (<h1>{props.course}</h1>)  
}

const Part = (props) => {
  return (<p>{props.part?.name} {props.part?.exercises}</p>) // Optional chaining to avoid errors if part is undefined
}

const Content = (props) => {
  return (
    <div>
      <Part
        part={props.part}
      />
    </div>
  )
}



const Total = (props) => {
  return (<p>Number of exercises {props.excercises1 + props.excercises2 + props.excercises3}</p>)
}

const App = () => { 
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (<div>
      <Header course = {course}/>
      <Content part = {part1} />
      <Content part = {part2}/>
      <Content part = {part3} />
      <Total excercises1 = {part1.exercises} excercises2 = {part2.exercises} excercises3 = {part3.exercises}/>
  </div>)
    
}

export default App