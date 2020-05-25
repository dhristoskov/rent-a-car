import React, { useEffect, useState, useRef, Fragment } from 'react';
import axios from '../../axios';
import gsap from 'gsap';
import { useParams } from 'react-router-dom';

import PreLoader from '../../shared/components/PreLoader/PreLoader';
import Layout from '../../shared/components/Layout/Layout';
import FleetList from '../components/FleetList';
import Pagination from '../../shared/components/Pagination/Pagination';

const FleetSearchPage = () => {

    const [ isLoading, setIsLoading ] = useState(false);
    const [ searched, setSearched ] = useState([]);
    const [ currentPage, setCurrenPage ] = useState(1);
    const itemsPerPage = 6;
    let tl = useRef();
    let searchTitle = useRef(null);
    const name = useParams().name;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searched.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        tl.current = gsap.timeline();
        tl.current.from(searchTitle, 1,{y: -20, opacity:0})
    }, []);

      useEffect(() => {
        setIsLoading(true)
        axios.get(`/fleet/sort/${name}`)
             .then(res => {
                setIsLoading(false);
                setSearched(res.data.cars)
             }).catch(err => {
                setIsLoading(false);
                console.log(err)
             });
    },[name]);

    const onPaginationHandler = (number) => {
        setCurrenPage(number);      
    };

    let offers;
    if(searched.length){
        offers = <p className='offer-counter'>we have {searched.length} 
        <span> {searched.length ===  1 ? 'offer' : 'offers'} </span>for you</p>
    }


    return(
        <Layout>
            <div className='title-search' >
                <h1 ref={ el => ( searchTitle = el )}>don't dream it, Drive it!</h1>
                <p className='line'/>
            </div>
            {offers}
            {
                isLoading 
                ?   <PreLoader /> 
                :   <Fragment>
                        <FleetList fleet={currentItems} />
                        { searched.length > 6 && 
                            <Pagination totalItems={searched.length}
                            itemsPerPage={itemsPerPage}
                            pagination={onPaginationHandler}/>
                        }
                    </Fragment>
            }   
        </Layout>
    )

}

export default FleetSearchPage