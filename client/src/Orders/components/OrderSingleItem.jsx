import React, { Fragment, useState } from 'react';

import Modal from '../../shared/components/Modals/Modal';
import DeleteWarning from '../../shared/components/DeleteWarning/DeleteWarning';

const OrderSingleItem = (props) => {

    const [showWarning, setShowWarning ] = useState(false);

    let startDate = new Date(props.startDate).toLocaleDateString('de-DE');
    let endDate = new Date(props.endDate).toLocaleDateString('de-DE');

    let totalPrice;
    if(props.totalPrice){
        totalPrice = (props.totalPrice).toFixed(2);
    };

    const showDeleteWarning = () => {
        setShowWarning(true);
    };

    const hideDeleteWarning = () => {
        setShowWarning(false);
    };

    return(   
        <Fragment>
            {
                showWarning &&   
                <Modal removeModal={hideDeleteWarning}>
                    <DeleteWarning
                    cancel={hideDeleteWarning}
                    delete={props.onDeleteOrder}/>
                </Modal>
            }
            <div className='order-card'>
                <div className='item-cars' >
                    <p className='name'>{props.name}<span> {props.model}</span></p>
                    <img src={ `http://localhost:5000/${props.image}`} alt='car'/>
                </div>
                <div className='main-order-wrapper'>
                    <p className='total-price'>Your price:<span> {totalPrice} </span>€</p>
                    <p className='full-name'>{props.firstName}<span> {props.lastName}</span></p>
                    <div className='order-info'>
                        <p>Rent dates from {startDate} <span>to {endDate}</span></p>
                        <p>For total of {props.totalDays} days</p>                   
                    </div>
                    {
                    !props.isPayNow 
                    ? <p className='off-message'>Pay now and get 10% off </p>
                    : <p className='off-message'>Proceed to checkout </p>
                    }
                    <div className='buttons'>
                        {
                            !props.isPayNow 
                            ?   <Fragment>
                                    <p onClick={props.onPayNowHandler} className='button-action'>Pay now</p>
                                    <p onClick={props.onInvoicePdf} className='button-action'>Pay Later</p>
                                </Fragment>
                            :   <Fragment>
                                    <p onClick={props.onPayLaterHandler} className='button-action'>Undo pay</p>
                                    <p onClick={props.sendInvoiceEmail} className='button-action'>Checkout</p>
                                </Fragment>
                        }             
                        <p onClick={showDeleteWarning} className='button-action'>Delete</p>
                    </div>    
                </div>
            </div> 
        </Fragment>
    )
}

export default OrderSingleItem;