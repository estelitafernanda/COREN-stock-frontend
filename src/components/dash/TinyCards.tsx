import React from 'react'
import { FaBoxOpen, FaLocationArrow } from 'react-icons/fa6'

function TinyCards({title, qnt, icon}: {title: string, qnt: number, icon: React.ReactNode}) {
  return (
            <div className="bg-blackSecondary p-5 rounded-lg col-span-1">
              <div className="flex justify-between px-2">
                <div className="flex gap-2 items-center">
                  <div className="bg-blackThirdy p-2 rounded-lg">
                    {icon}
                  </div>
                  <p className="text-sm uppercase font-black">N° de {title}</p>
                </div>
                <span className="flex items-center text-sm font-bold gap-1">
                  <div className="rounded-lg size-6 bg-primary flex items-center justify-center"><FaLocationArrow/></div>
                </span>
              </div>
              <div className="px-3 mt-5 flex flex-col gap-1">
                <h3 className="text-sm font-semibold text-lightW/50 uppercase tracking-wider">Média estimada:</h3>
                <h1 className="text-4xl font-black">{qnt}</h1>
              </div>
            </div>
  )
}

export default TinyCards