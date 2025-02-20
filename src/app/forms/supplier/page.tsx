'use client';
import { useApiWithAuth } from '@/app/api/axios';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { IoMdArrowDropleft } from "react-icons/io";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';

type FormDataType = {
    corporateReason: string;
    name: string;
    address: string;
    telephone: string;
    email: string;
    responsible: string;
    cnpj: string;
    products: string[];
};

function SupplierForm() {
    const router = useRouter();
    const api = useApiWithAuth();
    const [formData, setFormData] = useState<FormDataType>({
        corporateReason: '',
        name: '',
        address: '',
        telephone: '',
        email: '',
        responsible: '',
        cnpj: '',
        products: [],
    });

    const [products, setProducts] = useState<{ idProduct: number, nameProduct: string }[]>([]);
    const [alerts, setAlert] = useState<{ severity: 'success' | 'error'; message: string } | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('http://127.0.0.1:8000/api/show');
                const productsData = response.data.data.map((product: any) => ({
                    idProduct: product.idProduct,
                    nameProduct: product.nameProduct
                }));
                setProducts(productsData);
            } catch (error) {
                console.error('Erro ao buscar os produtos:', error);
            }
        };

        fetchProducts();
    }, [api]);

    const isValidCNPJ = (cnpj: string) => {
        const cnpjRegex = /^(?!000\.000\.000\-00)(?!111\.111\.111\-11)(?!222\.222\.222\-22)(?!333\.333\.333\-33)(?!444\.444\.444\-44)(?!555\.555\.555\-55)(?!666\.666\.666\-66)(?!777\.777\.777\-77)(?!888\.888\.888\-88)(?!999\.999\.999\-99)\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
        return cnpjRegex.test(cnpj);
    };

    const isValidTelephone = (telephone: string) => {
        const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
        return phoneRegex.test(telephone);
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zAA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const isValidAddress = (address: string) => {
        return address.trim() !== '';
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        let formattedValue = value;

        if (name === "telephone") {
            formattedValue = formatPhoneNumber(value);
        }

        if (name === "cnpj") {
            formattedValue = formatCNPJ(value);
        }

        setFormData({
            ...formData,
            [name]: formattedValue,
        });
    };

    const formatPhoneNumber = (value: string) => {
        const phone = value.replace(/\D/g, '');

        if (phone.length <= 2) {
            return `(${phone}`;
        }
        if (phone.length <= 6) {
            return `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
        }
        return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7, 11)}`;
    };

    const formatCNPJ = (value: string) => {
        const cnpj = value.replace(/\D/g, '');

        if (cnpj.length <= 2) {
            return cnpj;
        }
        if (cnpj.length <= 5) {
            return `${cnpj.slice(0, 2)}.${cnpj.slice(2)}`;
        }
        if (cnpj.length <= 8) {
            return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5)}`;
        }
        if (cnpj.length <= 12) {
            return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8)}`;
        }
        return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`;
    };

    const handleProductChange = (event: any, newValue: { idProduct: number, nameProduct: string }[]) => {
        setFormData({
            ...formData,
            products: newValue.map((product) => product.idProduct.toString()),
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValidCNPJ(formData.cnpj)) {
            alert("CNPJ inválido. Por favor, insira um CNPJ válido.");
            return;
        }

        if (!isValidTelephone(formData.telephone)) {
            alert("Telefone inválido. Por favor, insira um telefone válido.");
            return;
        }

        if (!isValidEmail(formData.email)) {
            alert("Email inválido. Por favor, insira um email válido.");
            return;
        }

        if (!isValidAddress(formData.address)) {
            alert("Endereço inválido. O campo não pode estar vazio.");
            return;
        }

        const formDataToSend = new FormData();

        for (let key in formData) {
            if (Object.prototype.hasOwnProperty.call(formData, key)) {
                if (key === 'products') {
                    formData[key].forEach((productId) => {
                        formDataToSend.append('products[]', productId);
                    });
                } else {
                    formDataToSend.append(key, formData[key as keyof FormDataType] as string | Blob);
                }
            }
        }

        try {
            const response = await api.post(
                "http://127.0.0.1:8000/api/addSupplier",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setAlert({ severity: 'success', message: 'Fornecedor adicionado com sucesso' });
            setTimeout(() => router.push("/suppliers"), 2500);
        } catch (error) {
            console.error("Erro ao adicionar fornecedor:", error);
            setAlert({ severity: 'error', message: 'Erro ao adicionar Fornecedor' });
            console.log(formData);
        }
    };

    return (
        <div className="mx-auto w-[95vw] mt-10 flex flex-col min-h-full font-[family-name:var(--font-geist-sans)] mb-[252px]">
            {alerts && (
                <Alert severity={alerts.severity}>{alerts.message}</Alert>
            )}
            <div className="mx-auto w-[95vw] mt-10  flex min-h-full font-[family-name:var(--font-geist-sans)]">
                <aside className='w-[18%] flex flex-col gap-5'>
                    <h2 className='text-3xl font-bold'>Adicionar Fornecedor</h2>
                    <a href="/suppliers" className='flex items-center gap-1 text-md font-semibold'><IoMdArrowDropleft />Voltar para a lista de fornecedores</a>
                </aside>
                <section className='w-[85%] flex flex-col gap-4'>
                    <h2 className='text-center text-2xl font-bold tracking-wide uppercase text-lightW/30'>Cadastrar Fornecedor</h2>
                    <form onSubmit={handleSubmit} className='p-5 mx-auto flex flex-col gap-4 bg-blackSecondary rounded-lg w-[75%]'>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="name" className='text-md font-bold'>Nome</label>
                            <input type="text" value={formData.name} name="name" onChange={handleChange} placeholder="Nome do fornecedor" className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>
                        
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="corporateReason" className='text-md font-bold'>Razão Social</label>
                            <input type="text" value={formData.corporateReason} name="corporateReason" onChange={handleChange} placeholder="Razão Social" className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="address" className='text-md font-bold'>Endereço</label>
                            <input type="text" value={formData.address} name="address" onChange={handleChange} placeholder="Endereço do fornecedor" className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="email" className='text-md font-bold'>Email</label>
                            <input type="text" value={formData.email} name="email" onChange={handleChange} placeholder="Email do fornecedor" className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="telephone" className='text-md font-bold'>Telefone</label>
                            <input type="text" value={formData.telephone} name="telephone" onChange={handleChange} placeholder="Telefone do fornecedor" className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="responsible" className='text-md font-bold'>Responsável</label>
                            <input type="text" value={formData.responsible} name="responsible" onChange={handleChange} placeholder="Responsável pelo fornecedor" className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="cnpj" className='text-md font-bold'>CNPJ</label>
                            <input type="text" value={formData.cnpj} name="cnpj" onChange={handleChange} placeholder="CNPJ do fornecedor" className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="products" className='text-md font-bold'>Produtos</label>
                            <Autocomplete
                                multiple
                                id="products"
                                options={products}
                                getOptionLabel={(option) => option.nameProduct}
                                value={products.filter(product => formData.products.includes(product.idProduct.toString()))}
                                onChange={handleProductChange}
                                renderInput={(params) => <TextField {...params} label="Escolha os Produtos" />}
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
                                                    color: '#fff',
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

                        <input type="submit" value="Adicionar Fornecedor" className='border-[2px] border-transparent font-semibold text-blackThirdy hover:text-lightW bg-primary p-2 rounded-lg hover:bg-blackSecondary mt-2 hover:border-primary transition duration-300 w-full'/>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default SupplierForm;