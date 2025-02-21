'use client';

import React, { useState, useEffect } from 'react';
import { FaHeadset } from 'react-icons/fa6';
import { IoIosAdd } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import { useApiWithAuth } from "@/app/api/axios";

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
  const api = useApiWithAuth(); // instância do hook
  const [products, setProducts] = useState<Product[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [category, setCategory] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const fetchProducts = (page: number, category: string, search: string) => {
    setLoading(true);
    let url = `http://127.0.0.1:8000/products?page=${page}`;
  
    if (category) {
        url += `&category=${category}`;
    }
    if (search) {
        url += `&search=${search}`;
    }
    api.get<ApiResponse>(url)
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
    fetchProducts(currentPage, category, search );
  }, [api, currentPage, category, search]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setCurrentPage(1);
  };

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
          <input
            type="text"
            placeholder='Buscar' 
            value={search}
            onChange={handleSearchChange}
            className='text-sm font-bold text-lightW/30 w-[100%] bg-blackSecondary outline-none'
          />
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
      <div className="flex flex-col bg-blackSecondary w-[30%] max-h-fit p-5 rounded-lg">
            <h2 className='text-lg uppercase tracking-widest font-black text-lightW/50'>Filtros:</h2>
            <div className='grid grid-cols-2 gap-3 py-3'>
              <button 
                onClick={() => handleCategoryChange('')} 
                className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                Todos        
              </button>
              <button 
                onClick={() => handleCategoryChange('alimentos')} 
                className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                Alimentos       
              </button>
              <button 
                onClick={() => handleCategoryChange('escritorio')} 
                className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                Escritório            
              </button>
              <button onClick={() => handleCategoryChange('limpeza')} className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                Limpeza          
              </button>
            </div>
        </div>

        <div className="flex flex-col gap-4 w-full bg-blackSecondary p-5 rounded-lg">
          {loading ? (
            <p className="text-lightW text-center">Carregando Produtos...</p>
          ) : products.map(product => (
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