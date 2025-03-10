import React, {  useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { ImExit } from 'react-icons/im';
import { FaTrash } from 'react-icons/fa6';
import { GiConfirmed } from 'react-icons/gi';
import { useApiWithAuth } from '@/app/api/axios';
import { Alert } from '@mui/material';

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
  '@media (max-width: 1280px)': {
    width: '90%',
    right: '3%',
    transform: 'translate(0, -50%)',
    borderRadius: '10px',
    padding: '20px',
    margin: '10px 10px',
  }
};


interface Request {
  idRequest: number;
  describe: string;
  created_at: string;
  quantity: number;
  product_name: string;
  user_name: string;
  sector_name: string;
  status: string;
  type: string; 
}

export default function TransitionsModalRequests({ infoIdData }: { infoIdData: number }) {
  const [open, setOpen] = React.useState(false);
  const [request, setRequest] = React.useState<Request | null>(null);
  const api = useApiWithAuth(); // instância do hook
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    if (infoIdData) {
      api.get(`http://127.0.0.1:8000/api/requests/${infoIdData}`)
        .then(response => {
          setRequest(response.data);
        })
        .catch(error => {
          console.error("Error fetching request:", error);
        });
    }
  }, [infoIdData, api]);


  const handleUpdateRequest = async () => {
    try {
      const response = await api.patch(`http://127.0.0.1:8000/api/requests/${infoIdData}/update`);
      setAlert({ severity: 'success', message: 'Pedido aceito com sucesso' });
      setTimeout(() =>  window.location.reload(), 2500);
    } catch (error: unknown) {
      setAlert({ severity: 'error', message: 'Erro ao aceitar Pedido' });
        console.error('Erro desconhecido:', error);
    }
  };

  const [alert, setAlert] = useState<{ severity: 'success' | 'error'; message: string } | null>(null);

  const handleDeleteRequest = async (id: number) => {
    try {
      const response = await api.delete(`http://127.0.0.1:8000/api/requests/${id}`);
      setAlert({ severity: 'success', message: 'Pedido deletado com sucesso' });
      setTimeout(() =>  window.location.reload(), 2500);
    } catch (error: unknown) {
      if ((error)) {
        setAlert({ severity: 'error', message: 'Erro ao deletar Pedido' });
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
      <Button onClick={handleOpen} style={{ color: '#56cbec'}}>
        <p  className='items-center bg-transparent transition duration-300 hover:text-[#B4FFFF] flex rounded-lg text-xs md:text-sm xl:text-base font-semibold text-primary'>Ver Mais &gt;&gt;</p></Button>
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
                    
                  <button
                    onClick={handleUpdateRequest}
                    disabled={request?.status === 'aceito'}
                    className={`group font-bold flex gap-2 py-2 border-[2px] border-transparent text-lightW bg-white/10 px-2 md:px-8 rounded-lg transition duration-300 w-full ${
                      request?.status === 'aceito' ? 'opacity-50 cursor-not-allowed' : 'hover:text-green hover:border-green'
                    }`}
                  >
                    Aceitar Pedido
                    <GiConfirmed 
                      className={`transition duration-300 ${
                        request?.status === 'aceito' ? 'text-gray-500' : 'group-hover:text-green'
                      }`} 
                      size={20} 
                    />
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
                          <p className='text-md font-semibold'>{request?.created_at ? formatDate(request.created_at) : ''}</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                          <h2 className='text-sm font-bold text-lightW/50 uppercase tracking-wider'>Status:</h2>
                          <p className='text-md font-semibold'>{request?.status}</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                          <h2 className='text-sm font-bold text-lightW/50 uppercase tracking-wider'>Tipo:</h2>
                          <p className='text-md font-semibold'>{request?.type}</p>
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
            {alert && (
                      <Alert severity={alert.severity}>{alert.message}</Alert>
                  )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}