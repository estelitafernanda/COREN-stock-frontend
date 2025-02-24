"use client";
import { IoIosNotifications } from "react-icons/io";
import { FaCalendar } from "react-icons/fa6";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import Avatar from  "../../public/memoji.png";
import { MdSpaceDashboard, MdInventory, MdPayments, MdMeetingRoom } from "react-icons/md";
import { FaSun, FaBars } from "react-icons/fa";
import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/contexts/KeycloakProvider";
import { ImExit } from "react-icons/im";
import NotificationModal from "./NotificationModal";

const headerLinks = [
    { id: 1, title: "Dashboard", icon: <MdSpaceDashboard size={17}/>, link: '/' },
    { id: 2, title: "Pedidos", icon: <VscGitPullRequestNewChanges size={16}/>, link: '/requests' },
    { id: 3, title: "Movimentação", icon: <FaCalendar size={16}/>, link: '/movements' },
    { id: 4, title: "Inventario", icon: <MdInventory size={20}/>, link: '/inventory' },
    { id: 5, title: "Fornecedores", icon: <MdPayments size={20}/>, link: "/suppliers" },
    { id: 6, title: "Departamentos", icon: <MdMeetingRoom size={16}/>, link: '/departments' },
]

function Header() {
    const { isAuthenticated, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
      <div className="mx-auto mt-7 z-50 flex flex-wrap w-full items-center justify-between px-4 md:px-8 lg:px-12">
        <Link href="/">
          <h1 className="font-black text-2xl tracking-wider text-primary">CorenStock</h1>
        </Link>
        <button className="xl:hidden text-primary" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars size={24} />
        </button>
        {/* Menu Hamburguer */}
        <ul className={`absolute top-16 left-0 w-full z-50 bg-blackPrimary p-5 flex flex-col gap-4 xl:hidden md:gap-6 transition-all duration-300 ease-in-out ${menuOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'}`}>
          {headerLinks.map((link) => (
            <li key={link.id} className="group cursor-pointer py-2 px-4 border border-white/15 rounded-full bg-white/5 backdrop-blur">
              <a href={link.link} className="text-sm font-semibold flex items-center gap-1 transition duration-300 group-hover:text-primary">
                {link.icon}
                {link.title}
              </a>
            </li>
          ))}
          <div className="flex gap-3 md:gap-5 items-center justify-center w-full">
            <NotificationModal />
            {isAuthenticated && (
              <div className="cursor-pointer flex items-center justify-center size-10 md:size-11 rounded-xl bg-white/10 border-[2px] border-transparent hover:border-yellow hover:text-yellow transition duration-300" onClick={logout}>
                <ImExit size={20} />
              </div>
            )}
            <div className="cursor-pointer flex items-center justify-center size-10 rounded-full bg-lightW/15 backdrop-blur">
              <Image src={Avatar} alt="Avatar" className="w-10 h-10 md:w-10 md:h-10" />
            </div>
          </div>
        </ul>
        {/* Menu Desktop */}
        <ul className="hidden xl:flex gap-2 items-center">
          {headerLinks.map((link) => (
            <li key={link.id} className="group cursor-pointer py-2 px-4 border border-white/15 rounded-full bg-white/5 backdrop-blur">
              <Link href={link.link} className="text-sm font-semibold flex items-center gap-1 transition duration-300 group-hover:text-primary">
                {link.icon}
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="gap-3 items-center hidden xl:flex">
          <NotificationModal />
          {isAuthenticated && (
            <div className="cursor-pointer flex items-center justify-center size-10 md:size-11 rounded-xl bg-white/10 border-[2px] border-transparent hover:border-yellow hover:text-yellow transition duration-300" onClick={logout}>
              <ImExit size={20} />
            </div>
          )}
          <div className="cursor-pointer flex items-center justify-center rounded-full bg-lightW/15 backdrop-blur">
            <Image src={Avatar} alt="Avatar" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10" />
          </div>
        </div>
      </div>
    );
}

export default Header;
