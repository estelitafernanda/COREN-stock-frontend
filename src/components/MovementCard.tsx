'use client';
import React from 'react';
import { FaReceipt, FaTruckMoving } from 'react-icons/fa6';
import { GiConfirmed } from 'react-icons/gi';
import { GrValidate } from 'react-icons/gr';
import { BiArrowFromLeft,} from 'react-icons/bi';
import TransitionsModalMovements from './TransitionsModalMovement';

interface MovementCardProps {
  idMovement: number;
  idRequest: number;
  quantity: number;
  date: string;
  status: string;
  productName: string;
  currentQuantity: number;
  userSector: string;
  userName: string;
  requestDescription: string;
}

const MovementCard: React.FC<MovementCardProps> = ({
  idMovement,
  quantity,
  idRequest,
  date,
  status,
  productName,
  userSector,
  currentQuantity,
  userName,
  requestDescription,
}) => {
  return (
    <div className="border group border-transparent hover:border-primary transition duration-300 flex flex-col bg-blackThirdy gap-3 p-5 rounded-lg h-60">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-lg">{`MO-${idMovement.toString().padStart(3, '0')}`}</h3>
          <div className="h-5 w-[2px] bg-lightW/30"></div>
          <h3 className="font-bold text-lg">{productName}</h3>
        </div>
        <TransitionsModalMovements id={idMovement}/>
      </div>

      <div className="flex gap-2 items-center">
        <div className="size-10 flex rounded-full bg-primary font-black justify-center items-center">
        </div>
        <p className="text-sm text-light/30 text-lightW/50 font-semibold">{userName}</p>
        <div className="rounded-full size-2 bg-lightW/50 group-hover:bg-[#B4FFFF] transition duration-300"></div>
        <p className="font-semibold text-lightW/70 text-sm">
          Quantidade Atual: <span className="text-lightW/70">{quantity}</span>
        </p>
        <div className="rounded-full size-2 bg-lightW/50 group-hover:bg-[#B4FFFF] transition duration-300"></div>
        <p className="font-bold flex gap-1 items-center text-lightW/50 text-sm">Almoxarifado <BiArrowFromLeft size={20} className='group-hover:text-[#B4FFFF] transition duration-300'/>{userSector}</p>
      </div>

      <div className="bg-blackSecondary flex items-center w-full p-1 gap-5 rounded-lg">
        <div className="flex flex-col w-[50%] px-5 h-12 mt-3 items-center">
          <div className="flex justify-between w-full h-[5px] bg-primary rounded-full group-hover:bg-[#B4FFFF] transition duration-300 mt-3">
            <div className="-mt-4 flex items-center justify-center h-[36px] w-[44px] bg-blackSecondary rounded-full text-primary">
              <FaTruckMoving size={25} className={status === 'Em Espera' ? 'text-primary group-hover:text-[#B4FFFF] transition duration-300' : 'text-lightW'}/>
            </div>
            <div className="-mt-4 flex items-center justify-center h-[36px] w-[44px] bg-blackSecondary rounded-full">
              <GiConfirmed size={25} className={status === 'entregue' ? 'text-primary group-hover:text-[#B4FFFF] transition duration-300' : 'text-lightW'} />
            </div>
          </div>
          <p className="text-sm mt-2 font-bold">{status}</p>
        </div>
        <div className="h-5 w-[2px] -ml-6 bg-lightW/30"></div>
        <span className='flex items-center gap-2'>
          <p className='font-bold'>Data de criação:</p>
          <p className="text-sm font-bold text-lightW/50">{new Date(date).toLocaleDateString()}</p>
        </span>

      </div>
      
    </div>
  );
};

export default MovementCard;
