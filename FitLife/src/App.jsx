import { useState } from 'react'
import {FaSun, FaMoon} from 'react-icons/fa'
import FormContainer from "./components/FormContainer.jsx";

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
        <div className = {theme}>
            <h1>FitLife</h1>
            <button onClick = {toggleTheme}>{theme === "dark-theme" ? <FaSun/> : <FaMoon/>}</button>
            <FormContainer/>
        </div>
    )
}

export default App