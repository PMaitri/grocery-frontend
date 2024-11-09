"use client";
import { useEffect, useContext, useState } from 'react';
import Link from 'next/link';
import { CircleUserRound, LayoutGrid, Search, ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from '../_utils/GlobalApi';
import { useRouter } from 'next/navigation';
import { UpdateCartContext } from '../_context/updateCartContext';
import CartItemList from '@/components/ui/CartItemList';
import { toast } from 'sonner';

function Header() {
  const [categoryList, setCategoryList] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const jwt = sessionStorage.getItem('jwt');
  const [totalCartItem, setTotalCartItem] = useState(0);
  const { updateCart } = useContext(UpdateCartContext);
  const [cartItemList, setCartItemList] = useState([]);
  const [subtotal, setSubTotal] = useState(0);
  
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in and fetch categories on component mount
    setIsLogin(!!jwt);
    getCategoryList();
  }, []);

  useEffect(() => {
    // Fetch cart items if user is logged in
    if (user && jwt) {
      getCartItems();
    }
  }, [updateCart, user, jwt]);

  useEffect(() => {
    // Calculate subtotal whenever cart items change
    const total = cartItemList.reduce((acc, item) => {
      const amount = item.attributes?.amount || 0; // Safely access amount
      const quantity = item.attributes?.quantity || 0; // Safely access quantity
      return acc + (amount * quantity); // Calculate subtotal
    }, 0);
    setSubTotal(total); // Update subtotal state
  }, [cartItemList]);

  const getCategoryList = async () => {
    try {
      const resp = await GlobalApi.getCategory();
      setCategoryList(resp.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

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

  const onSignOut = () => {
    sessionStorage.clear();
    router.push('/sign-in');
  };

  const onDeleteItem = async (id) => {
    try {
      await GlobalApi.deleteCartItem(id, jwt);
      toast('Item removed!');
      getCartItems(); // Refresh cart items after deletion
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error('Failed to remove item.');
    }
  };

  return (
    <div className='p-5 shadow-sm flex justify-between'>
      <div className='flex items-center gap-10 p-2'>
        <Image src='/logo1.png' alt='logo1' width={50} height={50} />

        {/* Category Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className='hidden md:flex gap-0.5 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer'>
              <LayoutGrid className='h-6 w-10' /> Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList.map((category) => (
              <DropdownMenuItem key={category.id}>
                <Link href={`/category/${category.id}`} passHref>
                  <div className="flex items-center gap-2">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${category?.attributes?.icon?.data?.[0]?.attributes?.url}`}
                      unoptimized={true}
                      alt='icon'
                      width={23}
                      height={23}
                      style={{ marginRight: '10px' }}
                    />
                    <h2>{category.attributes.name}</h2>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search Input */}
        <div className='md:flex gap-3 p-2 items-center border rounded-full px-5 hidden'>
          <Search />
          <input type="text" placeholder='Search' className='outline-none' />
        </div>
      </div>

      <div className='flex gap-5 items-center p-2'>
        {/* Shopping Cart */}
        <Sheet>
          <SheetTrigger>
            <h2 className='flex gap-2 items-center text-lg p-2'>
              <ShoppingBasket className='h-7 w-6' /> 
              <span className='bg-primary text-white px-2 rounded-full'>{totalCartItem}</span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-primary text-white font-bold text-lg p-2">My Cart</SheetTitle>
              <SheetDescription>
                <CartItemList cartItemList={cartItemList} onDeleteItem={onDeleteItem} />
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <div className="flex flex-col items-left mt-3 bottom-6 absolute w-[90%] text-lg">
                <h3 className="font-bold">Subtotal: ₹ {subtotal}</h3>
                <Button onClick={() => router.push(jwt ? '/checkout' : '/sign-in')}>
                  Checkout
                </Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

        {/* User Authentication */}
        {!isLogin ? (
          <Link href={'/sign-in'}>
            <Button>Login</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRound className='h-11 w-11 bg-green-100 text-primary p-2 rounded-full' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <Link href={'my-order'}>
              <DropdownMenuItem>My Order</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={onSignOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

export default Header;
