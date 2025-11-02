import { useState } from 'react'
import {FaSun, FaMoon} from 'react-icons/fa'
import Logo from "./components/Logo.jsx";
import FormContainer from "./components/FormContainer.jsx";
import './styles/App.css'

function App(){

    const lightTheme = 'light-theme'
    const darkTheme = 'dark-theme'
    function toggleTheme(){
        if(theme === lightTheme){
            setTheme(darkTheme)
        }
        else{
            setTheme(lightTheme)
        }
    }

    const[theme, setTheme] = useState('dark-theme')
    return (
        <div className={`app-container ${theme}`}>
            <div className="app-header">
                <Logo />
                <button className="theme-toggle" onClick={toggleTheme}>
                    {theme === "dark-theme" ? <FaSun/> : <FaMoon/>}
                </button>
            </div>
            <main className="app-main">
                <FormContainer/>
            </main>
        </div>
    )
}

export default App