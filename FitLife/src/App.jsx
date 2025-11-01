// App.jsx - Componente principal de FitLife
import { useState } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'
import FormContainer from './components/FormContainer'
import Logo from './components/Logo'
import './App.css'

function App() {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <div className="App" data-theme={theme}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </button>

      <Logo />
      <h1>¡Únete a FitLife! 💪</h1>
      <p>Comienza tu viaje hacia una vida más saludable</p>
      <FormContainer />
    </div>
  )
}

export default App
