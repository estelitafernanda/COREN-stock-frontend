import Image from 'next/image'
import React from 'react'
import { FaHeadset } from 'react-icons/fa6'
import { IoIosArrowDown } from 'react-icons/io'
import Trash from "../../../public/lixeira.png";

function Inventory() {
  return (
    <div className="mx-auto w-[95vw] mt-7 flex flex-col justify-center min-h-full font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-bold text-lightW">Inventario</h1>
        <div className="flex gap-4">
          <button className="hover:bg-primary group hover:text-lightW flex gap-1 border-[1px] border-primary py-2 px-5 rounded-lg text-primary text-md font-semibold transition duration-300">
            <FaHeadset size={20} className="hover:text-lightW"/> Contato com suporte
          </button>
          <button className="border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary">Adicionar Produto <IoIosArrowDown/></button>
        </div>
      </div>
      <section className='h-[80vh] flex gap-5 mt-5'>

        <div className='flex flex-col gap-3 bg-blackSecondary w-[25%] p-5 rounded-lg'>
          <div> 
            <h2 className='text-sm uppercase tracking-widest font-bold text-lightW/50'>Tipo de produto</h2>
            <div className='grid grid-cols-2 gap-3 py-3'>
              <button className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                Todos
                <span className='group-hover:bg-primary text-sm bg-primary/50 text-lightW px-2 rounded-full transition duration-300'>
                  386
                </span>                
              </button>
              <button className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                Alimentos
                <span className='group-hover:bg-primary text-sm bg-primary/50 text-lightW px-2 rounded-full transition duration-300'>
                  78
                </span>                
              </button>
              <button className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                Escritório
                <span className='group-hover:bg-primary text-sm bg-primary/50 text-lightW px-2 rounded-full transition duration-300'>
                  94
                </span>                
              </button>
              <button className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                Limpeza
                <span className='group-hover:bg-primary text-sm bg-primary/50 text-lightW px-2 rounded-full transition duration-300'>
                  178
                </span>                
              </button>
            </div>
          </div>
        </div>

        <div className='bg-blackSecondary p-5 rounded-lg w-[75%]'>
          <div className="flex bg-blackThirdy gap-3 p-2 rounded-lg">
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
          </div>

      </section>
    </div>
  )
}

export default Inventory