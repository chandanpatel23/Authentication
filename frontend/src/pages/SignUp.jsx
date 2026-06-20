import React, { useContext } from 'react'
import dp from "../assets/dp.png"
import { useState } from 'react'
import { dataContext } from '../context/UserContext'
import axios from 'axios'

function SignUp() {
  let {serverUrl}=useContext(dataContext)

    let [firstName, setFirstName]=useState(null)
    let [lastName, setLastName]=useState(null)
    let [userName, setUserName]=useState(null)
    let [email, setEmail]=useState(null)
    let [password, setPassword]=useState(null)

    const handleSignUp = async (e)=>{
      e.preventDefault()
      try {
            let data = await axios.post(serverUrl + "/api/signup",{
              firstName,
              lastName,
              userName,
              email,
              password
            },{withCredentials:true})
            console.log(data);
      } catch (error){
          console.log(error.message);
      }

    }


  return (
<div className='w-full h-[100vh] bg-black flex justify-center items-center '>
      <div className='w-[90%] max-w-[500px] h-[600px] bg-[#183b39] rounded flex flex-col justify-center items-center gap-[20px]'>
        <h1 className='text-white text-[20px] font-semibold '>Sign Up</h1>
        <form className='w-[100%] flex flex-col justify-center items-center gap-[20px]' onSubmit={handleSignUp}>
          <div className='w-[100px] h-[100px] rounded-full bg-white overflow-hidden relative border-2 border-white'>
              <img src={dp} alt=""  className='w-full h-full '/>
              <div className='absolute inset-0 rounded-full bg-black opacity-0 hover:opacity-50 cursor-pointer flex justify-center items-center text-white text-[20px] font-semibold'>
                +
              </div>
          </div>
          <div className='w-[80%] h-[50px] flex justify-center items-center gap-[10px]'>
            <input type="text" placeholder='First name' className='w-[50%] h-[100%] bg-[white] 
            outline-none border-none rounded-lg px-[10px] py-[5px]' value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
            <input type="text" placeholder='Last name' className='w-[50%] h-[100%] bg-[white] 
            outline-none border-none rounded-lg px-[10px] py-[5px]' value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
          </div>
            <input type="text" placeholder='username' className='w-[80%] h-[50px] bg-[white] 
            outline-none border-none rounded-lg px-[10px] py-[5px]' value={userName} onChange={(e)=>setUserName(e.target.value)}/>
            <input type="email" placeholder='email' className='w-[80%] h-[50px] bg-[white] 
            outline-none border-none rounded-lg px-[10px] py-[5px]' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder='password' className='w-[80%] h-[50px] bg-[white]
             outline-none border-none rounded-lg px-[10px] py-[5px]' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className='bg-[#57c2dd] px-[10px] py-[5px] rounded-lg'>Sign Up</button>
        </form>
        
      </div>
      
    </div>  
    )
}

export default SignUp
