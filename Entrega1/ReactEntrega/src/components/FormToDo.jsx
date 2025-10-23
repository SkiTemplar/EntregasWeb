import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import '../styles/Form.css'

function FormToDo(props) {
  const [input, setInput] = useState('')

  const handleChange = (content) => {
    setInput(content.target.value)
  }

  const handleSend = (content) => {
    content.preventDefault()
    if(input.trim().length > 0) {
        const newTask = {
            id: uuidv4(),
            text: input,
            completed: false
        }
        props.onSubmit(newTask)
        setInput('')
    }

  }

  return (
    <form className='form-todo' onSubmit={handleSend}>
      <input
        className='input-todo'
        type='text'
        placeholder="Escriba una tarea"
        name="text"
        value={input}
        onChange={handleChange}
      />
      <button className='button-todo'>
        Añadir tarea
      </button>
    </form>
  )
}

export default FormToDo

