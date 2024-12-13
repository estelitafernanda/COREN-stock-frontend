import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Trash from '../../public/lixeira.png';
import Image from 'next/image';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1100,
  height: 400,
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
          <Box sx={style} className='flex items-center py-12'>
            <div className='bg-lightW h-fit rounded-md'>
              <Image src={Trash} alt="Avatar" width={500} height={500}/>
            </div>
            <div className='h-[340px] w-full ml-7 mt-1'>
              <h1 className='font-bold text-2xl'>Lixeira de Aço Acabamento Polido Tramontina</h1>
              <div>
                <div></div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}