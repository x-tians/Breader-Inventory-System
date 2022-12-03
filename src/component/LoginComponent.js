import useLottie from 'lottie-react';
import LoginLottie from '../assets/login.json';
import { useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import './LoginStyle.css';
import { Input,Message } from 'semantic-ui-react'
import { BsExclamationTriangleFill } from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Cookie from 'universal-cookie'

const Login=()=>{
    const navigate = useNavigate();
    const [email,setEmail]=useState('');
    const [pwd,setPassword]=useState('');
    const [error,setError]=useState('');
    //cookie
    const cookie = new Cookie();
    //lottie animation
    const options = {
        animationData: LoginLottie,
        loop: true
      };

    //redirect to dashboard if the email and password are exist 
    const onSubmitEvent=async(event)=>{
        event.preventDefault();  
           await axios.post('http://localhost:8080/api/v1/auths', {
                email: email,
                password: pwd,
                status:true
              })
              .then(function (response) {
                if(response.data){
                    cookie.set('token',response.data.token , { path: '/' })
                    if(cookie.get('token')){
                        navigate('/home');
                    }else{
                        navigate('/');
                    }
                    
                }else{
                    setError('Invalid email or Password!');
                }
                
              })
              .catch(function (error) {
                console.log(error);
              });
    }

    //update email and password states variable
    const onItemNameChangeHandler = ( event ) => {
        (event.target.name==='pwd')? setPassword(event.target.value) : setEmail( event.target.value );
        setError( '' );
    }

    return(
        <div className='login-container' >
            <div className='login-animation w-100'>
                {useLottie(options)}
            </div>
            <form className='flex flex center-justify' onSubmit={onSubmitEvent}>
                {error && <Message negative style={{position:'absolute',zIndex:'1',top:'210px' }}> <BsExclamationTriangleFill/> {error} </Message>}
                <Input className='.input' icon='user' iconPosition='left' type='email' value={email}name='email' onChange={onItemNameChangeHandler} placeholder='Email'/>
                <Input icon='key'iconPosition='left' type='password' name='pwd' placeholder='Password' value={pwd} onChange={onItemNameChangeHandler}/>
                <button type='submit'>Login</button>
            </form>
        </div>
    )

}
export default Login;