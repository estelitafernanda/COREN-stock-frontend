import { IoIosNotifications} from "react-icons/io";
import { FaCalendar} from "react-icons/fa6";
import Avatar from  "../../public/memoji.png";
import { MdSpaceDashboard, MdInventory, MdPayments, MdMeetingRoom } from "react-icons/md";
import { FaSun } from "react-icons/fa";
import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";

const headerLinks = [
    {
        id: 1,
        title: "Dashboard",
        icon: <MdSpaceDashboard size={17}/>, 
        link: '/'
    },
    {
        id: 2,
        title: "Pedidos",
        icon: <VscGitPullRequestNewChanges size={16}/>,
        link: '/requests'
    },
    {
        id: 3,
        title: "Movimentação",
        icon: <FaCalendar size={16}/>,
        link: '/movements'
    },
    {
        id: 4,
        title: "Inventario",
        icon: <MdInventory size={20}/>,
        link: '/inventory'
    },
    {
        id: 5,
        title: "Fornecedores",
        icon: <MdPayments size={20}/>,
        link: "/suppliers"
    },
    {
        id: 6,
        title: "Departamentos",
        icon: <MdMeetingRoom size={16}/>,
        link: '/departments'
    },

]

function Header() {
  return (
    <div className="container mx-auto mt-7 z-50 flex min-w-[95vw] justify-between">
        <Link href="/">
            <h1 className="font-black text-2xl tracking-wider text-primary">CorenStock</h1>
        </Link>
        <ul className='flex gap-6'>
            {headerLinks.map((link) => (
                <li key={link.id} className="group cursor-pointer max-h-min py-2 px-5 border border-white/15 rounded-full bg-white/5 backdrop-blur"><a href={link.link} className='text-sm font-semibold flex items-center gap-1 transition duration-300 group-hover:text-primary'>{link.icon}{link.title}</a></li>
            ))}
        </ul>
        <div className="flex gap-5 items-center">
            <div className="cursor-pointer relative flex items-center justify-center size-10 rounded-xl bg-white/10 backdrop-blur">
                <div className="absolute rounded-full size-2 top-0 -left-[3px] bg-red"></div>
                <IoIosNotifications size={25}/>     
            </div>

            <div className="cursor-pointer flex items-center justify-center size-10 rounded-xl bg-white/10 backdrop-blur">
                <FaSun size={20}/>
            </div>

            <div className="cursor-pointer flex items-center justify-center rounded-full bg-lightW/15 backdrop-blur">
                <Image src={Avatar} alt="Avatar" width={40} height={40}/>
            </div>
        </div>
    </div>
  )
}

export default Header