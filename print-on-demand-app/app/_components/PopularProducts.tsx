'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'animate.css';
import ProductCard from './ProductCard';
import ProductList from '../(routes)/category/_components/ProductList';

export type Product = {
    id:number;
    title:string;
    pricing:number;
    description: string;
    longDescription:string;
    isFeatures:boolean;
    size:any;
    productimage: Array<{
        url:string;
    }>
    documentId:string;
}

function PopularProducts() {

    const [productList, setProductList]=useState<Product[]>();

    useEffect(()=>{
        GetPopularProducts();

    },[])

    const GetPopularProducts=async()=>{
        const result = await axios.get('/api/products?isPopular=1');
        console.log(result.data);
        setProductList(result.data);
    }
  return (
    <div className="mt-16 px-4 sm:px-6 lg:px-8 animate__animated animate__fadeInUp">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8 tracking-tight">
          🔥 Popular Picks Just for You
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 px-2 md:px-0 animate-fade-in">
            {productList?.map((product:Product, index:number)=>(
                <ProductCard product = {product} key={index}/>
            ))}
        </div>

    </div>
  )
}

export default PopularProducts