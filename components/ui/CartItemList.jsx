import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react'; // Import the trash icon from lucide-react

function CartItemList({ cartItemList, onDeleteItem }) {
    

    return (
        <div>
            <div className='h-[400px] overflow-auto'>
                {cartItemList.map((cart, index) => (
                    <div key={index} className="flex items-center justify-between border-b py-2">
                        <div className="flex items-center">
                            <Image 
                                src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${cart.attributes.products?.data?.[0]?.attributes?.images?.data?.[0]?.attributes?.url}`} 
                                width={70} 
                                height={70} 
                                alt={cart.attributes.products.data[0].attributes.name} 
                                unoptimized
                            />
                            <div className="ml-3">
                                <h2 className="font-semibold">{cart.attributes.products.data[0].attributes.name}</h2>
                                <p>Qty: {cart.attributes.quantity}</p>
                                <p>₹ {cart.attributes.amount}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <TrashIcon className="h-6 w-6 text-red-500 cursor-pointer" onClick={() => onDeleteItem(cart.id)} />
                        </div>
                    </div>
                ))}
            </div>
        
           
        </div>
    );
}

export default CartItemList;
