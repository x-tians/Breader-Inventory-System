import CashierTotalRow from '../component/CashierTotalRow';
import {useSelector, useDispatch} from 'react-redux'
import uuid from 'react-uuid';
import '../component/CashierAddStyle.css';
import { useState, useEffect} from 'react';
import axios from 'axios';
import Cookie from 'universal-cookie'

const CashierAdd=()=>{
    //states
    const [payment,setPayment]=useState(0);
    const [change,setChange]=useState(0);
    const [sales,setSales]=useState([]);
    
    const dispatch = useDispatch();
    const buyId=useSelector(state=>state.buyId.transId);
    const cookie = new Cookie();
    const tid = cookie.get('tid');
    let changeTot=0;

    useEffect(() => {
        loadBuy();
        dispatch({type:'BUY_PRODUCT',payload:{pid:'',transId:''}});
    }, [buyId]);

    //fetch the added product from sales
    const loadBuy=async()=>{
        await axios.get(`http://localhost:8080/api/v1/sales/${tid}`,{
            tid,
            status:false
        }).then( response => {
            if(response.data){
                setSales([...response.data]);
            }
        })
    }

    //calculate the total of added items from sales
    let salesTotal= sales.reduce((saleTot,sale)=>{return saleTot+sale.price},0);
    

    const onFormSubmitHandler=(event)=>{
        event.preventDefault();
        //calculate the change
        changeTot=Number(payment)-Number(salesTotal);

        //the message is show if the payment is lessthan the total price
        if(changeTot<0){
            alert('Not Enough Money.');
        }else{
            updateSaleStatus();
        }
        setChange(changeTot);
    }
    
    //update the sales status
    const updateSaleStatus =async()=>{
        const paymentValue={payment:tid,value:payment};
        await axios.patch('http://localhost:8080/api/v1/sales', {
            payment:tid,
            paymentValue
          })
          .then(function (response) {
            if(response.data){
                alert(response.data.status); 
                cookie.remove('tid', { path: '/' });
                dispatch({type:'BUY_PRODUCT',payload:{pid:'true',transId:'true'}});
                loadBuy();
            }else{
                alert('Error!, Contact your adminisrator.');
            }
          })
          .catch(function (error) {
            console.log(error);
        });
    }
    
    return(
        <div className='add-product-wrapper flex w-100'>
            <div className='add-product-table'>
                <table className='cashier-table-total w-100'>
                    <thead>
                        <tr>
                            <th>
                                Item
                            </th>
                            <th className='cashier-action'>
                                Qty.
                            </th>
                            <th className='cashier-action'>
                                Price
                            </th>
                            <th className='cashier-action'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            sales.map((salesItem)=>{
                                return <CashierTotalRow key = {uuid()} name={salesItem.product.product} quantity = {salesItem.quantity} price={salesItem.price} id={salesItem._id} pid={salesItem.product._id} />
                            })
                        }
                    </tbody>
                </table>
            </div>
            <form className='w-100' onSubmit={onFormSubmitHandler}>
                <div className='cashier-total-wrapper flex w-100 center-justify'>
                    <label htmlFor='total'>Total: </label>
                    <input name ='total' type='number' disabled  placeholder='0.00' value={salesTotal}/>
                    <label htmlFor='cash'>Cash: </label>
                    <input name ='cash' type='number' placeholder='0.00' value={payment} onChange={(event)=>{setPayment(event.target.value)}} />
                    <label htmlFor='change'>Change: </label>
                    <input name ='change' type='number' placeholder='0.00' disabled value={change}/>
                    <br/>
                    <button type='submit' name ='btnCompute'> Compute </button>
                </div>
            </form>
        </div>
    )
    
}
export default CashierAdd;