import React from 'react'
import Image from 'next/image'
import Trash from '../../public/lixeira.png'

function ProductCard() {
  return (
    
    <div className="border border-transparent hover:border-primary transition duration-300 flex bg-blackThirdy gap-3 p-2 rounded-lg">
          <div className="bg-lightW/90 h-16 w-16 rounded-lg flex items-center justify-center">
            <Image src={Trash} alt="Avatar" width={50} height={50}/>
          </div>
          <div>
            <h3 className="font-bold text-lg">Lixeira de Aço Acabamento Polido Tramontina</h3>
            <div className="flex gap-2 items-center mt-2">
              <p className="bg-lightW/10 px-2 rounded-full text-sm text-lightW font-semibold">Limpeza</p>
              <div className="rounded-full size-2 bg-lightW/50"></div>
              <p className="font-semibold text-lightW/50 text-sm rounded-full">Produtos em Estoque: <span className="text-white"><span className="text-primary">3</span> Em Estoque</span></p>
              <div className="rounded-full size-2 bg-lightW/50"></div>
            </div>
          </div>
    </div>
  )
}

export default ProductCard