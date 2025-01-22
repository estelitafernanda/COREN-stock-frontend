'use client';
import React, { useEffect, useState } from 'react';
import { FaHeadset, FaSearch, FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import MovementCard from '@/components/MovementCard';
import Loading from '@/components/Loading';
import axios from 'axios';
import { MdArrowDropDown } from 'react-icons/md';

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
    links: Array<{ url: string | null; label: string; active: boolean }>;
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
    const [lastPage, setLastPage] = useState<number>(1);
    const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
    const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);
    const [total, setTotal] = useState<number>(0);

    const fetchMovements = async (url: string) => {
        if (!url) return; 
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get<ApiResponse>(url);
            const data = response.data;
            setMovements(data.data || []);
            setTotal(data.total || 0);
            setCurrentPage(data.current_page || 1);
            setLastPage(data.last_page || 1);
            setNextPageUrl(data.next_page_url);
            setPrevPageUrl(data.prev_page_url);
        } catch (error) {
            setMovements([]);
            setError('Erro ao carregar os dados da API.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovements('http://127.0.0.1:8000/api/showMovement');
    }, []);

    if (loading) return <Loading />;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="mx-auto w-[95vw] mt-7 flex flex-col gap-5 justify-center min-h-full font-sans">
            <div className="flex justify-between w-full">
                <div className="flex items-center gap-5">
                    <h1 className="text-3xl font-bold text-lightW">Movimentações:</h1>
                    <p className="text-sm font-bold text-lightW/30 bg-lightW/10 px-3 py-1 rounded-full border border-lightW/30">
                        Total de movimentações: <span className="text-lightW">{total}</span>
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
                    <div className="flex flex-col gap-4 px-4 pt-4">
                        {Array.isArray(movements) && movements.length > 0 ? (
                                movements.map((movement, index) => (
                                    <MovementCard
                                        key={index}
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
                                <p className="text-center text-gray-500">Nenhuma movimentação encontrada.</p>
                            )}
                        </div>
                        <div className="flex gap-10 justify-center items-center mt-3">
                            <button
                                onClick={() => prevPageUrl && fetchMovements(prevPageUrl)}
                                disabled={!prevPageUrl}
                                className={`px-5 py-2 rounded-lg ${
                                    prevPageUrl
                                        ? 'border gap-1 hover:border-primary bg-lightW hover:bg-transparent hover:text-primary text-blackPrimary'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                <FaLongArrowAltLeft size={20} />
                            </button>
                            <p className="text-lightW text-md font-bold">
                                Página {currentPage} de {lastPage}
                            </p>
                            <button
                                onClick={() => nextPageUrl && fetchMovements(nextPageUrl)}
                                disabled={!nextPageUrl}
                                className={`px-5 py-2 rounded-lg ${
                                    nextPageUrl
                                        ? 'border gap-1 hover:border-primary bg-lightW hover:bg-transparent hover:text-primary text-blackPrimary'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                <FaLongArrowAltRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
