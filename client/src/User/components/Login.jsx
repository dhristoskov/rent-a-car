import React, { useState, useRef, useEffect, Fragment } from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { NavLink } from 'react-router-dom';
import gsap from 'gsap'

import { ValidateEmail, ValidateInput } from '../../shared/utils/validations'
import AuthButton from '../../shared/components/Buttons/AuthButton';
import PasswordField from './PasswordField';

const Login = (props) => {

    let authForm = useRef(null); 
    let tl = useRef()
    const [ errors, setErrors ] = useState({});
    const [ loginUser, setLoginUser ] = useState({
        email: '',
        password: ''
     });

    const { email, password } = loginUser;

    //on input change + input validation
    const onHandleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let error = ValidateInput(name, value);
        setErrors(error)
        setLoginUser({...loginUser, [name]: value})
    };

    //Submit changes
    const onHandleSubmit = (e) => {
        e.preventDefault();
        props.onLoginHandler(loginUser);       
        setLoginUser({
            email: '',
            password: ''
        });
    };

    //Gsap entry animation
    useEffect(() => {
        tl.current = gsap.timeline();
        tl.current.fromTo(authForm, 1.5, {scale: 0.5, opacity: 0}, {scale: 1, opacity: 1})
    }, [tl])

    return (
        <div className='auth-container' ref={el => ( authForm = el)}>
            <h3>Log-in</h3>
            <p>enter your credentials to log-in</p>
            <form className='auth-form' onSubmit={onHandleSubmit}>
                <div className='input-fied'>
                    <input type="email" name='email' placeholder='E-mail...'
                    value={email} onChange={onHandleChange} required/>        
                    {errors.email && <p className='errors'>{errors.email}</p>}
                    {ValidateEmail.test(email) && <p className='checked'><AiOutlineCheckCircle /></p>}
                </div>
                 <div className='input-fied'>
                    <PasswordField onHandleChange={onHandleChange}
                                    value={password}
                                    errors={errors.password}
                                    passLength={password.length}/>
                </div>
                <div className='input-fied'>
                    {
                        props.isLoading 
                        ? <AuthButton value='Log-in'/>
                        :
                        <Fragment>
                            <input type="submit" value='Log-in'/>
                            {errors.msg && <p className='errors'>{errors.msg}</p>}
                        </Fragment>
                    }                  
                </div>             
            </form>
            <p className='psw-question'><NavLink to='/auth/reset'>Forgotten password?</NavLink></p>
        </div>
    )

}

export default Login;