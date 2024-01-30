import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react'

const App = () => {
  const [len,setLen]=useState(6);
  const [Num,setNum]=useState(false)
  const [Spcl,setSpcl]=useState(false)
  const [password,setPassword]=useState("")
  const Passwordcopy=useRef(null)

  const passwordgenerator=useCallback(()=>{

    let pass=""
    let string="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwzys"
    if(Num) string +="0123456789"
    if(Spcl) string +="#@!$%^&*()"

    for(let i=1;i<=len;i++){
      let char=Math.floor(Math.random()*string.length+1)
      pass += string.charAt(char)
    }
    setPassword(pass)
  },[len,Num,Spcl,setPassword])

  useEffect(()=>{passwordgenerator()},[len,Num,Spcl,setPassword,passwordgenerator])

  const copytoclipboard=useCallback(()=>{
    Passwordcopy.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
   
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-300 bg-gray-700'>
    <h1 className='text-white text-center'>Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
      <input type="text" 
      value={password} 
       className='outline-none w-full py-1 px-3'
        placeholder='password'
         readOnly
         ref={Passwordcopy} />
    <button className='outline-none  bg-blue-500  text-white px-3 py-0.5 shrink-0'
    onClick={copytoclipboard}
    >Copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
      <input type="range" 
      min={8}
      max={25}
      value={len}
      className='cursor-pointer'
      onChange={(e)=>{setLen(e.target.value)}}
      />
      <label> Length {len}</label>
      </div>
     <div className='flex items-center gap-x-1'>
      <input type="checkbox" 
       defaultChecked={Num}
       onChange={()=>setNum(!Num)}  
         />
         <label >Number</label>
     </div>
     <div className='flex items-center gap-x-1'>
      <input type="checkbox" 
       defaultChecked={Spcl}
       onChange={()=>setSpcl(!Spcl)}  
         />
         <label >Character</label>
     </div>

    </div>
   </div>
   
  )
}

export default App