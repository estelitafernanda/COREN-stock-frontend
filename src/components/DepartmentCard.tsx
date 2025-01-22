import React from 'react'
import Image from 'next/image'
import { FaMapMarkedAlt, FaBoxOpen } from "react-icons/fa";
import { SiSuperuser } from 'react-icons/si';
import TransitionsModalSupplier from './TransitionsModalSector';


function DepartmentCard({name, superUser, func, local, idSector}: {name: string, superUser: string, func: number , local: string, idSector: number}) {
  return (
    <div className="border group border-transparent hover:border-primary transition duration-300 flex flex-col bg-blackSecondary gap-3 p-5 rounded-lg max-h-44">
    <div className="flex justify-between items-center">
        
            <div className='flex items-center gap-3'>
                <div className='size-10 flex rounded-full bg-primary justify-center items-center'></div>
                <div>
                    <h3 className="font-bold text-lg">{name}</h3>
                </div>
                
                <div className='h-12 w-[2px] bg-lightW/30'></div>
                <div className='flex gap-5'>
                    <div className='flex flex-col gap-1'>
                        <h3 className="font-semibold text-lightW/70 text-sm uppercase tracking-wider">Chefe de Departamento</h3>
                        <p className="font-semibold text-lightW text-sm">{superUser}</p>
                    </div>
                </div>
            </div>
            <TransitionsModalSupplier infoIdData={idSector}/>
        </div>

        <div className='flex gap-6 bg-blackThirdy w-full h-24 p-5 items-center rounded-lg'>
            <div className='flex items-center gap-2'>
                <FaMapMarkedAlt size={25}/>
                <p className='text-base text-lightW/70 font-semibold'>unidade: {local}</p>
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