'use client';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import api from '@/app/api/axios';

type FormDataType = {
  describe: string;
  requestDate: string;
  quantity: string;
  status: string;
  idProduct: string;
  idUser: string;
};

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

function EditRequestForm() {
  const router = useRouter();
  const { id } = useParams(); 
  const [formData, setFormData] = useState<FormDataType>({
    describe: '',
    requestDate: '',
    quantity: '',
    idProduct: '',
    idUser: '',
    status: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar os dados do pedido pelo ID
  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:8000/api/requests/${id}`)
        .then((response) => {
          const data = response.data;
          setFormData({
            describe: data.describe || '',
            requestDate: data.requestDate || '',
            quantity: data.quantity || '',
            idProduct: String(data.idProduct) || '',
            idUser: String(data.idUser) || '',
            status: data.status || '',
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error('Erro ao carregar os dados do pedido:', err);
          setError('Erro ao carregar os dados do pedido.');
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
        `http://127.0.0.1:8000/api/requests/${id}/update`,
        formData,
      );
  
      router.push("/requests");
      alert("Pedido atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
      alert("Erro ao adicionar pedido.");
      console.log(formData);
    }
  };


  const [users , setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get<Product[]>('productFiltered')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Erro ao carregar os dados da API');
        setLoading(false);
      });
  }, []);

  //CARREGAR USUÁRIOS TODA VEZ QUE OS COMPONENTES FOREM MONTADOS E CARREGADOS
  useEffect(() => {
      api.get<User[]>('/users') 
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
          <div className='flex flex-col gap-2 '>
              <label htmlFor="" className='text-md font-bold'>Usuário</label>
              <select name="idUser" value={formData.idUser} onChange={handleChange} id="idUser" className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3' required>
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
              <select name="idProduct" value={formData.idProduct} onChange={handleChange} id="idProduct" className='w-[100%] rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3' required>
                  <option value="" className='bg-blackSecondary'>Selecione um Produto</option>
                  {products.map((product) => (
                      <option key={product.idProduct} value={product.idProduct} className='bg-blackSecondary'>
                          {product.nameProduct}
                      </option>
                  ))}
              </select>
          </div>   
        <div className="flex flex-col gap-2">
          <label htmlFor="describe" className="text-md font-bold">Descrição</label>
          <input
            type="text"
            name="describe"
            value={formData.describe}
            onChange={handleChange}
            className="w-full rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="quantity" className="text-md font-bold">Quantidade</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="requestDate" className="text-md font-bold">Data</label>
          <input
            type="date"
            name="requestDate"
            value={formData.requestDate}
            onChange={handleChange}
            className="w-full rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="status" className="text-md font-bold">Status</label>
          <select 
            name="status" 
            value={formData.status} 
            onChange={handleChange} 
            className="w-full rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3" 
            required
          >
            <option value="" className='bg-blackSecondary'>Selecione o Status</option>
            <option value="pendente">Pendente</option>
            <option value="em progresso">Em progresso</option>
            <option value="aceito">aceito</option>
          </select>
        </div>
        <button
          type="submit"
          className="border-[2px] border-transparent font-semibold text-blackThirdy hover:text-lightW bg-primary p-2 rounded-lg hover:bg-blackSecondary mt-2 hover:border-primary transition duration-300 w-full"
        >
          Atualizar Pedido
        </button>
      </form>
    </div>
  );
}

export default EditRequestForm;
