"use client";
import React, { useState, useEffect } from "react";
import { FaHeadset } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import SupplierCard from "@/components/SupplierCard";
import Pagination from "@/components/Pagination";
import { Autocomplete, TextField } from "@mui/material";
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

function Suppliers() {
  const api = useApiWithAuth(); // instância do hook
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
    product_name: '',
    telephone: '',
    address: '',
    responsible: '',
    cnpj: '',
    email: '',
  });

  const [tempFilters, setTempFilters] = useState({ ...filters }); // Filtros temporários
  const [products, setProducts] = useState<Product[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleProductChange = (e: React.ChangeEvent<{}>, value: Product | null) => {
    setTempFilters(prev => ({
      ...prev,
      product_name: value?.nameProduct || '',
      product_id: value?.idProduct.toString() || ''
    }));
  };

  const applyFilters = () => {
    setFilters(tempFilters); // Aplica os filtros temporários aos filtros principais
    setCurrentPage(1); // Resetar a página para 1
  };

  const clearFilters = () => {
    const initialFilters = {
      name: '',
      product_id: '',
      product_name: '',
      telephone: '',
      address: '',
      responsible: '',
      cnpj: '',
      email: '',
    };
    setFilters(initialFilters); // Limpa os filtros principais
    setTempFilters(initialFilters); // Limpa os filtros temporários
    setCurrentPage(1); // Resetar a página para 1
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      setLoading(true);
      try {
        const response = await api.get(`http://127.0.0.1:8000/api/showSuppliers`, {
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
        setError('Erro ao buscar fornecedores');
      }
    };

    fetchSuppliers();
  }, [api, currentPage, filters, search]);

  useEffect(() => {
    api.get<Product[]>('http://127.0.0.1:8000/api/productFiltered')
      .then((response) => setProducts(response.data))
      .catch(() => setError('Erro ao carregar os produtos'));
  }, [api]);

  if (error) return <div>{error}</div>;

  return (
    <div className="mx-auto w-[95vw] mt-7 flex flex-col justify-center min-h-full font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-5">
          <h1 className="text-3xl font-bold text-lightW">Fornecedores:</h1>
          <p className="text-sm font-bold text-lightW/30 bg-lightW/10 px-3 py-1 rounded-full border border-lightW/30">
            Total de fornecedores: <span className="text-lightW">{total}</span>
          </p>
        </div>
        <div className="flex items-center bg-blackSecondary border border-lightW/30 p-5 rounded-lg h-4 w-[30%] gap-2">
          <FaSearch size={20} className="text-lightW/30" />
          <input
            type="text"
            placeholder="Buscar"
            value={search}
            onChange={handleSearchChange}
            className="text-sm font-bold text-lightW/30 bg-blackSecondary outline-none w-full"
          />
        </div>
        <div className="flex gap-4">
          <button className="hover:bg-primary group hover:text-lightW flex gap-1 border-[1px] border-primary py-2 px-5 rounded-lg text-primary text-md font-semibold">
            <FaHeadset size={20} className="hover:text-lightW" /> Contato com Suporte
          </button>
          <a href="/forms/supplier">
            <button className="border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary">
              Adicionar Fornecedor <IoIosAdd size={20} />
            </button>
          </a>
        </div>
      </div>

      <section className="h-[80vh] flex gap-5 mt-5">
        <div className="flex flex-col gap-3 bg-blackSecondary w-[30%] max-h-fit p-5 rounded-lg">
          <h2 className="text-lg uppercase tracking-widest font-black text-lightW/50">Filtros:</h2>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-lg font-bold">Produtos</label>
            <Autocomplete
              options={products}
              getOptionLabel={(option) => option.nameProduct}
              value={products.find((product) => product.nameProduct === tempFilters.product_name) || null}
              onChange={handleProductChange}
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

          <div className="flex gap-2 mt-2">
            <button
              className="border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary"
              onClick={applyFilters} // Aplica os filtros ao clicar
            >
              Filtrar
            </button>
            <button
              className="border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary"
              onClick={clearFilters} // Reseta os filtros
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5 w-full bg-blackSecondary p-5 rounded-lg">
          {loading ? (
            <p className="text-lightW text-center">Carregando Fornecedores...</p>
          ) : (
            suppliers.map((supplier) => (
              <SupplierCard
                key={supplier.idSupplier}
                name={supplier.name}
                responsible={supplier.responsible}
                email={supplier.email}
                telephone={supplier.telephone}
                adress={supplier.address}
                idSupplier={supplier.idSupplier}
                produtos={supplier.products}
              />
            ))
          )}
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