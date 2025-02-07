"use client";
import React, { useState, useEffect } from "react";
import { FaHeadset } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Loading from "@/components/Loading";
import SupplierCard from "@/components/SupplierCard";
import Pagination from "@/components/Pagination";

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

interface Supplier {
  idSupplier: number;
  corporateReason: string;
  name: string;
  telephone: string;
  email: string;
  responsible: string;
  cnpj: string;
  address: string;
  created_at: string | null;
  updated_at: string | null;
  products: Product[];
}

interface ApiResponse {
  current_page: number;
  data: Supplier[];
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

function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');


  const [filters, setFilters] = useState({
    name: '',
    product_id: '', 
    telephone: '',
    address: '',
    responsible: '',
    cnpj: '',
    email: '',
  });
  const [products, setProducts] = useState<Product[]>([]);
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
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value); 
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/showSuppliers`, {
          params: {
            page: currentPage,
            product_id: filters.product_id,
            search, 
          },
        });

        const { data, current_page, last_page, total } = response.data;

        setSuppliers(data);
        setCurrentPage(current_page);
        setTotalPages(last_page);
        setTotal(total);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          console.error('Erro ao buscar fornecedores:', error.response ? error.response.data : error.message);
          setError(error.response ? error.response.data : 'Erro desconhecido');
        } else {
          console.error('Erro inesperado:', error);
          setError('Erro inesperado');
        }
      } 
    };

    fetchSuppliers();
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

  useEffect(() => {
      fetchProducts();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mx-auto w-[95vw] mt-7 flex flex-col justify-center min-h-full font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-5">
          <h1 className="text-3xl font-bold text-lightW">Fornecedores:</h1>
          <p className="text-sm font-bold text-lightW/30 bg-lightW/10 px-3 py-1 rounded-full border border-lightW/30">
            Total de fornecedores:{" "}
            <span className="text-lightW">{total}</span>
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
            <FaHeadset size={20} className="hover:text-lightW" /> Contato com
            suporte
          </button>
          <a href="/forms/supplier">
            <button className="border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary">
              Adicionar Fornecedor <IoIosAdd size={20} />
            </button>
          </a>
        </div>
      </div>

      <section className="h-[80vh] flex gap-5 mt-5">
        <div className="flex flex-col gap-8 bg-blackSecondary w-[30%] p-5 rounded-lg">
              <div>
                <label htmlFor="">Produtos</label>
                <select
                  name="product_id"
                  value={tempFilters.product_id}
                  onChange={handleTempFilterChange}
                  className="w-[100%] hover:border-primary bg-blackSecondary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300"
                >
                  <option value="">Produtos</option>
                  {products.map((product) => (
                    <option key={product.idProduct} value={product.idProduct}>
                      {product.nameProduct}
                    </option>
                  ))}
                </select>
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
                      name: '',
                      product_id: '',
                      telephone: '',
                      address: '',
                      responsible: '',
                      cnpj: '',
                      email: '',
                    });
                  }}
                >
                  Limpar Filtros
                </button>
              </div>
        </div>

        <div className="flex flex-col gap-5 w-full bg-blackSecondary p-5 rounded-lg">
          {loading ? (
            <p className="text-lightW text-center">Carregando Fornecedores...</p>
          ) : suppliers.map((supplier) => (
            <SupplierCard
              key={supplier.idSupplier}
              name={supplier.name}
              responsible={supplier.responsible}
              email={supplier.email}
              telephone={supplier.telephone}
              adress={supplier.address}
              idSupplier={supplier.idSupplier}
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

export default Suppliers;
