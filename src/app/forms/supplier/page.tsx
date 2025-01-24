'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FaWpforms } from "react-icons/fa";
import { IoMdArrowDropleft } from "react-icons/io";

type FormDataType = {
    corporateReason: string;
    name: string;
    address: string;
    telephone: string;
    email: string;
    responsible: string;
    cnpj: string;
    products: string[];  // Array de strings para os IDs dos produtos
};

function SupplierForm() {

    const router = useRouter();

    // Estado para armazenar os dados do formulário
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

    // Estado para armazenar os produtos
    const [products, setProducts] = useState<{ idProduct: number, nameProduct: string }[]>([]);

    // Função para fazer o GET dos produtos
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/show');
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
    }, []);

    // Função para lidar com mudanças nos inputs
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'products') {
            // Adiciona ou remove o ID do produto no array
            setFormData((prevData) => {
                const updatedProducts = [...prevData.products];
                const index = updatedProducts.indexOf(value);
                if (index > -1) {
                    updatedProducts.splice(index, 1);  // Remove produto se já estiver na lista
                } else {
                    updatedProducts.push(value);  // Adiciona o produto
                }
                return { ...prevData, products: updatedProducts };
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    // Função para enviar os dados para a API
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        // Preenchendo os dados do fornecedor
        for (let key in formData) {
            if (Object.prototype.hasOwnProperty.call(formData, key)) {
                if (key === 'products') {
                    // Adiciona os IDs dos produtos como múltiplos campos
                    formData[key].forEach((productId) => {
                        formDataToSend.append('products[]', productId);
                    });
                } else {
                    formDataToSend.append(key, formData[key as keyof FormDataType] as string | Blob);
                }
            }
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/addSupplier",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            router.push("/suppliers");
            alert("Fornecedor criado com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar fornecedor:", error);
            alert("Erro ao adicionar fornecedor.");
        }
    };

    return (
        <div className="mx-auto w-[95vw] mt-10 flex flex-col min-h-full font-[family-name:var(--font-geist-sans)] mb-[252px]">
            <div className="mx-auto w-[95vw] mt-10  flex min-h-full font-[family-name:var(--font-geist-sans)]">
                <aside className=' w-[20%] flex flex-col gap-5'>
                    <h2 className='text-3xl font-bold'>Adicionar Fornecedor</h2>
                    <a href="" className='flex items-center gap-1 text-md font-semibold'><IoMdArrowDropleft />Voltar para a lista de fornecedores</a>
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
                    <h2 className='text-center text-2xl font-bold'>Informações Gerais</h2>
                    <form onSubmit={handleSubmit} className='p-5 mx-auto flex flex-col gap-4 bg-blackSecondary rounded-lg w-[75%]'>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="name" className='text-md font-bold'>Nome</label>
                            <input type="text" value={formData.name} name="name" onChange={handleChange} placeholder="Nome do fornecedor" className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>
                        
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="name" className='text-md font-bold'>Razão Social</label>
                            <input type="text" value={formData.corporateReason} name="corporateReason" onChange={handleChange} placeholder="Nome do fornecedor" className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="name" className='text-md font-bold'>Endereço</label>
                            <input type="text" value={formData.address} name="address" onChange={handleChange} placeholder="Nome do fornecedor" className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="name" className='text-md font-bold'>Email</label>
                            <input type="text" value={formData.email} name="email" onChange={handleChange} placeholder="Nome do fornecedor" className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="name" className='text-md font-bold'>Telefone</label>
                            <input type="text" value={formData.telephone} name="telephone" onChange={handleChange} placeholder="Nome do fornecedor" className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="name" className='text-md font-bold'>Responsavel</label>
                            <input type="text" value={formData.responsible} name="responsible" onChange={handleChange} placeholder="Nome do fornecedor" className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>


                        <div className='flex flex-col gap-2'>
                            <label htmlFor="name" className='text-md font-bold'>CNPJ</label>
                            <input type="text" value={formData.cnpj} name="cnpj" onChange={handleChange} placeholder="Nome do fornecedor" className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3'/>
                        </div>
                        
                        
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="products" className='text-md font-bold'>Produtos</label>
                            <select name="products" onChange={handleChange} multiple className="w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3">
                                {products.map((product) => (
                                    <option key={product.idProduct} value={product.idProduct}>
                                        {product.nameProduct}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <input type="submit" value="Adicionar Fornecedor" className='border-[2px] border-transparent font-semibold text-blackThirdy hover:text-lightW bg-primary p-2 rounded-lg hover:bg-blackSecondary mt-2 hover:border-primary transition duration-300 w-full'/>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default SupplierForm;
