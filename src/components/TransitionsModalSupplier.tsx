import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { ImExit } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Avatar from  "../../public/memoji.png";
import Image from 'next/image';

const style = {
  position: 'absolute',
  top: '50%',
  right: '-25%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
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
              <div className='cursor-pointer relative flex items-center justify-center size-11 rounded-xl bg-white/10 hover:text-yellow transition duration-300'>
                <ImExit size={20}/>
              </div>
              <div className='flex gap-5'>
                <a href="forms/movementform">
                  <button className="group font-bold flex gap-2 py-2  border-[2px] border-transparent text-lightW bg-white/10 px-8 rounded-lg hover:border-green transition duration-300 w-full">Editar<FaEdit className='group-hover:text-green transition duration-300' size={20}/></button>
                </a>
                <a href="forms/movementform">
                  <button className="cursor-pointer relative flex items-center justify-center size-11 rounded-xl bg-white/10 hover:text-red transition duration-300"><FaTrash size={20}/></button>
                </a>
              </div>
            </div>
            <div className='mt-14'>
              <div className='flex gap-5'>
                <div className='max-w-fit rounded-full bg-lightW'>
                  <Image src={Avatar} alt="Avatar" width={100} height={100}/>
                </div>
                <h2 className='text-xl font-bold'>Acme Corp.</h2>
              </div>

              <div>

              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}