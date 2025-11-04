import React from "react";
import { useForm } from "react-hook-form";

export default function Login() {

  const { register, handleSubmit, formState:{ errors } } = useForm();

  const onSubmit = (data) => {
   
  }

  return (
    <div style={{width:"350px",margin:"40px auto"}}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <input 
          type="email"
          placeholder="Email"
          {...register("email", { required:true })}
          style={{width:"100%",padding:"8px",marginBottom:"10px"}}
        />
        {errors.email && <p style={{color:"red"}}>Email required</p>}

        <input 
          type="password"
          placeholder="Password"
          {...register("password",{ required:true, minLength:6 })}
          style={{width:"100%",padding:"8px",marginBottom:"10px"}}
        />
        {errors.password && <p style={{color:"red"}}>Min 6 chars</p>}

        <button type="submit" style={{width:"100%",padding:"8px",cursor:"pointer"}}>
          Login
        </button>
      </form>
    </div>
  )
}
