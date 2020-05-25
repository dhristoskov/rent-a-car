import React, {useState, useEffect, useCallback, useContext, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import gsap from 'gsap';
import axios from '../../axios';

import PreLoader from '../../shared/components/PreLoader/PreLoader';
import RentForm from '../components/RentForm';
import Layout from '../../shared/components/Layout/Layout';
import { AuthContext } from '../../shared/contexts/AuthContext';
import { MdDirectionsCar, MdAirlineSeatReclineNormal } from 'react-icons/md';
import { GoGear } from 'react-icons/go';
import { IoMdSnow } from 'react-icons/io'

const DetailRentPage = (props) => {

    const { userId } = useContext(AuthContext);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ selected, setSelected ] = useState({});
    let tl = useRef();
    let title = useRef(null);
    let line = useRef(null);
    const history = useHistory();
    const carId = useParams().id;

    useEffect(() => {
        tl.current = gsap.timeline();
        tl.current.from(title, 1.5,{scale: 0.5, opacity:0})
                  .from(line, 2, { width: 0 }, 0.5)
    }, []);

     //Fetch single car element
     useEffect(() => {
        setIsLoading(true)
        axios.get(`/fleet/${carId}`)
             .then(res => {
                setIsLoading(false);
                setSelected(res.data.car);
            }).catch(err => {
                setIsLoading(false);
                console.log(err);
            });
     }, [carId]);
    
     //Make an order
     const onOrderHandler = useCallback((order) => {
        setIsLoading(true);
        axios.post('/orders', order, 
        { 'Content-Type': 'application/json' })
             .then(res => {
                setIsLoading(false);
                history.push(`/my-orders/${userId}`)
            }).catch(err => {
                setIsLoading(false);
                console.log(err);
            })
     }, [history, userId]);

    let fixedPrice;
    if(selected.price){
        fixedPrice = (selected.price).toFixed(2);
    };

    let image
    if(selected.image){
        image = `http://localhost:5000/${selected.image}`;
    }

    return(        
        <Layout>
            <h1 ref={ el => ( title = el )} className='home-title'>
                Rent a car, it has never been easier </h1>
            <p ref={ el => ( line = el )} className='line'/>
            <div className='rent-page-wrapper'>
                {
                    isLoading 
                    ? <PreLoader />
                    : 
                    <div className='item-cars' >
                        <p className='name'>{selected.name}<span> {selected.model}</span></p>
                        <div className='options'>
                            <p className='car-type'><span><MdDirectionsCar /></span> {selected.carType}</p>
                            <p className='car-type'><span><MdAirlineSeatReclineNormal /></span> {selected.seats}</p>
                            <p className='car-type'><span><GoGear /></span> {selected.gears}</p>
                            <p className='car-type'><span><IoMdSnow /></span> {selected.clima ? 'yes' : 'no'}</p>
                        </div>  
                        <img src={image} alt='car'/>                     
                        <p className='price'>Price - € <span>{fixedPrice}</span> /For a Day </p>
                    </div>
                }
                <RentForm carId={carId}
                onOrderHandler={onOrderHandler}/>
            </div>
        </Layout>
    )
}

export default DetailRentPage;
