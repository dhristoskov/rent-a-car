import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const AuthButton = (props) => {

    let authInput = useRef(null);
    let tl = useRef();

    useEffect(() => {
        tl.current = gsap.timeline({ repeat: 20, repeatDelay: 0.4 })
                tl.current.to(authInput, 0.3, { value: 'connecting'})
                tl.current.to(authInput, 0.3, { value: 'connecting .'})
                tl.current.to(authInput, 0.3, { value: 'connecting ..'})
                tl.current.to(authInput, 0.3, { value: 'connecting ...'})
    }, [])

    return(
        <input className='auth-button' ref={el => (authInput = el )} type='submit' value={props.value}/>
    )
}

export default AuthButton;