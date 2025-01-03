import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Trash from '../../public/lixeira.png';
import { IoIosAdd } from "react-icons/io";
import Image from 'next/image';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1100,
  height: 500,
  bgcolor: '#1a262d',
  border: '2px solid #56cbec',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal() {
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
          <Box sx={style} className='flex items-center py-12 font-[family-name:var(--font-geist-sans)]'>
            <div className='bg-lightW h-fit rounded-md'>
              <Image src={Trash} alt="Avatar" width={800} height={800}/>
            </div>
            <div className='w-full ml-7 mt-1'>
            <div className='flex flex-col gap-2 border-b-[2px] pb-3 border-lightW/20'>
                    <h2 className='text-3xl font-bold text-lightW'>Lixeira de Aço Polido Tramontina</h2>
                    <span className='flex gap-1'>
                        <p className='font-black'>Fornecedor: </p>
                        <p className='text-lightW/50'>Aluminio e metais corp.</p>
                    </span>
                    <span className='flex gap-1'>
                        <p className='font-black'>Número de compras: </p>
                        <p className='text-lightW/50'>780</p>
                    </span>
                    <span className='flex gap-1'>
                        <p className='font-black'>Categoria: </p>
                        <p className='text-lightW/50'>Limpeza</p>
                    </span>
                </div>
                <div className='py-3'>
                    <div className='flex flex-col gap-2'>
                      <span className='flex gap-1 items-center'>
                          <p className='font-black'>Valor Unitário: </p>
                          <h2 className='text-xl font-bold text-green'>R$ 380,00</h2>
                      </span>
                      <span className='flex gap-1'>
                          <p className='font-black'>Validade: </p>
                          <p className='text-lightW/50'>Nenhuma</p>
                      </span>
                      <span className='flex gap-1'>
                          <p className='font-black'>Quantidade em estoque: </p>
                          <p className='text-red'>1</p>
                      </span>
                      <span >
                          <p className='font-black'>Descrição: </p>
                          <p className='w-[50%] text-lightW/50'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolor accusantium quisquam quod. Repellendus, unde iste labore</p>
                      </span>
                        <div>
                        <a href="forms/movementform">
                        <button className="border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex mt-2 py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary">Realizar Movimentação<IoIosAdd size={20}/></button>
                        </a>
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