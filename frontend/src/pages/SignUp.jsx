import React, { useContext, useRef } from 'react'
import dp from "../assets/dp.png"
import { useState } from 'react'
import { dataContext } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SignUp() {
  let {serverUrl,setUserData}=useContext(dataContext)
  let navigate = useNavigate()

    let [frontendImage,setFrontendImage]= useState(dp)
    let [backendImage,setBackendImage]= useState(null)
    let [firstName, setFirstName]=useState(null)
    let [lastName, setLastName]=useState(null)
    let [userName, setUserName]=useState(null)
    let [email, setEmail]=useState(null)
    let [password, setPassword]=useState(null)
    let [error, setError] = useState(null)
    let file = useRef(null)

    const handleSignUp = async (e)=>{
      e.preventDefault()
      setError(null)
      try {
            let formData = new FormData()
            formData.append("firstName",firstName)
            formData.append("lastName",lastName)
            formData.append("userName",userName)
            formData.append("email",email)
            formData.append("password",password)
            if(backendImage){
              formData.append("profileImage",backendImage)
            }
            let response = await axios.post(serverUrl + "/api/signup",formData,
              {withCredentials:true,
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })
            setUserData(response.data.user || response.data)
            navigate("/home")
            
      } catch (error){
          console.log(error);
          setError(error.response?.data?.message || "Signup failed. Please try again.")
      }
    }
    function handleImage(e){  
      let file =e.target.files[0]
      setBackendImage(file)
      let image = URL.createObjectURL(file)
      setFrontendImage(image)
      
    }


  return (
<div className='w-full h-[100vh] bg-black flex justify-center items-center '>
      <div className='w-[90%] max-w-[500px] h-[600px] bg-[#183b39] rounded flex flex-col justify-center items-center gap-[20px]'>
        <h1 className='text-white text-[20px] font-semibold '>Sign Up</h1>
        {error && <p className='text-red-500 text-sm'>{error}</p>}
        <form className='w-[100%] flex flex-col justify-center items-center gap-[20px]' onSubmit={handleSignUp}>
          <input type="file" hidden ref={file} onChange={handleImage}/>
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
