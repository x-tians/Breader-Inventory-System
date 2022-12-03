import './DashboardProfileStyle.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { Message } from 'semantic-ui-react'
import { BsCheckAll } from 'react-icons/bs';
import Cookie from 'universal-cookie'

const DashboardProfile=()=>{
    const dateToday=new Date().toISOString().substring(0,10);
    //states
    const [msg,setMsg]=useState('');
    const [count,setCount]=useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const userToken = new Cookie();
    const userTok=userToken.get('token');

    const userInfo={
        address:'',
        birthDate:dateToday,
        email:'',
        firstName:'',
        lastName:'',
        middleName:'',
        token:'',
        userImage:'pngegg.png',
        password:''
    }
    const [user,setUser]=useState(userInfo);
    const navigate = useNavigate();

    useEffect( () => {
        loadUser();
     }, []);

     
     //get the user information
     const loadUser =async()=>{
        await axios.post('http://localhost:8080/api/v1/auths',{
            token:userTok,
            status:false
        }).then( response => {
            if(!response.data){
            navigate('/');
            }else{
            setUser( response.data );
            }
        })
    }
    
    //update the user information
    const onUpdateHandler= async (event)=>{
        event.preventDefault();
        await axios.put('http://localhost:8080/api/v1/users', {
            token:userTok,
            user
          })
          .then(function (response) {
            if(response.data){
                setMsg(response.data.status);
            }
          })
          .catch(function (error) {
            console.log(error);
        });
    }

    //update the user information from user states variables
    const onChangeHandler=(event)=>{
        let users=user;
        
        switch(event.target.name){
            case'email':
                users.email=event.target.value;
            break;
            case'firstName':
                users.firstName=event.target.value;
                break;
            case'lastName':
                users.lastName=event.target.value;
                break;
            case'middleName':
                users.middleName=event.target.value;
                break;
            case'birthDate':
                users.birthDate=event.target.value;
                break;
            case'address':
                users.address=event.target.value;
                break;
            case'password':
                users.password=event.target.value;
                break;
            default:
                break;
            
        }
        setUser({...users});
    }
    //upload user image
    const handleSubmit = async(event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('selectedFile', selectedFile);
        formData.append('status', 'users');
        try {
          const response = await axios({
            method: 'post',
            url: 'http://localhost:8080/api/v1/uploads',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
          });
            let users=user;
            users.userImage=response.data.name;
            setUser({...users});
            setMsg(response.data.msg);
        } catch(error) {
            console.log(error)
        }
    }
    //store the image into selected state variable
      const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
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
    
    //show if the user variable is empty
    if(!user) return <div>loading...</div>
    if(user){////show if the user variable is not empty
        const date=new Date(user.birthDate).toISOString().substring(0,10);
        return (
            <div className='product-container grid h-100 '>
                <div className='bread-crumb grid'>
                    <h3>PROFILE</h3>
                    <div className='product-left-search'>
                        <h3>Update Personal Information</h3>
                    </div>
                    
                </div>
                <div className='flex center-justify w-100 h-100' style={{borderTop:'1px solid orange'}}>
                    <div className='profile-wrapper flex'>
                        <div className='profile-user-image w-100 flex center-justify'>
                            <img src= {`http://localhost:8080/users/${user.userImage}`} alt='user' />
                            <form onSubmit={handleSubmit} className='btn-form'>
                                <input className='custom-file-input' name='avatar'  type='file' accept='.png' onChange={handleFileSelect}/>
                                <input type='submit' value='Upload Image' className='btn-upload'/>
                            </form>
                            {
                                (msg) && <Message negative style={{position:'absolute',zIndex:'1',top:'210px',color:'green' }}> <BsCheckAll/> { msg }  {setTimeOut()} </Message>
                            }
                        </div>
                        <div className='profile-info-wrapper'>
                        <form className='flex center-justify' onSubmit={onUpdateHandler}>
                            <div>
                                <label htmlFor='email'><strong>email</strong></label>
                                <input type='email' name='email'  value={user.email} onChange={onChangeHandler}/>
                            </div>
                            <div>
                                <label htmlFor='password'><strong>Password</strong></label>
                                <input type='password' name='password' onChange={onChangeHandler} value={user.password}/>
                            </div>
                            <div>
                                <label htmlFor='firstName'><strong>First Name</strong></label>
                                <input type='text' name='firstName'  value={user.firstName} onChange={onChangeHandler}/>
                            </div>
                            <div>
                                <label htmlFor='middleName'><strong>Middle Name</strong></label>
                                <input type='text' name='middleName' value={user.middleName} onChange={onChangeHandler}/>
                            </div>
                            <div>
                                <label htmlFor='lastName'><strong>Last Name</strong></label>
                                <input type='text' name='lastName' value={user.lastName} onChange={onChangeHandler}/>
                            </div>
                            <div>
                                <label htmlFor='birthDate'><strong>BirthDate</strong></label>
                                <input type='date' name='birthDate'  value={date} onChange={onChangeHandler}/>
                            </div>
                            <div>
                                <label htmlFor='address'><strong>Address</strong></label>
                                <input type='text' name='address' value={user.address} onChange={onChangeHandler}/>
                            </div>
                            <div>
                                <button type='submit' name='btnUpdate'>Update Profile</button>
                            </div>
                                
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardProfile;