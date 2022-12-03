/*
import React from "react";
import ReactDOM from "react-dom";
import ReCAPTCHA from "react-google-recaptcha";
//import "./styles.css";


const TEST_SITE_KEY = "6LeGPRIjAAAAAB93xvFXDVbxs8d3jx8C_BLYfg7q";
const DELAY = 0;

class App extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      callback: "not fired",
      value: "[empty]",
      load: false,
      expired: "false"
    };
    this._reCaptchaRef = React.createRef();
  }
/*
  componentDidMount() {
    setTimeout(() => {
      this.setState({ load: true });
    }, DELAY);
    console.log("didMount - reCaptcha Ref-", this._reCaptchaRef);
  }
*//*
  handleChange = value => {
    console.log("Captcha value:", value);
    this.setState({ value });
    // if value is null recaptcha expired
    if (value === null) this.setState({ expired: "true" });
  };

  asyncScriptOnLoad = () => {
    this.setState({ callback: "called!" });
    console.log("scriptLoad - reCaptcha Ref-", this._reCaptchaRef);
  };

  render() {
    const { value, callback, load, expired } = this.state || {};
    return (
      <div className="App">

        

        {


            
       // <h2>
        //  NOTE: initial load delayed <em>{DELAY / 1000}sec</em> to demonstrate
       //   callback
        //</h2>

        //<h5>Recaptcha value: {value}</h5>
        //<h5>Expired: {expired}</h5>
            
        //{load && (
          <ReCAPTCHA
            style={{ display: "inline-block" }}
            theme="dark"
            //ref={this._reCaptchaRef}
            sitekey={TEST_SITE_KEY}
            //onChange={this.handleChange}
           // asyncScriptOnLoad={this.asyncScriptOnLoad}
          />
       // )
        }
      </div>
    );
  }
}

export default App;
*/


import chefs from '../assets/chefs.png';
import Login from '../component/LoginComponent';
import ReCAPTCHA from "react-google-recaptcha";
import { useRef,useState } from 'react';

const MainPage=()=>{

    return(
        <div>
            <main className='w-100 vh-100 main-section'>
                <header className='w-100 flex'>
                    <img src={chefs} alt='bread'/>
                    <h1> | Breader Inventory System</h1>
                </header>
                <div className='w-100 h-100 flex center-justify'>

          
                    <Login/>
                </div>
                <footer className='w-100 flex flex center-justify'>
                    <center>Copyright © 2022 | <a href='https://www.flaticon.com/free-icons/chef' title='chef icons'>Chef icons created by kornkun - Flaticon</a></center>
                </footer>
            </main>
        </div>
        
    )
}

export default MainPage;
