import React from 'react'
import Image from 'next/image'
import { FaMapMarkedAlt, FaBoxOpen } from "react-icons/fa";
import { SiSuperuser } from 'react-icons/si';


function DepartmentCard({name, superUser, func, local}: {name: string, superUser: string, func: number , local: string}) {
  return (
    <div className="border group border-transparent hover:border-primary transition duration-300 flex flex-col bg-blackSecondary gap-3 p-5 rounded-lg max-h-44">
    <div className="flex justify-between items-center">
        
            <div className='flex items-center gap-3'>
                <div className='size-10 flex rounded-full bg-primary justify-center items-center'>
                    
                </div>
                <div>
                    <h3 className="font-bold text-lg">{name}</h3>
                    <p className="font-semibold text-lightW/70 text-sm">{local}</p>
                </div>
                
                <div className='h-12 w-[2px] bg-lightW/30'></div>
                <div className='flex gap-5'>
                    <div className='flex flex-col gap-1'>
                        <h3 className="font-semibold text-lightW/70 text-sm uppercase tracking-wider">Chefe de Departamento</h3>
                        <p className="font-semibold text-lightW text-sm">{superUser}</p>
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
                <p className='text-base text-lightW/70 font-semibold'>{func} Funcionários</p>
            </div>
        </div>

    </div>
  )
}

export default DepartmentCard