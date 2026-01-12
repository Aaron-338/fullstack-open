const Course = ({course}) => {
  console.log("course",course.name)
  course.parts.forEach((part) => console.log(part.name , part.exercises))
  
  return (
    
    <div>
      <Header header={course.name}/>
    <Content content={course.parts}/>
    </div>
  )
}
const Total = ({total}) => <h3>total of { total } exercises</h3>
const Header = ({header}) => {
  
  console.log("this is the header ," , header )
  return (<h1>{header}</h1>)
}
const Content = (props) => {
  console.log(props.content)
  
  return (
  
    props.content.map((part , index) => <Part key= {index} part = {part} />)
  
)
}

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

//const Total = (props) => <p>Number of exercises {props.total}</p>

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
 const total = course.parts.reduce((total , part) => total + part.exercises , 0) 

  return <>
  <Course course={course} />
  <Total total = {total}/>
  </>
}

export default App