import React from 'react'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { FaBoxOpen } from 'react-icons/fa6'
import TransitionModalSupplier from './TransitionModalSupplier'

function SupplierCard({name, responsible, email, telephone, adress, idSupplier, produtos}: {name: string, responsible: string, email: string, telephone: string, adress: string, idSupplier: number, produtos: []}) {

    function getInitials(nameAbrev: string): string {
        const words = nameAbrev.split(' ');
        const initials = words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('');
        return initials;
    }

  return (
    <div className='flex flex-col gap-4 w-full'>
                <div className="border group border-transparent hover:border-primary transition duration-300 flex flex-col bg-blackThirdy gap-3 p-5 rounded-lg h-48">
                <div className="flex justify-between items-center">
                    
                        <div className='flex items-center gap-3'>
                            <div className='size-12 flex rounded-full bg-blackSecondary justify-center items-center font-bold text-lg'>{getInitials(name)}</div>
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

                    <div className='flex gap-6 bg-blackSecondary w-full h-24 p-5 items-center rounded-lg'>
                        <div className='flex items-center gap-2'>
                            <FaMapMarkedAlt size={25}/>
                            <p className='text-base text-lightW/70 font-semibold'>{adress}</p>
                        </div>
                        <div className='size-2 rounded-full bg-lightW/50 group-hover:bg-primary transition duration-300'></div>
                        <div className='flex items-center gap-2'>
                            <FaBoxOpen size={25}/>
                            <p className='text-base text-lightW/70 font-semibold'>{produtos.length} Produtos</p>
                        </div>
                    </div>

                </div>
                
    </div>
  )
}

export default SupplierCard