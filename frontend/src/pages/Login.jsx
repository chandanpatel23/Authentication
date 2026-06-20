import React, { useContext, useState } from 'react'
import { dataContext } from '../context/UserContext'
import axios from 'axios'

function login() {
  
    let {serverUrl}=useContext(dataContext)
    let [email, setEmail]=useState(null)
    let [password, setPassword]=useState(null)

      const handleLogin = async (e)=> {
         e.preventDefault()
      try {
            let data = await axios.post(serverUrl + "/api/login",{
              email,
              password
            },{withCredentials:true})
            console.log(data);
      } catch (error){
        //  console.log(error.response.data.message);
        alert(error.response.data.message)
      }

      }
    
  return (
<div className='w-full h-[100vh] bg-black flex justify-center items-center '>
      <div className='w-[90%] max-w-[500px] h-[600px] bg-[#183b39] rounded flex flex-col justify-center items-center gap-[20px]'>
        <h1 className='text-white text-[20px] font-semibold '>Login</h1>
        <form className='w-[100%] flex flex-col justify-center items-center gap-[20px]' onSubmit={handleLogin} >
            <input type="email" placeholder='email' className='w-[80%] h-[50px] bg-[white] 
            outline-none border-none rounded-lg px-[10px] py-[5px]' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder='password' className='w-[80%] h-[50px] bg-[white]
             outline-none border-none rounded-lg px-[10px] py-[5px]' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className='bg-[#57c2dd] px-[10px] py-[5px] rounded-lg'>Login</button>
        </form>
        
      </div>
      
    </div>  
    )
}

export default login
