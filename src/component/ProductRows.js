import styled from 'styled-components';
import '../component/ProductRowStyle.css';
import { useDispatch} from 'react-redux'
import { useState } from 'react';
import { BsFillTrashFill,BsPencilSquare,BsFillCartPlusFill,BsFillCartXFill } from 'react-icons/bs';
import QRCode from 'react-qr-code';
import axios from 'axios';
import Cookie from 'universal-cookie'
import uuid from 'react-uuid';
//style component for image
const ProductImage=styled.img`
    padding:7px;
    width:100px;
    height:100px;
`;

const ProductRows=({id,image,name,price,quantity,isAddProduct,expiryDate})=>{
    const dispatch = useDispatch();
    const [qty,setQuantity]=useState(0);
    const cookie = new Cookie();
    const tid = cookie.get('tid');

    const onSubmitHandler=(event)=>{
        event.preventDefault();
        const btnName=event.nativeEvent.submitter.name;
        if(btnName==='btnDelete'){//deletes the product
            deleteProducts(id);
        }else if( btnName==='btnUpdate' ){//update the product
            dispatch({type:'UPDATE_PRODUCT',payload:{id,product:{pic:image,productName:name,price:price,quantity:quantity,expiryDate:expiryDate}}})
        }
        
        if(btnName.trim()==='btnAdd'){//puchase product
            if(quantity<=0 || qty>quantity || qty ===''){
                alert('Out of Stock or Invalid Value.');
            }else{//save the purchase item to sales
                addSales();
            }
            setQuantity(0);
        }
    }
    //save the purchase item to sales
    const addSales=async()=>{
        const dateToday=new Date(new Date()).toISOString().substring(0,10);
        let tID = uuid();
        if(tid){
            tID=tid;
        }
        const newStock=Number(quantity)-Number(qty);
        
        const totPrice=Number(price)*Number(qty);
        const sale={payment:tID,quantity:Number(qty),datePuchased:dateToday,price:totPrice,status:'pending',product:id }
        await axios.post('http://localhost:8080/api/v1/sales', {
            sale,
            status:true,
            newStock
        })
        .then(function (response) {
            if(response.data){
                dispatch({type:'BUY_PRODUCT',payload:{pid:response.data.pid,transId:response.data.payment}})
                if(!tid){
                    cookie.set('tid',response.data.transId , { path: '/' })
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    //delete products
    const deleteProducts=async(pid)=>{
        await axios.delete(`http://localhost:8080/api/v1/products/${pid}`).then( response => {
            if(response.data){
                console.log(response.data);
                alert(response.data.status);
                dispatch({type:'REFRESH_PRODUCT',payload:{status:true}})
            }
        })
    }

    return(
        <tr>
             <td>
                <center><QRCode value={id}  size={60} /></center>
            </td>
            <td>
                <center><ProductImage src={`http://localhost:8080/products/${image}`} alt={name} /></center>
            </td>
            <td>
                <center>{name}</center>
            </td>
            <td>
                 <center>{price}</center>
            </td>
            <td>
                <center>{quantity}</center>
            </td>
            <td>
                <center>{ new Date(expiryDate).toISOString().substring(0,10)}</center>
            </td>
            <td className='product-action flex center-justify'>
                <form onSubmit={onSubmitHandler} className='h-100 w-100 flex center-justify'>
                    {
                        (isAddProduct) && <button name ='btnDelete' type='submit' className='product-delete'><div className='icon-con'><BsFillTrashFill/>  Delete</div>  </button>
                    }
                    {
                        (isAddProduct) && <button name ='btnUpdate' type='submit' className='product-update'><div className='icon-con'><BsPencilSquare/> update</div></button>
                    }
                    {
                        (!isAddProduct && quantity>0) && <input name ='quantity' type='number' min='1' value={qty} placeholder='Quantity' onChange={(event)=>{setQuantity(event.target.value)}}/>
                    }
                    {
                        (!isAddProduct && quantity>0) && <button name ='btnAdd' type='submit' className='product-buy'><BsFillCartPlusFill/>  Add</button>
                    }
                    {
                        (!isAddProduct && quantity<=0) && <center><h3 style={{ color:'red' }}><BsFillCartXFill style={{ marginRight:'3px' }}/>Out of Stock</h3></center>
                    }
                </form>
            </td>
        </tr>
    )
}
export default ProductRows;