import React, { Fragment, useState } from 'react'
import { IoIosArrowDropup, IoIosArrowDropdown } from 'react-icons/io'

const SortButtons = (props) => {

    const [isUp, setIsUp] = useState(false);

    const toHightHandler = () => {
        setIsUp(true);
        props.onHighPrice()
    };

    const toLowHandler = () => {
        setIsUp(false);
        props.onLowPrice()
    };

    return(
        <Fragment>
            {
                isUp ?  <div className='sort-arrow'>
                            <button onClick={toLowHandler}> 
                            <span>Price order High-to-Low</span><IoIosArrowDropdown /></button>
                        </div>
                    :   <div className='sort-arrow'>              
                            <button onClick={toHightHandler}> 
                            <span>Price order Low-to-High</span><IoIosArrowDropup /></button>
                        </div>
            }         
        </Fragment>
    )
}

export default SortButtons;