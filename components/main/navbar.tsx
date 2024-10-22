import Image from "next/image";
import Link from "next/link";

import { NAV_LINKS } from "@/constants";
import ThemeToggle from "../sub/theme-toggle";
import { classNames } from "@/lib/utils";

export const MenuLink = ({ onClick }: { onClick?: Function }) => {

  return <>
    {NAV_LINKS.map((link) => {
      return <Link
        key={link.title}
        href={link.link}
        onClick={() => onClick && onClick(link)}
        className={classNames(
          "h-full min-w-24 text-center rounded-full py-2 px-2",
          "cursor-pointer hover:text-accent300 transition hover:bg-white100 hover:text-black100",
          "transition-colors duration-300 ease-in group"
        )}
      >
        <span className="inline-block group-hover:animate-float300">{link.title}</span>
      </Link>
    })}
  </>
};

const DesktopMenu = () => {
  return <div className="max-w-full flex justify-between gap-4 py-4 px-8">
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
      <div className={classNames(
        "flex items-center justify-between w-full h-auto",
        "px-8 mr-4 rounded-full",
        "bg-astronaut50 backdrop-blur15 border border-white100 text-gray200 overflow-hidden"
      )}>
        <MenuLink />
      </div>
      <ThemeToggle />
    </div>
  </div>;
};

export const Navbar = () => {
  return <section className="hidden md:block md:sticky top-0 z-[1000]">
      <DesktopMenu />
  </section>;
};
