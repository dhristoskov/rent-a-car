import React, { useState, useRef, useEffect, Fragment } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useParams, useHistory } from 'react-router-dom';
import gsap from 'gsap';
import axios from '../../axios';

import PasswordField from './PasswordField';
import { ValidateInput } from '../../shared/utils/validations';
import Layout from '../../shared/components/Layout/Layout';
import AuthButton from '../../shared/components/Buttons/AuthButton';

const ResetForm = () => {

    const token = useParams().token;
    let authForm = useRef(null);
    const history = useHistory(); 
    const [ isLoading, setIsLoadin ] = useState(false);
    const [ errors, setErrors ] = useState({});
    const [reset, setReset ] = useState({
        password: '',
        password2: '',
        token: token
    });

    //Gsap entry animation
    useEffect(() => {
        let tl = gsap.timeline();
        tl.from(authForm, 1.5, {scale: 0.5, opacity: 0})
    }, [])

    const { password, password2 } = reset;

    //onChange + input validation
    const onHandleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let error = ValidateInput(name, value);
        setErrors(error)
        setReset({...reset, [name]: value});
    };

    //Check password and password2 - post new password and token to db
    const onHandleSubmit = (e) => {
        e.preventDefault();
        if(password !== password2){
            setErrors({msg:'Password and confirm password does not match'})
        }else{   
            setIsLoadin(true);
            axios.post('/users/update', reset,
            {'Content-Type': 'application/json'})
                .then(res => {
                 setIsLoadin(false);
                 history.push('/auth')
                }).catch(err => {
                 setIsLoadin(false);
                 console.log(err);
                });
            setReset({
                password: '',
                password2: ''
            });
        };
    };

    return(
        <Layout>
            <div className='auth-container' ref={el => ( authForm = el)}>
                <h3>Reset Passowrd Form</h3>
                <p>Enter your new password</p>
                <form className='auth-form' onSubmit={onHandleSubmit}>
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
                            isLoading 
                            ? <AuthButton value='Update Password'/>
                            :
                            <Fragment>
                                <input type="submit" value='Update Password'/>
                                {errors.msg && <p className='errors'>{errors.msg}</p>}
                            </Fragment>
                        }          
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default ResetForm;