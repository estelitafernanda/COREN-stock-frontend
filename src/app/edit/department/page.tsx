import React from 'react'
import { FaWpforms } from "react-icons/fa";
import { IoMdArrowDropleft } from "react-icons/io";

function DepartmentForm() {
  return (
    <div className="mx-auto w-[95vw] mt-10 flex flex-col min-h-full font-[family-name:var(--font-geist-sans)]">
        <div className="mx-auto w-[95vw] mt-10  flex min-h-full font-[family-name:var(--font-geist-sans)]">
            <aside className=' w-[18%] flex flex-col gap-5'>
                <h2 className='text-3xl font-bold'>Editar Departamento</h2>
                <a href="" className='flex items-center gap-1 text-md font-semibold'><IoMdArrowDropleft />Voltar para a lista de produtos</a>
                <div className='flex flex-col gap-[38px]'>
                    <div className='group relative items-center bg-blackSecondary p-4 rounded-lg'>
                        <div className='absolute w-[6px] h-[40px] rounded-full bg-primary  group-hover:bg-[#B4FFFF] transition duration-300 -left-[2px] top-[15px]'></div>
                        <div className='absolute bg-primary w-[6px] h-[40px] rounded-full group-hover:blur-md group-hover:bg-[#B4FFFF] transition duration-300 -left-[2px] top-[15px]'></div>
                        <div className='flex items-center'>
                            <FaWpforms size={30} className='text-primary group-hover:text-[#B4FFFF] transition duration-300'/>
                            <div className='flex flex-col ml-4'>
                                <h3 className='uppercase font-bold text-base text-lightW tracking-widest'>step 1</h3>
                                <p className='text-sm font-bold text-primary group-hover:text-[#B4FFFF] transition duration-300'>Informações Gerais</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center p-4 rounded-lg'>
                        <FaWpforms size={30}/>
                        <div className='flex flex-col ml-4'>
                            <h3 className='uppercase font-bold text-base text-lightW/50 tracking-widest'>step 2</h3>
                            <p className='text-sm font-bold'>Informações Gerais</p>
                        </div>
                    </div>
                    <div className='flex items-center p-4 rounded-lg'>
                        <FaWpforms size={30}/>
                        <div className='flex flex-col ml-4'>
                            <h3 className='uppercase font-bold text-base text-lightW/50 tracking-widest'>step 3</h3>
                            <p className='text-sm font-bold'>Informações Gerais</p>
                        </div>
                    </div>
                    <div className='flex items-center p-4 rounded-lg'>
                        <FaWpforms size={30}/>
                        <div className='flex flex-col ml-4'>
                            <h3 className='uppercase font-bold text-base text-lightW/50 tracking-widest'>step 4</h3>
                            <p className='text-sm font-bold'>Informações Gerais</p>
                        </div>
                    </div>
                </div>
            </aside>
            <section className='w-[85%] flex flex-col gap-4'>
                <h2 className='text-center text-2xl font-bold'>Informações Gerais</h2>
                <form action="" className='p-5 mx-auto flex flex-col gap-4 bg-blackSecondary rounded-lg w-[75%]'>
                
                    <div className='flex flex-col gap-2 '>
                        <label htmlFor="" className='text-md font-bold'>Nome</label>
                        <input type="text" placeholder='Nome do produto' className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                    </div>
                    <div className='flex'>
                        <div className='flex flex-col gap-2 w-[50%]'>
                            <label htmlFor="" className='text-md font-bold'>Código</label>
                            <input type="text" placeholder='Nome do produto' className='w-[95%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>
                        <div className='flex flex-col gap-2  w-[50%]'>
                            <label htmlFor="" className='text-md font-bold'>Local de armazenamento</label>
                            <input type="text" placeholder='Nome do produto' className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='flex flex-col gap-2  w-[50%]'>
                            <label htmlFor="" className='text-md font-bold'>Código</label>
                            <input type="text" placeholder='Nome do produto' className='w-[95%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>
                        <div className='flex flex-col gap-2  w-[50%]'>
                            <label htmlFor="" className='text-md font-bold'>Local de armazenamento</label>
                            <input type="text" placeholder='Nome do produto' className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>
                    </div>
                    <div className='flex flex-col gap-[2px]'>
                        <label className='text-md font-bold' htmlFor="">Descrição</label>
                        <input type="textarea" className='w-[100%] rounded-lg h-36 bg-transparent border-[2px] border-lightW/30 px-3'/>
                    </div>
                    <div className='flex flex-col gap-[2px]'>
                        <label className='text-md font-bold' htmlFor="">Imagem</label>
                        <input type="textarea" className='w-[100%] rounded-lg h-44 bg-transparent border-[2px] border-lightW/30 px-3'/>
                    </div>
                </form>
            </section>
        </div>
        
        <div className='fixed w-[100vw] border-t-[1px] p-5 flex justify-end items-center gap-5 border-t-lightW/20 bg-blackSecondary h-32 left-0 bottom-0'>

            <button className="border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary">Voltar</button>
            <div className='h-[30px] w-[1px] bg-lightW/50'></div>
            <button className="border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary mr-36">Próximo</button>

        </div>
    </div>
  )
}

export default DepartmentForm