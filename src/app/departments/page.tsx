'use client';
import React, { useEffect, useState } from 'react';
import { FaHeadset } from 'react-icons/fa6';
import { IoIosAdd } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import DepartmentCard from '@/components/DepartmentCard';
import axios from 'axios';
import Loading from '@/components/Loading';
import Pagination from '@/components/Pagination';

interface Sector {
  idSector: number;
  name: string;
  unity: string | null;
  headSector: string;
  users_count: number;
}

interface ApiResponse {
  current_page: number;
  data: Sector[];
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

function Departments() {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchSectors = (page: number) => {
    setLoading(true);
    setError(null);

    axios.get<ApiResponse>(`http://127.0.0.1:8000/api/showDepartments?page=${page}`)
      .then(response => {
        const { data, current_page, total, per_page } = response.data;
        setSectors(data);
        setCurrentPage(current_page);
        setTotalPages(Math.ceil(total / per_page));
        setLoading(false);
      })
      .catch(() => {
        setError('Erro ao carregar os dados da API');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSectors(currentPage);
  }, [currentPage]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mx-auto w-[95vw] mt-7 flex flex-col justify-center min-h-full font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-5">
          <h1 className="text-3xl font-bold text-lightW">Departamentos:</h1>
          <p className="text-sm font-bold text-lightW/30 bg-lightW/10 px-3 py-1 rounded-full border border-lightW/30">
            Total de departamentos: <span className="text-lightW">{sectors.length}</span>
          </p>
        </div>
        <div className="flex items-center bg-blackSecondary border border-lightW/30 p-5 rounded-lg w-[30%] h-3 gap-2">
          <FaSearch size={20} className="text-lightW/30" />
          <p className="text-sm font-bold text-lightW/30">buscar</p>
        </div>
        <div className="flex gap-4">
          <button className="hover:bg-primary group hover:text-lightW flex gap-1 border-[1px] border-primary py-2 px-5 rounded-lg text-primary text-md font-semibold transition duration-300">
            <FaHeadset size={20} className="hover:text-lightW" /> Contato com suporte
          </button>
          <a href="/forms/department">
            <button className="border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary">
              Adicionar Departamento <IoIosAdd size={20} />
            </button>
          </a>
        </div>
      </div>

      <section className="h-[80vh] flex gap-5 mt-5">
        <div className="flex flex-col gap-8 bg-blackSecondary w-[30%] p-5 rounded-lg">
          <h2 className="text-sm uppercase tracking-widest font-bold text-lightW/50">Tipo de Departamento</h2>
        </div>

        <div className="flex flex-col gap-4 w-full bg-blackSecondary p-5 rounded-lg">
          {sectors.map((sector) => (
            <DepartmentCard
              key={sector.idSector}
              idSector={sector.idSector}
              name={sector.name}
              superUser={sector.headSector}
              func={sector.users_count}
              local={sector.unity || 'N/A'}
            />
          ))}
          <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          />
        </div>

      </section>


    </div>
  );
}

export default Departments;
