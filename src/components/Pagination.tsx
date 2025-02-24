import React from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const isPrevDisabled = currentPage === 1;
    const isNextDisabled = currentPage === totalPages;
  
    return (
      <div className="flex gap-5 justify-center md:justify-normal items-center mt-2">
        <button
          className={`px-5 py-2 rounded-lg text-blackPrimary bg-primary border-transparent ${isPrevDisabled ? "border gap-1 items-center hover:border-primary bg-lightW transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary" : "border gap-1 items-center hover:border-primary bg-lightW transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary"}`}
          onClick={() => onPageChange(currentPage - 1)} // TypeScript já sabe que currentPage é um número
          disabled={isPrevDisabled}
        >
          <FaLongArrowAltLeft size={20} className='text-light'/>
        </button>
        <span className="text-lightW text-sm xl:text-base">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className={`px-5 py-2 rounded-lg text-blackPrimary bg-primary border-transparent  ${isNextDisabled ? 'border gap-1 items-center hover:border-primary bg-lightW transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary' : 'border gap-1 items-center hover:border-primary bg-lightW transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary'}`}
          onClick={() => onPageChange(currentPage + 1)} // Também está tipado corretamente
          disabled={isNextDisabled}
        >
          <FaLongArrowAltRight size={20} className='text-light'/>
        </button>
      </div>
    );
  };

export default Pagination;
