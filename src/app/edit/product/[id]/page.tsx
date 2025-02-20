'use client';

import { useApiWithAuth } from '@/app/api/axios';
import { Alert } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { FaWpforms } from "react-icons/fa";
import { IoMdArrowDropleft } from "react-icons/io";

type FormDataType = {
    nameProduct: string;
    image: File | null;
    idSector: string;
    code: string;
    describe: string;
    category: string;
    minQuantity: string;
    currentQuantity: string;
    location: string;
    validity?: string | null;
    unitPrice: string;
};

function EditProductForm() {
  const router = useRouter();
  const { id } = useParams(); 
  const api = useApiWithAuth();
  const [formData, setFormData] = useState<FormDataType>({
    nameProduct: "",
    image: null,
    idSector: "",
    code: "",
    describe: "",
    category: "",
    minQuantity: "",
    currentQuantity: "",
    location: "",
    validity: "",
    unitPrice: "",
});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ severity: 'success' | 'error'; message: string } | null>(null);
    useEffect(() => {
        if (id) {
        api
            .get(`http://127.0.0.1:8000/api/products/${id}`)
            .then((response) => {
            const data = response.data;
            setFormData({
                nameProduct: data.nameProduct || '',
                image: data.image || '',
                idSector:  String(data.idSector) || '',
                code: String(data.code) || '',
                describe: data.describe || '',
                category: data.category || '',
                minQuantity: data.minQuantity || '',
                currentQuantity: data.currentQuantity || '',
                location: data.location || '',
                validity: data.validity || '',
                unitPrice: data.unitPrice || '',
            });
              setLoading(false);
            })
              .catch((err) => {
              console.error('Erro ao carregar os dados do produto:', err);
              setError('Erro ao carregar os dados do produto.');
              setLoading(false);
            });
        }
  }, [id, api]);

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
      const response = await api.put(
        `http://127.0.0.1:8000/api/products/${id}/update`,
        formDataToSend,
      );
  
      setAlert({ severity: 'success', message: 'Produto editado com sucesso' });
      setTimeout(() => router.push("/inventory"), 2500);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      setAlert({ severity: 'error', message: 'Erro ao editar Produto' });
      console.log(formData);
    }
  };
  if (loading) {
    return <div>Carregando dados...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
        <div className="mx-auto w-[95vw] mt-10 flex flex-col min-h-full font-[family-name:var(--font-geist-sans)]">
            {alert && (
                    <Alert severity={alert.severity}>{alert.message}</Alert>
            )}
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
                    <form onSubmit={handleSubmit} method='put' className="p-5 mx-auto flex flex-col gap-4 bg-blackSecondary rounded-lg w-[75%]">
                    
                        <div className='flex flex-col gap-2 '>
                            <label htmlFor='nameProduct' className='text-md font-bold'>Nome</label>
                            <input 
                            type="text" 
                            value={formData.nameProduct} 
                            name='nameProduct' 
                            onChange={handleChange} 
                            className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>
                        <div className='flex'>
                            <div className='flex flex-col gap-2 w-[50%]'>
                                <label htmlFor="code"  className='text-md font-bold'>Código</label>
                                <input 
                                type="text" 
                                value={formData.code} 
                                name='code' 
                                onChange={handleChange} 
                                placeholder='Nome do produto' 
                                className='w-[95%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                            </div>
                            <div className='flex flex-col gap-2  w-[50%]'>
                                <label htmlFor="location" className='text-md font-bold'>Local de armazenamento</label>
                                <input 
                                type="text" 
                                value={formData.location} 
                                name='location' 
                                onChange={handleChange} 
                                placeholder='Nome do produto' 
                                className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                            </div>
                        </div>
                        <div className='flex flex-col gap-[2px]'>
                            <label className='text-md font-bold' htmlFor="describe">Descrição</label>
                            <input 
                            type="textarea" 
                            value={formData.describe} 
                            name='describe' 
                            onChange={handleChange} 
                            className='w-[100%] rounded-lg h-36 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>
                        <div className='flex flex-col gap-[2px]'>
                            <label className="text-md font-bold" htmlFor="file_input">Upload file</label>
                            <input 
                            name='image' 
                            onChange={handleChange} 
                            className="flex py-2 w-[100%] appearance-none text-sm font-semi-bold text-lightW rounded-lg h-13 bg-transparent border-[2px] border-lightW/30 px-3" id="file_input" type="file"/>
                        </div>
                        
                        <div className='flex'>
                            <div className='flex flex-col gap-2 w-[50%]'>
                                <label htmlFor="category" className='text-md font-bold'>Categoria</label>
                                <select value={formData.category} name='category' onChange={handleChange} className='w-[95%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'>
                                    <option value="">Selecione uma categoria</option>
                                    <option value="escritorio">Escritório</option>
                                    <option value="alimentos">Alimentos</option>
                                    <option value="limpeza">Limpeza</option>
                                    <option value="copa">Copa</option>
                                </select>
                            </div>
                            <div className='flex flex-col gap-2  w-[50%]'>
                                <label htmlFor="validity" className='text-md font-bold'>Validade</label>
                                <input 
                                type="date" 
                                value={formData.validity || ''} 
                                name='validity' onChange={handleChange} 
                                placeholder='Nome do produto' 
                                className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 '>
                            <label htmlFor="idSector" className='text-md font-bold'>Indentificador do departamento</label>
                            <input 
                            type="number" 
                            value={formData.idSector} 
                            name='idSector' 
                            onChange={handleChange} 
                            className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>

                        <div className='flex'>
                            <div className='flex flex-col gap-2 w-[50%]'>
                                <label htmlFor="minQuantity" className='text-md font-bold'>Quantidade Mínima</label>
                                <input 
                                type="text" 
                                value={formData.minQuantity} 
                                name='minQuantity' 
                                onChange={handleChange} 
                                className='w-[95%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                            </div>
                            <div className='flex flex-col gap-2  w-[50%]'>
                                <label htmlFor="currentQuantity" className='text-md font-bold'>Quantidade Atual</label>
                                <input 
                                type="number" 
                                value={formData.currentQuantity} 
                                name='currentQuantity' 
                                onChange={handleChange} 
                                className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2  w-[100%]'>
                                <label htmlFor="unitPrice" className='text-md font-bold'>Valor Unitário</label>
                                <input 
                                type="number" 
                                value={formData.unitPrice} 
                                name='unitPrice' 
                                onChange={handleChange} 
                                className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>

                        <input type="submit" value="Atualizar Produto" className='border-[2px] border-transparent font-semibold text-blackThirdy hover:text-lightW bg-primary p-2 rounded-lg hover:bg-blackSecondary mt-2 hover:border-primary transition duration-300 w-full'/>
                    </form>
                </section>
            </div>
        </div>    
  )
}

export default EditProductForm