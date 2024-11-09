"use client"
import React,{ useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { LoaderIcon } from 'lucide-react'


function SignIn() {
   
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const router=useRouter();
  const [loader,setLoader]=useState();

  useEffect(()=>{
      const jwt=sessionStorage.getItem('jwt');
      if(jwt){
        router.push('/')
      }
  },[])

  const onSingIn=()=>{
    setLoader(true)
    GlobalApi.SignIn(email,password).then(resp=>{
        console.log(resp.data.user)
        console.log(resp.data.jwt)
        sessionStorage.setItem('user',JSON.stringify(resp.data.user));
        sessionStorage.setItem('jwt',resp.data.jwt);
        router.push('/');
        toast("Login Successfully")
        setLoader(false)


    },(e)=>{
      console.log(e)
      toast(e?.response?.data?.error?.message)
      setLoader(false)

    })

  }

  return (
    <div className='flex items-baseline justify-center my-10  p-5 mt-12'>
    <div className='flex flex-col items-center justify-center p-5 bg-slate-100 border-gray-200'>
       <Image src='/logo1.png' width={150} height={150} alt='logo' />
       <h2 className='font-bold text-3xl'>Sign In to Account</h2>

       <h2 className='text-gray-500'>Enter your Email and Password to Sign In </h2>
       <div className='w-full flex flex-col gap-4 mt-6'>
         
           <Input placeholder='name@example.com' onChange={(e)=>setEmail(e.target.value)}/>
           <Input type='password' placeholder='Password'onChange={(e)=>setPassword(e.target.value)}/>

           <Button onClick={()=>onSingIn()} disabled={!(email||password)}>{loader?<LoaderIcon className='animate-spin'/>:'Sign In'} </Button>
           <p>Don't have an account 
               <Link href={'/create-account'} className='text-blue-500'>
                 Click here to Create new Account
               </Link>
           </p> 
       </div>
    </div>
   </div>
  )
}

export default SignIn
