'use client';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';


type FormDataType = {
  corporateReason: string;
  name: string;
  address: string;
  telephone: string;
  email: string;
  responsible: string;
  cnpj: string; 
};

function EditSupplierForm() {
  const router = useRouter();
  const { id } = useParams(); 
  const [formData, setFormData] = useState<FormDataType>({
    corporateReason: '',
    name: '',
    address: '',
    telephone: '',
    email: '',
    responsible: '',
    cnpj: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar os dados do fornecedor pelo ID
  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:8000/api/suppliers/${id}`)
        .then((response) => {
          const data = response.data;
          setFormData({
            corporateReason: data.corporateReason || '',
            name: data.name || '',
            address: data.address || '',
            telephone: String(data.telephone) || '',
            email: data.email || '',
            responsible: data.responsible || '',
            cnpj: String(data.cnpj) || '',
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error('Erro ao carregar os dados do fornecedor:', err);
          setError('Erro ao carregar os dados do fornecedor.');
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/suppliers/${id}/update`,
        formData,
      );
  
      router.push("/suppliers");
      alert("fornecedor atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar fornecedor:", error);
      console.log(formData);
    }
  };


  //CARREGAR USUÁRIOS TODA VEZ QUE OS COMPONENTES FOREM MONTADOS E CARREGADOS
    if (loading) {
      return <div>Carregando dados...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }

  return (
    <div className="mx-auto w-[95vw] mt-10 flex flex-col min-h-full">
      <h2 className="text-center text-2xl font-bold">Editar Pedido</h2>
      <form onSubmit={handleSubmit} method='put' className="p-5 mx-auto flex flex-col gap-4 bg-blackSecondary rounded-lg w-[75%]">
        {/* <div className="flex flex-col gap-2">
          <label htmlFor="idUser" className="text-md font-bold">Usuário</label>
          <input
            type="text"
            name="idUser"
            value={formData.idUser}
            onChange={handleChange}
            className="w-full rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3"
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="idProduct" className="text-md font-bold">Produto</label>
          <input
            type="text"
            name="idProduct"
            value={formData.idProduct}
            onChange={handleChange}
            className="w-full rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3"
            disabled
          />
          </div> */}
          
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-md font-bold">Nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="cnpj" className="text-md font-bold">CNPJ</label>
          <input
            type="text"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
            className="w-full rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="corporateReason" className="text-md font-bold">Razão Social</label>
          <input
            type="text"
            name="corporateReason"
            value={formData.corporateReason}
            onChange={handleChange}
            className="w-full rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="address" className="text-md font-bold">Endereço</label>
          <input 
            type='text'
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            className="w-full rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3" 
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-md font-bold">Email</label>
          <input 
            type='text'
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3" 
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="telephone" className="text-md font-bold">Telefone</label>
          <input 
            type='text'
            name="telephone" 
            value={formData.telephone} 
            onChange={handleChange} 
            className="w-full rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3" 
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="responsible" className="text-md font-bold">Responsável</label>
          <input 
            type='text'
            name="responsible" 
            value={formData.responsible} 
            onChange={handleChange} 
            className="w-full rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3" 
          />
        </div>
        <button
          type="submit"
          className="border-[2px] border-transparent font-semibold text-blackThirdy hover:text-lightW bg-primary p-2 rounded-lg hover:bg-blackSecondary mt-2 hover:border-primary transition duration-300 w-full"
        >
          Atualizar fornecedor
        </button>
      </form>
    </div>
  );
}

export default EditSupplierForm;
