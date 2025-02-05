'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeadset, FaSearch } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import { MdArrowDropDown } from 'react-icons/md';
import MovementCard from '@/components/MovementCard';
import Pagination from '@/components/Pagination';

interface Movement {
  idMovement: number;
  quantity: number;
  movementDate: string;
  movementStatus: string;
  idUserResponse: number | null;
  idRequest: number;
  product_name: string;
  currentQuantity: number;
  user_name_request: string;
  user_sector: string;
  request_describe: string;
}

export default function Movements() {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalMovements, setTotalMovements] = useState<number>(0);
  
  const [filters, setFilters] = useState({
    product_name: '',
    movementStatus: '',
    user_name_request: '',
    movementDate: '',
  });

  const [tempFilters, setTempFilters] = useState({ ...filters }); 

  const handleTempFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    setCurrentPage(1); // Resetando para a primeira página (debug)
  };

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState([
    'pendente',
    'aceito',
    'entregue',
    'negado',
  ]);

  useEffect(() => {
    const fetchMovements = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/showMovement`, {
          params: {
            page: currentPage,
            product_name: filters.product_name,
            movementStatus: filters.movementStatus,
            user_name_request: filters.user_name_request,
            movementDate: filters.movementDate,
          },
        });

        const { data, current_page, last_page, total } = response.data;

        setMovements(data);
        setCurrentPage(current_page);
        setTotalPages(last_page);
        setTotalMovements(total);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar movimentos:', error);
        setIsLoading(false);
      }
    };

    fetchMovements();
  }, [currentPage, filters]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const productResponse = await axios.get('http://127.0.0.1:8000/api/productFiltered');
        setProducts(productResponse.data);

        const userResponse = await axios.get('http://127.0.0.1:8000/api/users');
        setUsers(userResponse.data);
      } catch (error) {
        console.error('Erro ao buscar opções de filtro:', error);
      }
    };

    fetchOptions();
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mx-auto w-[95vw] mt-7 flex flex-col justify-center min-h-full font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-5">
          <h1 className="text-3xl font-bold text-lightW">Movimentação:</h1>
          <p className="text-sm font-bold text-lightW/30 bg-lightW/10 px-3 py-1 rounded-full border border-lightW/30">
            Total de movimentos: <span className="text-lightW">{movements.length}</span>
          </p>
        </div>
        <div className="flex items-center bg-blackSecondary border border-lightW/30 p-5 rounded-lg w-[30%] h-3 gap-2">
          <FaSearch size={20} className="text-lightW/30" />
          <p className="text-sm font-bold text-lightW/30">buscar</p>
        </div>
        <div className="flex gap-4">
          <button className="hover:bg-primary group hover:text-lightW flex gap-1 border-[1px] border-primary py-2 px-5 rounded-lg text-primary text-md font-semibold transition duration-300">
            <FaHeadset size={20} className="hover:text-lightW" /> Contato com suporte
          </button>
          <a href="/forms/request">
            <button className="border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary">
              Fazer Requisição <IoIosAdd size={20} />
            </button>
          </a>
        </div>
      </div>

      <section className="h-[80vh] flex gap-5 mt-5">
        <div className="flex flex-col gap-4 bg-blackSecondary w-[30%] p-5 rounded-lg">
          <div className='flex flex-col gap-2 font-bold'>
            <label htmlFor="movementStatus">Status:</label>
            <select
              name="movementStatus"
              value={tempFilters.movementStatus} onChange={handleTempFilterChange}
              className="hover:border-primary w-[100%] bg-blackSecondary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300"
            >
              <option value="">Escolha um status</option>
              {statuses.map((status, index) => (
                <option key={index} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className='flex flex-col gap-2 font-bold'>
            <label htmlFor="product_name">Produto:</label>
            <select
              name="product_name"
              value={tempFilters.product_name} onChange={handleTempFilterChange}
              className="hover:border-primary w-[100%] bg-blackSecondary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300"
            >
              <option value="">Escolha um produto</option>
              {products.map((product: any) => (
                <option key={product.idProduct} value={product.nameProduct}>
                  {product.nameProduct}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col gap-2 font-bold'>
            <label htmlFor="user_name_request">Usuário:</label>
            <select
              name="user_name_request"
              value={tempFilters.user_name_request} onChange={handleTempFilterChange}
              className="hover:border-primary w-[100%] bg-blackSecondary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300"
            >
              <option value="">Escolha um usuário</option>
              {users.map((user: any) => (
                <option key={user.idUser} value={user.nameUser}>
                  {user.nameUser}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col gap-2 font-bold'>
            <label htmlFor="movementDate">Data:</label>
            <input
              className='w-[100%] rounded-lg font-medium h-10 bg-transparent border-[2px] border-lightW/30 px-3'
              type="date"
              name="movementDate"
              value={tempFilters.movementDate} onChange={handleTempFilterChange}
            />
          </div>

          <div className='flex gap-3'>
                <button
                  className='border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary'
                  onClick={applyFilters}
                >
                  Filtrar
                </button>
                <button
                  className='border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary'
                  onClick={() => setFilters({ product_name: '', movementStatus: '', user_name_request: '', movementDate: '' })}
                >
                  Limpar Filtros
                </button>
            </div>
        </div>

        <div className="flex flex-col gap-4 w-full bg-blackSecondary p-5 rounded-lg">
          {isLoading ? (
            <p className="text-lightW text-center">Carregando movimentos...</p>
          ) : movements.length > 0 ? (
            movements.map((movement) => (
              <MovementCard
                key={movement.idMovement}
                id={movement.idMovement}
                idRequest={movement.idRequest}
                userSector={movement.user_sector}
                quantity={movement.quantity}
                date={movement.movementDate}
                status={movement.movementStatus}
                productName={movement.product_name}
                currentQuantity={movement.currentQuantity}
                userName={movement.user_name_request}
                requestDescription={movement.request_describe}
              />
            ))

          ) : (
            <p className="text-lightW text-center">Nenhum movimento encontrado.</p>
          )}
          <div className='-mt-3'>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </div>
      </section>
    </div>
  );
}
