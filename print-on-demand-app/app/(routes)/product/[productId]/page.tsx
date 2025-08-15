'use client'


import PopularProducts, { Product } from '@/app/_components/PopularProducts';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import { Palette, ShoppingBagIcon, ShoppingBasketIcon, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import ProductCustomizeStudio from '../_components/ProductCustomizeStudio';
import { CartContext } from '@/context/CartContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import { NextResponse } from 'next/server';

function ProductDetail() {

    const {productId} = useParams();
    const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState(false);
    const [enableCustomizeStudio, setEnableCustomizeStudio ] = useState(false);
    const { cart, setCart } = useContext(CartContext);
    const{userDetail, setUserDetail} = useContext(UserDetailContext);
    const [designUrl, setDesignUrl] = useState<string>();
    

    

    useEffect(()=>{
        productId && GetProductById();

    },[productId])

    const GetProductById=async()=>{
        setLoading(true);
        const result = await axios.get('/api/products?productId='+productId);
        console.log(result.data);
        setProduct(result.data);
        setLoading(false);
    }


    const AddToCart = async() => {
        console.log(designUrl);
        //@ts-ignore
        setCart((prev: any[]=[]) => {
            if(!Array.isArray(prev)) prev = [];
            return [...prev,
            {
                design: designUrl,
                products: product,
                userEmail: userDetail?.email,
            },
        ];
    })
        //save to database

        const result = await axios.post('/api/cart',{
            product:product,
            designUrl:designUrl,
            userEmail:userDetail?.email

        });
        console.log(result.data);
        NextResponse.json(result.data);
    }
  return (
    <div className="w-auto mx-auto px-4 sm:px-6 lg:px-8 h-auto">
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12"
    >
    <div className='w-auto h-auto flex items-center justify-center'>
        {product? !enableCustomizeStudio? 
        <Image src={product?.productimage?.[0]?.url} 
        alt={product?.title || 'Product image'} 
        width={500} 
        height={500}
        className="rounded-xl shadow-lg object-cover"
        />:
        <ProductCustomizeStudio product={product}
        setDesignUrl={(url:string)=>setDesignUrl(url)}
        />
        :
        <Skeleton className='w-full h-[300px]'/>
  }

    </div>
    <div>
        {product?
    <div className='flex flex-col gap-6'>
        
        
        <h2 className='font-bold text-4xl text-gray-900'>
            
            {product?.title}
        </h2>
        <p className='text-xl text-gray-700 mt-2'>
            ${product?.pricing}
        </p>

        <p className='text-gray-500'>
            {product?.description}
        </p>
        <div>
            <h2 className='text-lg font-bold'>Size</h2>
            <div className='flex gap-4 mt-2'>
                <Button variant={'outline'}>S</Button>
                <Button variant={'outline'}>M</Button>
                <Button variant={'outline'}>L</Button>
                <Button variant={'outline'}>XL</Button>




            </div>
        </div>
        {!enableCustomizeStudio && 
        <Button size="lg" onClick={()=>setEnableCustomizeStudio(true)} className="rounded-full px-6 shadow-sm"><Palette/> Customize </Button>}
        
        <Button size={"lg"} onClick={()=>AddToCart()}  variant={!enableCustomizeStudio? 'outline':'default'} className="rounded-full px-6 shadow-sm"> <ShoppingCart/> Add to Cart </Button>


    </div>
    :
    <div className='space-y-3'>
        <Skeleton className='w-full h[20px]'/>
        <Skeleton className='w-full h[30px]'/>
       <Skeleton className='w-full h[50px]'/>
       <Skeleton className='w-full h[50px]'/>


    </div>
}
    </div>

   
    </motion.div>
    <div>
        {product?
    <div className='my-20'>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4"> Product Description </h2>
        <p className="text-gray-600 leading-relaxed">
            
            {product?.longDescription}
        </p>
    </div>
    :
    <div><Skeleton className='w-full'/></div>
        }
    </div>

    <PopularProducts/>
    </div>
  )
}

export default ProductDetail