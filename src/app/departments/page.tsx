"use client";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import DepartmentCard from "@/components/DepartmentCard";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import { useApiWithAuth } from "@/app/api/axios"; // import do hook
import { IoIosAdd } from "react-icons/io";
import { FaHeadset } from "react-icons/fa6";

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
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

function Departments() {
  const api = useApiWithAuth(); // instância do hook
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [unity, setUnity] = useState<string>('');
  const [search, setSearch] = useState<string>("");

  const fetchSectors = async (page: number, search: string, unity: string) => {
    setLoading(true);
    try {
      const response = await api.get<ApiResponse>("/showDepartments", {
        params: { page, search, unity },
      });

      setSectors(response.data.data);
      setTotalPages(response.data.last_page);
      setCurrentPage(response.data.current_page);
    } catch (error) {
      console.error("Erro ao carregar os setores:", error);
      setError("Erro ao carregar os dados da API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSectors(currentPage, search, unity);
  }, [api, currentPage, search, unity]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const handleUnityChange = (selectedUnity: string) => {
    setUnity(selectedUnity);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto w-[95vw] mt-7 flex flex-col justify-center min-h-full font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-5">
          <h1 className="text-3xl font-bold text-lightW">Departamentos:</h1>
          <p className="text-sm font-bold text-lightW/30 bg-lightW/10 px-3 py-1 rounded-full border border-lightW/30">
            Total de departamentos: <span className="text-lightW">{sectors.length}</span>
          </p>
        </div>
         <div className=' flex items-center bg-blackSecondary border border-lightW/30 p-5 rounded-lg w-[30%] h-3 gap-2'>
            <FaSearch size={20} className='text-lightW/30'/>
              <input
                type="text"
                placeholder='Buscar' 
                value={search}
                onChange={handleSearchChange}
                className='text-sm font-bold text-lightW/30 w-[100%] bg-blackSecondary outline-none'
              />
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
        <div className="flex flex-col bg-blackSecondary w-[30%] max-h-fit p-5 rounded-lg">
        <h2 className='text-lg uppercase tracking-widest font-black text-lightW/50'>Filtros:</h2>
            <div className='grid grid-cols-2 gap-3 py-3'>
              <button 
                onClick={() => handleUnityChange('')} 
                className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                Todos        
              </button>
              <button 
                onClick={() => handleUnityChange('Natal')} 
                className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                Natal       
              </button>
              <button 
                onClick={() => handleUnityChange('Mossoró')} 
                className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                Mossoró            
              </button>
              <button onClick={() => handleUnityChange('Pau dos Ferros')} className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                Pau dos Ferros          
              </button>
              <button onClick={() => handleUnityChange('Caicó')} className="hover:border-primary hover:bg-blackThirdy group hover:text-lightW flex justify-between items-center border-[1px] border-primary/10 py-2 px-5 rounded-lg text-light-w text-md font-medium transition duration-300">
                Caicó          
              </button>
            </div>
        </div>

        <div className="flex flex-col gap-4 w-full bg-blackSecondary p-5 rounded-lg">
          {loading ? (
            <p className="text-lightW text-center">Carregando Departamentos...</p>
          ) : sectors.map((sector) => (
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