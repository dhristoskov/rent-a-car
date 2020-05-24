import React, { useRef, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap'

import { AuthContext } from '../../contexts/AuthContext';

const SideBarMenu = (props) => {

    const { toggleSideBar } = props
    const { isLoggedIn, userId } = useContext(AuthContext)
    let sideBar = useRef(null)
    let tl = useRef();

    useEffect(() => {
        tl.current = gsap.timeline({paused: true});
        tl.current.fromTo(sideBar, 1,{x: -200, opacity:0}, {x:0, opacity: 1, duration: 0.75, ease: 'Power2.inOut'})
    }, []);

    useEffect(() => {
        toggleSideBar ? tl.current.play() : tl.current.reverse()
    }, [toggleSideBar])

    return(
        <ul className='sidebar' ref={ el => (sideBar = el)}>
            <li><NavLink exact to='/'>Home</NavLink></li>
            <li><NavLink to='/fleet'>Fleet</NavLink></li>
            {
                isLoggedIn && <li><NavLink to={`/my-orders/${userId}`}>My Orders</NavLink></li>
            }          
        </ul>
    )
}

export default SideBarMenu;
