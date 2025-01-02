'use client';
import React from 'react'
import Image from 'next/image'
import Trash from '../../public/lixeira.png'
import TransitionsModal from './TransitionsModal'

function ProductCard({name, category, stock}:{name: string, category: string, stock: number} ) {
  return (
    
    <div className="border border-transparent hover:border-primary justify-between items-center transition duration-300 flex bg-blackThirdy gap-3 p-2 rounded-lg">
      <div className='flex gap-3'>
      <div className="bg-lightW/90 h-16 w-16 rounded-lg flex items-center justify-center">
            <Image src={Trash} alt="Avatar" width={50} height={50}/>
          </div>
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <div className="flex gap-2 items-center mt-2">
              <p className="bg-lightW/10 px-2 rounded-full text-sm text-lightW font-semibold">{category}</p>
              <div className="rounded-full size-2 bg-lightW/50"></div>
              <p className="font-semibold text-lightW/50 text-sm rounded-full">Produtos em Estoque: <span className="text-white"><span className="text-primary">{stock}</span> Em Estoque</span></p>
              <div className="rounded-full size-2 bg-lightW/50"></div>
            </div>
          </div>
      </div>
          <TransitionsModal/>
    </div>
  )
}

export default ProductCard