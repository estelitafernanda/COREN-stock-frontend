'use client';
import { FaHeadset, FaBoxOpen, FaLocationArrow, FaLongArrowAltRight, FaCalendar  } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import ChartPieDash from "@/components/dash/ChartPieDash";
import ButtonMenu from "@/components/ButtonMenu";
import LineChartDash from "@/components/dash/LineChartDash";



export default function Home() {
  return (
    <div className="mx-auto w-[95vw] mt-7 flex flex-col justify-center min-h-full font-[family-name:var(--font-geist-sans)]">

      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-bold text-lightW">Dashboard</h1>
        <div className="flex gap-4">
          <button className="hover:bg-primary group hover:text-lightW flex gap-1 border-[1px] border-primary py-2 px-5 rounded-lg text-primary text-md font-semibold transition duration-300">
            <FaHeadset size={20} className="hover:text-lightW"/> Contato com suporte
          </button>
          {/* <button className="border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary">Ação Rápida <IoIosArrowDown/></button> */}
          <ButtonMenu/>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4 w-full min-h-[340px] mt-5">
        <div className="bg-blackSecondary p-5 rounded-lg col-span-4">
          <h2 className="text-2xl font-bold">Nivel de estoque:</h2>
          <div className="flex gap-5 px-4">
            <ChartPieDash/>
            <div className="w-full h-full flex flex-col justify-between gap-5 -mt-5">
              <div className="flex flex-col">
                <p>High stock product</p>
                <div className="w-full h-2 bg-primary rounded-full"></div>
                <p>1200 products</p>
              </div>
              <div>
                <p>near-low stock product</p>
                <div className="w-full h-2 bg-red  rounded-full"></div>
                <p>1200</p>
              </div>
              <div>
                <p>low stock product</p>
                <div className="w-full h-2 bg-yellow rounded-full"></div>
                <p>1200</p>
              </div>
              <div>
                <p>out of stock product</p>
                <div className="w-full h-2 bg-green rounded-full"></div>
                <p>1200</p>
              </div>
            </div>
          </div>

        </div>
        <div className="bg-blackSecondary p-5 rounded-lg col-span-3">
          <div className="flex w-full justify-between">
           <h2 className="text-2xl font-bold">Produtos mais usados:</h2>
           <a href="/inventory" className="text-lg font-bold text-primary pr-3 hover:text-[#B4FFFF] flex gap-1 items-center transition duration-300"><span>Ver Produtos</span><IoIosArrowForward/></a>
          </div>
          <div className="flex flex-col gap-3 mt-3">

          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 w-full h-40 mt-5">

        <div className="bg-blackSecondary p-5 rounded-lg col-span-1">
          <div className="flex justify-between px-2">
            <div className="flex gap-2 items-center">
              <div className="bg-blackThirdy p-2 rounded-lg">
                <FaBoxOpen size={25}/>
              </div>
              <p className="text-sm uppercase font-black">Produtos Gerais</p>
            </div>
            <span className="flex items-center text-sm font-bold gap-1">
              <div className="rounded-lg size-6 bg-primary flex items-center justify-center"><FaLocationArrow/></div>
              10,5%
            </span>
          </div>
          <div className="px-3 mt-5 flex flex-col gap-1">
            <h3 className="text-sm font-semibold text-lightW/50 uppercase tracking-wider">Média estimada:</h3>
            <h1 className="text-4xl font-black">10,226</h1>
          </div>
        </div>

        <div className="bg-blackSecondary p-5 rounded-lg col-span-1">
          <div className="flex justify-between px-2">
            <div className="flex gap-2 items-center">
              <div className="bg-blackThirdy p-2 rounded-lg">
                <FaBoxOpen size={25}/>
              </div>
              <p className="text-sm uppercase font-black">Produtos Gerais</p>
            </div>
            <span className="flex items-center text-sm font-bold gap-1">
              <div className="rounded-lg size-6 bg-primary flex items-center justify-center"><FaLocationArrow/></div>
              10,5%
            </span>
          </div>
          <div className="px-3 mt-5 flex flex-col gap-1">
            <h3 className="text-sm font-semibold text-lightW/50 uppercase tracking-wider">Média estimada:</h3>
            <h1 className="text-4xl font-black">10,226</h1>
          </div>
        </div>

        <div className="bg-blackSecondary p-5 rounded-lg col-span-1">
          <div className="flex justify-between px-2">
            <div className="flex gap-2 items-center">
              <div className="bg-blackThirdy p-2 rounded-lg">
                <FaBoxOpen size={25}/>
              </div>
              <p className="text-sm uppercase font-black">Produtos Gerais</p>
            </div>
            <span className="flex items-center text-sm font-bold gap-1">
              <div className="rounded-lg size-6 bg-primary flex items-center justify-center"><FaLocationArrow/></div>
              10,5%
            </span>
          </div>
          <div className="px-3 mt-5 flex flex-col gap-1">
            <h3 className="text-sm font-semibold text-lightW/50 uppercase tracking-wider">Média estimada:</h3>
            <h1 className="text-4xl font-black">10,226</h1>
          </div>
        </div>

        <div className="bg-blackSecondary p-5 rounded-lg col-span-1">
          <div className="flex justify-between px-2">
            <div className="flex gap-2 items-center">
              <div className="bg-blackThirdy p-2 rounded-lg">
                <FaBoxOpen size={25}/>
              </div>
              <p className="text-sm uppercase font-black">Produtos Gerais</p>
            </div>
            <span className="flex items-center text-sm font-bold gap-1">
              <div className="rounded-lg size-6 bg-primary flex items-center justify-center"><FaLocationArrow/></div>
              10,5%
            </span>
          </div>
          <div className="px-3 mt-5 flex flex-col gap-1">
            <h3 className="text-sm font-semibold text-lightW/50 uppercase tracking-wider">Média estimada:</h3>
            <h1 className="text-4xl font-black">10,226</h1>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-4 w-full h-56 mb-10 mt-5">
        <div className="bg-blackSecondary p-5 rounded-lg col-span-1">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Movimento Recente:</h2>
              <a href="/orders" className="text-lg font-bold text-primary pr-3 hover:text-[#B4FFFF] flex gap-1 items-center transition duration-300"><span>Ver Movimentos</span><IoIosArrowForward/></a>
            </div>
            <div className="bg-blackThirdy h-36 p-5 rounded-lg mt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold">MO-001</h3>
                  <div className="w-[1px] h-4 bg-lightW/50"></div>
                  <span className="flex text-lightW/50 items-center gap-2">
                    <p className="text-sm font-black">Admnistração</p>
                    <FaLongArrowAltRight/>
                    <p className="text-sm font-black">Financeiro</p>
                  </span>
                </div>
                <a href="/details/orderdetail" className="text-md font-bold text-primary pr-3 hover:text-[#B4FFFF] flex gap-1 items-center transition duration-300"><span>Mais Detalhes</span><IoIosArrowForward/></a>
              </div>
              <div className="w-full h-5 bg-yellow rounded-full text-center text-blackPrimary font-semibold">Aguardando Validação</div>
              <div className="flex gap-10">
                <div>
                  <span className="flex text-lightW/50 items-center gap-1">
                    <FaCalendar/>
                    <p className="text-sm font-bold tracking-wider uppercase">data de emissão:</p>
                  </span>
                  <p className="text-lightW font-semibold">02/12/2024</p>
                </div>
                <div>
                  <span className="flex text-lightW/50 items-center gap-1">
                    <FaCalendar/>
                    <p className="text-sm font-bold tracking-wider uppercase">data de recebimento:</p>
                  </span>
                  <p className="text-lightW font-semibold">Em Espera</p>
                </div>
              </div>
            </div>

        </div>
        <div className="bg-blackSecondary p-5 rounded-lg col-span-1">
            <h2 className="text-2xl font-bold">Controle de movimentações:</h2>
            <LineChartDash/>
        </div>
      </div>
    </div>
  );
}

