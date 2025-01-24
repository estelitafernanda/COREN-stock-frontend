'use client';
import React from 'react'
import Image from 'next/image'
import Trash from '../../public/lixeira.png'
import TransitionsModal from './TransitionsModal'

function ProductCard({name, category, stock, image, idProduct}:{name: string, image:string, category: string, stock: number, idProduct: number} ) {
  return (
    
    <div className="border border-transparent hover:border-primary justify-between items-center transition duration-300 flex bg-blackThirdy gap-3 p-2 rounded-lg">
      <div className='flex gap-3'>
      <div className="bg-lightW/90 h-16 w-16 rounded-lg flex items-center justify-center">
            <Image src={`http://127.0.0.1:8000/images/products/${image}`} alt='image' width={50} height={50}/>
          </div>
          <div>
            <span className='flex gap-2 items-center'>
              <h3 className='font-bold text-lg'>PDT-00{idProduct}</h3>
              <div className='h-5 w-[2px] bg-lightW/30'></div>
              <h3 className="font-bold text-lg">{name}</h3>
            </span>
            <div className="flex gap-2 items-center mt-2">
              <p className="bg-lightW/10 px-2 rounded-full text-sm text-lightW font-semibold">{category}</p>
              <div className="rounded-full size-2 bg-lightW/50"></div>
              <p className="font-semibold text-lightW/50 text-sm rounded-full">Produtos em Estoque: <span className="text-white"><span className="text-primary">{stock}</span></span></p>
              <div className="rounded-full size-2 bg-lightW/50"></div>
            </div>
          </div>
      </div>
          <TransitionsModal idProduct={idProduct}/>
    </div>
  )
}

export default ProductCard