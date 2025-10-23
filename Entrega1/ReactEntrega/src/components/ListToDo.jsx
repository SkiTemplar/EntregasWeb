import { useState } from 'react'
import FormToDo from './FormToDo'
import ToDo from './ToDo'
import '../styles/ListToDo.css'

function ListToDo() {
  const [tasks, setTasks] = useState([])

  const addTask = (task) => {
    setTasks([task, ...tasks])
  }

  const completeToDo = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        task.completed = !task.completed
      }
      return task
    })
    setTasks(updatedTasks)
  }

  const deleteToDo = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id)
    setTasks(updatedTasks)
  }

  return (
    <>
      <FormToDo onSubmit={addTask} />
      <div className='list-todo-container'>
        {
          tasks.map((task) =>
            <ToDo
              key={task.id}
              id={task.id}
              text={task.text}
              completed={task.completed}
              completeToDo={completeToDo}
              deleteToDo={deleteToDo}
            />
          )
        }
      </div>
    </>
  )
}

export default ListToDo

