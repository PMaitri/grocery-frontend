"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React,{ useState } from 'react'
import { toast } from 'sonner'
import { useEffect } from 'react'




function CreateAccount() {
    
    const [username,setUsername]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const router=useRouter();

    useEffect(()=>{
      const jwt=sessionStorage.getItem('jwt');
      if(jwt){
        router.push('/')
      }
  },[])

    const onCreateAccount=()=>{
      GlobalApi.registerUser(username,email,password).then(resp=>{
        console.log(resp.data.user)
        console.log(resp.data.jwt)
        sessionStorage.setItem('user',JSON.stringify(resp.data.user));
        sessionStorage.setItem('jwt',resp.data.jwt);
        router.push('/');
       toast("Account Created Successfully.")
        
      },(e)=>{
        toast(e?.response?.data?.error?.message)

      })
    } 

  return (
    <div className='flex items-baseline justify-center my-5 p-3 mt-12'>
     <div className='flex flex-col items-center justify-center p-5 bg-slate-100 border-gray-200'>
        <Image src='/logo1.png' width={150} height={150} alt='logo' />
        <h2 className='font-bold text-3xl'>Create an Account</h2>

        <h2 className='text-gray-500'>Enter your Email and Password to create an account </h2>
        <div className='w-full flex flex-col gap-4 mt-6'>
            <Input placeholder='Username' onChange={(e)=>setUsername(e.target.value)}/>
            <Input placeholder='name@example.com' onChange={(e)=>setEmail(e.target.value)}/>
            <Input type='password' placeholder='Password'onChange={(e)=>setPassword(e.target.value)}/>

            <Button onClick={()=>onCreateAccount()} disabled={!(username||email||password)}>Create an Account</Button>
            <p>Already have an account 
                <Link href={'/sign-in'} className='text-blue-500'>
                  Click here to Sign In 
                </Link>
            </p> 
        </div>
     </div>
    </div>
  )
}

export default CreateAccount
