'use client';

import { UserDetailContext } from '@/context/UserDetailContext';
import React, { useState } from 'react'
import Header, { User } from './_components/Header';
import { CartContext } from '@/context/CartContext';

function Provider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const [userDetail, setUserDetail]=useState<User | undefined>(undefined);

    const [cart, setCart] = useState<any>([]);

    //GET cart list
  
    
  return (
    <div>
        {/* @ts-ignore */}
        <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
          <CartContext.Provider value={{cart, setCart}}>
            <Header/>
        {children}
        </CartContext.Provider>
            </UserDetailContext.Provider></div>
  )
}

export default Provider;