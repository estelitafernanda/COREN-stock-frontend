'use client';

import React, { useState, useEffect } from 'react';
import { FaHeadset } from 'react-icons/fa6';
import { IoIosAdd } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import ProductCard from '@/components/ProductCard';
import Loading from '@/components/Loading';
import Pagination from '@/components/Pagination';


interface Product {
  idProduct: number;
  code: string;
  idDepartment: number;
  nameProduct: string;
  category: string;
  describe: string;
  minQuantity: number;
  currentQuantity: number;
  location: string;
  validity: string;
  unitPrice: number;
  image: string;
  created_at: string | null;
  updated_at: string | null;
}

interface ApiResponse {
  current_page: number;
  data: Product[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

const Inventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchProducts = (page: number) => {
    setLoading(true);
    axios.get<ApiResponse>(`http://127.0.0.1:8000/products?page=${page}`)
      .then(response => {
        setProducts(response.data.data);
        setTotalPages(response.data.last_page);
        setCurrentPage(response.data.current_page);
        setLoading(false);
      })
      .catch(error => {
        setError('Erro ao carregar os dados da API');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <div className="mx-auto w-[95vw] mt-7 flex flex-col justify-center min-h-full font-[family-name:var(--font-geist-sans)]">
      
      <div className="flex justify-between w-full">
        <div className='flex items-center gap-5'>
          <h1 className="text-3xl font-bold text-lightW">Inventario</h1>
          <p className='text-sm font-bold text-lightW/30 bg-lightW/10 px-3 py-1 rounded-full border border-lightW/30'>Total de produtos: <span className='text-lightW'>{products.length}</span></p>
        </div>
        <div className=' flex items-center bg-blackSecondary border border-lightW/30 p-5 rounded-lg w-[30%] h-3 gap-2'>
          <FaSearch size={20} className='text-lightW/30'/>
          <p className='text-sm font-bold text-lightW/30'>buscar</p>
        </div>
        <div className="flex gap-4">
          <button className="hover:bg-primary group hover:text-lightW flex gap-1 border-[1px] border-primary py-2 px-5 rounded-lg text-primary text-md font-semibold transition duration-300">
            <FaHeadset size={20} className="hover:text-lightW"/> Contato com suporte
          </button>
          <a href="/forms/product">
            <button className="border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary">Adicionar Produto <IoIosAdd size={20}/></button>
          </a>

        </div>
      </div>

      <section className='h-[80vh] flex gap-5 mt-5'>
      <div className='flex flex-col gap-8 bg-blackSecondary w-[25%] p-5 rounded-lg'>
          <div> 
            <h2 className='text-sm uppercase tracking-widest font-bold text-lightW/50'>Tipo de produto</h2>
            <div className='grid grid-cols-2 gap-3 py-3'>
              <button className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                Todos
                <span className='group-hover:bg-primary text-sm bg-primary/50 text-lightW px-2 rounded-full transition duration-300'>
                  {products.length}
                </span>                
              </button>
              <button className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                Alimentos
                <span className='group-hover:bg-primary text-sm bg-primary/50 text-lightW px-2 rounded-full transition duration-300'>
                  78
                </span>                
              </button>
              <button className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                Escritório
                <span className='group-hover:bg-primary text-sm bg-primary/50 text-lightW px-2 rounded-full transition duration-300'>
                  94
                </span>                
              </button>
              <button className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                Limpeza
                <span className='group-hover:bg-primary text-sm bg-primary/50 text-lightW px-2 rounded-full transition duration-300'>
                  178
                </span>                
              </button>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-5 bg-blackSecondary p-5 rounded-lg w-[75%]'>
          {products.map(product => (
            <ProductCard
              key={product.idProduct}
              idProduct={product.idProduct}
              name={product.nameProduct}
              category={product.category}
              image={product.image}
              stock={product.currentQuantity}
            />
          ))}
                <Pagination
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={setCurrentPage}
                />
        </div>
      </section>
    </div>
  );
}

export default Inventory;
