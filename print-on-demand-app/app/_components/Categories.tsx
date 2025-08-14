'use client'

import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type Category = {
    name: string,
    icon: {
        url:string
    }[],
    documentId:string,
    id:number
    slug:string
} 

function Categories() {

    const [categoryList, setCategoryList] = useState<Category[]>([]);

    useEffect(()=>{
        GetCategoryList();

    },[])

    const GetCategoryList=async()=>{
        const result = await axios.get('/api/categories');
        console.log(result.data);
        setCategoryList(result?.data?.data);
    }
  return (
    <div className="w-full flex flex-col items-center justify-center mt-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-8 tracking-tight">
        ✨ Explore Our Popular Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 mt-4 w-full max-w-7xl">
        {categoryList?.map((category: Category, index: number) => {
          const imageUrl = category.icon?.[0]?.url || '';
          return (
            <Link href={'/category/'+category?.slug} key={index} 

              className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 shadow-md hover:shadow-2xl hover:scale-110 transition-transform duration-300 ease-in-out rounded-xl w-[140px] sm:w-[160px] md:w-[180px] cursor-pointer border border-transparent hover:border-indigo-500"
            >
              {imageUrl && (
                <div className="w-20 h-20 p-3 bg-gray-100 dark:bg-gray-700 rounded-full shadow-inner flex items-center justify-center">
                  <Image
                    src={imageUrl}
                    width={40}
                    height={40}
                    alt={category.name}
                    className="object-contain"
                  />
                </div>
              )}
              <span className="text-lg text-center mt-3 font-medium text-gray-800 dark:text-white">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Categories