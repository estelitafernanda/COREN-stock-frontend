import { FaHeadset } from "react-icons/fa";


export default function Home() {
  return (
    <div className="mx-auto w-[95vw] mt-10 flex justify-center min-h-full font-[family-name:var(--font-geist-sans)]">

      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-bold text-lightW">Dashboard</h1>
        <div className="flex gap-4">
          <button className="hover:bg-primary group hover:text-lightW flex gap-1 border-[1px] border-primary py-2 px-5 rounded-lg text-primary text-md font-semibold transition duration-300">
            <FaHeadset size={20} className="hover:text-lightW"/> Contato com suporte
          </button>
          <button className="border border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary">Ação Rápida</button>
        </div>
      </div>

      <section>
        
      </section>

    </div>
  );
}
