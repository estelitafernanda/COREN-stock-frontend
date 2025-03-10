'use client';
import React from 'react';
import { FaReceipt, FaTruckMoving } from 'react-icons/fa6';
import { GiConfirmed } from 'react-icons/gi';
import { GrValidate } from 'react-icons/gr';
import { BiArrowFromLeft, BiArrowFromRight,} from 'react-icons/bi';
import TransitionsModalMovements from './TransitionsModalMovement';
import { get } from 'http';

interface MovementCardProps {
  idMovement: number;
  idRequest: number;
  quantity: number;
  date: string;
  type: string;
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
  type,
}) => {

    function getInitials(nameAbrev: string): string {
      const words = nameAbrev.split(' ');
      const initials = words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('');
      return initials;
    }

  return (
    <div className={status == "Em Espera"? 'border group border-transparent hover:border-yellow transition duration-300 flex flex-col bg-blackThirdy gap-3 p-5 rounded-lg': 'border group border-transparent hover:border-green transition duration-300 flex flex-col bg-blackThirdy gap-3 p-5 rounded-lg'}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 md:gap-3">
          <h3 className="font-bold text-sm xl:text-lg">{`MO-${idMovement.toString().padStart(3, '0')}`}</h3>
          <div className="h-5 w-[2px] bg-lightW/30"></div>
          <h3 className="font-bold text-sm xl:text-lg">{productName}</h3>
        </div>
        <TransitionsModalMovements id={idMovement}/>
      </div>

      <div className="flex gap-2 items-center">
        <div className="w-8 h-8 md:size-10 flex rounded-full bg-blackSecondary font-black justify-center items-center text-xs xl:text-base">
          {getInitials(userName)}
        </div>
        <p className="text-xs xl:text-base text-light/30 text-lightW/50 font-semibold">{userName}</p>
        <div className={status === "Em Espera" ? "rounded-full size-2 bg-lightW/50 group-hover:bg-yellow transition duration-300 hidden md:flex" : "rounded-full size-2 bg-lightW/50 group-hover:bg-green transition duration-300 hidden md:flex"}></div>
        <p className="font-semibold text-lightW/70 text-sm  hidden md:flex">
          Quantidade Atual: <span className="text-lightW/70">{quantity}</span>
        </p>
        <div className={status === "Em Espera" ? "rounded-full size-2 bg-lightW/50 group-hover:bg-yellow transition duration-300" : "rounded-full size-2 bg-lightW/50 group-hover:bg-green transition duration-300"}></div>
        <p className="font-bold flex gap-1 items-center text-lightW/50 text-xs xl:text-base">
          {type === 'Saida' ? (
            <>
              Almoxarifado <BiArrowFromLeft size={20} className={status === "Em Espera" ? 'group-hover:text-yellow transition duration-300 text-sm xl:text-base' : 'group-hover:text-[#7bfdb1] transition duration-300 text-sm xl:text-base'} /> {userSector}
            </>
          ) : type === 'Entrada' ? (
            <>
              {userSector} <BiArrowFromLeft size={20} className={status === 'Em Espera' ? 'group-hover:text-blue transition duration-300' : 'group-hover:text-purple transition duration-300'} /> Almoxarifado
            </>
          ) : (
            <span>Tipo inválido</span> 
          )}
        </p>
        <div className={status === "Em Espera" ? "rounded-full size-2 bg-lightW/50 group-hover:bg-yellow transition duration-300 hidden md:flex" : "rounded-full size-2 bg-lightW/50 group-hover:bg-green transition duration-300 hidden md:flex"}></div>
        <p className="font-semibold text-lightW/70 text-sm  hidden md:flex">
          Tipo: <span className="text-lightW/70">{type}</span>
        </p>
      </div>

      <div className="bg-blackSecondary flex items-center w-full p-1 gap-5 rounded-lg">
        <div className="flex flex-col w-full md:w-[50%] px-5 h-12 mt-3 items-center">
          <div className={status === 'Em Espera' ? "flex justify-between w-full h-[5px] bg-yellow rounded-full  transition duration-300 mt-3 " : "flex justify-between w-full h-[5px] bg-green rounded-full  transition duration-300 mt-3"}>
            <div className="-mt-4 flex items-center justify-center h-[36px] w-[44px] bg-blackSecondary rounded-full text-primary">
              <FaTruckMoving className={status === 'Em Espera' ? 'text-yellow transition duration-300 size-5 md:size-7' : 'size-5 text-lightW/60 md:size-7'}/>
            </div>
            <div className="-mt-4 flex items-center justify-center h-[36px] w-[44px] bg-blackSecondary rounded-full">
              <GiConfirmed size={25} className={status === 'entregue' ? 'text-green group-hover:text-green transition duration-300 size-5 md:size-7' : 'size-5 md:size-7 text-lightW/60'} />
            </div>
          </div>
          <p className="text-xs md:text-sm mt-2 font-bold">{status}</p>
        </div>
        <div className="hidden md:flex h-5 w-[2px] -ml-6 bg-lightW/30"></div>
        <span className='hidden md:flex items-center gap-2'>
          <p className='font-bold'>Data de criação:</p>
          <p className="text-sm font-bold text-lightW/50">{new Date(date).toLocaleDateString()}</p>
        </span>

      </div>
      
    </div>
  );
};

export default MovementCard;