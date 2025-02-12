'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import RequestCard from '@/components/RequestCard';
import Loading from '@/components/Loading';
import Pagination from '@/components/Pagination';
import { FaHeadset } from 'react-icons/fa6';
import { IoIosAdd } from 'react-icons/io';

interface Request {
  idRequest: number;
  describe: string;
  type: string; 
  requestDate: string;
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
        const response = await axios.get(`http://127.0.0.1:8000/api/showRequests`, {
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
  }, [currentPage, filters, search]);

  const fetchProducts = () => {
    axios
      .get<Product[]>('http://127.0.0.1:8000/api/productFiltered')
      .then((response) => {
        setProducts(response.data);
      })
      .catch(() => {
        setError('Erro ao carregar os produtos');
      });
  };

  const fetchUsers = () => {
    axios
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
  }, []);



  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="mx-auto w-[95vw] mt-7 flex flex-col gap-5 justify-center min-h-full font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-between w-full">
        <div className='flex items-center gap-5'>
          <h1 className="text-3xl font-bold text-lightW">Pedidos:</h1>
          <p className='text-sm font-bold text-lightW/30 bg-lightW/10 px-3 py-1 rounded-full border border-lightW/30'>
            Total de pedidos: <span className='text-lightW'>{total}</span>
          </p>
        </div>
        <div className=' flex items-center bg-blackSecondary border border-lightW/30 p-5 rounded-lg w-[30%] h-3 gap-2'>
          <FaSearch size={20} className='text-lightW/30'/>
            <input
              type="text"
              placeholder='Buscar' 
              value={search}
              onChange={handleSearchChange}
              className='text-sm font-bold text-lightW/30  bg-blackSecondary outline-none w-[100%]'
            />
        </div>
        <div className="flex gap-4">
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

      <section className='h-[80vh] w-full flex gap-5 mt-5'>
        <div className='flex flex-col gap-8 bg-blackSecondary w-[30%] h-full p-5 rounded-lg'>
          <div className='flex flex-col'>
            <h2 className='text-sm uppercase tracking-widest font-bold text-lightW/50'>Filtrar por</h2>
            <div className='grid gap-3 py-3'>

              <div>
                <label htmlFor="">Produto</label>
                <select
                  name="product_id"
                  value={tempFilters.product_id}
                  onChange={handleTempFilterChange}
                  className="w-[100%] hover:border-primary bg-blackSecondary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300"
                >
                  <option value="">Escolha um produto</option>
                  {products.map((product) => (
                    <option key={product.idProduct} value={product.idProduct}>
                      {product.nameProduct}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="">Tipo</label>
                <select
                  name="type"
                  value={tempFilters.type}
                  onChange={handleTempFilterChange}
                  className="w-[100%] hover:border-primary bg-blackSecondary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300"
                >
                  <option value="">Escolha um tipo</option>
                  <option value="Entrada">Entrada</option>
                  <option value="Saida">Saida</option>
                </select>
              </div>

              <div>
                <label htmlFor="">Status:</label>
                <select
                  name="status"
                  value={tempFilters.status}
                  onChange={handleTempFilterChange}
                  className="hover:border-primary w-[100%] bg-blackSecondary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300"
                >
                  <option value="">Escolha um status</option>
                  <option value="aceito">aceito</option>
                  <option value="pendente">pendente</option>
                </select>
              </div>

              <div>
                <label htmlFor="user_id">Usuário:</label>
              <select
                  name="user_id"
                  value={tempFilters.user_id}
                  onChange={handleTempFilterChange}
                  className="hover:border-primary w-[100%] bg-blackSecondary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300"
                >
                  <option value="">Escolha um usuário</option>
                  {users.map((user) => (
                    <option key={user.idUser} value={user.idUser} className='text-lightW'>
                      {user.nameUser}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="date">Data:</label>
                <input
                  className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'
                  type="date"
                  name="date"
                  value={tempFilters.date}
                  onChange={handleTempFilterChange}
                />
              </div>

              <div className='flex gap-2'>
                <button
                  className='border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary'
                  onClick={applyFilters} 
                >
                  Filtrar
                </button>
                <button
                  className='border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary'
                  onClick={() => {
                    setFilters({
                      product_id: '',
                      status: '',
                      user_id: '',
                      date: '',
                      type: '', 
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
                    date={request.requestDate}
                    qnt={request.quantity}
                    type={request.type}
                  />
                ))
              )}
            </div>
            <div className='mt-2 ml-4'>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
