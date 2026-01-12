const Course = ({course}) => {
  console.log("course",course.name)
  course.parts.forEach((part) => console.log(part.name , part.exercises))
const total = course.parts.reduce((total,part) => total+part.exercises ,0)
   if(course.id===0) {
    return (
      <div>
      <h1>Web development curriculum</h1>
      <Header header={course.name}/>
      <Content content={course.parts}/>
      <Total total={total}/>
    </div>
    )
   }
  
  else {
    return (
    
    <>

    <Header header={course.name}/>
    <Content content={course.parts}/>
    <Total total={total}/>
    </>
    
  )
  }
}
const Total = ({total}) => <h3>total of { total } exercises</h3>
const Header = ({header}) => {
  
  console.log("this is the header ," , header )
  return (<h2>{header}</h2>)
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

export default Course