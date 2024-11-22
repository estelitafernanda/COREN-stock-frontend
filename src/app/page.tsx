'use client';
import { FaHeadset } from "react-icons/fa";
import ChartPieDash from "@/components/dash/ChartPieDash";


export default function Home() {
  return (
    <div className="mx-auto w-[95vw] mt-7 flex flex-col justify-center min-h-full font-[family-name:var(--font-geist-sans)]">

      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-bold text-lightW">Dashboard</h1>
        <div className="flex gap-4">
          <button className="hover:bg-primary group hover:text-lightW flex gap-1 border-[1px] border-primary py-2 px-5 rounded-lg text-primary text-md font-semibold transition duration-300">
            <FaHeadset size={20} className="hover:text-lightW"/> Contato com suporte
          </button>
          <button className="border border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary">Ação Rápida</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4 w-full h-72 mt-5">
        <div className="bg-blackSecondary p-5 rounded-lg col-span-4">
          <h2 className="text-2xl font-bold">Stock Level:</h2>
          <div className="flex gap-5">
            <ChartPieDash/>
            <div className="w-full">
              <div className="flex flex-col">
                <p>High stock product</p>
                <div className="w-full h-2 bg-primary rounded-full"></div>
                <p>1200 products</p>
              </div>
              <div>
                <p>near-low stock product</p>
                <div className="w-full h-2 bg-primary rounded-full"></div>
                <p>1200</p>
              </div>
              <div>
                <p>low stock product</p>
                <div className="w-full h-2 bg-primary rounded-full"></div>
                <p>1200</p>
              </div>
              <div>
                <p>out of stock product</p>
                <div className="w-full h-2 bg-primary rounded-full"></div>
                <p>1200</p>
              </div>
            </div>
          </div>

        </div>
        <div className="bg-blackSecondary p-5 rounded-lg col-span-3"></div>
      </div>

      <div className="grid grid-cols-4 gap-4 w-full h-40 mt-5">
        <div className="bg-blackSecondary p-5 rounded-lg col-span-1"></div>
        <div className="bg-blackSecondary p-5 rounded-lg col-span-1"></div>
        <div className="bg-blackSecondary p-5 rounded-lg col-span-1"></div>
        <div className="bg-blackSecondary p-5 rounded-lg col-span-1"></div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full h-60 mt-5">
        <div className="bg-blackSecondary p-5 rounded-lg col-span-1"></div>
        <div className="bg-blackSecondary p-5 rounded-lg col-span-1">
          <div className="max-w-60"></div>
        </div>
      </div>

    </div>
  );
}
