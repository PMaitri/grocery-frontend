import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,

  DialogTrigger,
} from "@/components/ui/dialog"
import ProducttitemDetail from './ProducttitemDetail';

const Productitem = ({ product }) => {
  return (
    <div className='p-2 object-contain md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg hover:scale-105 cursor-pointer hover:shadow-lg transition-all ease-in-out '> 
      <Image 
        src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product?.attributes?.images?.data?.[0]?.attributes?.url}`}
        width={500}
        height={200}
        alt={product.attributes.name}
        className='h-[200px] w-[200px] object-contain '
        unoptimized
      />
      <h2 className='font-semibold text-lg'>{product.attributes.name}</h2>      
      <div className='flex gap-3'>
        {product.attributes.sellingPrice &&
        <h2 className='font-semibold text-lg'>₹ {product.attributes.sellingPrice}</h2> }
        <h2 className={`${product.attributes.sellingPrice && 'line-through text-gray-500 '}`}>₹ {product.attributes.mrp}</h2>
      </div>
    
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-primary hover:text-white hover:bg-primary">
            Add to cart
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            
            <DialogDescription>
              <ProducttitemDetail product={product}/>
              
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default Productitem;
