import { IoIosNotifications, IoIosStats } from "react-icons/io";
import { FaGear, FaCalendar, FaFolderOpen } from "react-icons/fa6";
import Avatar from  "../../public/memoji.png";
import { MdSpaceDashboard, MdInventory, MdPayments } from "react-icons/md";
import React from 'react'
import Image from "next/image";

const headerLinks = [
    {
        id: 1,
        title: "Dashboard",
        icon: <MdSpaceDashboard size={17}/>, 
        link: '/'
    },
    {
        id: 2,
        title: "Inventory",
        icon: <MdInventory size={20}/>,
        link: '/inventory'
    },
    {
        id: 3,
        title: "Supliers",
        icon: <MdPayments size={20}/>
    },
    {
        id: 4,
        title: "Orders",
        icon: <FaCalendar size={16}/>
    },
    {
        id: 5,
        title: "Report",
        icon: <IoIosStats size={20}/>
    },
    {
        id: 6,
        title: "Documents",
        icon: <FaFolderOpen size={18}/>
    }
]

function Header() {
  return (
    <div className="container mx-auto mt-7 z-50 flex min-w-[95vw] justify-between">
        <h1 className="font-black text-2xl tracking-wider text-primary">CorenStock</h1>
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
                <FaGear size={20}/>
            </div>

            <div className="cursor-pointer flex items-center justify-center rounded-full bg-lightW/15 backdrop-blur">
                <Image src={Avatar} alt="Avatar" width={40} height={40}/>
            </div>
        </div>
    </div>
  )
}

export default Header