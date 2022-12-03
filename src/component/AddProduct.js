import '../component/AddProductStyle.css';
import { useState,useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios';
import { Message } from 'semantic-ui-react'
import { BsCheckAll } from 'react-icons/bs';
import Cookie from 'universal-cookie'

const AddProduct =()=>{
    const dispatch = useDispatch();
    const updateProduct=useSelector( state=>state.product );
    const updateProductId=useSelector( state=>state.productId );
    const dateToday=new Date(new Date()).toISOString().substring(0,10);

    //initial value of the states
    const initialValue={
        pic:'',
        productName:'',
        price:1,
        quantity:1,
        expiryDate:dateToday
    }

    //states
    const [msg,setMsg]=useState('');
    const [count,setCount]=useState(0);
    const [pic,setPic]=useState(initialValue.pic)
    const [productName,setName]=useState(initialValue.productName)
    const [price,setPrice]=useState(initialValue.price)
    const [quantity,setQuantity]=useState(initialValue.quantity)
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgName,setImgName]=useState('');
    const [expiry,setExpiry]=useState(initialValue.expiryDate);

    //initialization of cookie
    const cookie = new Cookie();
    const userToken=cookie.get('token')
    
    useEffect( () => {
        if(updateProductId){
            setImgName(updateProduct.pic);
            setPic(updateProduct.pic);
            setName(updateProduct.productName);
            setPrice(updateProduct.price);
            setQuantity(updateProduct.quantity);
        }
    },[ updateProductId ])

    //store the image on the state
    const picOnChange=(event)=>{
        setSelectedFile(event.target.files[0])
        setPic(event.target.files[0].name);
    }

    //uploads the selected image
    const upload=async()=>{
        const formData = new FormData();
        formData.append('selectedFile', selectedFile);
        formData.append('status', 'products');
        try {
            const response = await axios({
            method: 'post',
            url: 'http://localhost:8080/api/v1/uploads',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
          });
            setImgName(response.data.name);
            setMsg(response.data.msg);
        } catch(error) {
            console.log(error)
        }
    }

    //saving the products
    const addProducts=async()=>{
        let newProducts={product:productName,price:price,productImage:pic,stock:quantity,expiryDate:expiry,category:'bread',addedBy:''};
        await axios.post('http://localhost:8080/api/v1/products', {
            token:userToken,
            products:newProducts
        })
        .then(function (response) {
            if(response.data){
                setMsg(response.data.status);
                dispatch({type:'REFRESH_PRODUCT',payload:{status:true}})
            }else{
                //setMsg('Invalid email or Password!');
            }
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    //update the products
    const updateProducts=async()=>{
        let newProducts={product:productName,price:price,productImage:pic,stock:quantity,expiryDate:expiry};
        await axios.put('http://localhost:8080/api/v1/products', {
            updateProductId,product:newProducts
          })
          .then(function (response) {
            alert(response.data.status)
            dispatch({type:'REFRESH_PRODUCT',payload:{status:true}})
          })
          .catch(function (error) {
            console.log(error);
        });
    }

    //function for onSubmitHandler
    const onSubmitHandler=(events)=>{
        events.preventDefault();
        const btnName=events.nativeEvent.submitter.name;
        //upload the image when the button upload is click
        if(btnName==='btnUpload'){
            if(pic ===''||pic===null){
                alert('Error!, Image Required!.');
            }else{
                upload();
            }
        }
        else{
            if(productName===''||price==='' || quantity==='' || pic===''){
                alert('Error!, make sure to fill the required fields.');
            }else{
                //save the product when the add button is click
                if(btnName==='btnAdd'){
                    addProducts();
                }
                else{ //upload the product when the update button is click
                    updateProducts();
                }
            }
            //reset the states
            setPic(initialValue.pic);
            setName(initialValue.productName);
            setPrice(initialValue.price);
            setQuantity(initialValue.quantity);
            setExpiry(dateToday);
            setImgName('');
            dispatch({type:'UPDATE_PRODUCT',payload:{id:''}})
        }
        
    }
    //hide the message after 7 seconds
    const setTimeOut=()=>{
        const timeOut=setTimeout(()=>{
            let counter=count;
            counter++;
            setCount(counter)
        },600)

        if(count>=7){
            clearInterval(timeOut);
            setCount(0)
            setMsg('');
        }
    }
    return(
        <div className='add-product-wrapper flex w-100'>
            {
                (msg) && <Message negative style={{position:'absolute',zIndex:'1',top:'210px',color:'green' }}> <BsCheckAll/> { msg }  {setTimeOut()} </Message>
            }
            <form className='flex' onSubmit={onSubmitHandler}>
                <img className='add-product-image-container' src= {imgName ? `http://localhost:8080/products/${imgName}`:require('../assets/bread.png') } alt='bread'/>
                <div className='add-product-inputs flex'>
                    <input className='custom-file-input'name ='image' type='file' accept='.png' onChange={ picOnChange }/>
                    <input type='submit' value='Upload File' name='btnUpload' />
                    <label htmlFor='productName'>Name: </label>
                    <input name ='productName' type='text' value={productName} placeholder='Product Name' onChange={(event)=>{setName(event.target.value)}}/>
                    <label htmlFor='price'>Price: </label>
                    <input name ='price' type='number'value={price} onChange={(event)=>{setPrice(event.target.value)}}/>
                    <label htmlFor='quantity'>Stock: </label>
                    <input name ='quantity' type='number'value={quantity} onChange={(event)=>{setQuantity(event.target.value)}}/>
                    <label htmlFor='expiryDate'>Expiry Date</label>
                    <input type='date' name='birthDate'  value={expiry} onChange={(event)=>{setExpiry(event.target.value)}}/>
                    {
                        (!updateProductId) ? <button name ='btnAdd'type='submit'>Add Product</button> : <button name ='btnUpdate'type='submit'>Update Product</button>
                    }
                </div>
            </form>
        </div>
    )
}

export default AddProduct;