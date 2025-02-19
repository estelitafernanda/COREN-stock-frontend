import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import api from '@/app/api/axios';
import { FaTrash } from 'react-icons/fa6';
import { ImExit } from 'react-icons/im';
import { FaEdit } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import NotificationCard from './NotificationCard';

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

interface Notification {
  id: number;
  message: string;
  status: string;
  idRequest: number;
  created_at: string;
  updated_at: string;
}

export default function NotificationModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  function getInitials(headSector: string): string {
    const words = headSector.split(' ');
    const initials = words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('');
    return initials;
  }
  
  React.useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get('http://127.0.0.1:8000/api/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className='rounded-md'>
          <div className="cursor-pointer relative flex items-center justify-center size-10 rounded-xl bg-white/10 backdrop-blur hover:bg-[#26475a] transition duration-300 " onClick={handleOpen}>
            <div className="absolute rounded-full size-2 top-0 -left-[3px] bg-red"></div>
            <IoIosNotifications size={25} />
          </div>
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
                <span className='flex items-center gap-3'>
                 <h1 className='font-black text-2xl tracking-wider text-white'>Notificações:</h1>
                 <p className='font-semibold text-primary text-sm bg-white/10 py-1 px-2 rounded-full'>{notifications.length}</p>
                </span>

                <div
                className='cursor-pointer relative flex items-center justify-center size-11 rounded-xl bg-white/10 border-[2px] border-transparent hover:border-yellow hover:text-yellow transition duration-300'
                onClick={handleClose}
                >
                  <ImExit size={20} />
                </div>
              </div>
              <div className='mt-4 px-4 overflow-y-auto max-h-[70vh] custom-scrollbar'>
              {notifications.map(notification => (
                <NotificationCard 
                  key={notification.id} 
                  message={notification.message} 
                  date={new Date(notification.created_at).toLocaleDateString()} 
                  id={notification.id} 
                  status={notification.status}
                />
              ))}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
