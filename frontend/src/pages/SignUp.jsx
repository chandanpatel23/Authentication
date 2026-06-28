import React, { useContext, useRef } from 'react'
import dp from "../assets/dp.png"
import { useState } from 'react'
import { dataContext } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SignUp() {
  let {serverUrl}=useContext(dataContext)
  let navigate = useNavigate()

    let [firstName, setFirstName]=useState(null)
    let [lastName, setLastName]=useState(null)
    let [userName, setUserName]=useState(null)
    let [email, setEmail]=useState(null)
    let [password, setPassword]=useState(null)
    let file = useRef(null)

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

    let [frontendImage,setFrontendImage]= useState(dp)
    let [backendImage,setBackendImage]= useState(null)
    function handleImage(e){  
      let file =e.target.files[0]
      setBachendImage(file)
      let image = URL.createObjectURL(file)
      setFrontendImage(iamge)
      
    }


  return (
<div className='w-full h-[100vh] bg-black flex justify-center items-center '>
      <div className='w-[90%] max-w-[500px] h-[600px] bg-[#183b39] rounded flex flex-col justify-center items-center gap-[20px]'>
        <h1 className='text-white text-[20px] font-semibold '>Sign Up</h1>
        <form className='w-[100%] flex flex-col justify-center items-center gap-[20px]' onSubmit={handleSignUp}>
          <input type="file" hidden ref={file} onChange={()=> handleImage}/>
          <div className='w-[100px] h-[100px] rounded-full bg-white overflow-hidden relative border-2 border-white'>
              <img src={frontendImage} alt=""  className='w-full h-full '/>
              <div className='absolute inset-0 rounded-full bg-black opacity-0 hover:opacity-50 cursor-pointer flex justify-center items-center text-white text-[20px] font-semibold'
              onClick={()=> {file.current.click()}}>
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
            <p className='text-white' onClick={()=> navigate("/login")}>Already have an account ? 
              <span className='text-[#3597d8] cursor-pointer'> Login</span></p>
        </form>
        
      </div>
      
    </div>  
    )
}

export default SignUp
