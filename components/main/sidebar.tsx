"use client";

import { CONTACTS, SOCIALS } from "@/constants";
import { classNames } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { GoSidebarCollapse } from "react-icons/go";
import { GoSidebarExpand } from "react-icons/go";
import LanguageToggle from "../sub/language-toggle";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <section className={classNames(
            "fixed top-0 left-0 z-50 p-4 bg-purple md:bg-neutral_30 shadow flex justify-end",
            isCollapsed ? "w-screen md:w-auto" : "w-screen md:w-[15em]",
            "md:h-screen md:relative md:z-auto md:flex-col md:p-4 md:pb-8"
        )}>
            <div className="hidden grow md:flex gap-2 justify-between items-start">
                <div>
                <GoSidebarCollapse
                    size={25}
                    className={classNames("cursor-pointer hover:scale-110 transition", !isCollapsed && "hidden")}
                    onClick={() => setIsCollapsed(false)}
                />
                <GoSidebarExpand
                    size={25}
                    className={classNames("cursor-pointer hover:scale-110 transition", isCollapsed && "hidden")}
                    onClick={() => setIsCollapsed(true)}
                />
                </div>
                {!isCollapsed && <LanguageToggle />}
            </div>
            <div className={classNames("hidden md:block font-bold text-white text-lg text-center whitespace-nowrap select-none", isCollapsed && "w-[1.5em] h-[1.5em] mx-0 -rotate-90")}>
                TRẦN TRUNG ĐỨC
                {!isCollapsed && <p className="text-sm text-center">David Chan</p>}
                {!isCollapsed && <p className="text-xs text-center font-normal">Software Engineer</p>}
            </div>
            <hr className={classNames("hidden md:inline-block border-neutral4", isCollapsed ? "my-8 rotate-90" : "my-4")} />

            <div className={classNames("flex md:flex-col gap-2 mr-2 md:mr-0", !isCollapsed && "!flex-row gap-4 w-fit mx-auto")}>
                {SOCIALS
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
            <hr className="border-neutral4 my-4 hidden md:inline-block" />
            <div className={classNames("flex md:flex-col gap-2", !isCollapsed && "!flex-row gap-4 w-fit mx-auto")}>
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
        </section>
    )
};

export default Sidebar;