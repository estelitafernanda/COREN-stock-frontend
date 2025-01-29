import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import Button from '@mui/material/Button';
import { ImExit } from "react-icons/im";
import { FaEdit, FaLongArrowAltRight,} from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import axios from 'axios';

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
interface Movement{
  idMovement: number;
  quantity: number;
  movementDate: string;
  movementStatus: string;
  idUserResponse: number | null;
  idRequest: number;
  product_name: string;
  currentQuantity: number;
  user_name_request: string;
  sector_name: string;
  request_describe: string; 

}

export default function TransitionsModalMovements({ infoIdData }: { infoIdData: number }) {
  const [open, setOpen] = React.useState(false);
  const [movement, setMovement] = React.useState<Movement | null>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    if (infoIdData) {
      axios.get(`http://127.0.0.1:8000/api/movements/${infoIdData}`)
        .then(response => {
          setMovement(response.data);
        })
        .catch(error => {
          console.error("Error fetching movement:", error);
        });
    }
  }, [infoIdData]);

  const handleDeleteRequest = async (id: number) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/movements/${id}`);
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
                  <a href={`/edit/movements/${movement?.idMovement}`}>
                    <button className="group font-bold flex gap-2 py-2 border-[2px] border-transparent text-lightW bg-white/10 px-8 rounded-lg hover:text-green hover:border-green transition duration-300 w-full">
                      Editar
                      <FaEdit className='group-hover:text-green transition duration-300' size={20} />
                    </button>
                  </a>
                <button
                  onClick={()=> movement?.idMovement && handleDeleteRequest(movement.idMovement)}  
                  className="cursor-pointer relative flex items-center justify-center size-11 rounded-xl bg-white/10 hover:text-red bordeborder-transparent hover:border-red transition duration-300"
                >
                  <FaTrash size={20} />
                </button>
                </div>
              </div>
          <div className='mt-5 flex py-6 gap-5 bg-blackSecondary font-[family-name:var(--font-geist-sans)] 
          rounded-md'>

            <div className='flex items-center justify-center bg-blackThirdy min-h-[calc(100vh-20rem)] w-[50%] p-5  rounded-lg'>
                {/* <Image src={Trash} alt="Avatar" className='w-full'/> */}
            </div>
            <div className='w-50%'>
                <div className='flex flex-col gap-2 border-b-[2px] pb-3 border-lightW/20'>
                    <span className='flex gap-3 items-center'>
                    <h2 className='text-3xl font-black text-primary'>MO - 00000{movement?.idRequest}</h2>
                    <div className="w-[2px] h-6 bg-lightW/50"></div>
                    <h2 className='text-3xl font-black text-lightW'>{movement?.product_name}</h2> 
                    </span>

                    <span className='flex gap-1'>
                        <p className='font-black'>Licitante: </p>
                        <p className='text-lightW/50'>{movement?.user_name_request}</p>
                    </span>
                    <span className='flex gap-1'>
                        <p className='font-black'>Movimentação: </p>
                        <span className='flex items-center gap-3 '>
                            <p className='text-lightW font-bold'>{movement?.sector_name}</p>
                            <FaLongArrowAltRight className='text-primary'/>
                            <p className='text-lightW font-bold'>{movement?.sector_name}</p>
                        </span>

                    </span>
                    <span className='flex gap-1'>
                        <p className='font-black'>Data: </p>
                        <p className='text-lightW/50'>{movement?.movementDate ? formatDate(movement.movementDate) : ''}</p>
                    </span>
                </div>
                <div className='flex flex-col gap-2 border-b-[2px] py-5 border-lightW/20'>
                    <h2 className='text-3xl font-black text-lightW'>Detalhes do produto em movimento:</h2>
                    <span className='flex gap-1'>
                        <p className='font-black'>Quantidade em estoque: </p>
                        <p className='text-red'>{movement?.currentQuantity}</p>
                    </span>
                    <span >
                        <p className='font-black'>Descrição: </p>
                        <p className='w-[50%] text-lightW/50'>{movement?.request_describe}</p>
                    </span>
                </div>
                <div className='py-5 flex flex-col gap-3'>
                    <span className='flex gap-2 items-center'>
                        <p className='text-xl font-black text-lightW'>Situação:</p>
                        <p className='text-yellow text-lg font-bold border-[2px] border-yellow rounded-full px-3 w-fit'>{movement?.movementStatus}</p>
                    </span>
                    <span className='flex gap-2 items-center'>
                        <p className='text-xl font-black text-lightW'>Status:</p>
                        <p className='text-green text-lg font-bold border-[2px] border-green rounded-full px-3 w-fit'>{movement?.movementStatus}</p>
                    </span>
                    <span className='flex gap-2 items-center'>
                        <p className='text-xl font-black text-lightW'>Quantidade pedida:</p>
                        <p className='text-primary text-lg font-bold border-[2px] border-primary rounded-full px-3 w-fit'>{movement?.quantity}</p>
                    </span>
                </div>
            </div>
        </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}