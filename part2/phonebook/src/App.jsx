import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    console.log("button clicked  ")
    event.preventDefault()
    const newPerson = {name:newName}
    if(persons.find(person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()))
    {
      alert(`${newName} is already added to phonebook`)
      console.log("a duplicate was found")
      return
    }
    setPersons(persons.concat(newPerson))
    console.log("no duplicte was found")
    persons.forEach((person) => console.log(person.name))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return ( 
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>debug: {newName}</div>
      ...
    </div>
  )
}

export default App