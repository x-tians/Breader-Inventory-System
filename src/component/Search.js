import { useState,useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'

const Search=({title,setArrSearchProps})=>{
    const products=useSelector( state=>state.products );
    const [txtsearch,setTxtDearch]=useState('');
    const dispatch = useDispatch();
    const isDelete=useSelector( state=>state.isDelete );
    useEffect(()=>{
        if(isDelete){
            setTxtDearch('');
            setArrSearchProps(products);
            dispatch({type:'ISDELETE'});
        }
    }, [ isDelete ])


    const onChangeHandler =(event)=>{
        setTxtDearch(event.target.value);
        if(txtsearch.trim()==='' || event.target.value===''){
            setArrSearchProps(products);
        }else{
            const filterProduct=products.filter((product)=>{return product.name===event.target.value});
            if(filterProduct.length<0){
                setArrSearchProps(products);
            }else{
                setArrSearchProps(filterProduct);
            }
        }
    }

    return (
        <div className='bread-crumb grid'>
            <h3>{title}</h3>
            <form className='product-left-search'>
                <input name ='txtsearch' value={txtsearch} onChange={onChangeHandler} type='search' placeholder='search'></input>
            </form>
        </div>
    )
}
export default Search;