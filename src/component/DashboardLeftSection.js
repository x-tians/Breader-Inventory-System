import '../component/DashboardLeftSectionStyle.css';
import chefs from '../assets/chefs.png';
import { Link } from 'react-router-dom';
import { BsHouseFill,BsFillCartPlusFill,BsFillCartCheckFill,BsPersonFill } from 'react-icons/bs';
import {useSelector, useDispatch} from 'react-redux'

const DashboardLeftSection=()=>{
    const isWidth=useSelector(state=>state.isUpdateWidth);
    const leftMenu=useSelector(state=>state.link);
    const dispatch = useDispatch();
    
    const onWidthResize=()=>{
        (isWidth) ? dispatch({type:'ISUPDATEWIDTH',payload:{isUpdate:false}}) : dispatch({type:'ISUPDATEWIDTH',payload:{isUpdate:true}})
    }
    const onWidthResizeOver=()=>{
        if(isWidth) dispatch({type:'ISUPDATEWIDTH',payload:{isUpdate:false}})
    }
    const onClickHandler=(event)=>{
        dispatch({type:'LEFT_MENU',payload:{link:event.target.innerText }})
    }
  
    return (
        <div  className= {(isWidth) ? 'grid vh-100 Dashboard-left-section' : 'grid vh-100 Dashboard-left-section-active'}  onMouseEnter={onWidthResizeOver} >
            <div className='burger-wrapper' onClick={onWidthResize}>
                <div className='burger-menu flex center-justify'>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            
            <div className='w-100 flex header'>
                <img src={chefs} alt='bread'/>
                <div><h4 className={(isWidth) ? 'left-title': 'left-title-active'}>Breader Inventory System</h4></div>
            </div>
            
            <div className= {(isWidth) ? 'menu-wrapper-active' : 'menu-wrapper'} >
                <ul className= {(isWidth) ? 'flex left-menu-active' : 'flex left-menu'}>
                    <li className ={(leftMenu==='HOME') && 'menu-active'} >
                        <Link onClick={onClickHandler} to='/home'> <div >< BsHouseFill  size={25} /> </div> <div className='link'>  HOME</div> </Link>
                    </li>
                    <li className ={(leftMenu==='CASHIER') && 'menu-active'} >
                        <Link onClick={onClickHandler} to='/cashier' ><div>< BsFillCartCheckFill  size={25} /> </div> <div className='link'>  CASHIER</div></Link>
                    </li>
                    <li className ={(leftMenu==='ADD PRODUCTS') && 'menu-active'} >
                        <Link onClick={onClickHandler} to='/products' ><div>< BsFillCartPlusFill size={25} /></div> <div className='link'>  ADD PRODUCTS</div></Link>
                    </li>
                    <li className ={(leftMenu==='PROFILE') && 'menu-active'}>
                        <Link onClick={onClickHandler} to='/profile' ><div>< BsPersonFill size={25} /></div> <div className='link'>  PROFILE</div></Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DashboardLeftSection;