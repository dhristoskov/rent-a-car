import React from 'react'

const DeleteWarning = (props) => {
    return(
        <div className='delete-container'>
            <h3>Are you sure?</h3>
            <p>Do you want to proceed and delete this order? Please note that it
            can't be undone thereafter.</p>
            <div className='delete-btns'>
                <button className='cancel' onClick={props.cancel}>Cancel</button>
                <button className='delete' onClick={props.delete}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteWarning;