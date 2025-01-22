import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import HeaderModal from './HeaderModal';

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

interface User {
  nameUser: string;
  role: string;
}

interface SectorData {
  idSector: number;
  name: string;
  headSector: string;
  unity: string | null;
  users: User[];
}

export default function TransitionsModalSector({ infoIdData }: { infoIdData: number }) {
  const [open, setOpen] = React.useState(false);
  const [sectorData, setSectorData] = React.useState<SectorData | null>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    if (infoIdData) {
      axios.get(`http://127.0.0.1:8000/api/sectors/${infoIdData}`)
        .then(response => {
          setSectorData(response.data);
        })
        .catch(error => {
          console.error("Error fetching sector data:", error);
        });
    }
  }, [infoIdData]);

  return (
    <div className='hover:bg-[#26475a] transition duration-300 rounded-md'>
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
            <HeaderModal handleClose={handleClose} />
            <div className='mt-8'>
              <div className='flex gap-5'>
                <div className='max-w-fit rounded-full bg-lightW'>
                  <div className='size-11 bg-primary rounded-full'></div>
                </div>
                <div className='flex items-center'>
                  <h2 className='text-2xl font-bold'>{sectorData?.name}</h2>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-10 w-full mt-10 space-between'>
              <div className='flex flex-col gap-4 w-[100%]'>
                <div className='flex flex-col gap-1'>
                  <h2 className='text-lg font-bold'>Unidade:</h2>
                  <div className='bg-blackThirdy w-full h-16 rounded-lg px-3 flex items-center'>
                    <p className='text-sm font-semibold'>{sectorData?.unity || 'Não Informado'}</p>
                  </div>
                </div>
                <div className='flex flex-col gap-1'>
                  <h2 className='text-lg font-bold'>Chefe de Departamento:</h2>
                  <div className='bg-blackThirdy w-full rounded-lg flex p-5'>
                    <div className='flex flex-col w-full gap-3'>
                      <div className='flex gap-3 w-full justify-between items-center'>
                        <div className='flex gap-3 items-center'>
                          <div className='flex bg-primary size-8 rounded-full text-center items-center justify-center'>
                            <p className='text-sm text-center font-bold'>IV</p>
                          </div>
                          <h2 className='text-sm font-bold'>{sectorData?.headSector}</h2>
                        </div>
                      </div>
                      <div className='flex gap-2 items-center mt-1'>
                        <h2 className='text-sm font-bold text-lightW/50 uppercase tracking-wider'>Email:</h2>
                        <p className='text-md font-semibold'>cHx2u@example.com</p>
                      </div>
                      <div className='flex items-center w-full justify-between'>
                        <div className='flex gap-2 items-center'>
                          <h2 className='text-sm font-bold text-lightW/50 uppercase tracking-wider'>Telefone:</h2>
                          <p className='text-md font-semibold'>(84) 99999-9999</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='h-[2px] w-[100%] flex items-center bg-lightW/10 rounded-full'></div>
              <div className='w-[100%]'>
                <h2 className='text-lg font-bold mb-1'>Funcionários <span className='text-lightW/50'>(<span className='text-primary'>{sectorData?.users.length}</span>)</span></h2>
                <div className='flex flex-col gap-2'>
                  {sectorData?.users.map((user, index) => (
                    <div key={index} className='bg-blackThirdy w-full gap-4 rounded-lg px-3 flex flex-col p-3'>
                      <p className='text-sm font-semibold'>{user.nameUser} <span>-</span> <span className='text-primary'>{user.role}</span></p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
