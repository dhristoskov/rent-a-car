import React, { createContext, useState } from 'react';

export const themes = { 
    
    light: {
        backgroundColor: '#8CD3A7',
        color: '#010848'
    },
    dark: {
        backgroundColor: '#346642',
         color: '#FFFFFF'
    }
}

export const ThemeContext = createContext(themes.light);

const ThemeContextProvider = (props) => {

    const [ currentTheme, setCurrentTheme ] = useState(themes.light);

    const toggleTheme = () => {
        currentTheme === themes.light ? 
        setCurrentTheme(themes.dark):
        setCurrentTheme(themes.light)
    }

    return (
        <ThemeContext.Provider value={{currentTheme, toggleTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider