import { HeadphonesIcon, Receipt, Rocket, SearchCheckIcon } from 'lucide-react';
import { ReceiptRefundIcon } from '@heroicons/react/solid'; 

import React from 'react';

const Features = () => {
  return (
    <div className="container mx-auto px-4 py-10">  
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10'> 
        
   
        <div className='grid grid-cols-3 bg-green-100 py-5 rounded-xl'>
          <div className="flex justify-center">
            <Rocket size={50} className='bg-green-600 text-white p-2 rounded-lg' />
          </div>
          <div className="col-span-2">
            <h2 className='font-semibold text-sm md:text-base lg:text-lg whitespace-nowrap'>Free Shipping</h2>
            <p className='text-xs md:text-sm'>Lorem ipsum dolor.</p>
          </div>
        </div>

     
        <div className='grid grid-cols-3 bg-green-100 py-5 rounded-xl'>
          <div className="flex justify-center">
            <ReceiptRefundIcon className='h-10 w-10 md:h-12 md:w-12 bg-green-600 text-white p-2 rounded-lg' />
          </div>
          <div className="col-span-2">
            <h2 className='font-semibold text-sm md:text-base lg:text-lg'>Easy to Return</h2>
            <p className='text-xs md:text-sm'>Lorem ipsum dolor.</p>
          </div>
        </div>

        <div className='grid grid-cols-3 bg-green-100 py-5 rounded-xl'>
          <div className="flex justify-center">
            <SearchCheckIcon size={50} className='bg-green-600 text-white p-2 rounded-lg' />
          </div>
          <div className="col-span-2">
            <h2 className='font-semibold text-sm md:text-base lg:text-lg whitespace-nowrap'>Secure Payment</h2>
            <p className='text-xs md:text-sm'>Lorem ipsum dolor.</p>
          </div>
        </div>

        
        <div className='grid grid-cols-3 bg-green-100 py-5 rounded-xl'>
          <div className="flex justify-center">
            <HeadphonesIcon size={50} className='bg-green-600 text-white p-2 rounded-lg' />
          </div>
          <div className="col-span-2">
            <h2 className='font-semibold text-sm md:text-base lg:text-lg whitespace-nowrap'>24-hour Support</h2>
            <p className='text-xs md:text-sm'>Lorem ipsum dolor.</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Features;
