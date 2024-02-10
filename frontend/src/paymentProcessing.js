import React, { useEffect } from 'react'
import { useMatch, useParams } from 'react-router-dom';
import axios from 'axios';

export default function PaymentProcessing() {
    const {txnId}= useParams()
    const checkPaymentStatus=async()=>{
        await axios.get(`http://localhost:4000/api/v1/payment/status/${txnId}`).then((res)=>{
            console.log(res,"xxxxxxxxxxx")

        }).catch((err)=>console.log(err))
    }
    useEffect(() => {
      checkPaymentStatus()
    
      
    }, [])
    
  return (
    <div>
        <p>wait you will be redirected in few second....</p>
    
    
    </div>
  )
}
