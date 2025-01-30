'use client';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import api from '@/app/api/axios';

type FormDataType = {
    headSector: string;
    unity: string;
    name: string;
    idUser: string;
};

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
    name: '',
    headSector: '',
    unity: '',
    idUser: '',
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
            name: String(data.name) || '',
            headSector: String(data.headSector) || '',
            unity: String(data.unity) || '',
            idUser: String(data.idUser) || '',

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
        `http://127.0.0.1:8000/api/sectors/${id}/update`,
        formData,
      );
  
      router.push("/sectors");
      alert("Departamento atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar departamento:", error);
      alert("Erro ao adicionar departamento.");
      console.log(formData);
    }
  };


  const [users , setUsers] = useState<User[]>([]);

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
      <h2 className="text-center text-2xl font-bold">Editar Departamento</h2>
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
          <label htmlFor="headSector" className="text-md font-bold">Chefe de Setor</label>
          <input
            type="text"
            name="headSector"
            value={formData.headSector}
            onChange={handleChange}
            className="w-full rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="unity" className="text-md font-bold">Unidade</label>
          <input
            type="text"
            name="unity"
            value={formData.unity}
            onChange={handleChange}
            className="w-full rounded-lg h-10 bg-transparent border-[2px] border-lightW/30 px-3"
          />
        </div>
        <button
          type="submit"
          className="border-[2px] border-transparent font-semibold text-blackThirdy hover:text-lightW bg-primary p-2 rounded-lg hover:bg-blackSecondary mt-2 hover:border-primary transition duration-300 w-full"
        >
          Atualizar Departamento
        </button>
      </form>
    </div>
  );
}

export default EditRequestForm;
