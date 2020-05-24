import React, { Fragment, useEffect, useRef } from 'react';
import gsap from 'gsap';

import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {

    let modal = useRef(null)
    let tl = gsap.timeline();

    useEffect(() => {
        tl.fromTo(modal, 1, {scale: 0.5, opacity: 0}, {scale: 1, opacity: 1})
    }, [tl]);

    return(
        <Fragment>
            <Backdrop removeModal={props.removeModal}/>
            <div className='modal-wrapper' ref={ mod => ( modal = mod )}>
                {props.children}
            </div>
        </Fragment>
    )
}

export default Modal