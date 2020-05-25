import React, { useState } from 'react'

const SearchForm = (props) => {

    const [ name, setName ] = useState('');

    const onSubmitNameHandler = (e) => {
        const convName = name.toLocaleLowerCase()
        e.preventDefault();
        props.onSubmitNameHandler(convName);
        setName('');
    };

    return(
        <div className='search-form'>
            <form onSubmit={onSubmitNameHandler}>
                    <input type='text' name='name' value={name} placeholder='Enter name.. model.. or type..'
                    required onChange={(e) => setName(e.target.value)} />
                    {
                        props.onSearch 
                        ? <button className='clear-search' onClick={props.onSearchClear}>clear</button>
                        : <input type='submit' value='search' />
                    }                   
            </form>
        </div>
    )
}

export default SearchForm;