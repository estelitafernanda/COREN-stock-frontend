'use client';
import { useApiWithAuth } from '@/app/api/axios';
import { Alert } from '@mui/material';
import {useRouter} from "next/navigation";
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
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

function ProductForm() {

    const [sectors, setSectors] = useState<{ idSector: string; name: string }[]>([]);
    const api = useApiWithAuth();
    const router = useRouter();
        
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

     const [alert, setAlert] = useState<{ severity: 'success' | 'error'; message: string } | null>(null);

    useEffect(() => {
        api
          .get('http://127.0.0.1:8000/api/showDepartments') 
          .then((response) => {
              setSectors(response.data.data); 
          })
          .catch((error) => {
              console.error('Erro ao carregar setores:', error);
              setAlert({ severity: 'error', message: 'Erro ao carregar Departamentos' });
          });
      }, [api]);

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
          const response = await api.post(
            "http://127.0.0.1:8000/api/addProduct",
            formDataToSend,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          setAlert({ severity: 'success', message: 'Produto adicionado com sucesso' });
          setTimeout(() => router.push("/inventory"), 2500);
        } catch (error) {
          console.error("Erro ao adicionar produto:", error);
          setAlert({ severity: 'error', message: 'Erro ao adicionar Produto' });
          console.log(formData);
        }
    };

  return (
        <div className="mx-auto w-[95vw] mt-10 flex flex-col min-h-full font-[family-name:var(--font-geist-sans)]">
            {alert && (
                <Alert severity={alert.severity}>{alert.message}</Alert>
            )}
            <div className="mx-auto w-[95vw] mt-10  flex min-h-full font-[family-name:var(--font-geist-sans)]">
                <aside className='w-[18%] flex flex-col gap-5'>
                    <h2 className='text-3xl font-bold'>Adicionar Produto</h2>
                    <a href="/inventory" className='flex items-center gap-1 text-md font-semibold'><IoMdArrowDropleft />Voltar para a lista de produtos</a>
                </aside>
                <section className='w-[85%] flex flex-col gap-4'>
                <h2 className='text-center text-2xl font-bold tracking-wide uppercase text-lightW/30'>Cadastrar produto</h2>
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
                                <select value={formData.category} name='category' onChange={handleChange} className='w-[95%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 bg-blackSecondary px-3'>
                                    <option value="" className='bg-blackSecondary'>Selecione uma categoria</option>
                                    <option value="escritorio" className='bg-blackSecondary'>Escritório</option>
                                    <option value="alimentos" className='bg-blackSecondary'>Alimentos</option>
                                    <option value="limpeza" className='bg-blackSecondary'>Limpeza</option>
                                </select>
                            </div>
                            <div className='flex flex-col gap-2  w-[50%]'>
                                <label htmlFor="" className='text-md font-bold'>Validade</label>
                                <input type="date" value={formData.validity || ''} name='validity' onChange={handleChange} placeholder='Nome do produto' className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 '>
                            <label htmlFor="idSector" className='text-md font-bold'>Identificador do Departamento</label>
                            <select 
                                name="idSector" 
                                value={formData.idSector} 
                                onChange={handleChange} 
                                className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3' 
                                required
                            >
                                <option value="" className='bg-blackSecondary'>Selecione um Departamento</option>
                                {sectors.map((sector) => (
                                <option key={sector.idSector} value={sector.idSector} className='bg-blackSecondary'>
                                    {sector.name}
                                </option>
                                ))}
                            </select>
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
        </div>    
  )
}

export default ProductForm