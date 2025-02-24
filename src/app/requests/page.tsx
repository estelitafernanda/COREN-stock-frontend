'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import RequestCard from '@/components/RequestCard';
import Pagination from '@/components/Pagination';
import { FaHeadset } from 'react-icons/fa6';
import { IoIosAdd } from 'react-icons/io';
import { Autocomplete, TextField } from '@mui/material';
import { useApiWithAuth } from "@/app/api/axios";

interface Request {
  idRequest: number;
  describe: string;
  type: string; 
  created_at: string;
  quantity: number;
  product_name: string;
  user_name: string;
  sector_name: string;
}

interface ApiResponse {
  current_page: number;
  data: Request[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{ url: string | null; label: string; active: boolean }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface Product {
  idProduct: number;
  nameProduct: string;
}

interface User {
  idUser: number;
  nameUser: string; 
}

export default function Order() {
  const api = useApiWithAuth(); // instância do hook
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [search, setSearch] = useState<string>(''); 

  const [filters, setFilters] = useState({
    product_id: '',
    status: '',
    user_id: '',
    date: '',
    type: '',
    product_name: '', 
    user_name_request: '',
  });
  const [tempFilters, setTempFilters] = useState({ ...filters }); 
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);

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

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await api.get(`http://127.0.0.1:8000/api/showRequests`, {
          params: {
            page: currentPage,
            product_id: filters.product_id,
            status: filters.status,
            user_id: filters.user_id,
            date: filters.date,
            type: filters.type,
            search, 
          },
        });

        const { data, current_page, last_page, total } = response.data;

        setRequests(data);
        setCurrentPage(current_page);
        setTotalPages(last_page);
        setTotal(total);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          console.error('Erro ao buscar pedidos:', error.response ? error.response.data : error.message);
          setError(error.response ? error.response.data : 'Erro desconhecido');
        } else {
          console.error('Erro inesperado:', error);
          setError('Erro inesperado');
        }
      } 
    };

    fetchRequests();
  }, [api, currentPage, filters, search]);

  const fetchProducts = () => {
    api
      .get<Product[]>('http://127.0.0.1:8000/api/productFiltered')
      .then((response) => {
        setProducts(response.data);
      })
      .catch(() => {
        setError('Erro ao carregar os produtos');
      });
  };

  const fetchUsers = () => {
    api
      .get<User[]>('http://127.0.0.1:8000/api/users') 
      .then((response) => {
        setUsers(response.data);
      })
      .catch(() => {
        setError('Erro ao carregar os usuários');
      });
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value); 
  };
  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, [api]);



  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="mx-auto w-[95vw] mt-7 flex flex-col gap-5 justify-center min-h-full font-[family-name:var(--font-geist-sans)]">
      <div className="flex xl:justify-between w-full">
        <div className='flex items-center gap-2 xl:gap-5 min-w-max'>
          <h1 className="text-2xl md:text-3xl font-bold text-lightW">Pedidos:</h1>
          <p className='hidden md:flex text-sm font-bold text-lightW/30 bg-lightW/10 px-3 py-1 rounded-full border border-lightW/30'>
            Total de pedidos: <span className='text-lightW'>{total}</span>
          </p>
        </div>
        <div className=' flex items-center w-full ml-3 md:ml-24 bg-blackSecondary border border-lightW/30 p-5 rounded-lg xl:w-[30%] h-3 gap-2'>
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
              Fazer Pedido <IoIosAdd size={20} />
            </button>
          </a>
        </div>
      </div>

      <section className='w-full flex flex-col xl:flex-row gap-5 mt-5'>
        <div className='flex flex-col gap-8 bg-blackSecondary w-full xl:w-[30%] max-h-fit p-5 rounded-lg'>
          <div className='flex flex-col'>
            <h2 className='text-lg uppercase tracking-widest font-bold text-lightW/50'>Filtros:</h2>
            <div className='grid gap-3 py-3'>

              <div className='flex flex-col gap-1'>
                <label htmlFor="" className='font-bold text-base xl:text-lg'>Tipo</label>
                <select
                  name="type"
                  value={tempFilters.type}
                  onChange={handleTempFilterChange}
                  className="w-[100%] hover:border-primary bg-blackSecondary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[2px] border-primary/10 py-4 px-5 rounded-lg text-light-w text-base xl:text-md font-light transition duration-300"
                >
                  <option value="">Escolha um tipo</option>
                  <option value="Entrada">Entrada</option>
                  <option value="Saida">Saida</option>
                </select>
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor="" className='font-bold text-base xl:text-lg'>Status:</label>
                <select
                  name="status"
                  value={tempFilters.status}
                  onChange={handleTempFilterChange}
                  className="hover:border-primary w-[100%] bg-blackSecondary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[2px] border-primary/10 py-4 px-5 rounded-lg text-light-w text-md font-light transition duration-300"
                >
                  <option value="">Escolha um status</option>
                  <option value="aceito">aceito</option>
                  <option value="pendente">pendente</option>
                </select>
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor="user_id" className='font-bold text-base xl:text-lg'>Usuário:</label>
                <Autocomplete
                options={users}
                getOptionLabel={(option) => option.nameUser}
                value={users.find(user => user.idUser === Number(tempFilters.user_id)) || null}
                onChange={(event, newValue) => {
                  setTempFilters((prev) => ({
                    ...prev,
                    user_id: newValue ? String(newValue.idUser) : '',  
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Escolha um usuário"
                    InputLabelProps={{ shrink: params.inputProps.value ? true : false }}
                  />
                )}
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
                    fontWeight: 'bold',
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

              <div className='flex flex-col gap-1'>
                <label htmlFor="" className='font-bold text-base xl:text-lg'>Produto</label>
                <Autocomplete
                options={products}
                getOptionLabel={(option) => option.nameProduct}
                value={products.find(product => product.idProduct === Number(tempFilters.product_id)) || null}
                onChange={(event, newValue) => {
                  setTempFilters((prev) => ({
                    ...prev,
                    product_id: newValue ? String(newValue.idProduct) : '',  
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Escolha um produto"
                    InputLabelProps={{ shrink: params.inputProps.value ? true : false }}
                  />
                )}
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
              {/* 
              <div>
                <label htmlFor="date" className='font-bold text-lg'>Data:</label>
                <input
                  className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'
                  type="date"
                  name="date"
                  value={tempFilters.date}
                  onChange={handleTempFilterChange}
                />
              </div> */}

              <div className='flex gap-2 mt-2'>
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
                      product_id: '',
                      status: '',
                      user_id: '',
                      date: '',
                      type: '',
                      product_name: '', 
                      user_name_request: '',
                    });

                    setTempFilters({
                      product_id: '',
                      status: '',
                      user_id: '',
                      date: '',
                      type: '',
                      product_name: '',
                      user_name_request: '',
                    });
                  }}
                >
                Limpar Filtros
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col w-full'>
          <div className='flex flex-col w-full bg-blackSecondary relative h-full rounded-lg'>
            <div className='flex flex-col gap-4 px-4 pt-4'>
              {loading ? (
                <p className="text-lightW text-center">Carregando Pedidos ...</p>
              ) : (
                requests.map((request, index) => (
                  <RequestCard
                    idRequest={request.idRequest}
                    key={index}
                    product={request.product_name}
                    department={request.sector_name}
                    userName={request.user_name}
                    desc={request.describe}
                    date={request.created_at}
                    qnt={request.quantity}
                    type={request.type}
                  />
                ))
              )}
            </div>
            <div className='mt-2 mb-4 ml-4'>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}