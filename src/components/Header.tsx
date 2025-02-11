"use client";
import { IoIosNotifications } from "react-icons/io";
import { FaCalendar } from "react-icons/fa6";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";

import Avatar from  "../../public/memoji.png";
import { MdSpaceDashboard, MdInventory, MdPayments, MdMeetingRoom } from "react-icons/md";
import { FaSun } from "react-icons/fa";
import React from 'react'
import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@/app/contexts/KeycloakProvider";
import { ImExit } from "react-icons/im";
import NotificationModal from "./NotificationModal";

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
    const { isAuthenticated, logout } = useAuth();
  
    console.log("Usuário autenticado?", isAuthenticated);
  
    return (
      <div className="container mx-auto mt-7 z-50 flex min-w-[95vw] justify-between">
        <Link href="/">
          <h1 className="font-black text-2xl tracking-wider text-primary">CorenStock</h1>
        </Link>
        <ul className="flex gap-6 md:bg-none">
          {headerLinks.map((link) => (
            <li
              key={link.id}
              className="group cursor-pointer max-h-min py-2 px-5 border border-white/15 rounded-full bg-white/5 backdrop-blur"
            >
              <a href={link.link} className="text-sm font-semibold flex items-center gap-1 transition duration-300 group-hover:text-primary">
                {link.icon}
                {link.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex gap-5 items-center">
          
          <NotificationModal />
  
          <div className="cursor-pointer flex items-center justify-center size-10 rounded-xl bg-white/10 backdrop-blur">
            <FaSun size={20} />
          </div>
  
          {isAuthenticated && (
            <div
              className="cursor-pointer relative flex items-center justify-center size-11 rounded-xl bg-white/10 border-[2px] border-transparent hover:border-yellow hover:text-yellow transition duration-300"
              onClick={logout}
            >
              <ImExit size={20} />
            </div>
          )}
  
          <div className="cursor-pointer flex items-center justify-center rounded-full bg-lightW/15 backdrop-blur">
            <Image src={Avatar} alt="Avatar" width={40} height={40} />
          </div>
        </div>
      </div>
    );
  }

export default Header