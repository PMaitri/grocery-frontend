"use client";

import { Input } from '@/components/ui/input';
import React, { useState, useEffect } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi';
import { useRouter } from 'next/navigation';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

function Checkout() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const jwt = sessionStorage.getItem('jwt');
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [subtotal, setSubTotal] = useState(0);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [address, setAddress] = useState();
  const [totalAmount, setTotalAmount] = useState(null);
  const [useCod, setUseCod] = useState(false); // Checkbox state for COD

  const router = useRouter();

  useEffect(() => {
    if (!jwt) {
      router.push('/sign-in');
    } else {
      getCartItems();
    }
  }, [jwt]);

  const getCartItems = async () => {
    if (user && jwt) {
      try {
        const cartItemList_ = await GlobalApi.getCartItems(user.id, jwt);
        setTotalCartItem(cartItemList_?.length || 0);
        setCartItemList(cartItemList_ || []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    }
  };

  useEffect(() => {
    if (cartItemList.length > 0) {
      let total = cartItemList.reduce((acc, element) => {
        const amount = element.attributes?.amount || 0;
        const quantity = element.attributes?.quantity || 0;
        return acc + amount * quantity;
      }, 0);

      setSubTotal(total);
      setTotalAmount(total + total * 0.09 + 15);
    }
  }, [cartItemList.length]);

  const calculateTotalAmount = () => {
    const tax = subtotal * 0.09;
    const delivery = 15;
    return subtotal + tax + delivery;
  };

  const onApprove = async (data) => {
    try {
      const payload = {
        data: {
          paymentId: data.paymentID || "COD",
          totalOrderAmount: Math.round(totalAmount),
          username,
          email,
          phone,
          zip,
          address,
          userId: user.id,
          orderItemList: cartItemList.map(item => ({
            product: item.attributes.products?.data[0].id,
            quantity: item.attributes.quantity,
            amount: item.attributes.amount,
          })),
          paymentStatus: data.paymentID ? "Paid" : "COD",
        }
      };

      const response = await GlobalApi.createOrder(payload, jwt);
      toast('Order placed successfully');
      await Promise.all(
        cartItemList.map(item => GlobalApi.deleteCartItem(item.id, jwt))
      );
      router.replace('/order-confirmation');
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error('Failed to place order');
    }
  };

  return (
    <div>
      <h2 className='p-3 bg-primary text-2xl font-bold text-center text-white'> Checkout </h2>
      <div className='p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8'>
        <div className='md:col-span-2 mx-20'>
          <h2 className='font-bold text-3xl'>Billing Details </h2>
          <div className='grid grid-cols-2 gap-10 mt-3'>
            <Input placeholder="Name" onChange={(e) => setUsername(e.target.value)} />
            <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-5 mt-3">
            <Input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
            <Input placeholder="Zip" onChange={(e) => setZip(e.target.value)} />
          </div>
          <div className='mt-3'>
            <Input placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
          </div>
        </div>
        <div className='mx-10 border'>
          <h2 className='p-3 bg-gray-200 font-bold text-center'>Total Cart ({totalCartItem})</h2>
          <div className='p-4 flex flex-col gap-4'>
            <h2 className='font-bold flex justify-between'>Subtotal: <span>${subtotal}</span></h2>
            <hr />
            <h2 className='flex justify-between'>Delivery: <span>$15.00</span></h2>
            <h2 className='flex justify-between'>Tax (9%): <span>${(subtotal * 0.09).toFixed(2)}</span></h2>
            <hr />
            <h2 className='font-bold flex justify-between'>Total: <span>${calculateTotalAmount().toFixed(2)}</span></h2>

            {/* Checkbox for COD */}
            <div className='flex items-center gap-2 mt-4'>
              <input
                type="checkbox"
                id="cashOnDelivery"
                checked={useCod}
                onChange={(e) => setUseCod(e.target.checked)}
                className='size-4'
              />
              <label htmlFor="cashOnDelivery" className='font-semibold text-slate-600 text-xl'>Cash on Delivery</label>
            </div>

            {/* Keep the "Order Now (COD)" button */}
            <Button onClick={() => onApprove({})}>Order Now (COD)</Button>

            {/* PayPal button if totalAmount is available */}
            {totalAmount && !useCod && (
              <PayPalButtons 
                onApprove={(data, actions) => {
                  return actions.order.capture().then(details => {
                    onApprove(details); 
                  }).catch(error => {
                    console.error("Error capturing PayPal order:", error);
                    toast.error("Failed to complete payment");
                  });
                }}
                style={{ layout: "horizontal" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalAmount.toFixed(2),
                          currency_code: "USD"
                        }
                      }
                    ]
                  }).catch(error => {
                    console.error("Error creating PayPal order:", error);
                    toast.error("Failed to create PayPal order");
                  });
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
