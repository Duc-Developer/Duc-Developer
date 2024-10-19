"use client";

import { CONTACTS, SOCIALS } from "@/constants";
import { classNames } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import LanguageToggle from "../sub/language-toggle";
import { MenuLink } from "./navbar";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaHome } from "react-icons/fa";

const Sidebar = () => {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(true);

    useEffect(() => {
        const collapsed = localStorage.getItem('sidebarCollapsed');
        console.log({collapsed})
        if (collapsed) setIsCollapsed(collapsed === "true");
    }, [pathname]);

    const handelCollapse = (value: boolean) => {
        localStorage.setItem('sidebarCollapsed', JSON.stringify(value));
        setIsCollapsed(value);
    };

    return (
        <section className={classNames(
            "fixed top-0 left-0 z-50 p-4 bg-purple md:bg-neutral_30 shadow flex flex-wrap justify-end",
            isCollapsed ? "w-screen md:w-auto" : "w-screen md:w-[15em]",
            "md:h-screen md:relative md:z-auto md:flex-col md:p-4 md:pb-8"
        )}>
            <div className="grow md:flex gap-2 justify-between items-start">
                <div>
                    <GoSidebarCollapse
                        size={25}
                        className={classNames("cursor-pointer hover:scale-110 transition", !isCollapsed && "hidden")}
                        onClick={() => handelCollapse(false)}
                    />
                    <GoSidebarExpand
                        size={25}
                        className={classNames("cursor-pointer hover:scale-110 transition", isCollapsed && "hidden")}
                        onClick={() => handelCollapse(true)}
                    />
                </div>
                {!isCollapsed && <div className="hidden md:block"><LanguageToggle /></div>}
            </div>

            {
                !isCollapsed && <Link
                    rel="noreferrer noopener"
                    className="hidden md:block mx-auto mb-2 text-neutral active:scale-90"
                    href={pathname?.startsWith('/admin') ? '/' : '/admin'}
                    title="For admin"
                >
                    {pathname?.startsWith('/admin') ? <FaHome size={32} /> : <MdAdminPanelSettings size={32} />}
                </Link>
            }
            <div className={classNames("hidden md:block font-bold text-white text-lg text-center whitespace-nowrap select-none", isCollapsed && "w-[1.5em] h-[1.5em] mx-0 -rotate-90")}>
                TRẦN TRUNG ĐỨC
                {!isCollapsed && <p className="text-sm text-center">David Chan</p>}
                {!isCollapsed && <p className="text-xs text-center font-normal">Software Engineer</p>}
            </div>
            <hr className={classNames("hidden md:inline-block border-neutral4", isCollapsed ? "my-8 rotate-90" : "my-4")} />

            <div className={classNames("flex flex-wrap items-center md:flex-col md:flex-start gap-2 mr-2 md:mr-auto", !isCollapsed && "!flex-row gap-4 w-fit mx-auto")}>
                {SOCIALS
                    .filter(({ visibleMode }) => isCollapsed ? visibleMode === "all" : true)
                    .map(({ link, name, icon: Icon }, i) => {
                        return <Link
                            href={link}
                            target="_blank"
                            rel="noreferrer noopener"
                            key={name}
                            className={classNames(
                                "hover:scale-110 transition",
                                i > 1 && "hidden sm:inline-block"
                            )}
                        >
                            <Icon className="h-6 w-6 text-white fill-current hover:fill-purple" />
                        </Link>
                    })}
                {!isCollapsed && <div className="block md:hidden"><LanguageToggle /></div>}
            </div>
            <hr className="border-neutral4 my-4 hidden md:inline-block" />
            <div className={classNames("hidden md:flex md:flex-col gap-2", !isCollapsed && "!flex-row gap-4 w-fit mx-auto")}>
                {CONTACTS
                    .filter(({ visibleMode }) => isCollapsed ? visibleMode === "all" : true)
                    .map(({ link, name, icon: Icon }) => {
                        return <Link
                            href={link}
                            target="_blank"
                            rel="noreferrer noopener"
                            key={name}
                            className="hover:scale-110 transition"
                        >
                            <Icon className="h-6 w-6 text-white fill-current hover:fill-purple" />
                        </Link>
                    })}
            </div>

            {
                !isCollapsed && <div className="flex flex-col mt-2 basis-full gap-4 md:hidden">
                    <MenuLink onClick={() => handelCollapse(true)} />
                </div>
            }
        </section>
    )
};

export default Sidebar;