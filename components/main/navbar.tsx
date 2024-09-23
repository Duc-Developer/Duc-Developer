import Image from "next/image";
import Link from "next/link";

import { NAV_LINKS, SOCIALS } from "@/constants";
import { clsx } from "clsx";
import { CiLinkedin } from "react-icons/ci";
import { GiSkills } from "react-icons/gi";
import { FaBlog } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";

const MobileMenu = () => {
  return <div className={clsx(
    "w-screen h-[3rem] fixed bottom-0 z-50 px-5",
    "bg-black-pearl-27 border-t-4 border-t-electric-violet backdrop-blur-md shadow-lg shadow-[#2A0E61]/50",
    "flex flex-row justify-between items-center"
  )}>
    <div className={clsx(
      "w-[4em] h-[4em] p-1 bg-black",
      "rounded-full overflow-hidden cursor-pointer",
      "absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
      "border-4 border-electric-violet"
    )}>
      <Link
        href="#about-me"
        className="h-auto w-auto flex flex-row items-center"
        title="home"
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={50}
          height={50}
          draggable={false}
          className="cursor-pointer hover:animate-slowspin p-1"
        />
      </Link>
    </div>
    <div className="flex flex-row justify-between items-center gap-8">
      <Link
        href="#projects"
        className="h-auto w-auto flex flex-row items-center active:scale-110"
        title="projects"
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
      <a
        href={NAV_LINKS.find(l => l.title === "Blogs")?.backLink} target="_blank"
        className="h-auto w-auto flex flex-row items-center active:scale-110"
        title="blog"
      >
        <FaBlog size={25} color="white" />
      </a>
      <a href="https://www.linkedin.com/in/david-chan-0b7103212" target="_blank" title="linkedin">
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
        <div className="flex items-center justify-between w-full h-auto border-purple-heart-61 bg-gray-500 mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
          {NAV_LINKS.map((link) => {
            if (link.title === 'Blogs') {
              return <a
                key={link.title}
                href={link.backLink}
                target="_blank"
                className="cursor-pointer hover:text-purple-heart transition"
              >
                {link.title}
              </a>
            }
            return <Link
              key={link.title}
              href={link.link}
              className="cursor-pointer hover:text-purple-heart transition"
            >
              {link.title}
            </Link>
          })}
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
