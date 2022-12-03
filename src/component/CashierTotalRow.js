import { BsFillTrashFill } from 'react-icons/bs';
import { useDispatch} from 'react-redux'
import axios from 'axios';

const CashierTotalRow =({name,quantity,price,id,pid})=>{
    const dispatch = useDispatch();

    const onClickHandler=()=>{
        deleteSale();
    }
    //delete the added item in the sales
    const deleteSale=async()=>{
        await axios.delete(`http://localhost:8080/api/v1/sales/${id}/${pid}/${quantity}`).then( response => {
            if(response.data){
                dispatch({type:'BUY_PRODUCT',payload:{pid:'0',transId:'0'}});
                alert(response.data.status);
            }
        })
    }

    return(
        <tr>
            <td>
                <center><strong>{ name }</strong></center>
            </td>
            <td>
                <center>{quantity}</center>
            </td>
            <td>
                <center>{price}</center>
            </td>
            <td className='action'>
                <center><button onClick={onClickHandler} className='remove'> <BsFillTrashFill/> </button></center>
            </td>
        </tr>
    )

}
export default CashierTotalRow;