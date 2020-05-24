import React, { useEffect, useState, useRef, useCallback } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import gsap from 'gsap';
import axios from '../axios';

import FleetList from '../Fleet/components/FleetList';
import PreLoader from '../shared/components/PreLoader/PreLoader';
import CarInforCard from '../shared/components/CarInfoCard/CarInfoCard';
import Layout from '../shared/components/Layout/Layout'
import suv from '../assets/vw-touran.png'
import sedan from '../assets/bmw-1er.png'
import coupe from '../assets/mb-e53.png'

const LandingPage = () => {

    const [offers, setOffers ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const history = useHistory();
    let tl = useRef();
    let title = useRef(null);
    let line = useRef(null);
    let subtitle = useRef(null);

    useEffect(() => {
        tl.current = gsap.timeline();
        tl.current.from(title, 1.5,{scale: 0.5, opacity:0})
                  .from(subtitle, 1.5, {y: 20, opacity: 0}, 0.75)
                  .from(line, 2, { width: 0 }, 0.5)
    }, []);

    useEffect(() => {
        setIsLoading(true)
        axios.get('/fleet/offers/cars')
             .then(res => {
                setIsLoading(false);
                setOffers(res.data.cars)
             }).catch(err => {
                setIsLoading(false);
                console.log(err);
             })
    }, []);

    const onSearchtHandler = useCallback((name) => {
        const convName = name.toLocaleLowerCase();
        history.push(`/fleet/sort/${convName}`)
    }, [history]);

  
    return(
        <Layout>
            <h1 ref={ el => ( title = el )} className='home-title'>
                Low weekly rates. Avaliable right now.</h1>
            <p ref={ el => ( subtitle = el )} className='subtitle'>Cancel at any time</p>
            <p ref={ el => ( line = el )} className='line'/>
            {
                isLoading 
                ? <PreLoader /> 
                : <FleetList fleet={offers} />
            }               
            <p className='offers-btn'><NavLink to='/fleet'>Check our other offers</NavLink></p>
            <p className='slogan'>Don't dream it, drive it</p>
            <p className='line'/>
            <section className='sorting-section'>
                <CarInforCard src={coupe} alt={"coupe"} clicked={onSearchtHandler} name={'coupe'} text={'Check our coupes'} />
                <CarInforCard src={sedan} alt={"sedan"} clicked={onSearchtHandler} name={'sedan'} text={'Check our sedans'}/> 
                <CarInforCard src={suv} alt={"suv"} clicked={onSearchtHandler} name={'suv'} text={'Check our suvs'}/>          
            </section>
        </Layout>
    )
}

export default LandingPage;