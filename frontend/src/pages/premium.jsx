import React from 'react'
import Pricing from '../components/Pricing'
import subscription from '../services/subscription'
import { useState } from 'react'
import { toast } from 'react-toastify'
const premium = () => {
  const [isPremium, setIsPremium] = useState(false) 
  const verifyPremiumUser = async()=>{
    try {
      const res = await subscription.checkPremium()
      if(res.data.isPremium){
        setIsPremium(true)
      }else{
        setIsPremium(false)
      }
    } catch (error) {
      toast.error("Failed to verify premium status");
    }
  }

  const createOrder = async({planType})=>{
    console.log("plan",planType);
    let order;
    try {
       order = await subscription.createOrder({planType})
      console.log(order.data);
      
      const {amount,currency,orderId,notes} = order.data
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount,
        currency,
        name: "Connexto",
        description:"Connect to other developers",
        image:"https://via.placeholder.com/150",  
        order_id:orderId ,
        prefill:{
          name:notes.firstName + " " + notes.lastName,
          email:notes.email,
          contact:"9999999999",
        },
        handler:verifyPremiumUser
          
        }
         const rzp = new window.Razorpay(options);
     rzp.open();

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to create order");
    }
 };

  




  return (
    <div className="flex flex-col sm:flex-row justify-center gap-6 m-5">

      {/* Silver */}
      <Pricing 
       clickHandle ={createOrder}
       isPremium={isPremium}
      
        title="Silver"
        price={300}
        features={[
          "Basic image generation",
          "Standard quality export",
          "Limited style presets"
        ]}
        disabledFeatures={[
          "Batch processing",
          "Cloud storage integration",
          "AI enhancements"
        ]}
      />

      {/* Gold */}
      <Pricing 
      isPremium={isPremium}
    
      clickHandle ={createOrder}
        title="Gold"
        price={500}
        features={[
          "High-resolution image generation",
          "Customizable style templates",
          "Batch processing capabilities",
          
        ]}
        disabledFeatures={[
          "Seamless cloud integration",
          "Real-time collaboration tools"
        ]}
      />

    </div>
  )
}
export default premium
