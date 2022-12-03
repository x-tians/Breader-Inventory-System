import '../component/DashboardAddProductStyle.css'
import {useSelector} from 'react-redux'
import ProductRows from '../component/ProductRows'
import CashierAdd from '../component/CashierAdd'
import { useState,useEffect } from 'react'
import Search from '../component/Search'
import axios from 'axios';


const DashboardCashier=()=>{
    const [arrSearch,setArrSearch]=useState([]);
    const buyId=useSelector(state=>state.buyId.transId);

    useEffect(() => {
        loadProducts();
    }, [buyId]);

    //fetch all products
    const loadProducts=async()=>{
        await axios.get('http://localhost:8080/api/v1/products').then( response => {
            if(response.data){
                setArrSearch([...response.data]);
            }
        })
    }

    return(
        <div className='product-container grid h-100'>
            {
                //<Search title={'CASHIER SECTION'} setArrSearchProps={setArrSearch} productsProps={arrSearch}/>
            }
        

        <div className='grid h-100 product-left'>
            <div className='product-left-table-wrapper'>
            <table className='w-100'cellSpacing={0}>
                <thead>
                    <tr>
                        <th>
                            QR CODE
                        </th>
                        <th>
                            Image
                        </th>
                        <th>
                            Item
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            Stocks
                        </th>
                        <th>
                            Expiry Date
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        arrSearch.map((product)=>{
                            return <ProductRows key={product._id} id={product._id}image={product.productImage} name={product.product} price={product.price} quantity={product.stock} isAddProduct={false} expiryDate={product.expiryDate}/>
                        })
                    }
                </tbody>
            </table>
            </div>
                < CashierAdd />
            <div>
            </div>
        </div>
        
    </div>
    )
}

export default DashboardCashier;