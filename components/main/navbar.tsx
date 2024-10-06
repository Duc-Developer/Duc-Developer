import Image from "next/image";
import Link from "next/link";

import { NAV_LINKS } from "@/constants";
import ThemeToggle from "../sub/theme-toggle";

const DesktopMenu = () => {
  return <div className="max-w-full flex justify-between gap-4 p-4 px-8">
    <Link
      href="/#about-me"
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

    <div className="w-[36em] h-full flex flex-row items-center justify-between">
      <div className="flex items-center justify-between w-full h-auto border-purple-heart-61 bg-gray-500 px-8 py-4 mr-4 rounded-full text-gray-200">
        {NAV_LINKS.map((link) => {
          return <Link
            key={link.title}
            href={link.link}
            className="cursor-pointer hover:text-purple transition"
          >
            {link.title}
          </Link>
        })}
      </div>
      <ThemeToggle />
    </div>
  </div>;
};

export const Navbar = () => {
  return <section>
    <div className="">
      <DesktopMenu />
    </div>
  </section>;
};
