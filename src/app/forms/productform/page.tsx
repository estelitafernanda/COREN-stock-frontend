import React from 'react'
import { IoMdArrowDropleft } from "react-icons/io";

function ProductForm() {
  return (
    <div className="mx-auto w-[95vw] mt-10 flex min-h-full font-[family-name:var(--font-geist-sans)]">
        <aside className=' w-[15%]'>
            <a href="" className='flex items-center gap-1 text-md font-semibold'><IoMdArrowDropleft />Voltar para a lista de produtos</a>

        </aside>
        <section className='w-[85%] flex flex-col gap-4'>
            <div>
                <h2 className='text-md text-center font-bold'>Adicionar Produto</h2>
                <h1 className='text-2xl text-center font-bold'>Informação geral</h1>
            </div>
            <form action="" className='p-5 mx-auto flex flex-col gap-4 bg-blackSecondary rounded-lg w-[85%]'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="" className='text-md font-bold'>Nome do Produto</label>
                    <input type="text" placeholder='Nome do produto' className='w-[100%] rounded-lg h-10 bg-transparent border border-lightW/30 px-3'/>
                </div>
                <div className='flex'>
                    <div className='flex flex-col w-[50%]'>
                        <label htmlFor="" className='text-md font-bold'>Nome do Produto</label>
                        <input type="text" placeholder='Nome do produto' className='w-[95%] rounded-lg h-10 bg-transparent border border-lightW/30 px-3'/>
                    </div>
                    <div className='flex flex-col w-[50%]'>
                        <label htmlFor="" className='text-md font-bold'>Nome do Produto</label>
                        <input type="text" placeholder='Nome do produto' className='w-[100%] rounded-lg h-10 bg-transparent border border-lightW/30 px-3'/>
                    </div>
                </div>
                <div>
                    <label htmlFor="">Nome do Produto</label>
                    <input type="text" placeholder='Nome do produto'/>
                </div>
            </form>
        </section>
    </div>
  )
}

export default ProductForm