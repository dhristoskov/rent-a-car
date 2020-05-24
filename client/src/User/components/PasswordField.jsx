import React, { useState, Fragment } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { AiOutlineCheckCircle } from 'react-icons/ai'


const PasswordField = (props) => {

    const [ unVisible, setUnVisible ] = useState(true);

    //Toggle between password and text so password is visible or not
    const toggleVisibal = () => {
        setUnVisible(prevState => !prevState);
    }

    return (
        <Fragment>
            <div className='toggleVisibal'>
                <input type={ unVisible ? 'password' : 'text' } name='password' value={props.value}
                onChange={props.onHandleChange} placeholder='Password...' required/>
                <span onClick={toggleVisibal}>{unVisible ? <i className='iconVisibility'><MdVisibilityOff /></i> : 
                <i className='iconVisibility'><MdVisibility  /></i> }</span>
            </div>       
                {props.errors && <p className='errors'>{props.errors}</p>}
                {props.passLength >= 6 && <p className='checked'><AiOutlineCheckCircle /></p>}
        </Fragment>
    )
}

export default PasswordField;