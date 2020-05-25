import React, { useEffect, useState, useRef, useCallback, Fragment, useReducer } from 'react';
import axios from '../../axios';
import gsap from 'gsap';

import FleetList from '../components/FleetList';
import Layout from '../../shared/components/Layout/Layout';
import PreLoader from '../../shared/components/PreLoader/PreLoader';
import SearchForm from '../components/SearchForm';
import Pagination from '../../shared/components/Pagination/Pagination';
import SortButtons from '../components/SortButtons';


const fleetReducer = ( state, action ) => {
    switch(action.type){
        case 'GET':
            return action.fleet;
        case 'HIGH_FIRST':
            return state.slice().sort((a, b) => b.price - a.price)
        case 'LOW_FIRST':
            return state.slice().sort((a, b) => a.price - b.price)
        default:
            return state;
    }
};

const FleetPage = () => {
  
    const [ fleet, dispatch ] = useReducer(fleetReducer, []);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ search, setSearch ] = useState([]);
    const [ onSearch, setOnSearch] = useState(false)
    const [ currentPage, setCurrenPage ] = useState(1);
    const itemsPerPage = 6;
    let tl = useRef();
    let title = useRef(null);
    let line = useRef(null);
    let subtitle = useRef(null);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = fleet.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        tl.current = gsap.timeline();
        tl.current.from(title, 1,{x: -200, opacity:0})
                  .from(subtitle, 1, {x: 100, opacity: 0}, 0.5)
                  .from(line, 2, { width: 0 }, 0.5)
    }, []);

    //Fetch all cars from db
    useEffect(() => {
        setIsLoading(true)
        axios.get('/fleet')
             .then(res => {
                setIsLoading(false);
                dispatch({type: 'GET', fleet: res.data.cars})
             }).catch(err => {
                setIsLoading(false);
                console.log(err);
             })
    }, []);

    //Search for different results 
    const onSubmitNameHandler = useCallback((name) => {
        setIsLoading(true)
        axios.get(`/fleet/sort/${name}`)
             .then(res => {
                setIsLoading(false);
                setSearch(res.data.cars);
                setOnSearch(true);
             }).catch(err => {
                setIsLoading(false);
                console.log(err)
             });
    }, []);

    const onSearchClear = useCallback(() => {
        setOnSearch(false)
    }, []);

    const onPaginationHandler = (number) => {
        setCurrenPage(number);      
    };

    const onHighPrice = () => {
        dispatch({type: 'HIGH_FIRST'});
    }
    const onLowPrice = () => {
        dispatch({type: 'LOW_FIRST'});
    }
   
    let mainList = <Fragment>
                    {
                        isLoading 
                        ? <PreLoader /> 
                        : <Fragment>  
                            <SortButtons onHighPrice={onHighPrice}
                                         onLowPrice={onLowPrice}/>                        
                            <FleetList fleet={currentItems} />
                            { 
                                fleet.length > 6 && 
                                <Pagination totalItems={fleet.length}
                                itemsPerPage={itemsPerPage}
                                pagination={onPaginationHandler}/>
                            }
                          </Fragment>

                    }    
                    </Fragment>

    let searchList = <Fragment>
                    {
                        isLoading 
                        ? <PreLoader /> 
                        : <FleetList fleet={search} />
                    }    
                    </Fragment> 

    let mainCarList;
    if(fleet.length){
        mainCarList = <p className='offer-counter'>we have {fleet.length} total
        <span> {fleet.length ===  1 ? 'offer' : 'offers'} </span>for you</p>
    }

    let searched
    if(search.length){
        searched = <p className='offer-counter'>we have {search.length} total
        <span> {search.length ===  1 ? 'offer' : 'offers'} </span>for you</p>
    }else{
        searched = <p className='offer-counter'>we dont have any offers for you</p>
    }              

    return(
        <Layout>  
            <SearchForm onSubmitNameHandler={onSubmitNameHandler}
            onSearch={onSearch}
            onSearchClear={onSearchClear}/>
            <h1 ref={ el => ( title = el )} className='home-title'>premium car rental</h1>
            <p ref={ el => ( subtitle = el )} className='subtitle'>check our fleet</p>
            <p ref={ el => ( line = el )} className='line'/>
            { onSearch ? searched : mainCarList }       
            { onSearch ? searchList : mainList }      
        </Layout>
    )
}

export default FleetPage;
