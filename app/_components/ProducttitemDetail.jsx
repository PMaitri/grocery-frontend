"use client"
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { LoaderCircle, LoaderIcon, ShoppingBasket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlobalApi from '../_utils/GlobalApi';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { UpdateCartContext } from '../_context/UpdateCartContext';

function ProducttitemDetail({ product }) {

   const jwt=sessionStorage.getItem('jwt');
   const user=JSON.parse(sessionStorage.getItem('user'));
   const {updateCart,setUpdateCart}=useContext(UpdateCartContext)

    
    const [productTotalPrice,setProductTotalPrice]=useState(
        product.attributes.sellingPrice?
        product.attributes.sellingPrice:
        product.attributes.mrp

    )

   const router=useRouter();
   const[quantity,setQuantity]=useState(1);
   const [loading,setLoading]=useState(false);



    const addToCart=()=>{
      setLoading(true)
      if(!jwt)
      {
          router.push('/sign-in');
          setLoading(false)
          return ;
      }

      const data = {
        data: {
           quantity: quantity,
           amount: (quantity * productTotalPrice).toFixed(2),
           products: product.id,
           users_permissions_users: user.id, 
           userId: user.id 
        }
     };
     
        console.log(data);
        GlobalApi.addToCart(data,jwt).then(resp=>{
        console.log(resp)
        toast('Added to Cart')
        setUpdateCart(!updateCart);
        setLoading(false)
      },(e)=>{
        toast('Error while adding into cart ')
        setLoading(false)
      })


    }




  return (
    <div className='grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black'>
      <Image 
        src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product.attributes.images.data[0].attributes?.url}`}
        alt='image'
        width={300}
        height={300}
        unoptimized
        className='bg-slate-100 p-5 h-[320px] w-[300px] object-contain rounded-lg'
      />
      
      <div className='flex flex-col gap-3'>
        <h2 className='text-2xl font-bold'>{product.attributes.name}</h2>
        <h2 className='text-sm text-gray-500'>{product.attributes.description}</h2>
        
        <div className='flex gap-3 '>
          {product.attributes.sellingPrice && (
            <h2 className='font-semibold text-xl'>₹ {product.attributes.sellingPrice}</h2>
          )}
          <h2 className={`${product.attributes.sellingPrice ? 'line-through text-gray-500 text-lg' : ''}`}>
            ₹ {product.attributes.mrp}
          </h2>
        </div>

        <h2 className='font-bold text-lg'>Quantity ({product.attributes.itemQuantityType})</h2>
        
        <div className='flex flex-col items-baseline gap-3'>

        <div className='flex gap-3 item-center'>
          <div className='p-2 border flex gap-10 items-center px-5'>
            
            <button disabled={quantity==1} onClick={()=>setQuantity(quantity-1)}>-</button>
            <h2>{quantity}</h2>
            <button onClick={()=>setQuantity(quantity+1)}>+</button>
            </div>
          <h2 className='text-2xl font-semibold'> = ₹{(quantity*productTotalPrice).toFixed(2)} </h2>
        </div>
        <Button className='flex gap-3' onClick={addToCart}
        disabled={loading}
        >
           <ShoppingBasket />
             {loading?<LoaderCircle className='animate-spin'/>:'Add To Cart'} 
        </Button>

        </div>
        
        <h2><span className='font-bold'>Category: </span> {product.attributes.categories.data[0].attributes.name}</h2>
      </div>
    </div>
  );
}

export default ProducttitemDetail;
