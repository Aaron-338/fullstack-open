const Header = (props) => {
  return (<h1>{props.course}</h1>)  
}

const Part = (props) => {
  return (<p>{props.part} {props.excercises}</p>)
}

const Content = (props) => {
  return (
    <div>
      <Part
        part={props.parts?.[0]?.name}
        exercises={props.parts?.[0]?.exercises} //optional chaining must be done before the array indexing to prevent a type error of  accessing a propery of undefined.
      />
      <Part
        part={props.parts?.[1]?.name}
        exercises={props.parts?.[1]?.exercises}
      />
      <Part
        part={props.parts?.[2]?.name}
        exercises={props.parts?.[2]?.exercises}
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
      <Content part = {part1.name} excercises = {part1.exercises}/>
      <Content part = {part2.name} excercises = {part2.exercises}/>
      <Content part = {part3.name} excercises = {part3.exercises}/>
      <Total excercises1 = {part1.exercises} excercises2 = {part2.exercises} excercises3 = {part3.exercises}/>
  </div>)
    
}

export default App