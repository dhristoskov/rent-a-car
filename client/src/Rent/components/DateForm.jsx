import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DateForm = (props) => {

    return(
        <div>
             <DatePicker
                    selected={props.startDate}
                    onChange={date => props.setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    minDate={Date.now()}
                    selectsStart
                    startDate={props.startDate}
                    endDate={props.endDate}               
                />
                <DatePicker
                    selected={props.endDate}
                    onChange={date => props.setEndDate(date)}
                    dateFormat="dd/MM/yyyy"
                    selectsEnd
                    startDate={props.startDate}
                    endDate={props.endDate}
                    minDate={props.startDate}                 
                />
        </div>
    )
}

export default DateForm;