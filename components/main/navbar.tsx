import Image from "next/image";
import Link from "next/link";

import { NAV_LINKS, SOCIALS } from "@/constants";
import { clsx } from "clsx";
import { CiLinkedin } from "react-icons/ci";
import { GiSkills } from "react-icons/gi";
import { FaBlog } from "react-icons/fa";
import { RiContactsBook3Line } from "react-icons/ri";
import { GrProjects } from "react-icons/gr";

const MobileMenu = () => {
  return <div className={clsx(
    "w-screen h-[3rem] fixed bottom-0 z-50 px-5",
    "bg-[#03001427] border-t-4 border-t-[#b49bff] backdrop-blur-md shadow-lg shadow-[#2A0E61]/50",
    "flex flex-row justify-between items-center"
  )}>
    <div className={clsx(
      "w-[3em] h-[3em] p-1 bg-[#000000]",
      "rounded-full overflow-hidden cursor-pointer",
      "absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
      "border-4 border-[#b49bff]"
    )}>
      <Link
        href="#about-me"
        className="h-auto w-auto flex flex-row items-center"
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={50}
          height={50}
          draggable={false}
          className="cursor-pointer hover:animate-slowspin"
        />
      </Link>
    </div>
    <div className="flex flex-row justify-between items-center gap-8">
      <Link
        href="#projects"
        className="h-auto w-auto flex flex-row items-center active:scale-110"
      >
        <GrProjects size={25} color="white" />
      </Link>
      <Link
        href="#skills"
        className="h-auto w-auto flex flex-row items-center active:scale-110"
      >
        <GiSkills size={25} color="white" />
      </Link>
    </div>
    <div className="flex flex-row justify-between items-center gap-8">
      <Link
        href="#blogs"
        className="h-auto w-auto flex flex-row items-center active:scale-110"
      >
        <FaBlog size={25} color="white" />
      </Link>
      <a href="https://www.linkedin.com/in/david-chan-0b7103212" target="_blank">
        <CiLinkedin size={35} color="white" />
      </a>
    </div>
  </div>
};

const DesktopMenu = () => {
  return <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001427] backdrop-blur-md z-50 px-10">
    <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
      <Link
        href="#about-me"
        className="h-auto w-auto flex flex-row items-center"
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={50}
          height={50}
          draggable={false}
          className="cursor-pointer hover:animate-slowspin"
        />
        <div className="font-bold ml-[10px] block text-gray-300">
          David Chan
        </div>
      </Link>

      <div className="w-[500px] h-full flex flex-row items-center justify-between md:mr-20">
        <div className="flex items-center justify-between w-full h-auto border-[rgba(112,66,248,0.38)] bg-[rgba(3,0,20,0.37)] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.title}
              href={link.link}
              className="cursor-pointer hover:text-[rgb(112,66,248)] transition"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-row gap-5">
        {SOCIALS.map(({ link, name, icon: Icon }) => (
          <Link
            href={link}
            target="_blank"
            rel="noreferrer noopener"
            key={name}
            className="hover:scale-110 transition"
          >
            <Icon className="h-6 w-6 text-white" />
          </Link>
        ))}
      </div>
    </div>
  </div>
};

export const Navbar = () => {
  return <>
    <div className="hidden sm:block">
      <DesktopMenu />
    </div>
    <div className="sm:hidden">
      <MobileMenu />
    </div>
  </>;
};
