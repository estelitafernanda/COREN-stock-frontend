'use client';
import React from 'react'
import { FaWpforms } from "react-icons/fa";
import { IoMdArrowDropleft } from "react-icons/io";
import { useState, useEffect } from 'react';
import api from '@/app/api/axios';
import axios from 'axios';

interface Product {
    idProduct: number;
    code: number;
    image:string;
    describe: string;
    nameProduct: string;
    category: string;
    currentQuantity: number;
}  

interface User{
    idUser: number;
    nameUser: number;
    email:string;
    role: string;
    password: string;
    created_at: string;
    updated_at: string;
}

function MovementForm() {

    const [users , setUsers] = useState<User[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      api.get<Product[]>('/show')  // Usando a instância api
        .then(response => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch(error => {
          setError('Erro ao carregar os dados da API');
          setLoading(false);
        });
    }, []);

    useEffect(() => {
        api.get<User[]>('/users')  // Usando a instância api
          .then(response => {
            setUsers(response.data);
            setLoading(false);
          })
          .catch(error => {
            setError('Erro ao carregar os dados da API');
            setLoading(false);
          });
      }, []);
  
    if (loading) {
      return <div>Carregando dados...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  

  return (
    <div className="mx-auto w-[95vw] mt-10 flex flex-col min-h-full font-[family-name:var(--font-geist-sans)] mb-52">
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div className="mx-auto w-[95vw] mt-10  flex min-h-full font-[family-name:var(--font-geist-sans)]">
            <aside className=' w-[18%] flex flex-col gap-5'>
                <h2 className='text-3xl font-bold'>Editar Pedido</h2>
                <a href="" className='flex items-center gap-1 text-md font-semibold'><IoMdArrowDropleft />Voltar para a lista de movimentos</a>
                <div className='flex flex-col gap-[38px]'>
                    <div className='group relative items-center bg-blackSecondary p-4 rounded-lg'>
                        <div className='absolute w-[6px] h-[40px] rounded-full bg-primary  group-hover:bg-[#B4FFFF] transition duration-300 -left-[2px] top-[15px]'></div>
                        <div className='absolute bg-primary w-[6px] h-[40px] rounded-full group-hover:blur-md group-hover:bg-[#B4FFFF] transition duration-300 -left-[2px] top-[15px]'></div>
                        <div className='flex items-center'>
                            <FaWpforms size={30} className='text-primary group-hover:text-[#B4FFFF] transition duration-300'/>
                            <div className='flex flex-col ml-4'>
                                <h3 className='uppercase font-bold text-base text-lightW tracking-widest'>step 1</h3>
                                <p className='text-sm font-bold text-primary group-hover:text-[#B4FFFF] transition duration-300'>Informações Gerais</p>
                            </div>
                        </div>
                    </div>

                </div>
            </aside>
            <section className='w-[85%] flex flex-col gap-4'>
                <h2 className='text-center text-2xl font-bold'>Fazer Pedido</h2>
                <form action="" className='p-5 mx-auto flex flex-col gap-4 bg-blackSecondary rounded-lg w-[75%]'>
                
                    <div className='flex flex-col gap-2 '>
                        <label htmlFor="" className='text-md font-bold'>Usuário</label>
                        <select name="idUser" id="idUser" className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3' required>
                            <option value="" className='bg-blackSecondary'>Selecione um Usuário</option>
                            {users.map((user) => (
                                <option key={user.idUser} className='bg-blackSecondary' value={user.idUser}>
                                {user.nameUser}
                                </option>
                            ))}
                        </select>
                    </div>       

                    <div className='flex flex-col gap-2 '>
                        <label htmlFor="" className='text-md font-bold'>Produto</label>
                        <select name="idProduct" id="idProduct" className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3' required>
                            <option value="" className='bg-blackSecondary'>Selecione um Produto</option>
                            {products.map((product) => (
                                <option key={product.idProduct} value={product.idProduct} className='bg-blackSecondary'>
                                {product.nameProduct}
                                </option>
                            ))}
                        </select>
                    </div>   

                    <div className='flex flex-col gap-2 '>
                        <label htmlFor="" className='text-md font-bold'>Descrição</label>
                        <input type="text" placeholder='Escreva a descrição do pedido' className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                    </div>

                    <div className='flex flex-col gap-2 '>
                        <label htmlFor="" className='text-md font-bold'>Quantidade</label>
                        <input type="number" placeholder='quantidade de produtos do pedido' className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                    </div>

                    <div className='flex flex-col gap-2 '>
                        <label htmlFor="" className='text-md font-bold'>Data</label>
                        <input type="date" placeholder='Nome do produto' className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                    </div>
                    <input type="submit" value="Fazer Pedido" className='border-[2px] border-transparent font-semibold text-blackThirdy hover:text-lightW bg-primary p-2 rounded-lg hover:bg-blackSecondary mt-2 hover:border-primary transition duration-300 w-full'/>
                </form>
            </section>
        </div>

    </div>
  )
}

export default MovementForm;