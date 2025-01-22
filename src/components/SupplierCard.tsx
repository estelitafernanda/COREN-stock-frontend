import React from 'react'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { FaBoxOpen } from 'react-icons/fa6'
import TransitionModalSupplier from './TransitionModalSupplier'

function SupplierCard({name, responsible, email, telephone, adress, idSupplier}: {name: string, responsible: string, email: string, telephone: string, adress: string, idSupplier: number}) {
  return (
    <div className='flex flex-col gap-4 w-full'>
                <div className="border group border-transparent hover:border-primary transition duration-300 flex flex-col bg-blackSecondary gap-3 p-5 rounded-lg h-48">
                <div className="flex justify-between items-center">
                    
                        <div className='flex items-center gap-3'>
                            <div>
                                <h3 className="font-bold text-lg">{name}</h3>
                                <p className="font-semibold text-lightW/70 text-sm">{responsible}</p>
                            </div>
                            
                            <div className='h-12 w-[2px] bg-lightW/30'></div>
                            <div className='flex gap-5'>
                                <div className='flex flex-col gap-1'>
                                    <h3 className="font-semibold text-lightW/70 text-sm uppercase tracking-wider">Número</h3>
                                    <p className="border-b font-semibold text-lightW text-sm">{telephone}</p>
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <h3 className="font-semibold text-lightW/70 text-sm uppercase tracking-wider">Email</h3>
                                    <p className="border-b font-semibold text-lightW text-sm">{email}</p>
                                </div>
                            </div>
                        </div>
                        <TransitionModalSupplier idForData={idSupplier}/>
                    </div>

                    <div className='flex gap-6 bg-blackThirdy w-full h-24 p-5 items-center rounded-lg'>
                        <div className='flex items-center gap-2'>
                            <FaMapMarkedAlt size={25}/>
                            <p className='text-base text-lightW/70 font-semibold'>{adress}</p>
                        </div>
                        <div className='size-2 rounded-full bg-lightW/50 group-hover:bg-primary transition duration-300'></div>
                        <div className='flex items-center gap-2'>
                            <FaBoxOpen size={25}/>
                            <p className='text-base text-lightW/70 font-semibold'>12 Produtos</p>
                        </div>
                    </div>

                </div>
                
    </div>
  )
}

export default SupplierCard