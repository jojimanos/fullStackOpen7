import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clear = () => {
    setValue("")
  }

  const passData = {
    type: type,
    value: value,
    onChange: onChange
  }

  return {
    passData,
    type,
    value,
    onChange,
    clear
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const create = async (resource) => {
  try {
    const response = await axios.post(baseUrl, resource)
  } catch (error) {
    console.log("Axios post error", error)
  }
  }

   const get = async () => {
    try {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    } catch (error) {
      console.log("Axios get error", error)
    }
  }

  const service = {
    create, get
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  console.log(notes, persons)

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    content.clear()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    name.clear()
    number.clear()
  }

  useEffect(() => {
    noteService.get(),
    personService.get()
  }, [])

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content.passData} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name.passData} /> <br/>
        number <input {...number.passData} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App