import React, { Fragment, useState, useContext } from 'react';
import { RiLightbulbFlashLine, RiLightbulbLine } from 'react-icons/ri';
import { NavLink, useHistory } from 'react-router-dom'; 

import SideBarMenu from './SideBarMenu';
import AuthHeader from './AuthHeader';
import { ThemeContext, themes} from '../../contexts/ThemeContext';
import { AuthContext } from '../../contexts/AuthContext';

const MainNav = () => {

    const { currentTheme, toggleTheme } = useContext(ThemeContext);
    const { isLoggedIn, logout } = useContext(AuthContext);
    const [ toggleSideBar, setToggleSideBar ] = useState(false);
    const history = useHistory();

    const onToggleHandler = () => {
        setToggleSideBar(prevState => !prevState);
    }

    const onLogout = () => {
        history.push('/');
        setToggleSideBar(false);
        logout();
    }

    return (
        <Fragment>
            <SideBarMenu toggleSideBar={toggleSideBar} />  
            {isLoggedIn && <AuthHeader />}   
            <header className='main-header'>  
                <div className='logo-field'>
                    <div className='menu' onClick={onToggleHandler}>
                        <p />
                        <p />
                        <p />
                    </div>                           
                    <h1 className='logo'>Logo</h1>
                </div>
                <div className='company-ident'>
                    {
                        isLoggedIn 
                        ? <div className='auth-btn' onClick={onLogout}>Logout</div>
                        : <div className='auth-btn'>
                            <NavLink to='/auth'>Login</NavLink></div>
                    } 
                    <button className='bulb' onClick={toggleTheme}>
                            {
                            currentTheme === themes.light 
                            ? <RiLightbulbFlashLine style={{color: 'orange'}}/> 
                            : <RiLightbulbLine />
                            }
                    </button>                                                              
                </div>            
            </header>
        </Fragment>
    )
};

export default MainNav;