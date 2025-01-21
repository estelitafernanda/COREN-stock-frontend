import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import Image from 'next/image'
import { FaLongArrowAltRight } from "react-icons/fa";
import Trash from '../../../../public/lixeira.png'

function MovementDetail() {
  return (
    <div className="mx-auto w-[95vw] mt-7 flex flex-col justify-center   font-[family-name:var(--font-geist-sans)] rounded-md">
        <span className='group dispĺay flex items-center gap-1 w-fit'>
            <FaArrowLeft className='group-hover:text-primary transition duration-300'/>
            <a href="/movements" className='text-xl font-semibold group-hover:text-primary transition duration-300'>Voltar</a>
        </span>
        <div className='className="mx-auto w-[95vw] mt-7 flex py-6 px-8 min-h-[calc(100vh-30rem)] gap-5 bg-blackSecondary font-[family-name:var(--font-geist-sans)] rounded-md'>
            <div className='flex items-center justify-center bg-blackThirdy min-h-[calc(100vh-20rem)] w-[50%] p-5  rounded-lg'>
                <Image src={Trash} alt="Avatar" className='w-full'/>
            </div>
            <div className='w-50%'>
                <div className='flex flex-col gap-2 border-b-[2px] pb-3 border-lightW/20'>
                    <span className='flex gap-3 items-center'>
                    <h2 className='text-3xl font-black text-primary'>MO - 000001</h2>
                    <div className="w-[2px] h-6 bg-lightW/50"></div>
                    <h2 className='text-3xl font-black text-lightW'>Lixeira de Aço Acabamento Polido Tramontina</h2> 
                    </span>

                    <span className='flex gap-1'>
                        <p className='font-black'>Licitante: </p>
                        <p className='text-lightW/50'>Fulano de tal</p>
                    </span>
                    <span className='flex gap-1'>
                        <p className='font-black'>Movimentação: </p>
                        <span className='flex items-center gap-3 '>
                            <p className='text-lightW font-bold'>DTIC</p>
                            <FaLongArrowAltRight className='text-primary'/>
                            <p className='text-lightW font-bold'>Contabilidade</p>
                        </span>

                    </span>
                    <span className='flex gap-1'>
                        <p className='font-black'>Data: </p>
                        <p className='text-lightW/50'>02/01/2025</p>
                    </span>
                </div>
                <div className='flex flex-col gap-2 border-b-[2px] py-5 border-lightW/20'>
                    <h2 className='text-3xl font-black text-lightW'>Detalhes do produto em movimento:</h2>
                    <span className='flex gap-1 items-center'>
                        <p className='font-black'>Valor Unitário: </p>
                        <h2 className='text-xl font-bold text-lightW/50'>R$ 380,00</h2>
                    </span>
                    <span className='flex gap-1'>
                        <p className='font-black'>Validade: </p>
                        <p className='text-lightW/50'>Nenhuma</p>
                    </span>
                    <span className='flex gap-1'>
                        <p className='font-black'>Quantidade em estoque: </p>
                        <p className='text-red'>2</p>
                    </span>
                    <span >
                        <p className='font-black'>Descrição: </p>
                        <p className='w-[50%] text-lightW/50'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolor accusantium quisquam quod. Repellendus, unde iste labore recusandae, quas esse earum non blanditiis voluptatibus sed rerum placeat doloremque illum iure.</p>
                    </span>
                </div>
                <div className='py-5 flex flex-col gap-3'>
                    <span className='flex gap-2 items-center'>
                        <p className='text-xl font-black text-lightW'>Situação:</p>
                        <p className='text-yellow text-lg font-bold border-[2px] border-yellow rounded-full px-3 w-fit'>Produto em Movimento</p>
                    </span>
                    <span className='flex gap-2 items-center'>
                        <p className='text-xl font-black text-lightW'>Status:</p>
                        <p className='text-green text-lg font-bold border-[2px] border-green rounded-full px-3 w-fit'>Em Aberto</p>
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

export default MovementDetail