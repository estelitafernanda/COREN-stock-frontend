import React from 'react'
import { FaHeadset } from 'react-icons/fa6'
import { IoIosAdd } from "react-icons/io";
import { FaSearch, FaMapMarkedAlt, FaBoxOpen } from "react-icons/fa";
import Image from 'next/image';
import Avatar from  "../../../public/memoji.png";

function Departments() {
  return (
<div className="mx-auto w-[95vw] mt-7 flex flex-col justify-center min-h-full font-[family-name:var(--font-geist-sans)]">
        <div className="flex justify-between w-full">
            <div className='flex items-center gap-5'>
                <h1 className="text-3xl font-bold text-lightW">Fornecedores:</h1>
                <p className='text-sm font-bold text-lightW/30 bg-lightW/10 px-3 py-1 rounded-full border border-lightW/30'>Total de fornecedores: <span className='text-lightW'>18</span></p>
            </div>
            <div className=' flex items-center bg-blackSecondary border border-lightW/30 p-5 rounded-lg w-[30%] h-3 gap-2'>
                <FaSearch size={20} className='text-lightW/30'/>
                <p className='text-sm font-bold text-lightW/30'>buscar</p>
            </div>
            <div className="flex gap-4">
            <button className="hover:bg-primary group hover:text-lightW flex gap-1 border-[1px] border-primary py-2 px-5 rounded-lg text-primary text-md font-semibold transition duration-300">
                <FaHeadset size={20} className="hover:text-lightW"/> Contato com suporte
            </button>
            <a href="/forms/supplierform">
            <button className="border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary">Adicionar Fornecedor <IoIosAdd size={20}/></button>
            </a>
            </div>
        </div>

        <section className='h-[80vh]  flex gap-5 mt-5'>

          <div className='flex flex-col gap-8 bg-blackSecondary w-[30%] p-5 rounded-lg'>
            <div> 
                <h2 className='text-sm uppercase tracking-widest font-bold text-lightW/50'>Tipo de Fornecedor</h2>
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

          <div className='flex flex-col gap-4 w-full'>
                <div className="border group border-transparent hover:border-primary transition duration-300 flex flex-col bg-blackSecondary gap-3 p-5 rounded-lg h-48">
                <div className="flex justify-between items-center">
                    
                        <div className='flex items-center gap-3'>
                            <div className='size-10 flex rounded-full bg-primary justify-center items-center'>
                                <Image src={Avatar} alt='avatar' width={45}/>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">DTIC</h3>
                                <p className="font-semibold text-lightW/70 text-sm">Sede (Natal/RN)</p>
                            </div>
                            
                            <div className='h-12 w-[2px] bg-lightW/30'></div>
                            <div className='flex gap-5'>
                                <div className='flex flex-col gap-1'>
                                    <h3 className="font-semibold text-lightW/70 text-sm uppercase tracking-wider">Chefe de Departamento</h3>
                                    <p className="font-semibold text-lightW text-sm">Iran Vital</p>
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <h3 className="font-semibold text-lightW/70 text-sm uppercase tracking-wider">funcionarios</h3>
                                    <p className=" font-semibold text-lightW text-sm">XHt4U@example.com</p>
                                </div>
                            </div>
                        </div>
                        <a href="" className='font-bold text-primary group-hover:text-[#B4FFFF] transition duration-300'>Ver Mais &gt;&gt;</a>
                    </div>

                    <div className='flex gap-6 bg-blackThirdy w-full h-24 p-5 items-center rounded-lg'>
                        <div className='flex items-center gap-2'>
                            <FaMapMarkedAlt size={25}/>
                            <p className='text-base text-lightW/70 font-semibold'>unidade: Sede (Natal/RN)</p>
                        </div>
                        <div className='size-2 rounded-full bg-lightW/50 group-hover:bg-primary transition duration-300'></div>
                        <div className='flex items-center gap-2'>
                            <FaBoxOpen size={25}/>
                            <p className='text-base text-lightW/70 font-semibold'>12 Funcionários</p>
                        </div>
                    </div>

                </div>
                
          </div>


        </section>

    </div>
  )
}

export default Departments