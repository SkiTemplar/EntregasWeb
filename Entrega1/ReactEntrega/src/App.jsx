import './App.css'
import Logo from './components/Logo'
import ListToDo from './components/ListToDo'

function App() {
  return (
    <div className="app">
      <Logo />
      <div className="main-container">
        <h1>Mis Tareas</h1>
        <ListToDo />
      </div>
    </div>
  )
}

export default App
