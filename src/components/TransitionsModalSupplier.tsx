import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import Button from '@mui/material/Button';
import { ImExit } from "react-icons/im";
import { FaEdit, FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Avatar from  "../../public/memoji.png";
import CorporationImage from "../../public/generic-electric-logo.png";
import Image from 'next/image';
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import ProductCard from './ProductCard';

const style = {
  position: 'absolute',
  top: '50%',
  right: '-40%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  height: "100vh",
  bgcolor: '#1a262d',
  border: '2px solid #202e36',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModalSupplier() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} className='normal-case items-center border bg-transparent transition duration-300 hover:text-[#B4FFFF] flex py-2 px-5 rounded-lg text-base font-semibold text-primary'>mais informações &gt;&gt;</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className='flex flex-col px-16 py-12 font-[family-name:var(--font-geist-sans)]'>
            <div className='flex justify-between w-full max-h-min items-center'>
              <div className='cursor-pointer relative flex items-center justify-center size-11 rounded-xl bg-white/10 hover:text-yellow transition duration-300' onClick={handleClose}>
                <ImExit size={20}/>
              </div>
              <div className='flex gap-5'>
                <a href="forms/movementform">
                  <button className="group font-bold flex gap-2 py-2  border-[2px] border-transparent text-lightW bg-white/10 px-8 rounded-lg hover:text-green hover:border-green transition duration-300 w-full">Editar<FaEdit className='group-hover:text-green transition duration-300' size={20}/></button>
                </a>
                <a href="forms/movementform">
                  <button className="cursor-pointer relative flex items-center justify-center size-11 rounded-xl bg-white/10 hover:text-red transition duration-300"><FaTrash size={20}/></button>
                </a>
              </div>
            </div>
            <div className='mt-14'>
              <div className='flex gap-5'>
                <div className='max-w-fit rounded-full bg-lightW'>
                  <Image src={CorporationImage} alt="Corporation" width={100} height={100}/>
                </div>
                <div className='flex flex-col'>
                  <h2 className='text-2xl font-bold'>Acme Corporation</h2>
                  <p className='text-sm font-semibold text-lightW/30 uppercase tracking-wider mt-1'>Fornecedor de: </p>
                  <div className='flex mt-1 gap-2'>
                    <p className='text-sm font-bold py-1 px-3 bg-green rounded-lg'>Alimentos</p>
                    <p className='text-sm font-bold py-1 px-3 bg-primary rounded-lg'>Escritório</p>
                  </div>
                </div>

              </div>
            </div>
            <div className='flex gap-10 w-full mt-10 space-between'>
                  <div className='flex flex-col gap-4 w-[45%]'>
                    <div className='flex flex-col gap-1'>
                      <h2 className='text-lg font-bold'>Endereço</h2>
                      <div className='bg-blackThirdy w-full h-16 rounded-lg px-3 flex items-center'>
                        <p className='text-sm font-semibold'>R. dos Gerânios, 1805 - Lagoa Nova, Natal - RN, 59077-040</p>
                      </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <h2 className='text-lg font-bold'>Contato</h2>
                      <div className='bg-blackThirdy w-full rounded-lg flex p-5'>
                        <div className='flex flex-col w-full gap-3'>
                          <div className='flex gap-3 w-full justify-between items-center'>
                            <div className='flex gap-3'>
                              <div className='flex bg-primary w-16 h-16 rounded-full text-center items-center justify-center'>
                                <p className='text-3xl text-center font-bold'>MA</p>
                              </div>
                              <div className=' mt-2'>
                                <h2 className='text-lg font-bold'>Mariana Almeida</h2>
                                <p className='text-sm font-semibold'>Gestora</p>
                              </div>
                            </div>
                            <div className='cursor-pointer relative flex items-center justify-center gap-2 px-4 rounded-md py-3 font-semibold bg-white/10 hover:text-primary  transition duration-300'>
                              Entrar em contato<MdOutlineConnectWithoutContact size={20}/>
                            </div>
                          </div>

                          <div className='flex gap-2 items-center mt-4'>
                            <h2 className='text-sm font-bold text-lightW/50 uppercase tracking-wider'>Email:</h2>
                            <p className='text-md font-semibold'>cHx2u@example.com</p>
                          </div>

                          <div className='flex items-center w-full justify-between'>

                            <div className='flex gap-2 items-center'>
                              <h2 className='text-sm font-bold text-lightW/50 uppercase tracking-wider'>Telefone:</h2>
                              <p className='text-md font-semibold'>(84) 99999-9999</p>
                            </div>

                            <div className='cursor-pointer relative flex items-center justify-center size-8 rounded-xl bg-white/10 hover:text-green/50 text-green transition duration-300'>
                              <FaPlus size={14}/>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className='flex flex-col gap-1'>
                      <h2 className='text-lg font-bold'>Informações Judiciais</h2>
                      <div className='flex flex-col gap-3  bg-blackThirdy w-full rounded-lg p-5'>
                          <div className='flex gap-2 items-center'>
                            <h2 className='text-sm font-bold text-lightW/50 uppercase tracking-wider'>Razão Social:</h2>
                            <p className='text-md font-semibold'>Acme Corporation LTDA</p>
                          </div>

                          <div className='flex gap-2 items-center'>
                            <h2 className='text-sm font-bold text-lightW/50 uppercase tracking-wider'>CNPJ:</h2>
                            <p className='text-md font-semibold'>00.000.000/0000-00</p>
                          </div>

                      </div>
                    </div>

                  </div>
                  <div className='h-[100%] w-1 flex items-center bg-lightW/10 rounded-full'></div>
                  <div className='w-[50%]'>
                    <h2 className='text-lg font-bold mb-1'>Produtos <span className='text-lightW/50'>(<span className='text-primary'>12</span>)</span></h2>
                    <div className='flex flex-col gap-3'>
                      {/* <ProductCard name="Produto 1" category="Categoria 1" stock={10}/>
                      <ProductCard name="Produto 2" category="Categoria 1" stock={10}/>
                      <ProductCard name="Produto 3" category="Categoria 1" stock={10}/>
                      <ProductCard name="Produto 4" category="Categoria 1" stock={10}/>
                      <ProductCard name="Produto 5" category="Categoria 1" stock={10}/> */}
                    </div>
                  </div>
              </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}