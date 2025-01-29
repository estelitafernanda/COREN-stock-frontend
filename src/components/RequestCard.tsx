import React from 'react'
import Image from 'next/image'
import { FaMapMarkedAlt, FaBoxOpen } from "react-icons/fa";
import { SiSuperuser } from 'react-icons/si';
import TransitionsModalRequests from './TransitionsModalRequests';


function RequestCard({product,  userName, desc, date, qnt, department, idRequest}: {product: string, department: string, userName: string , desc: string, date: string, qnt: number, idRequest: number}) {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
      
        return `${day}/${month}/${year}`;
      };

  return (
    <div className="border group border-transparent hover:border-primary transition duration-300 flex flex-col bg-blackThirdy gap-3 p-5 rounded-lg max-h-40">
    <div className="flex justify-between items-center">
        
            <div className='flex items-center gap-3'>
                <div className='size-10 flex rounded-full bg-primary justify-center items-center'>
                    
                </div>
                <div>
                    <h3 className="font-bold text-lg">REQ-00{idRequest}</h3>
                    <p className="font-semibold text-lightW/70 text-sm">{userName}</p>
                </div>
                
                <div className='h-12 w-[2px] bg-lightW/30'></div>
                <div className='flex gap-5'>
                    <div className='flex flex-col gap-1'>
                        <h3 className="font-semibold text-lightW/70 text-sm uppercase tracking-wider">Produto</h3>
                        <p className="font-semibold text-lightW text-sm">{product}</p>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <h3 className="font-semibold text-lightW/70 text-sm uppercase tracking-wider">Quantidade</h3>
                        <p className="font-semibold text-lightW text-sm">{qnt} <span >produto(s)</span></p>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <h3 className="font-semibold text-lightW/70 text-sm uppercase tracking-wider">Data</h3>
                        <p className=" font-semibold text-lightW text-sm">{date ? formatDate(date) : ''}</p>
                    </div>
                </div>
            </div>
            <TransitionsModalRequests infoIdData={idRequest}/>
        </div>

        <div className='flex gap-3 bg-blackPrimary/50 w-full h-24 py-3 px-5 items-center rounded-lg'>
            <div className='size-2 rounded-full bg-lightW/50 group-hover:bg-primary transition duration-300'></div>
            <div className='flex items-center gap-2'>
                <p className='text-base text-lightW/70 font-semibold'>{desc}</p>
            </div>
        </div>

    </div>
  )
}

export default RequestCard