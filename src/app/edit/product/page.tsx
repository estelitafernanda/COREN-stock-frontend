'use client';

import axios from 'axios';
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { FaWpforms } from "react-icons/fa";
import { IoMdArrowDropleft } from "react-icons/io";

type FormDataType = {
    nameProduct: string;
    image: File | null;
    idDepartment: string;
    code: string;
    describe: string;
    category: string;
    minQuantity: string;
    currentQuantity: string;
    location: string;
    validity?: string | null;
    unitPrice: string;
};

function ProductForm() {

      
const [formData, setFormData] = useState<FormDataType>({
    nameProduct: "",
    image: null,
    idDepartment: "",
    code: "",
    describe: "",
    category: "",
    minQuantity: "",
    currentQuantity: "",
    location: "",
    validity: "",
    unitPrice: "",
});

const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

    const { name, value, type } = e.target;
    
    
    if (type === "file") {
      const input = e.target as HTMLInputElement;  
      const file = input.files ? input.files[0] : null;  

      
      setFormData({
        ...formData,
        [name]: file, 
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    for (let key in formData) {
        if (Object.prototype.hasOwnProperty.call(formData, key)) {
            formDataToSend.append(key, formData[key as keyof FormDataType] as string | Blob);
        }
    }
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/addProduct",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      alert("Produto adicionado com sucesso!");
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      alert("Erro ao adicionar produto.");
      console.log(formData);
    }
};

  return (
        <div className="mx-auto w-[95vw] mt-10 flex flex-col min-h-full font-[family-name:var(--font-geist-sans)]">
            <div className="mx-auto w-[95vw] mt-10  flex min-h-full font-[family-name:var(--font-geist-sans)]">
                <aside className=' w-[18%] flex flex-col gap-5'>
                    <h2 className='text-3xl font-bold'>Editar Produto</h2>
                    <a href="" className='flex items-center gap-1 text-md font-semibold'><IoMdArrowDropleft />Voltar para a lista de produtos</a>
                    <div className='flex flex-col gap-[38px]'>
                        <div className='group relative items-center bg-blackSecondary p-4 rounded-lg'>
                            <div className='absolute w-[6px] h-[40px] rounded-full bg-primary  group-hover:bg-[#B4FFFF] transition duration-300 -left-[2px] top-[15px]'></div>
                            <div className='absolute bg-primary w-[6px] h-[40px] rounded-full group-hover:blur-md group-hover:bg-[#B4FFFF] transition duration-300 -left-[2px] top-[15px]'></div>
                            <div className='flex items-center cursor-pointer'>
                                <FaWpforms size={30} className='text-primary group-hover:text-[#B4FFFF] transition duration-300'/>
                                <div className='flex flex-col ml-4 '>
                                    <h3 className='uppercase font-bold text-base text-lightW tracking-widest'>step 1</h3>
                                    <p className='text-sm font-bold text-primary group-hover:text-[#B4FFFF] transition duration-300'>Informações Gerais</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
                <section className='w-[85%] flex flex-col gap-4'>
                    <h2 className='text-center text-2xl font-bold'>Informações Gerais</h2>
                    <form onSubmit={handleSubmit} className='p-5 mx-auto flex flex-col gap-4 bg-blackSecondary rounded-lg w-[75%]'>
                    
                        <div className='flex flex-col gap-2 '>
                            <label htmlFor='' className='text-md font-bold'>Nome</label>
                            <input type="text" value={formData.nameProduct} name='nameProduct' onChange={handleChange} placeholder='Nome do produto' className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>
                        <div className='flex'>
                            <div className='flex flex-col gap-2 w-[50%]'>
                                <label htmlFor=""  className='text-md font-bold'>Código</label>
                                <input type="text" value={formData.code} name='code' onChange={handleChange} placeholder='Nome do produto' className='w-[95%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                            </div>
                            <div className='flex flex-col gap-2  w-[50%]'>
                                <label htmlFor="" className='text-md font-bold'>Local de armazenamento</label>
                                <input type="text" value={formData.location} name='location' onChange={handleChange} placeholder='Nome do produto' className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                            </div>
                        </div>
                        <div className='flex flex-col gap-[2px]'>
                            <label className='text-md font-bold' htmlFor="">Descrição</label>
                            <input type="textarea" value={formData.describe} name='describe' onChange={handleChange} className='w-[100%] rounded-lg h-36 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>
                        <div className='flex flex-col gap-[2px]'>
                            <label className="text-md font-bold" htmlFor="file_input">Upload file</label>
                            <input name='image' onChange={handleChange} className="flex py-2 w-[100%] appearance-none text-sm font-semi-bold text-lightW rounded-lg h-13 bg-transparent border-[2px] border-lightW/30 px-3" id="file_input" type="file"/>
                        </div>
                        
                        <div className='flex'>
                            <div className='flex flex-col gap-2 w-[50%]'>
                                <label htmlFor="" className='text-md font-bold'>Categoria</label>
                                <select value={formData.category} name='category' onChange={handleChange} className='w-[95%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'>
                                    <option value="">Selecione uma categoria</option>
                                    <option value="escritorio">Escritório</option>
                                    <option value="alimentos">Alimentos</option>
                                    <option value="limpeza">Limpeza</option>
                                    <option value="copa">Copa</option>
                                </select>
                            </div>
                            <div className='flex flex-col gap-2  w-[50%]'>
                                <label htmlFor="" className='text-md font-bold'>Validade</label>
                                <input type="date" value={formData.validity || ''} name='validity' onChange={handleChange} placeholder='Nome do produto' className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 '>
                            <label htmlFor="" className='text-md font-bold'>Indentificador do departamento</label>
                            <input type="number" value={formData.idDepartment} name='idDepartment' onChange={handleChange} placeholder='Id do departamento' className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>

                        <div className='flex'>
                            <div className='flex flex-col gap-2 w-[50%]'>
                                <label htmlFor="" className='text-md font-bold'>Quantidade Mínima</label>
                                <input type="text" value={formData.minQuantity} name='minQuantity' onChange={handleChange} placeholder='Quantidade mínima do produto' className='w-[95%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                            </div>
                            <div className='flex flex-col gap-2  w-[50%]'>
                                <label htmlFor="" className='text-md font-bold'>Quantidade Atual</label>
                                <input type="number" value={formData.currentQuantity} name='currentQuantity' onChange={handleChange} placeholder='Quantidade atual do produto' className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2  w-[100%]'>
                                <label htmlFor="" className='text-md font-bold'>Valor Unitário</label>
                                <input type="number" value={formData.unitPrice} name='unitPrice' onChange={handleChange} placeholder='Quantidade atual do produto' className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>

                        <input type="submit" value="Criar Produto" className='border-[2px] border-transparent font-semibold text-blackThirdy hover:text-lightW bg-primary p-2 rounded-lg hover:bg-blackSecondary mt-2 hover:border-primary transition duration-300 w-full'/>
                    </form>
                </section>
            </div>
            
            <div className='fixed w-[100vw] border-t-[1px] p-5 flex justify-end items-center gap-5 border-t-lightW/20 bg-blackSecondary h-32 left-0 bottom-0'>
                <button className="border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary">Voltar</button>
                <div className='h-[30px] w-[1px] bg-lightW/50'></div>
                <button className="border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary mr-36">Próximo</button>
            </div>
        </div>    
  )
}

export default ProductForm