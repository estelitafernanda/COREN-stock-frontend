'use client';
import React, { useEffect, useState } from 'react'
import { FaHeadset } from 'react-icons/fa6'
import { IoIosAdd } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { GrValidate } from "react-icons/gr";
import { FaTruckMoving } from "react-icons/fa6";
import { MdArrowDropDown } from "react-icons/md";
import Image from 'next/image';
import { FaReceipt, FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import Avatar from  "../../../public/memoji.png";
import DepartmentCard from '@/components/DepartmentCard';
import RequestCard from '@/components/RequestCard';
import axios from 'axios';
import Loading from '@/components/Loading';


interface Request {
    idRequest: number;
    describe: string;
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

export default function Order() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);

  const fetchRequests = (url: string) => {
    setLoading(true);
    axios
      .get<ApiResponse>(url)
      .then((response) => {
        const data = response.data;
        setRequests(data.data);
        setTotal(data.total);
        setCurrentPage(data.current_page);
        setLastPage(data.last_page);
        setNextPageUrl(data.next_page_url);
        setPrevPageUrl(data.prev_page_url);
        setLoading(false);
      })
      .catch(() => {
        setError('Erro ao carregar os dados da API');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRequests('http://127.0.0.1:8000/api/showRequests');
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }
  
  return (
    <div className="mx-auto w-[95vw] mt-7 flex flex-col gap-5 justify-center min-h-full font-[family-name:var(--font-geist-sans)]">
        <div className="flex justify-between w-full">
            <div className='flex items-center gap-5'>
                <h1 className="text-3xl font-bold text-lightW">Pedidos:</h1>
                <p className='text-sm font-bold text-lightW/30 bg-lightW/10 px-3 py-1 rounded-full border border-lightW/30'>Total de pedidos: <span className='text-lightW'>{ total}</span></p>
            </div>
            <div className=' flex items-center bg-blackSecondary border border-lightW/30 p-5 rounded-lg w-[30%] h-3 gap-2'>
                <FaSearch size={20} className='text-lightW/30'/>
                <p className='text-sm font-bold text-lightW/30'>buscar</p>
            </div>
            <div className="flex gap-4">
            <button className="hover:bg-primary group hover:text-lightW flex gap-1 border-[1px] border-primary py-2 px-5 rounded-lg text-primary text-md font-semibold transition duration-300">
                <FaHeadset size={20} className="hover:text-lightW"/> Contato com suporte
            </button>
            <a href="/forms/request">
            <button className="border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary">Adicionar Pedido <IoIosAdd size={20}/></button>
            </a>
            </div>
        </div>

        <section className='h-[80vh] w-full flex gap-5 mt-5'>

          <div className='flex flex-col gap-8 bg-blackSecondary w-[30%] h-full p-5 rounded-lg'>
            <div className='flex flex-col'> 
                <h2 className='text-sm uppercase tracking-widest font-bold text-lightW/50'>Filtrar por</h2>
                <div className='grid gap-3 py-3'>
                    <select className="hover:border-primary bg-blackSecondary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                      <option>PRODUTO</option>
                      <option>produto 1</option>
                      <option>produto 2</option>
                      <option>produto 3</option>
                    </select>
                    <button className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                    Data de Pedido
                    <MdArrowDropDown size={20}/>
                    </button>
                    <button className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                    Produto
                    <MdArrowDropDown size={20}/>
                    </button>
                    <button className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                    Status
                    <MdArrowDropDown size={20}/>
                    </button>
                </div>
            </div>
       
            </div>
            <div className='flex flex-col w-full'>
              <div className='flex flex-col w-full bg-blackSecondary relative h-full rounded-lg '>
                <div className='flex flex-col gap-4 px-4 pt-4'>
                  {requests.map((request, index)=>(
                      <RequestCard idRequest={request.idRequest} key={index} product={request.product_name} department={request.sector_name} userName={request.user_name} desc={request.describe} date={request.requestDate} qnt={request.quantity}/>
                  ))}
                </div>

                <div className="flex gap-10 justify-center items-center mt-3 bottom-0">
                  <button
                    onClick={() => prevPageUrl && fetchRequests(prevPageUrl)}
                    disabled={!prevPageUrl}
                    className={`px-5 py-2 rounded-lg ${
                      prevPageUrl ? 'border gap-1 items-center hover:border-primary bg-lightW transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary' : 'border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary'
                    }`}
                  >
                    <FaLongArrowAltLeft size={20} className='text-light'/>
                  </button>
                  <p className="text-lightW text-md font-bold">
                    Página {currentPage} de {lastPage}
                  </p>
                  <button
                    onClick={() => nextPageUrl && fetchRequests(nextPageUrl)}
                    disabled={!nextPageUrl}
                    className={`px-5 py-2 rounded-lg ${
                      nextPageUrl ? 'border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary' : 'border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary'
                    }`}
                  >
                    <FaLongArrowAltRight size={20} className='text-light'/>
                  </button>
                </div>
              </div>

              
            </div>
        </section>

    </div>
  )
}

