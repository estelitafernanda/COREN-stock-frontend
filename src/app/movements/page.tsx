'use client';
import React, { useEffect, useState } from 'react';
import { FaHeadset, FaSearch,} from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import MovementCard from '@/components/MovementCard';
import Loading from '@/components/Loading';
import axios from 'axios';
import { MdArrowDropDown } from 'react-icons/md';
import Pagination from '@/components/Pagination';

interface Movement {
    idMovement: number;
    quantity: number;
    movementDate: string | null;
    movementStatus: string;
    user_name_request: string;
    user_sector: string;
    idUserReponse: number | null;
    idRequest: number;
    request_describe: string;
    product_name: string;
    currentQuantity: number;
}

interface ApiResponse {
    current_page: number;
    data: Movement[];
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

export default function Movement() {
    const [movements, setMovements] = useState<Movement[]>([]); 
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null); 
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchMovements= (page: number) => {
        setLoading(true);
        axios.get<ApiResponse>('http://127.0.0.1:8000/api/showMovement')
          .then(response => {
            console.log('Dados retornados da API:', response.data);
            setMovements(response.data.data);
            setTotalPages(response.data.last_page);
            setCurrentPage(response.data.current_page);
            setLoading(false);
          })
          .catch(error => {
            console.error('Erro ao carregar dados:', error);
            setError('Erro ao carregar os dados da API');
            setLoading(false);
          });
      };
    
      useEffect(() => {
        fetchMovements(currentPage);
      }, [currentPage]);

      useEffect(() => {
        console.log(movements);  // Verifique se os dados estão sendo carregados corretamente
    }, [movements]);
    
      if (loading) {
        return <Loading />;
      }
    
      if (error) {
        return <div>{error}</div>;
      }
    

    return (
        <div className="mx-auto w-[95vw] mt-7 flex flex-col gap-5 justify-center min-h-full font-sans">
            <div className="flex justify-between w-full">
                <div className="flex items-center gap-5">
                    <h1 className="text-3xl font-bold text-lightW">Movimentações:</h1>
                    <p className="text-sm font-bold text-lightW/30 bg-lightW/10 px-3 py-1 rounded-full border border-lightW/30">
                        Total de movimentações: <span className="text-lightW"></span>
                    </p>
                </div>
                <div className="flex items-center bg-blackSecondary border border-lightW/30 p-5 rounded-lg w-[30%] h-3 gap-2">
                    <FaSearch size={20} className="text-lightW/30" />
                    <p className="text-sm font-bold text-lightW/30">Buscar</p>
                </div>
                <div className="flex gap-4">
                    <button className="hover:bg-primary group hover:text-lightW flex gap-1 border-[1px] border-primary py-2 px-5 rounded-lg text-primary text-md font-semibold transition duration-300">
                        <FaHeadset size={20} className="hover:text-lightW" /> Contato com suporte
                    </button>
                    <a href="/forms/movementform">
                        <button className="border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary">
                            Adicionar Movimento <IoIosAdd size={20} />
                        </button>
                    </a>
                </div>
            </div>
            <section className="h-[80vh] w-full flex gap-5 mt-5">
                <div className="flex flex-col gap-8 bg-blackSecondary w-[30%] h-full p-5 rounded-lg">
                    <div className='flex flex-col'> 
                        <h2 className='text-sm uppercase tracking-widest font-bold text-lightW/50'>Status de movimento</h2>
                        <div className='grid grid-cols-2 gap-3 py-3'>
                            <button className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                            Validando
                            <span className='group-hover:bg-primary text-sm bg-primary/50 text-lightW px-2 rounded-full transition duration-300'>
                            386
                            </span>                
                            </button>
                            <button className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                            Validado
                            <span className='group-hover:bg-primary text-sm bg-primary/50 text-lightW px-2 rounded-full transition duration-300'>
                            78
                            </span>                
                            </button>
                            <button className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                            Transição
                            <span className='group-hover:bg-primary text-sm bg-primary/50 text-lightW px-2 rounded-full transition duration-300'>
                            94
                            </span>                
                            </button>
                            <button className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                                Recebido
                                <span className='group-hover:bg-primary text-sm bg-primary/50 text-lightW px-2 rounded-full transition duration-300'>
                                178
                                </span>                
                            </button>
                        </div>
                        <h2 className='text-sm uppercase tracking-widest font-bold text-lightW/50'>Filtrar por</h2>
                        <div className='grid gap-3 py-3'>
                            <button className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                            Local
                            <MdArrowDropDown size={20}/>
                            </button>
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
                    <div className="flex flex-col w-full bg-blackSecondary relative h-full rounded-lg">
                        <div className='flex flex-col gap-5 bg-blackSecondary p-5 rounded-lg w-[75%]'>
                        {movements && Array.isArray(movements) && movements.length > 0 ? (
                            movements.map(movement => (
                                <MovementCard
                                key={movement.idMovement}
                                idMovement={movement.idMovement}
                                quantity={movement.quantity}
                                movementStatus={movement.movementStatus}
                                product={movement.product_name}
                                productQuantity={movement.currentQuantity}
                                userName={movement.user_name_request}
                                userSector={movement.user_sector}
                                requestDescribe={movement.request_describe}
                                />
                            ))
                            ) : (
                            <div>Não há movimentos disponíveis</div>
                        )}
                                    <Pagination
                                        currentPage={currentPage} 
                                        totalPages={totalPages} 
                                        onPageChange={setCurrentPage}
                                    />
                            </div>
                        </div>
                    </div>
            </section>
        </div>
    );
}
