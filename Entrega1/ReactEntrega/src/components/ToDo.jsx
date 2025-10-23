import { AiOutlineCloseCircle } from 'react-icons/ai'
import '../styles/Todo.css'

function ToDo({ id, text, completed, completeToDo, deleteToDo }) {
  return (
    <div className={completed ? "todo-container completed" : "todo-container"}>
      <div
        className="todo-text"
        onClick={() => completeToDo(id)}>
        {text}
      </div>
      <div
        className="todo-icon-container"
        onClick={() => deleteToDo(id)}>
        <AiOutlineCloseCircle className="todo-icon" />
      </div>
    </div>
  )
}

export default ToDo

