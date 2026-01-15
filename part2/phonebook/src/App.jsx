import phonebookService from './services/phonebook'
import Notification from './components/Notification'
import { useState, useEffect } from 'react'

const Contact = ({person, handleDelete}) => (
  <div>
    {person.name} {person.number} 
    <button onClick={() => handleDelete(person.id)}>delete</button>
  </div>
)

const Persons = ({persons, handleDelete}) => 
  persons.map((person, index) => 
    <Contact person={person} key={person.id} handleDelete={handleDelete} />
  )

const PersonForm = ({newName,newNumber,addPerson,handleNameChange,handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
      <div>name: <input value={newName} onChange={handleNameChange}/></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Filter = ({filter,handleFilterChange}) => (
  <div>filter shown with <input value={filter} onChange={handleFilterChange}></input></div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('success')  
  useEffect(() => {
  phonebookService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
}, [])

  console.log('render', persons.length, 'persons')

const showNotification = (message, type) => {
    setNotificationMessage(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }
  
const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
  
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          showNotification(`Deleted ${person.name}` , 'success')
        })
        .catch(error => {
          showNotification(`Error occured deleting ${person.name}`, 'error')
          console.log(error , error)
        })
    }
  }

  const addPerson = (event) => {
  console.log("button clicked")
  event.preventDefault()
  
  const newContact = {
    name: newName, 
    number: newNumber
  } //the id property is left for the server to create
  
  // Case-insensitive check for existing person
  const existingPerson = persons.find(
    person => person.name.toLowerCase() === newName.toLowerCase()
  )
  
  if (existingPerson) {
    // Ask user if they want to update the number
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      phonebookService
        .update(existingPerson.id, newContact)
        .then(returnedPerson => {
          setPersons(persons.map(person => 
            person.id !== existingPerson.id ? person : returnedPerson
          ))
          showNotification(`Updated ${newName} 's number`, 'success')
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log('Error updating:', error)
          showNotification(
            `Information of ${newName} has already been removed from server`,
            'error'
          )
          setPersons(persons.filter(p => p.id !== existingPerson.id))
          setNewName('')
          setNewNumber('')
        })
    }
    return
  }
  
  // Add new person if doesn't exist
  phonebookService
    .create(newContact)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      showNotification(`Added ${newName}`, 'success')
      console.log("Entry successful!")
      setNewName('')
      setNewNumber('')
    })
    .catch(error => {
      console.log('Error:', error)
      showNotification('Error adding person to phonebook', 'error')
    })
}

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }  

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const personsToShow = filter === '' 
    ? persons 
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return ( 
      <div>
        <h2>Phonebook</h2>
        <Notification message={notificationMessage} type={notificationType}></Notification>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
        
        <h3>Add a new</h3>
        <PersonForm 
          newName={newName}
          newNumber={newNumber}
          addPerson={addPerson}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
        />
        
        <h3>Numbers</h3>
        <Persons persons={personsToShow} handleDelete={handleDelete} />
      </div>
  )
}

export default App