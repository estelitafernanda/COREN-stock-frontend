import React from 'react'
import Background from '../../../public/bg.jpg' 
import Computer from '../../../public/login-image.png'
import Image from 'next/image'
import { Tape } from '@/components/Tape'

function page() {
  return (
    <main className='grid grid-cols-2 h-screen w-full font-[family-name:var(--font-geist-sans)] overflow-clip'>

        <section className='bg-blackPrimary p-10 flex flex-col items-center overflow-clip'>
            <h2 className=" mt-10 font-black text-3xl tracking-wider text-primary">CorenStock</h2>
            <div className='mt-36 w-[70%] text-center'>
                <h1 className='text-5xl font-black'>Olá! Seja bem-vindo de volta👋</h1>
                <form action="" className='border-b border-primary pb-8 relative'>
                    <div className='flex flex-col text-left mt-3'>
                        <label htmlFor="" className='font-bold'>E-mail</label>
                        <input type="email" className='px-4 mt-1 font-bold h-10 bg-transparent border-[2px] border-primary/30 rounded-lg focus:outline-none focus:border-primary transition duration-300'/>
                    </div>
                    <div className='flex flex-col text-left mt-3'>
                        <label htmlFor="" className='font-bold'>Senha</label>
                        <input type="password" className='px-4 mt-1 h-10 bg-transparent border-[2px] border-primary/30 rounded-lg focus:outline-none focus:border-primary transition duration-300'/>
                    </div>
                    <input type="submit" value="entrar" className='font-bold uppercase tracking-wider  border-[2px] border-transparent text-blackThirdy hover:text-lightW bg-primary p-2 rounded-lg hover:bg-blackSecondary hover:border-primary transition duration-300 w-full mt-5'/>
                    <div className='size-2 z-10 bg-primary rounded-full left-[50%] -bottom-1 absolute'></div>
                    <div className='w-[5%] h-2 z-9 bg-blackPrimary left-[48%] -bottom-1 absolute'></div>
                </form>

            </div>
            <span className='flex gap-1 mt-28'>
                <p className='text-sm font-bold'>Precisa criar uma conta?</p>
                <a href="" className='text-sm font-bold text-primary'>Clique aqui!</a>
            </span>
            <Tape/>
        </section>

        <section className='bg-primary h-screen flex flex-col items-center justify-center rounded-r-3xl'>
            <Image src={Computer} alt='background' className='w-[70%]' />
            {/* <Image src={Background} alt='background' className='w-full h-full object-cover' /> */}
        </section>


    </main>
  )
}

export default page