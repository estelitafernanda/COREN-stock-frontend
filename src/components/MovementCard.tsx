'use client';
import React from 'react';
import { FaReceipt, FaTruckMoving } from 'react-icons/fa6';
import { GiConfirmed } from 'react-icons/gi';
import { GrValidate } from 'react-icons/gr';
import TransitionsModalMovement from './TransitionsModalMovement';

// Interface para tipagem das props
interface MovementProps {
  idMovement: number;
  quantity: number;
  movementStatus: string;
  product: string;
  productQuantity: number;
  userName: string;
  userSector: string;
  requestDescribe: string;
}

function MovementCard({
  idMovement,
  quantity,
  movementStatus,
  product,
  productQuantity,
  userName,
  userSector,
  requestDescribe
}: MovementProps) {
  return (
    <div className="border group border-transparent hover:border-primary transition duration-300 flex flex-col bg-blackSecondary gap-3 p-5 rounded-lg h-auto">
      <div className="flex justify-between items-center">
        <div className='flex items-center gap-3'>
          <h3 className="text-lg font-bold">{idMovement}</h3>
          <div className='h-5 w-[2px] bg-lightW/30'></div>
          <h3 className="text-lg font-bold">{quantity}</h3>
          <div className='h-5 w-[2px] bg-lightW/30'></div>
          <h3 className="text-lg font-bold">{product}</h3>
        </div>
        <TransitionsModalMovement />
      </div>

      <div className="flex gap-2 items-center">
        <div className='size-10 flex rounded-full bg-primary justify-center items-center'></div>
        <p className="text-sm text-light/30 text-lightW/50 font-semibold">{userName}</p>
        <div className="rounded-full size-2 bg-lightW/50 group-hover:bg-[#B4FFFF] transition duration-300"></div>
        <p className="font-semibold text-lightW/70 text-sm">
          {userSector}
          <span className="text-lightW/70">
            <span className="text-primary group-hover:text-[#B4FFFF] transition duration-300"> -&gt; </span>
            {userSector}
          </span>
        </p>
        <div className="rounded-full size-2 bg-lightW/50 group-hover:bg-[#B4FFFF] transition duration-300"></div>
        <p className="font-semibold text-lightW/50 text-sm">{movementStatus}</p>
        <div className="rounded-full size-2 bg-lightW/50 group-hover:bg-[#B4FFFF] transition duration-300"></div>
        <p className="font-semibold text-lightW/50 text-sm">{productQuantity}</p>
      </div>

      <div className='bg-blackThirdy w-full h-full p-3 rounded-lg'>
        <span className='flex items-center gap-2'>
          <p className='text-sm font-bold'>{requestDescribe}</p>
          <div className='h-5 w-[2px] bg-lightW/30'></div>
          <p className='text-sm font-bold text-lightW/50'>{new Date().toLocaleDateString()}</p>
        </span>
        <div className='flex flex-col w-full px-5 py-2 h-12 mt-3 items-center'>
          <div className='flex justify-between w-full h-[5px] bg-primary rounded-full group-hover:bg-[#B4FFFF] transition duration-300 mt-3'>
            <div className='-mt-4 flex items-center justify-center h-[36px] w-[44px] bg-blackThirdy rounded-full'>
              <FaReceipt size={25} />
            </div>
            <div className='-mt-4 flex items-center justify-center h-[36px] w-[44px] bg-blackThirdy rounded-full'>
              <GrValidate size={25} />
            </div>
            <div className='-mt-4 flex items-center justify-center h-[36px] w-[44px] bg-blackThirdy group-hover:text-[#B4FFFF] transition duration-300 rounded-full text-primary'>
              <FaTruckMoving size={25} />
            </div>
            <div className='-mt-4 flex items-center justify-center h-[36px] w-[44px] bg-blackThirdy rounded-full'>
              <GiConfirmed size={25} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovementCard;
