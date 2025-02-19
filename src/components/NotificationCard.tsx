import api from '@/app/api/axios';
import { Alert } from '@mui/material';
import React, { useState } from 'react'
import { IoCheckmarkDoneSharp } from "react-icons/io5";


function NotificationCard({message, date, id, status}: {message: string, date: string, id: number, status: string}) {

  const [alert, setAlert] = useState<{ severity: 'success' | 'error'; message: string } | null>(null);
  const handleUpdateRequest = async () => {
    try {
      const response = await api.patch(`/notifications/${id}/update`);
      setAlert({ severity: 'success', message: 'Mensagem lida' });
      setTimeout( () => '', 100000);
    } catch (error: unknown) {
      setAlert({ severity: 'error', message: 'Erro ao ler mensagem' });
        console.error('Erro desconhecido:', error);
    }
  };

  return (
    <div className='w-full h-32 gap-4  bg-lightW/10 rounded-lg items-center flex px-5 mt-5'>
        {alert && (
            <Alert severity={alert.severity} className='absolute top-7 w-full right-[70%]'>{alert.message}</Alert>
        )}
        <div className='w-10 h-10 bg-blackPrimary rounded-full items-center justify-center flex font-black text-xl'>{id}</div>
        <div className='flex flex-col gap-3'>
            <div>
                <p className='font-semibold text-md text-lightW'>{message}</p>
                <p className='font-smibold text-sm bg-lightW/10 px-2 rounded-full w-fit text-lightW/50'>{date}</p>
            </div>
            {status === 'pendente' ? (
                          <button onClick={handleUpdateRequest} className='border gap-1 max-w-fit items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-1 px-3 rounded-lg text-md font-semibold text-blackPrimary'>Marcar como lido</button>
            ):(
            <button disabled className='gap-1 max-w-fit items-center text-primary transition duration-300 flex py-1 px-3 rounded-lg text-md font-semibold'>Lido <IoCheckmarkDoneSharp size={20}/></button>)}
        </div>
    </div>
  )
}

export default NotificationCard