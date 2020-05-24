import React, { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import timeOfDay from '../../utils/timeOfTheDay';

const AuthHeader = () => {

    const { currentTheme } = useContext(ThemeContext);
    const { name } = useContext(AuthContext);
    const time = timeOfDay();

    return(
        <div className='auth-header' style={currentTheme}>
            <p><span>{time}</span>, {name}</p>
        </div>
    )
}

export default AuthHeader