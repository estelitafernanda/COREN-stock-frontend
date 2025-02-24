'use client';
import React from 'react'
import Image from 'next/image'
import TransitionsModal from './TransitionsModal'

function ProductCard({name, category, stock, image, idProduct}:{name: string, image:string, category: string, stock: number, idProduct: number} ) {
  return (
    
    <div className="border border-transparent p-2 hover:border-primary justify-between items-center transition duration-300 flex bg-blackThirdy gap-3 md:p-2 rounded-lg">
      <div className='flex w-full gap-3'>
          <div className="hidden md:flex bg-lightW/90 h-16 w-16 rounded-lg items-center justify-center">
            <Image src={`http://127.0.0.1:8000/images/products/${image}`} alt='image' width={50} height={50}/>
          </div>
          <div className='w-full'>
            <span className='flex w-full gap-5 justify-between items-center'>
              <div className='flex gap-2 items-center'>
                <h3 className='font-bold text-sm xl:text-lg'>PDT-00{idProduct}</h3>
                <div className='h-5 w-[2px] bg-lightW/30'></div>
                <h3 className="font-bold text-sm xl:text-lg">{name}</h3>
              </div>
              <TransitionsModal idProduct={idProduct}/>
            </span>
            <div className="flex gap-2 items-center">
              <p className="bg-lightW/10 px-2 rounded-full text-sm text-lightW font-medium xl:font-semibold">{category}</p>
              <div className="rounded-full size-2 bg-lightW/50"></div>
              <p className="font-semibold text-lightW/50 text-sm rounded-full">Em Estoque: <span className="text-white"><span className="text-primary">{stock}</span></span></p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default ProductCard