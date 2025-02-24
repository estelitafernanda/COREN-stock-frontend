'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeadset, FaSearch } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import { Autocomplete, TextField } from '@mui/material';
import { useApiWithAuth } from "@/app/api/axios";
import MovementCard from '@/components/MovementCard';
import Pagination from '@/components/Pagination';

interface Product {
  idProduct: number;
  nameProduct: string;
}

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
  type: string;
}

export default function Movements() {
  const api = useApiWithAuth(); // instância do hook
  const [movements, setMovements] = useState<Movement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [total, setTotalMovements] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  
  const [filters, setFilters] = useState({
    product_name: '',
    movementStatus: '',
    user_name_request: '',
    movementDate: '',
    type: '',
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
    setCurrentPage(1); 
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState([
    'em espera',
    'aceito',
    'entregue',
    'negado',
  ]);

  useEffect(() => {
    const fetchMovements = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`http://127.0.0.1:8000/api/showMovement`, {
          params: {
            page: currentPage,
            product_name: filters.product_name,
            movementStatus: filters.movementStatus,
            user_name_request: filters.user_name_request,
            movementDate: filters.movementDate,
            type: filters.type,
            search, 
          },
        });

        const { data, current_page, last_page, total } = response.data;

        setMovements(data);
        setCurrentPage(current_page);
        setTotalPages(last_page);
        setTotalMovements(total);
        setIsLoading(false);
      } catch (error: any) {
        console.error('Erro ao buscar movimentos:', error.response ? error.response.data : error.message);
        setIsLoading(false);
      }      
    };

    fetchMovements();
  }, [api, currentPage, filters, search]);

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value); 
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
      <div className="flex flex-col md:flex-row xl:justify-between gap-4 w-full">
        <div className='flex items-center gap-2 xl:gap-5 min-w-max'>
          <h1 className="text-2xl md:text-3xl font-bold text-lightW">Movimentação:</h1>
          <p className='hidden md:flex text-sm font-bold text-lightW/30 bg-lightW/10 px-3 py-1 rounded-full border border-lightW/30'>
            Total de movimentos: <span className="text-lightW">{total}</span>
          </p>
        </div>
        <div className=' flex items-center w-full md:ml-24 bg-blackSecondary border border-lightW/30 p-5 rounded-lg xl:w-[30%] h-3 gap-2'>
          <FaSearch size={20} className='text-lightW/30'/>
            <input
              type="text"
              placeholder='Buscar' 
              value={search}
              onChange={handleSearchChange}
              className='text-sm font-bold text-lightW/30  bg-blackSecondary outline-none w-[100%]'
            />
        </div>
        <div className="gap-4 hidden xl:flex">
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

      <section className="w-full flex flex-col xl:flex-row gap-5 mt-5">
        <div className="flex flex-col max-h-fit gap-4 bg-blackSecondary w-full xl:w-[30%] p-5 rounded-lg">
          <h2 className='text-lg uppercase tracking-widest font-black text-lightW/50'>Filtros:</h2>
          <div className='flex flex-col gap-2'>
            <label htmlFor="" className='font-bold text-base xl:text-lg'>Status:</label>
            <select
              name="movementStatus"
              value={tempFilters.movementStatus} 
              onChange={handleTempFilterChange}
              className="hover:border-primary w-[100%] bg-blackSecondary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[2px] border-primary/10 py-4 px-5 rounded-lg text-light-w text-md font-light transition duration-300"
            >
              <option value="">Escolha um status</option>
              {statuses.map((status, index) => (
                <option key={index} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="" className='font-bold text-base xl:text-lg'>Tipo</label>
            <select
            name="type"
            value={tempFilters.type}
                  onChange={handleTempFilterChange}
                  className="w-[100%] hover:border-primary bg-blackSecondary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[2px] border-primary/10 py-4 px-5 rounded-[8px] text-light-w text-md font-light transition duration-300"
                >
                  <option value="">Escolha um tipo</option>
                  <option value="Entrada">Entrada</option>
                  <option value="Saida">Saida</option>
                </select>
            </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="" className='font-bold text-base xl:text-lg'>Produtos</label>
                <Autocomplete
                options={products}
                getOptionLabel={(option) => option.nameProduct}
                value={products.find((product) => product.nameProduct === tempFilters.product_name) || null}
                onChange={(event, newValue) => {
                  setTempFilters((prev) => ({
                    ...prev,
                    product_name: newValue?.nameProduct || '',
                  }));
                }}
                renderInput={(params) => <TextField {...params} label="Escolha um produto" />}
                sx={{
                  width: '100%',
                  backgroundColor: '#1a262d',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: '0.3s',
                  '&:hover': {
                    borderColor: '#00bcd4',
                    backgroundColor: '#202e36',
                  },
                  '& .MuiOutlinedInput-root': {
                    color: '#eceef0',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#00bcd4',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00bcd4',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#eceef0',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#00bcd4',
                  },
                }}
              />
              </div>
            
              <div className='flex flex-col gap-2'>
                <label htmlFor="" className='font-bold text-base xl:text-lg'>Usuários</label>
                <Autocomplete
                options={users}
                getOptionLabel={(option) => option.nameUser} 
                value={tempFilters.user_name_request ? { nameUser: tempFilters.user_name_request } : null}
                onChange={(event, newValue) => {
                  setTempFilters((prev) => ({
                    ...prev,
                    user_name_request: newValue?.nameUser || '',  
                  }));
                }}
                renderInput={(params) => <TextField {...params} label="Escolha um usuário" />}
                sx={{
                  width: '100%',
                  backgroundColor: '#1a262d',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: '0.3s',
                  '&:hover': {
                    borderColor: '#00bcd4',
                    backgroundColor: '#202e36',
                  },
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#00bcd4',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00bcd4',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#eceef0',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#00bcd4',
                  },
                }}
              />
              </div>
          


          <div className='flex gap-3'>
                <button
                  className='border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-sm xl:text-base font-semibold text-blackPrimary'
                  onClick={applyFilters}
                >
                  Filtrar
                </button>
                <button
                  className='border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-sm xl:text-base font-semibold text-blackPrimary'
                  onClick={() => {
                    setFilters({
                      product_name: '',
                      movementStatus: '',
                      user_name_request: '',
                      movementDate: '',
                      type: '', 
                    });
                    setTempFilters({
                      product_name: '', 
                      movementStatus: '',
                      user_name_request: '', 
                      movementDate: '',
                      type: '', 
                    });
                  }}
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
                idMovement={movement.idMovement}
                idRequest={movement.idRequest}
                userSector={movement.user_sector}
                quantity={movement.quantity}
                date={movement.movementDate}
                status={movement.movementStatus}
                productName={movement.product_name}
                currentQuantity={movement.currentQuantity}
                userName={movement.user_name_request}
                requestDescription={movement.request_describe}
                type={movement.type}
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