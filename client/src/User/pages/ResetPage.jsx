import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import axios from '../../axios';
import gsap from 'gsap';

import { ValidateEmail, ValidateInput } from '../../shared/utils/validations';
import Layout from '../../shared/components/Layout/Layout';

const ResetPage = (props) => {

    let authForm = useRef(null); 
    let settings = useRef(null);
    let tl = useRef()
    const [ errors, setErrors ] = useState({});
    const [ emailToReset, setEmail ] = useState({email: ''});
    const history = useHistory();

    const { email } = emailToReset

    //Gsap entry animation
    useEffect(() => {
        tl.current = gsap.timeline();
        tl.current.fromTo(authForm, 1.5, {scale: 0.5, opacity: 0}, {scale: 1, opacity: 1})
                  .from(settings, 1, {y: 20, opacity: 0}, 0.5)
    }, [tl]);

    //onCahnge + validate input
    const onHandleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let error = ValidateInput(name, value);
        setErrors(error)
        setEmail({...emailToReset, [name]: value})
    };

    //post new email to db
    const onSubmitHandler = (e) => {
        e.preventDefault();
            axios.post('/emails/reset', emailToReset, 
            {'Content-Type': 'application/json'})
                 .then(res => {               
            }).catch(err => {
                  console.log(err);
            });
        setEmail({email: ''});
        history.push('/');
    };

    const backToLogin = () => {
        history.goBack()
    };

    return(
        <Layout>
            <div className='settings' onClick={backToLogin} ref={ el => ( settings = el )}>
                <FaRegArrowAltCircleLeft /><span>Move Back</span></div>
            <div className='auth-container' ref={el => ( authForm = el)}>
                <h3>Reset password</h3>
                <p>We will send you reset link per E-mail</p>
                <form className='auth-form' onSubmit={onSubmitHandler}>
                    <div className='input-fied'>
                        <input type="email" name='email' placeholder='E-mail...'
                        value={email} onChange={onHandleChange} required/>        
                        {errors.email && <p className='errors'>{errors.email}</p>}
                        {ValidateEmail.test(email) && <p className='checked'><AiOutlineCheckCircle /></p>}
                    </div>
                    <div className='input-fied'>     
                        <input type="submit" value='Reset Password'/>
                    </div>
                </form>
            </div>
        </Layout>
        )
}

export default ResetPage;