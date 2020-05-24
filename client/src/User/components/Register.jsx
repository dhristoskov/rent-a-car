import React, { useState, useRef, useEffect, Fragment } from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import gsap from 'gsap'

import { ValidateEmail, ValidateInput } from '../../shared/utils/validations'
import AuthButton from '../../shared/components/Buttons/AuthButton';
import PasswordField from './PasswordField';

const Register = (props) => {

    let authForm = useRef(null); 
    const [ errors, setErrors ] = useState({});
    const [ registerUser, setRegisterUser ] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
     });

    const { name, email, password, password2 } = registerUser;

    //onChange + input validation
    const onHandleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let error = ValidateInput(name, value);
        setErrors(error)
        setRegisterUser({...registerUser, [name]: value})
    };

    //Check password and password2 and submit date
    const onHandleSubmit = (e) => {
        e.preventDefault();
        if(password !== password2){
            setErrors({msg:'Password and confirm password does not match'})
        }else{
            props.onRegisterHandler(registerUser)    
            setRegisterUser({
                name: '',
                email: '',
                password: '',
                password2: ''
            });
        };
    };

    //Gsap entry animaion
    useEffect(() => {
        let tl = gsap.timeline();
        tl.from(authForm, 1.5, {scale: 0.5, opacity: 0})
    }, [])


    return (
        <div className='auth-container' ref={el => ( authForm = el)}>
            <h3>Registration</h3>
            <p>Before using our app, you need to create an account</p>
            <form className='auth-form' onSubmit={onHandleSubmit}>
                <div className='input-fied'>
                    <input type='text' name='name' placeholder='Name...'  
                    value={name} onChange={onHandleChange} required/>
                    {errors.name && <p className='errors'>{errors.name}</p>}
                    {name.length >= 3 && <p className='checked'><AiOutlineCheckCircle /></p>}
                </div>
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
                    <input type="password" name='password2' placeholder='Confirm password...'
                    value={password2} onChange={onHandleChange} required/>
                    {errors.password2 && <p className='errors'>{errors.password2}</p>}
                    { password2.length >= 6 && <p className='checked'><AiOutlineCheckCircle /></p>}
                </div>
                <div className='input-fied'>
                    {
                        props.isLoading 
                        ? <AuthButton value='Register'/>
                        :
                        <Fragment>
                            <input type="submit" value='Register'/>
                            {errors.msg && <p className='errors'>{errors.msg}</p>}
                        </Fragment>
                    }
                    
                </div>
            </form>
        </div>
    )

}

export default Register;