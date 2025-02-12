import React from 'react'

function NotificationCard({message, date, id}: {message: string, date: string, id: number}) {
  return (
    <div className='w-full h-32 gap-4  bg-lightW/10 rounded-lg items-center flex px-5 mt-5'>
        <div className='w-10 h-10 bg-blackPrimary rounded-full items-center justify-center flex font-black text-xl'>{id}</div>
        <div className='flex flex-col gap-3'>
            <div>
                <p className='font-semibold text-md text-lightW'>{message}</p>
                <p className='font-smibold text-sm bg-lightW/10 px-2 rounded-full w-fit text-lightW/50'>{date}</p>
            </div>
            <button className='border gap-1 max-w-fit items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-1 px-3 rounded-lg text-sm font-semibold text-blackPrimary'>Marcar como lido</button>
        </div>
    </div>
  )
}

export default NotificationCard