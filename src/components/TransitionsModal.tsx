import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { IoIosAdd } from "react-icons/io";
import Image from 'next/image';
import axios from 'axios';
import { ImExit } from 'react-icons/im';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';
import api from '@/app/api/axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '68%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  height: '100vh',
  bgcolor: '#1a262d',
  border: '2px solid #202e36',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};

interface Product {
  idProduct: number;
  code: string;
  idDepartment: number;
  nameProduct: string;
  category: string;
  describe: string;
  minQuantity: number;
  currentQuantity: number;
  location: string;
  validity: string;
  unitPrice: number;
  image: string;
  created_at: string | null;
  updated_at: string | null;
}

export default function TransitionsModal({idProduct}: {idProduct: number}) {
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = React.useState<Product | null>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    if (idProduct) {
      axios.get(`http://127.0.0.1:8000/api/products/${idProduct}`)
        .then(response => {
          setProduct(response.data);
        })
        .catch(error => {
          console.error("Error fetching sector data:", error);
        });
    }
  }, [idProduct]);

  const handleDeleteRequest = async (id: number) => {
    try {
      const response = await api.delete(`http://127.0.0.1:8000/api/products/${id}`);
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

  return (
    <div>
      <Button onClick={handleOpen} className='normal-case text-primary font-black items-center bol border bg-transparent transition duration-300 hover:text-[#B4FFFF] flex py-2 px-5 rounded-lg'  style={{ color: '#56cbec' , fontWeight: 'bold' }}>mais informações &gt;&gt;</Button>
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
          <Box sx={style} className='flex flex-col items-center py-12 font-[family-name:var(--font-geist-sans)]'>
              <div className='flex justify-between w-full max-h-min items-center'>
                  <div
                    className='cursor-pointer relative flex items-center justify-center size-11 rounded-xl bg-white/10 border-[2px] border-transparent hover:border-yellow hover:text-yellow transition duration-300'
                    onClick={handleClose}
                  >
                    <ImExit size={20} />
                  </div>
                  <div className='flex gap-5'>
                    <a href={`edit/product/${idProduct}`}>
                      <button className="group font-bold flex gap-2 py-2 border-[2px] border-transparent text-lightW bg-white/10 px-8 rounded-lg hover:text-green hover:border-green transition duration-300 w-full">
                        Editar
                        <FaEdit className='group-hover:text-green transition duration-300' size={20} />
                      </button>
                    </a>
                    <button
                      onClick={() => product?.idProduct && handleDeleteRequest(idProduct)} 
                      className="cursor-pointer relative flex items-center justify-center size-11 rounded-xl bg-white/10 hover:text-red border-[2px] border-transparent hover:border-red transition duration-300"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
              </div>
            <div className='flex items-center py-12 font-[family-name:var(--font-geist-sans)]'>
              <div className='bg-lightW h-fit rounded-lg border-[3px] border-primary/50'>
                <Image src={`http://127.0.0.1:8000/images/products/${product?.image}`} alt="Avatar" width={800} height={800}/>
              </div>
              <div className='w-full ml-7 mt-1'>
              <div className='flex flex-col gap-2 border-b-[2px] pb-3 border-lightW/20'>
                      <div className='flex flex-col gap-1'>
                        <h2 className='text-md font-bold tracking-wide uppercase text-lightW/50'>Nome do Produto:</h2>
                        <p className='text-xl font-bold text-lightW bg-[#2f3d46] px-3 py-[2px] items-center rounded-md w-fit'>{product?.nameProduct}</p>
                      </div>
                      <div className='flex flex-col gap-1'>
                        <h2 className='text-md font-bold tracking-wide uppercase text-lightW/50'>Categoria:</h2>
                        <p className='text-xl font-bold text-lightW bg-[#2f3d46] px-3 py-[2px] items-center rounded-md w-fit '>{product?.category}</p>
                      </div>
                  </div>
                  <div className='py-3'>
                      <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <h2 className='text-md font-bold tracking-wide uppercase text-lightW/50'>Valor Unitário: </h2>
                            <p className='text-xl w-fit font-bold bg-green rounded-md text-blackPrimary px-3'>R${product?.unitPrice}</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h2 className='text-md font-bold tracking-wide uppercase text-lightW/50'>Validade: </h2>
                            <p className='text-xl w-fit font-bold bg-red rounded-md text-blackPrimary px-3'>{product?.validity}</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h2 className='text-md font-bold tracking-wide uppercase text-lightW/50'>Quantidade em estoque: </h2>
                            <p className='text-xl w-fit font-bold bg-[#2f3d46] rounded-md text-lightW px-3'>{product?.currentQuantity}</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h2 className='text-md font-bold tracking-wide uppercase text-lightW/50'>descrição: </h2>
                            <p className='text-base w-fit font-semibold bg-[#2f3d46] rounded-md text-lightW px-3'>{product?.describe}</p>
                        </div>
                          <div>
                            <a href="forms/movement">
                              <button className="border gap-1 items-center border-primary bg-primary transition duration-300 hover:bg-transparent hover:text-primary flex mt-2 py-2 px-5 rounded-lg text-md font-semibold text-blackPrimary">Fazer Pedido<IoIosAdd size={20}/></button>
                            </a>
                          </div>
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