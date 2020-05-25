import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { MdDirectionsCar, MdAirlineSeatReclineNormal } from 'react-icons/md';
import { GoGear } from 'react-icons/go';
import { IoMdSnow } from 'react-icons/io'

const SingleFleetItem = (props) => {

    const history = useHistory();

    const onToRentMove = () => {
        history.push(`/rent/${props.id}`)
    }

    return(        
        <div className='item-cars' >
            <p className='name'>{props.name}<span> {props.model}</span></p>
            <div className='options'>
                <p className='car-type'><span><MdDirectionsCar /></span> {props.carType}</p>
                <p className='car-type'><span><MdAirlineSeatReclineNormal /></span> {props.seats}</p>
                <p className='car-type'><span><GoGear /></span> {props.gears}</p>
                <p className='car-type'><span><IoMdSnow /></span> {props.clima ? 'yes' : 'no'}</p>
            </div>
            <img onClick={onToRentMove} src={`http://localhost:5000/${props.image}`} alt='car'/>
            <p className='price'>Price - € <span>{(props.price).toFixed(2)}</span> /For a Day </p>
            <div className='info-btn'>
                <p><NavLink to={`/rent/${props.id}`}>rent</NavLink></p>
            </div>
        </div>
    )
}

export default SingleFleetItem;