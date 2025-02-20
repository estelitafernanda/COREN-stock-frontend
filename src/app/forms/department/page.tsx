'use client';
import { useApiWithAuth } from '@/app/api/axios';
import { Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { IoMdArrowDropleft } from "react-icons/io";


type FormDataType = {
    name: string;
    headSector: string;
    unity: string;
};

function DepartmentForm() {
    const router = useRouter();
    const api = useApiWithAuth();

    const [formData, setFormData] = useState<FormDataType>({
        name: '',
        headSector: '',
        unity: '',
    });

    const [alert, setAlert] = useState<{ severity: 'success' | 'error'; message: string } | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
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
            const response = await api.post("http://127.0.0.1:8000/api/addSector", formDataToSend);
            setAlert({ severity: 'success', message: 'Departamento adicionado com sucesso' });
            setTimeout(() => router.push("/departments"), 2500);
        } catch (error) {
            setAlert({ severity: 'error', message: 'Erro ao adicionar Departamento' });
        }
    };

    return (
        <div className="mx-auto pb-52 w-[95vw] mt-10 flex flex-col min-h-full font-[family-name:var(--font-geist-sans)]">
            {alert && (
                <Alert severity={alert.severity}>{alert.message}</Alert>
            )}
            <div className="mx-auto w-[95vw] mt-10 flex min-h-full font-[family-name:var(--font-geist-sans)]">
                <aside className='w-[18%] flex flex-col gap-5'>
                    <h2 className='text-3xl font-bold'>Adicionar Departamento</h2>
                    <a href="" className='flex items-center gap-1 text-md font-semibold'><IoMdArrowDropleft />Voltar para a lista de departamentos</a>
                </aside>
                <section className='w-[85%] flex flex-col gap-4'>
                    <h2 className='text-center text-2xl font-bold tracking-wide uppercase text-lightW/30'>Cadastrar Departamento</h2>
                    <form action="" onSubmit={handleSubmit} className='p-5 mx-auto flex flex-col gap-4 bg-blackSecondary rounded-lg w-[75%]'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="" className='text-md font-bold'>Nome do Setor:</label>
                            <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder='Escreva o Nome do Setor' className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="" className='text-md font-bold'>Nome Chefe do Setor:</label>
                            <input type="text" placeholder='Digite o chefe do setor' name='headSector' value={formData.headSector} onChange={handleChange} className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="unity" className='text-md font-bold'>Nome da unidade do Setor:</label>
                            <select name="unity" value={formData.unity} onChange={handleChange} className='h-9 bg-blackSecondary border-[2px] border-lightW/30 rounded-lg px-2'>
                                <option>Selecione uma unidade</option>
                                <option value="Natal">Natal</option>
                                <option value="Caicó">Caicó</option>
                                <option value="Pau dos Ferros">Pau dos Ferros</option>
                                <option value="Mossoró">Mossoró</option>
                            </select>
                        </div>
                        <input type="submit" value="Adicionar Setor" className='border-[2px] border-transparent font-semibold text-blackThirdy hover:text-lightW bg-primary p-2 rounded-lg hover:bg-blackSecondary mt-2 hover:border-primary transition duration-300 w-full'/>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default DepartmentForm;