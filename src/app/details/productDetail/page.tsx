import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import Image from 'next/image'
import Trash from '../../../../public/lixeira.png'

function ProductDetail() {
  return (
    <div className="mx-auto w-[95vw] mt-7 flex flex-col justify-center   font-[family-name:var(--font-geist-sans)] rounded-md">
        <span className='group dispĺay flex items-center gap-1 w-fit'>
            <FaArrowLeft className='group-hover:text-primary transition duration-300'/>
            <a href="/inventory" className='text-xl font-semibold group-hover:text-primary transition duration-300'>Voltar</a>
        </span>
        <div className='className="mx-auto w-[95vw] mt-7 flex py-6 px-8 min-h-[calc(100vh-12rem)] gap-5 bg-blackSecondary font-[family-name:var(--font-geist-sans)] rounded-md'>
            <div className='flex items-center justify-center bg-blackThirdy min-h-[calc(100vh-20rem)] w-[50%] p-5  rounded-lg'>
                <Image src={Trash} alt="Avatar" className='w-full'/>
            </div>
            <div className='w-50%'>
                <div className='flex flex-col gap-2 border-b-[2px] pb-3 border-lightW/20'>
                    <h2 className='text-3xl font-bold text-lightW'>Lixeira de Aço Acabamento Polido Tramontina</h2>
                    <span className='flex gap-1'>
                        <p className='font-black'>Fornecedor: </p>
                        <p>Fornecedor tal</p>
                    </span>
                    <span className='flex gap-1'>
                        <p className='font-black'>Número de compras: </p>
                        <p>780</p>
                    </span>
                </div>
                <div className='flex flex-col gap-2 border-b-[2px] py-5 border-lightW/20'>
                    <span className='flex gap-1 items-center'>
                        <p className='font-black'>Valor Unitário: </p>
                        <h2 className='text-xl font-bold text-lightW'>R$ 380,00</h2>
                    </span>
                    <span className='flex gap-1'>
                        <p className='font-black'>Validade: </p>
                        <p>Nenhuma</p>
                    </span>
                    <span className='flex gap-1'>
                        <p className='font-black'>Quantidade em estoque: </p>
                        <p>9</p>
                    </span>
                    <span >
                        <p className='font-black'>Descrição: </p>
                        <p className='w-[50%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolor accusantium quisquam quod. Repellendus, unde iste labore recusandae, quas esse earum non blanditiis voluptatibus sed rerum placeat doloremque illum iure.</p>
                    </span>
                </div>
                <div className='py-5 flex flex-col gap-3'>
                    <span className='flex gap-2 items-center'>
                        <p className='text-xl font-black text-lightW'>Situação:</p>
                        <p className='text-green text-lg font-bold border-[2px] border-green rounded-full px-3 w-fit'>Em Estoque</p>
                    </span>
                    <span className='flex gap-2 items-center'>
                        <p className='text-xl font-black text-lightW'>Quantidade em uso:</p>
                        <p className='text-primary text-lg font-bold border-[2px] border-primary rounded-full px-3 w-fit'>12</p>
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetail