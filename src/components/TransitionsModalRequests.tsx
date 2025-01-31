import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import HeaderModal from './HeaderModal';
import { ImExit } from 'react-icons/im';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';
import { GiConfirmed } from 'react-icons/gi';
import api from '@/app/api/axios';

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

interface Request {
  idRequest: number;
  describe: string;
  requestDate: string;
  quantity: number;
  product_name: string;
  user_name: string;
  sector_name: string;
  status: string;
}

export default function TransitionsModalRequests({ infoIdData }: { infoIdData: number }) {
  const [open, setOpen] = React.useState(false);
  const [request, setRequest] = React.useState<Request | null>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    if (infoIdData) {
      axios.get(`http://127.0.0.1:8000/api/requests/${infoIdData}`)
        .then(response => {
          setRequest(response.data);
        })
        .catch(error => {
          console.error("Error fetching request:", error);
        });
    }
  }, [infoIdData]);


  const handleUpdateRequest = async () => {
    try {
      const response = await api.patch(`http://127.0.0.1:8000/api/requests/${infoIdData}/update`);
      alert(response.data.message || 'A requisição foi aceitada com sucesso!');
      window.location.reload();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.error || 'Erro desconhecido');
      } else {
        console.error('Erro desconhecido:', error);
      }
    }
  };


  const handleDeleteRequest = async (id: number) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/requests/${id}`);
      alert(response.data.message);
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
                <div className='flex justify-between w-full max-h-min items-center'>
                  <div
                    className='cursor-pointer relative flex items-center justify-center size-11 rounded-xl bg-white/10 border-[2px] border-transparent hover:border-yellow hover:text-yellow transition duration-300'
                    onClick={handleClose}
                  >
                    <ImExit size={20} />
                  </div>
                  <div className='flex gap-5'>
                  
                    <button onClick={handleUpdateRequest} className="group font-bold flex gap-2 py-2 border-[2px] border-transparent text-lightW bg-white/10 px-8 rounded-lg hover:text-green hover:border-green transition duration-300 w-full">
                      Aceitar Pedido
                      <GiConfirmed className='group-hover:text-green transition duration-300' size={20} />
                    </button>
                  
                    <button
                      onClick={() => request?.idRequest && handleDeleteRequest(request.idRequest)} 
                      className="cursor-pointer relative flex items-center justify-center size-11 rounded-xl bg-white/10 hover:text-red border-[2px] border-transparent hover:border-red transition duration-300"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                </div>
            <div className='mt-8'>
              <div className='flex gap-5'>
                <div className='flex items-center'>
                  <h2 className='text-2xl font-bold'>REQ-00{request?.idRequest}</h2>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-10 w-full mt-3 space-between'>
              <div className='flex flex-col gap-4 w-[100%]'>
                <div className='flex flex-col gap-1'>
                  <h2 className='text-lg font-bold'>Informações do Pedido:</h2>
                  <div className='bg-blackThirdy w-full rounded-lg flex p-5'>
                    <div className='flex flex-col w-full'>
                      <div className='flex flex-col  gap-5 w-full'>
                        <div className='flex gap-2 items-center'>
                          <h2 className='text-sm font-bold text-lightW/50 uppercase tracking-wider'>Usuário:</h2>
                          <p className='text-md font-semibold'>{request?.user_name}</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                          <h2 className='text-sm font-bold text-lightW/50 uppercase tracking-wider'>Setor:</h2>
                          <p className='text-md font-semibold'>{request?.sector_name}</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                          <h2 className='text-sm font-bold text-lightW/50 uppercase tracking-wider'>Produto:</h2>
                          <p className='text-md font-semibold'>{request?.product_name}</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                          <h2 className='text-sm font-bold text-lightW/50 uppercase tracking-wider'>Quantidade:</h2>
                          <p className='text-md font-semibold'>{request?.quantity}</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                          <h2 className='text-sm font-bold text-lightW/50 uppercase tracking-wider'>Data:</h2>
                          <p className='text-md font-semibold'>{request?.requestDate ? formatDate(request.requestDate) : ''}</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                          <h2 className='text-sm font-bold text-lightW/50 uppercase tracking-wider'>Status:</h2>
                          <p className='text-md font-semibold'>{request?.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='h-[2px] w-[100%] flex items-center bg-lightW/10 rounded-full'></div>
              <div>
                  <h2 className='text-lg font-bold'>Descrição do Pedido:</h2>
                  <div className='bg-blackThirdy w-full rounded-lg flex p-5'>
                    <p className='text-md font-semibold'>{request?.describe}</p>
                  </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
