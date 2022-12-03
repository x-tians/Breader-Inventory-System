import '../component/DashboardHeaderStyle.css';
import {useState,useEffect} from 'react';
import { BsPersonCircle,BsBoxArrowRight } from 'react-icons/bs';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookie from 'universal-cookie'

const DashboardHeader=()=>{
    const [islog,setLog]=useState(false);
    const navigate = useNavigate();
    const [user,setUser]=useState();
    const [token,setToken]=useState();

    const userToken = new Cookie();
    const userTok = userToken.get('token');
     useEffect(() => {
        loadUser();
      }, []);
      //redirect to login page if user token is empty 
      if(!userTok){
        navigate('/');
      }
    //get the user info
    const loadUser=async()=>{
        await axios.post(`http://localhost:8080/api/v1/auths`,{
            token:userTok,
            status:false
        }).then( response => {
            if(!response.data){
                console.log(response)
            }else{
                setUser( response.data.email );
                setToken( response.data.token );
            }
        })
    }
    //menu width is change when the burger button is click
    const onClickHandler=()=>{
        (islog) ? setLog(false) : setLog(true);
    }

    //logout event
    const onClickLogHander=async()=>{
        await axios.patch('http://localhost:8080/api/v1/users', {
            token,logout:true
          })
          .then(function (response) {
                userToken.remove('token', { path: '/' });
                navigate('/');
                window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
        });
    }

    return(
        <div className='dashboard-header grid w-100'>
            <div className='dashboard-user'>
                <h3>
                    <strong>Welcome </strong>{user}
                </h3>
            </div>
            <div></div>
            <div className='logout flex center-justify'>
                <div className='user-log' onClick={onClickHandler} ><BsPersonCircle size={20} /></div>
                
                <div className={islog ? 'user-logout-active' : 'user-logout'}>
                    <div className='user-logout-header'>
                        <p>Account</p>
                        <p>Setting</p>
                    </div>
                    <div className='user-logout-footer'>
                        <div className='flex center-justify log' onClick={onClickLogHander}> <BsBoxArrowRight size={22}/> <p>Logout</p></div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default DashboardHeader;