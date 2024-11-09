import React from 'react';
import Image from 'next/image';

function MyOrderItem({ orderItem }) {
 
  return (
    <>
    <div className='grid grid-cols-4'>
      
        <Image
          src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+orderItem.product?.data?.attributes?.images?.data[0]?.attributes?.url}
          width={80}
          height={80}
          alt="Product Image"
          className='bg-gray-100 p-5 rounded-md border'
        />
        <div className='col-span-2'>
            <h2>{orderItem.product.data.attributes.name}</h2>
            <h2>Item Price:{orderItem.product.data.attributes.name}</h2>
        </div>

          <h2>Quantity:{orderItem.quantity}</h2>
           <h2>Price:{orderItem.amount}</h2>

    </div>
    <hr className='mt-3'></hr> 
    </>
  
  );
}

export default MyOrderItem;
