import React from 'react'
import { Product } from './PopularProducts'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Palette } from 'lucide-react'
import Link from 'next/link'

type Props={
    product:Product

}

function ProductCard({product}:Props) {
  return (
    <div className="group p-5 border rounded-xl flex flex-col items-center bg-white dark:bg-gray-900 shadow-md hover:shadow-2xl transition-shadow duration-300 hover:scale-105 hover:border-indigo-500 cursor-pointer">
      <Image  
        className="rounded-xl border shadow-sm group-hover:shadow-lg transition duration-300" 
        src={product.productimage[0]?.url} 
        alt={product.title} 
        width={150} 
        height={150}
      />
      <h2 className="mt-3 text-center font-semibold text-lg text-gray-800 dark:text-white">{product.title}</h2>
      <h2 className="text-center font-bold text-xl text-indigo-600 mt-1">{product.pricing}Rs.</h2>
      <Link href={'/product/'+product?.documentId} className="w-full mt-3">
        <Button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300">
          <Palette className="w-5 h-5" />
          Customize
        </Button>
      </Link>
    </div>
  )
}

export default ProductCard