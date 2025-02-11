import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { BiSolidErrorAlt } from "react-icons/bi";
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { ImExit } from "react-icons/im";
import {FaLongArrowAltRight } from "react-icons/fa";
import api from '@/app/api/axios';
import axios from 'axios';
import { GiConfirmed } from 'react-icons/gi';

const style = {
  position: 'absolute',
  top: '50%',
  right: '-15%',
  transform: 'translate(-50%, -50%)',
  width: "30%",
  height: "100vh",
  bgcolor: '#1a262d',
  border: '2px solid #202e36',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};

interface Movement {
  quantity: number;
  movementDate: string;
  movementStatus: string;
  product_price: number;
  idUserResponse: number | null;
  idRequest: number;
  product_name: string;
  currentQuantity: number;
  user_name_request: string;
  user_sector: string;
  request_describe: string;
}

export default function TransitionsModalMovement({ id }: { id: number; }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [movement, setMovement] = React.useState<Movement | null>(null);
  React.useEffect(() => {
    if (id) {
      api.get(`http://127.0.0.1:8000/api/movements/${id}`)
        .then(response => {
          setMovement(response.data);
        })
        .catch(error => {
          console.error("Error fetching sector data:", error);
        });
    }
  }, [id]);

  const handleUpdateRequest = async () => {
    try {
      const response = await api.patch(`http://127.0.0.1:8000/api/movements/${id}/update`);
      alert(response.data.message || 'Movimento atualizado com sucesso!');
      window.location.reload();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.error || 'Erro desconhecido');
      } else {
        console.error('Erro desconhecido:', error);
      }
    }
  };


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <Button onClick={handleOpen} style={{ color: '#56cbec', fontWeight: 'bold' }} className='normal-case items-center border bg-transparent transition duration-300 hover:text-[#B4FFFF] flex py-2 px-5 rounded-lg text-base font-semibold text-primary'>mais informações &gt;&gt;</Button>
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
              <div
                className='cursor-pointer relative flex items-center justify-center size-11 rounded-xl bg-white/10 border-[2px] border-transparent hover:border-yellow hover:text-yellow transition duration-300'
                onClick={handleClose}
              >
                <ImExit size={20} />
              </div>
              <div className='flex gap-5'>
                {movement?.movementStatus === 'entregue' ? (
                  <button 
                    disabled
                    className="group font-bold flex gap-2 py-2 border-[2px] border-transparent text-lightW bg-white/10 px-8 rounded-lg transition duration-300 w-full items-center opacity-50 cursor-not-allowed"
                  >
                    Entregue
                    <GiConfirmed  
                      className="text-gray-500" 
                      size={20} 
                    />
                  </button>
                ) : (
                  (movement?.quantity ?? 0) > (movement?.currentQuantity ?? 0) ? (
                    <>
                      <button 
                        disabled
                         className="group font-bold flex gap-2 py-2 border-[2px] border-transparent text-red bg-white/10 px-8 rounded-lg transition duration-300 max-w-max items-center opacity-80 cursor-not-allowed ml-5"
                      >
                        Quantidade Indisponível
                        <BiSolidErrorAlt className='size-5'/>
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={handleUpdateRequest}
                      className="group font-bold flex gap-2 py-2 border-[2px] border-transparent text-lightW bg-white/10 px-8 rounded-lg transition duration-300 w-full items-center hover:text-green hover:border-green"
                    >
                      Entregue
                      <GiConfirmed  
                        className="transition duration-300 group-hover:text-green" 
                        size={20} 
                      />
                    </button>
                  )
                )}
              </div>
            </div>
            <div className='mt-5 flex py-6 gap-5 bg-blackSecondary font-[family-name:var(--font-geist-sans)] rounded-md'>
              <div className='w-50%'>
                <div className='flex flex-col gap-2 border-b-[2px] pb-3 border-lightW/20'>
                  <span className='flex gap-3 items-center'>
                    <h2 className='text-3xl font-black text-primary tracking-wider uppercase'>MO - 00{id}</h2>
                    <div className="w-[2px] h-6 bg-lightW/50"></div>
                    <h2 className='text-3xl font-black tracking-wider uppercase text-lightW'>{movement?.product_name}</h2> 
                  </span>

                  <span className='flex gap-1'>
                    <p className='font-bold text-lightW/50'>Licitante: </p>
                    <p className='font-bold'>{movement?.user_name_request}</p>
                  </span>
                  <span className='flex gap-1'>
                    <p className='font-bold text-lightW/50'>Movimentação: </p>
                    <span className='flex items-center gap-3 '>
                      <p className='text-lightW font-bold'>Almoxarifado</p>
                      <FaLongArrowAltRight className='text-primary'/>
                      <p className='text-lightW font-bold'>{movement?.user_sector}</p>
                    </span>
                  </span>
                  <span className='flex gap-1'>
                    <p className='font-bold text-lightW/50'>Data: </p>
                    <p className='font-bold'>{formatDate(movement?.movementDate ?? '')}</p>
                  </span>
                </div>
                <div className='flex flex-col gap-2 border-b-[2px] py-5 border-lightW/20'>
                  <h2 className='text-3xl font-black text-lightW tracking-wider uppercase mb-1'>Detalhes do movimento:</h2>
                  <span className='flex gap-1 items-center'>
                    <p className='font-bold text-lightW/50'>Valor do Produto: </p>
                    <h2 className='text-xl font-bold'>R${movement?.product_price}</h2>
                  </span>
                  <span className='flex gap-1'>
                    <p className='font-bold text-lightW/50'>Quantidade em estoque: </p>
                    <p className='font-bold'>{movement?.quantity}</p>
                  </span>
                  <span >
                    <p className='font-bold text-lightW/50'>Descrição: </p>
                    <p className='w-[50%] font-bold'>{ movement?.request_describe }</p>
                  </span>
                  <div className='flex flex-col gap-3'>
                    <span className='flex gap-2 items-center'>
                      <p className='text-xl font-bold text-lightW/50'>Status:</p>
                      <p className={movement?.movementStatus === 'entregue' ? 'text-green text-lg font-bold border-[2px] border-green rounded-full px-3 w-fit' : 'text-red text-lg font-bold border-[2px] border-red rounded-full px-3 w-fit'}>{movement?.movementStatus}</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}