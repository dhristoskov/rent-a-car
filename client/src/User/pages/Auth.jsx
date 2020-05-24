import React, { useState, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import axios from '../../axios';

import Login from '../components/Login';
import Register from '../components/Register';
import { AuthContext } from '../../shared/contexts/AuthContext';
import Layout from '../../shared/components/Layout/Layout';

const Auth = () => {

    const [ toggleState, setToggleState ] = useState(false);
    const { login } = useContext(AuthContext);
    const [isLoading, setIsLoadin] = useState(false);
    const history = useHistory()

    //Register new user post new user data to db
    const onRegisterHandler = useCallback((user) => {
        setIsLoadin(true);
        axios.post('/users/register', user, 
        {'Content-Type': 'application/json'})
             .then(res => {
                setIsLoadin(false);
                login(res.data.userId, res.data.token, res.data.name);
                history.push('/')
             }).catch(err => {
                setIsLoadin(false);
                console.log(err);
             });
    }, [history, login]);

    //Login user - post data to db
    const onLoginHandler = useCallback((user) => {
        setIsLoadin(true);
        axios.post('/users/login', user, 
        {'Content-Type': 'application/json'})
             .then(res => {
                setIsLoadin(false);
                login(res.data.userId, res.data.token, res.data.name);
                history.push('/')
             }).catch(err => {
                setIsLoadin(false);
                console.log(err);
             });
    }, [history, login]);
   

    const toggleAuth = () => {
        setToggleState(prevState => !prevState)
    }

    return(
        <Layout>
            <div className='main-auth'>
                <div className='settings' onClick={toggleAuth}>
                <FaRegArrowAltCircleLeft /><span>{toggleState ?  'Move to Log-in' : 'Move to Registration' }</span></div>
                {
                    toggleState 
                    ?  <Register onRegisterHandler={onRegisterHandler}
                        isLoading={isLoading} /> 
                    :  <Login onLoginHandler={onLoginHandler}
                        isLoading={isLoading}/>
                }              
            </div>
        </Layout>
    )
}

export default Auth;