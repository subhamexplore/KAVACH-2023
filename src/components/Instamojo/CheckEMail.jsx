import React from 'react'
import { useNavigate } from 'react-router'
import {toast} from 'react-toastify'
import axios from 'axios'

const CheckEMail = ({userDetails, isFifty}) => {
  const nav = useNavigate();

  const updateUser = async () => {
    console.log(userDetails);
    let obj;
    if(isFifty){
      obj= {
        creditCardFraud : true,
        onlineFraud : true,
        debitCardFraud : true,
        cryptoFraud : true,
        coinDetectionFraud : true,
      }
    }
    else{
      obj= {
        hasPurchasedFullModel : true
      }
    }
    const token = localStorage.getItem('token');
    try {
      const response = await axios.patch('http://localhost:2000/singleUser', obj, {
        headers: {
          'Content-Type' : "application/json",
          'Authorization' : `Bearer ${token}`
        }
      });
      if(response.data.status==="ok")
      {
        console.log(response.data.data);
        nav('/');
      }
    } catch (error) {
      toast.error("Not updated", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const checkPayment = async () => {
    try {
      const token = localStorage.getItem('token')
      console.log(token);
      const response = await axios.get('http://localhost:2000/success');
      console.log(response.data);
      if(response.data.status==="ok")
      {
        toast.success('Check successful', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // updateUser(); 
      }
      if(response.data.status==="notok")
      {
        toast.error(response.data.error, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Payment not yet complete", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <>
    <div className='email-section'>
    <div className="email">
      <div className="email-up"><img className='img1' src={bg} alt="" />
      </div>
      <div className="email-img"><img className='img2' src={email} alt="" />
        <h3 className='heading-down'>Check your email</h3>
        <p className='para-down'>We sent an email to you at your email adress.You can proceed your payment by clicking on that magic link</p>
      </div>
      </div>
    </div>
      <h1>If payment is complete <span onClick={checkPayment}>click here</span></h1>
    </>
  )
}

export default CheckEMail;