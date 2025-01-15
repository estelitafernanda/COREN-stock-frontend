import React from 'react'
import { FaHeadset } from 'react-icons/fa6'
import { IoIosAdd } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { GrValidate } from "react-icons/gr";
import { FaTruckMoving } from "react-icons/fa6";
import { MdArrowDropDown } from "react-icons/md";
import Image from 'next/image';
import { FaReceipt } from "react-icons/fa";
import Avatar from  "../../../public/memoji.png";

export default function Order() {
  return (
    <div className="mx-auto w-[95vw] mt-7 flex flex-col justify-center min-h-full font-[family-name:var(--font-geist-sans)]">
        <div className="flex justify-between w-full">
            <div className='flex items-center gap-5'>
                <h1 className="text-3xl font-bold text-lightW">Movimentaçao:</h1>
                <p className='text-sm font-bold text-lightW/30 bg-lightW/10 px-3 py-1 rounded-full border border-lightW/30'>Total de movimentos: <span className='text-lightW'>386</span></p>
            </div>
            <div className=' flex items-center bg-blackSecondary border border-lightW/30 p-5 rounded-lg w-[30%] h-3 gap-2'>
                <FaSearch size={20} className='text-lightW/30'/>
                <p className='text-sm font-bold text-lightW/30'>buscar</p>
            </div>
            <div className="flex gap-4">
            <button className="hover:bg-primary group hover:text-lightW flex gap-1 border-[1px] border-primary py-2 px-5 rounded-lg text-primary text-md font-semibold transition duration-300">
                <FaHeadset size={20} className="hover:text-lightW"/> Contato com suporte
            </button>
            <a href="/forms/movementform">
            <button className="border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary">Adicionar Movimento <IoIosAdd size={20}/></button>
            </a>
            </div>
        </div>

        <section className='h-[80vh]  flex gap-5 mt-5'>

          <div className='flex flex-col gap-8 bg-blackSecondary w-[30%] p-5 rounded-lg'>
            <div> 
                <h2 className='text-sm uppercase tracking-widest font-bold text-lightW/50'>Status de movimento</h2>
                <div className='grid grid-cols-2 gap-3 py-3'>
                    <button className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                    Validando
                    <span className='group-hover:bg-primary text-sm bg-primary/50 text-lightW px-2 rounded-full transition duration-300'>
                    386
                    </span>                
                    </button>
                    <button className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                    Validado
                    <span className='group-hover:bg-primary text-sm bg-primary/50 text-lightW px-2 rounded-full transition duration-300'>
                    78
                    </span>                
                    </button>
                    <button className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                    Transição
                    <span className='group-hover:bg-primary text-sm bg-primary/50 text-lightW px-2 rounded-full transition duration-300'>
                    94
                    </span>                
                    </button>
                    <button className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                        Recebido
                        <span className='group-hover:bg-primary text-sm bg-primary/50 text-lightW px-2 rounded-full transition duration-300'>
                        178
                        </span>                
                    </button>
                </div>
                <h2 className='text-sm uppercase tracking-widest font-bold text-lightW/50'>Filtrar por</h2>
                <div className='grid gap-3 py-3'>
                    <button className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                    Local
                    <MdArrowDropDown size={20}/>
                    </button>
                    <button className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                    Data de Pedido
                    <MdArrowDropDown size={20}/>
                    </button>
                    <button className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                    Produto
                    <MdArrowDropDown size={20}/>
                    </button>
                    <button className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                    Status
                    <MdArrowDropDown size={20}/>
                    </button>
                </div>
            </div>
          </div>

          <div className='flex flex-col gap-4 w-full'>
                <div className="border group border-transparent hover:border-primary transition duration-300 flex flex-col bg-blackSecondary gap-3 p-5 rounded-lg h-60">
                <div className="flex justify-between items-center">
                        <div className='flex items-center gap-3'>
                            <h3 className="font-bold text-lg">MO-001</h3>
                            <div className='h-5 w-[2px] bg-lightW/30'></div>
                            <h3 className="font-bold text-lg">Lixeira de Aço Acabamento Polido Tramontina</h3>
                        </div>
                        <a href="/details/orderdetail" className='font-bold text-primary group-hover:text-[#B4FFFF] transition duration-300'>Ver Mais &gt;&gt;</a>
                    </div>
        
                    <div className="flex gap-2 items-center">
                        <div className='size-10 flex rounded-full bg-primary justify-center items-center'>
                            <Image src={Avatar} alt='avatar' width={45}/>
                        </div>
                        <p className=" text-sm text-light/30 text-lightW/50 font-semibold">User1</p>
                        <div className="rounded-full size-2 bg-lightW/50 group-hover:bg-[#B4FFFF] transition duration-300"></div>
                        <p className="font-semibold text-lightW/70 text-sm">Departamento Financeiro<span className="text-lightW/70"><span className="text-primary group-hover:text-[#B4FFFF] transition duration-300"> -&gt; </span>Recursos Humanos</span></p>
                        <div className="rounded-full size-2 bg-lightW/50 group-hover:bg-[#B4FFFF] transition duration-300"></div>
                        <p className="font-semibold text-lightW/50 text-sm ">Em Andamento</p>
                    </div>

                    <div className='bg-blackThirdy w-full h-full p-3 rounded-lg'>
                        <span className='flex items-center gap-2'>
                            <p className='text-sm font-bold'>Aguardando Validação</p>
                            <div className='h-5 w-[2px] bg-lightW/30'></div>
                            <p className='text-sm font-bold text-lightW/50'>Dezembro 10, 2024</p>
                        </span>
                        <div className='flex flex-col w-full px-5 py-2 h-12 mt-3 items-center'>
                            <div className='flex justify-between w-full h-[5px] bg-primary rounded-full mt-3'>
                                <div className='-mt-4 flex items-center justify-center h-[36px] w-[44px] bg-blackThirdy rounded-full'><FaReceipt size={25}/></div>
                                <div className='-mt-4 flex items-center justify-center h-[36px] w-[44px]  bg-blackThirdy  rounded-full'><GrValidate size={25}/></div>
                                <div className='-mt-4 flex items-center justify-center h-[36px] w-[44px]  bg-blackThirdy  rounded-full text-primary'><FaTruckMoving size={25}/></div>
                                <div className='-mt-4 flex items-center justify-center h-[36px] w-[44px]  bg-blackThirdy  rounded-full'><GiConfirmed size={25}/></div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="border border-transparent hover:border-primary transition duration-300 flex flex-col bg-blackSecondary gap-3 p-5 rounded-lg h-60">
                    <div className="flex items-center gap-3">
                        <h3 className="font-bold text-lg">MO-001</h3>
                        <div className='h-5 w-[2px] bg-lightW/30'></div>
                        <h3 className="font-bold text-lg">Lixeira de Aço Acabamento Polido Tramontina</h3>
                    </div>
        
                    <div className="flex gap-2 items-center">
                        <div className='size-10 flex rounded-full bg-primary justify-center items-center'>
                            <Image src={Avatar} alt='avatar' width={45}/>
                        </div>
                        <p className=" text-sm text-light/30 text-lightW/50 font-semibold">User1</p>
                        <div className="rounded-full size-2 bg-lightW/50"></div>
                        <p className="font-semibold text-lightW/70 text-sm">Departamento Financeiro<span className="text-lightW/70"><span className="text-primary"> -&gt; </span>Recursos Humanos</span></p>
                        <div className="rounded-full size-2 bg-lightW/50"></div>
                        <p className="font-semibold text-lightW/50 text-sm">Deferido</p>
                    </div>

                    <div className='bg-blackThirdy w-full h-full p-3 rounded-lg'>
                        <span className='flex items-center gap-2'>
                            <p className='text-sm font-bold'>Aguardando Validação</p>
                            <div className='h-5 w-[2px] bg-lightW/30'></div>
                            <p className='text-sm font-bold text-lightW/50'>Dezembro 10, 2024</p>
                        </span>
                        <div className='flex flex-col w-full px-5 py-2 h-12 mt-3 items-center'>
                            <div className='flex justify-between w-full h-[5px] bg-red rounded-full mt-3'>
                                <div className='-mt-4 flex items-center justify-center h-[36px] w-[44px] bg-blackThirdy rounded-full text-red'><FaReceipt size={25}/></div>
                                <div className='-mt-4 flex items-center justify-center h-[36px] w-[44px]  bg-blackThirdy  rounded-full'><GrValidate size={25}/></div>
                                <div className='-mt-4 flex items-center justify-center h-[36px] w-[44px]  bg-blackThirdy  rounded-full'><FaTruckMoving size={25}/></div>
                                <div className='-mt-4 flex items-center justify-center h-[36px] w-[44px]  bg-blackThirdy  rounded-full'><GiConfirmed size={25}/></div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="border border-transparent hover:border-primary transition duration-300 flex flex-col bg-blackSecondary gap-3 p-5 rounded-lg h-60">
                    <div className="flex items-center gap-3">
                        <h3 className="font-bold text-lg">MO-001</h3>
                        <div className='h-5 w-[2px] bg-lightW/30'></div>
                        <h3 className="font-bold text-lg">Lixeira de Aço Acabamento Polido Tramontina</h3>
                    </div>
        
                    <div className="flex gap-2 items-center">
                        <div className='size-10 flex rounded-full bg-primary justify-center items-center'>
                            <Image src={Avatar} alt='avatar' width={45}/>
                        </div>
                        <p className=" text-sm text-light/30 text-lightW/50 font-semibold">User1</p>
                        <div className="rounded-full size-2 bg-lightW/50"></div>
                        <p className="font-semibold text-lightW/70 text-sm">Departamento Financeiro<span className="text-lightW/70"><span className="text-primary"> -&gt; </span>Recursos Humanos</span></p>
                        <div className="rounded-full size-2 bg-lightW/50"></div>
                        <p className="font-semibold text-lightW/50 text-sm">Concluído</p>
                    </div>

                    <div className='bg-blackThirdy w-full h-full p-3 rounded-lg'>
                        <span className='flex items-center gap-2'>
                            <p className='text-sm font-bold'>Aguardando Validação</p>
                            <div className='h-5 w-[2px] bg-lightW/30'></div>
                            <p className='text-sm font-bold text-lightW/50'>Dezembro 10, 2024</p>
                        </span>
                        <div className='flex flex-col w-full px-5 py-2 h-12 mt-3 items-center'>
                            <div className='flex justify-between w-full h-[5px] bg-green rounded-full mt-3'>
                                <div className='-mt-4 flex items-center justify-center h-[36px] w-[44px] bg-blackThirdy rounded-full'><FaReceipt size={25}/></div>
                                <div className='-mt-4 flex items-center justify-center h-[36px] w-[44px]  bg-blackThirdy  rounded-full'><GrValidate size={25}/></div>
                                <div className='-mt-4 flex items-center justify-center h-[36px] w-[44px]  bg-blackThirdy  rounded-full'><FaTruckMoving size={25}/></div>
                                <div className='-mt-4 flex items-center justify-center h-[36px] w-[44px]  bg-blackThirdy  rounded-full text-green'><GiConfirmed size={25}/></div>
                            </div>
                        </div>
                    </div>

                </div>
                
          </div>


        </section>

    </div>
  )
}

