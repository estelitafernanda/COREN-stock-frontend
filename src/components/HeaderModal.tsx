import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';
import { ImExit } from 'react-icons/im';

// Define as props que o HeaderModal vai receber
interface HeaderModalProps {
  handleClose: () => void;
}

const HeaderModal: React.FC<HeaderModalProps> = ({ handleClose }) => {
  return (
    <div className='flex justify-between w-full max-h-min items-center'>
      <div
        className='cursor-pointer relative flex items-center justify-center size-11 rounded-xl bg-white/10 hover:text-yellow transition duration-300'
        onClick={handleClose}
      >
        <ImExit size={20} />
      </div>
      <div className='flex gap-5'>
        <a href="forms/movementform">
          <button className="group font-bold flex gap-2 py-2 border-[2px] border-transparent text-lightW bg-white/10 px-8 rounded-lg hover:text-green hover:border-green transition duration-300 w-full">
            Editar
            <FaEdit className='group-hover:text-green transition duration-300' size={20} />
          </button>
        </a>
        <a href="forms/movementform">
          <button className="cursor-pointer relative flex items-center justify-center size-11 rounded-xl bg-white/10 hover:text-red transition duration-300">
            <FaTrash size={20} />
          </button>
        </a>
      </div>
    </div>
  );
};

export default HeaderModal;