import React from 'react';

import OrderSingleItem from './OrderSingleItem';

const OrdersList = (props) => {

    if(!props.orders.length){
        return(
            <p style={{textAlign: 'center'}}>We can't find any orders right now</p>
        )
    }

    return (
        <ul className='list-autos'>
            { 
            props.orders.map( order => {
                return (
                    <OrderSingleItem
                    key={order.id}
                    id={order.id}
                    firstName={order.firstName}
                    lastName={order.lastName}
                    startDate={order.startDate}
                    endDate={order.endDate}
                    totalDays={order.totalDays}
                    totalPrice={order.totalPrice}
                    car={order.car}
                    name={order.name}
                    model={order.model}
                    image={order.image}
                    isPayNow={order.isPayNow}
                    onDeleteOrder={() => props.onDeleteOrder(order.id)}
                    onPayNowHandler={() => props.onPayNowHandler(order.id)}
                    onPayLaterHandler={() => props.onPayLaterHandler(order.id)}
                    sendInvoiceEmail={() => props.sendInvoiceEmail(order.id)}
                    onInvoicePdf={() => props.onInvoicePdf(order.id)}/>
                )
            })
            }        
        </ul>
    )
}

export default OrdersList;