import { FaHeadset } from "react-icons/fa";


export default function Home() {
  return (
    <div className="mx-auto w-[95vw] mt-10 flex justify-center min-h-full font-[family-name:var(--font-geist-sans)]">

      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-bold text-lightW">Dashboard</h1>
        <div className="flex gap-4">
          <button className="flex gap-1 border-[1px] border-primary py-2 px-5 rounded-lg text-primary text-md font-semibold"><FaHeadset size={20} color="#56cbec"/>Contato com suporte</button>
          <button className="bg-primary py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary">Ação Rápida</button>
        </div>
      </div>

      <section>
        
      </section>

    </div>
  );
}
