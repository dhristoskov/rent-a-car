import React, { Fragment } from 'react';

const Pagination = (props) => {

    const pageNumers = [];
    
    for(let i = 1; i <= Math.ceil(props.totalItems/props.itemsPerPage); i++ ){
        pageNumers.push(i)
    }

    return (
        <Fragment>
            {pageNumers.length && 
            <ul className='pagination-nav'>
                <p>pages</p>
                {pageNumers.map(number => (
                    <li key={number} className='page-number'>
                        <button onClick={() => props.pagination(number)} className='page-button'>{number}</button>
                    </li>
                ))}
            </ul> }
        </Fragment>
    )

}

export default Pagination;