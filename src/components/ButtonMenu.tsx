import * as React from 'react';
import { styled,} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import { AiFillProduct } from "react-icons/ai";
import MenuItem from '@mui/material/MenuItem';
import { FaBoxesPacking } from "react-icons/fa6";
import { HiBriefcase } from "react-icons/hi2";
import { MdMoveDown } from "react-icons/md";
import Divider from '@mui/material/Divider';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ }) => ({
//   '& .MuiPaper-root': {
//     borderRadius: 6,
//     marginTop: theme.spacing(1),
//     minWidth: 180,
//     color: 'rgb(55, 65, 81)',
//     boxShadow:
//       'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
//     '& .MuiMenu-list': {
//       padding: '4px 0',
//     },
//     '& .MuiMenuItem-root': {
//       '& .MuiSvgIcon-root': {
//         fontSize: 18,
//         color: theme.palette.text.secondary,
//         marginRight: theme.spacing(1.5),
//       },
//       '&:active': {
//         backgroundColor: alpha(
//           theme.palette.primary.main,
//           theme.palette.action.selectedOpacity,
//         ),
//       },
//     },
//     ...theme.applyStyles('dark', {
//       color: theme.palette.grey[300],
//     }),
//   },
}));

export default function ButtonMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        className='normal-case items-center bg-primary transition duration-300 hover:bg-blackThirdy hover:text-primary flex py-2 px-5 rounded-lg text-base font-semibold text-blackPrimary'
        aria-expanded={open ? 'true' : undefined}


        onClick={handleClick}
        // endIcon={<KeyboardArrowDownIcon />}
      >
        Ação Rápida
      </button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className='mt-2 ml-8'
      >
        <a href="/forms/product" >
        <MenuItem onClick={handleClose} disableRipple className='flex gap-1 text-sm tracking-widest font-semibold  text-blackPrimary'>
          <AiFillProduct />
          Adicionar Produto
        </MenuItem>
        </a>
        <Divider sx={{ my: 0.5 }} />
        <a href="/forms/department">
        <MenuItem onClick={handleClose} disableRipple className='flex gap-1 text-sm tracking-widest font-semibold text-blackPrimary'>
          <HiBriefcase />
          Adicionar Setor
        </MenuItem>
        </a>
        <Divider sx={{ my: 0.5 }} />
        <a href="/forms/supplier">
        <MenuItem onClick={handleClose} disableRipple className='flex gap-1 text-sm tracking-widest font-semibold text-blackPrimary'>
            <FaBoxesPacking />
            Adicionar Fornecedor
        </MenuItem>
        </a>
        <Divider sx={{ my: 0.5 }} />
        <a href="/forms/request">
        <MenuItem onClick={handleClose} disableRipple className='flex gap-1 text-sm tracking-widest font-semibold text-blackPrimary'>
            <MdMoveDown />
            Solicitar Movimento
        </MenuItem>
        </a>
      </StyledMenu>
    </div>
  );
}