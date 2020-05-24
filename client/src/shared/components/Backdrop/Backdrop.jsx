import React from 'react';
import ReactDOM from 'react-dom';

const Backdrop = (props) => {

    return ReactDOM.createPortal(
        <div className='backdrop' onClick={props.removeModal}></div>,
        document.getElementById('backdrop')
      );
}

export default Backdrop;