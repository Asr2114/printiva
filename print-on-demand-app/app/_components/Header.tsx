'use client'
import { Button } from '@/components/ui/button'
import { CartContext } from '@/context/CartContext'
import { UserDetailContext } from '@/context/UserDetailContext'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'


const menu = [
    {
        id:1,
        name:"Home",
        path:'/'
    },
    {
        id:2,
        name:"Products",
        path:'/products'
    },
    {
        id:3,
        name:"About Us",
        path:'/about'
    },
    {
        id:4,
        name:"Contact",
        path:'/contact'
    },
]

export type User = {
    email: string,
    name: string,
    picture: string
}

function Header() {

    const[user, setUser] = useState<User>();
    const{userDetail, setUserDetail} = useContext(UserDetailContext)
    const {cart, setCart}= useContext(CartContext);

    useEffect(()=>{
        if(typeof window!==undefined){
                        //@ts-ignore

            const storedToken = localStorage.getItem('tokenResponse');
            const tokenResponse = storedToken ? JSON.parse(storedToken) : null;
            if(tokenResponse){
                GetUserProfile(tokenResponse?.access_token);

            }
        }
    },[]);


const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      localStorage.setItem('tokenResponse', JSON.stringify(tokenResponse))
      await GetUserProfile(tokenResponse.access_token);
     
      //save to strapi/backend
    },
    onError: errorResponse => console.log(errorResponse),
  });

//get user info
const GetUserProfile=async(access_token:string)=>{
    try{
    const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
  
      console.log(userInfo);
      setUser(userInfo?.data);
      setUserDetail(userInfo?.data);
      SaveNewUser(userInfo?.data)
    }
    catch(e){
        console.error("Error fetching user Profile:", e);
        localStorage.setItem('tokenResponse', '');
    }

}

const SaveNewUser=async(user:User)=>{
    const result = await axios.post('/api/users',{
        name:user.name,
        email:user.email,
        picture:user.picture
    });
    console.log(result.data);

}

useEffect(()=>{
    user && GetCartList();

},[user])

const GetCartList=async()=>{
    const result = await axios.get('/api/cart?email='+user?.email)
    console.log(result.data);
    setCart(result);
}

  return (
    <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href={'/'} className="flex justify-center md:justify-start w-full md:w-auto">
        <Image src={'/logo3.svg'} alt='Logo' width={160} height={36} className="transition-transform hover:scale-105" />
        </Link>
        <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
            {menu.map((item, index) => (
                <li key={index}>
                    <Link 
                        href={item.path} 
                        className="text-lg font-medium text-gray-700 hover:text-black transition-colors duration-200"
                    >
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
       <div className="flex gap-4 items-center justify-center md:justify-end w-full md:w-auto">
        <div className='flex gap-2 items-center'>
        <ShoppingCart className="cursor-pointer hover:text-black text-gray-600 transition-colors" />
        <span className='p-1 bg-gray-100 px-2 rounded-xl'>{cart?.length?? 0}</span>
        </div>
        {!user ? (
            <Button 
                onClick={() => googleLogin()}
                className="px-5 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors duration-200"
            >
                Sign In / Sign Up
            </Button>
        ) : (
            <Image 
                src={user.picture} 
                alt={user.name} 
                width={38} 
                height={38} 
                className="rounded-full border-2 border-gray-300 hover:border-black transition-all duration-200"
            />
        )}
        </div>
    </header>
  )
}

export default Header