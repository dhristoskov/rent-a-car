import React, { useContext } from 'react';

import { ThemeContext } from '../../contexts/ThemeContext';

const Layout = (props) => {

    const { currentTheme } = useContext(ThemeContext);

    return(
        <div className='main-home' style={currentTheme}>
            { props.children }
        </div>
    )
}

export default Layout