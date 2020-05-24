import React from 'react';

const CarInfoCard = (props) => {

    return (
        <div className='card-wrapper'>
            <img src={props.src} alt={props.alt}/>
            <p onClick={() => props.clicked(props.name)}>{props.text}</p>
        </div>
    )
}

export default CarInfoCard;