"use client";

import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { sub } from "date-fns";
import baseURL from "@/lib/baseURL";
import {
  BuildingStorefrontIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon
} from "@heroicons/react/24/outline";

const ROUTES = {
  INFO: "info",
  COMMENTS: "comments",
  APPOINTMENTS: "appointments"
};

export default function AdminNavbar({ garageSlug }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [active, setActive] = useState(null);

  const menuItems = [
    "Editar información",
    "Gestionar comentarios",
    "Ver citas"
  ];

  useEffect(() => {
    let subPath = pathname.split("/").at(-1);
    console.log("SUBPATH?", subPath);
    if (subPath != active) setActive(subPath);
    // if (pathname) {
    //   const subPath = pathname.split("/").at(-1);
    //   if (subPath === "comments" && subPath !== active)
    //     setActive(ROUTES.COMMENTS);
    //   if (subPath === "appointments" && subPath !== active)
    //     setActive(ROUTES.COMMENTS);
    //   if (ROUTES.INFO !== active) setActive(ROUTES.INFO);

    //   console.log("subPath", subPath);
    // }
  }, [pathname]);

  const handleClickMenuItem = (section, mobile = false) => {
    if (section !== active) setActive(section);
    if (mobile) setIsMenuOpen(!open);
  };

  const createPathToRedirect = (subPath) => {
    const regex = /(\/admin\/(?:[^?#\n]*\/)?)[^\/#?\n]+/;
    const subst = `$1${subPath}`;
    return pathname.replace(regex, subst);
  };

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      position="sticky"
      className="top-[64px] -mx-9 sm:-mx-6 lg:-mx-8"
      maxWidth="full"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-black"
        ]
      }}
      isBordered
    >
      <NavbarContent className="sm:hidden -mx-2 sm:-mx-3" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 pl-2" justify="center">
        <NavbarItem isActive={active === ROUTES.INFO}>
          <Link
            color="foreground"
            className="gap-2 inline-flex"
            href={`${baseURL}${createPathToRedirect(ROUTES.INFO)}`}
            onClick={() => {
              handleClickMenuItem(ROUTES.INFO);
            }}
          >
            <BuildingStorefrontIcon className="h-5 w-5" />
            <p>Información</p>
          </Link>
        </NavbarItem>
        <NavbarItem isActive={active === ROUTES.COMMENTS}>
          <Link
            color="foreground"
            className="gap-2 inline-flex"
            href={`${createPathToRedirect(ROUTES.COMMENTS)}`}
            onClick={() => {
              handleClickMenuItem(ROUTES.COMMENTS);
            }}
          >
            <ChatBubbleLeftRightIcon className="h-5 w-5" />
            Comentarios
          </Link>
        </NavbarItem>
        <NavbarItem isActive={active === ROUTES.APPOINTMENTS}>
          <Link
            color="foreground"
            className="gap-2 inline-flex"
            href={`${baseURL}${createPathToRedirect(ROUTES.APPOINTMENTS)}`}
            onClick={() => {
              handleClickMenuItem(ROUTES.APPOINTMENTS);
            }}
          >
            <CalendarDaysIcon className="h-5 w-5" />
            Citas
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="mt-[140px]">
        <NavbarMenuItem>
          <Link
            color="foreground"
            className="gap-2 inline-flex items-center"
            href={`${baseURL}${createPathToRedirect(ROUTES.INFO)}`}
            onClick={() => {
              handleClickMenuItem(ROUTES.INFO, true);
            }}
          >
            <BuildingStorefrontIcon className="h-5 w-5" />
            <p>Información</p>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            color="foreground"
            className="gap-2 inline-flex items-center"
            href={`${createPathToRedirect(ROUTES.COMMENTS)}`}
            onClick={() => {
              console.log("HERE?");
              handleClickMenuItem(ROUTES.COMMENTS, true);
            }}
          >
            <ChatBubbleLeftRightIcon className="h-5 w-5" />
            Comentarios
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            color="foreground"
            className="gap-2 inline-flex items-center"
            href={`${baseURL}${createPathToRedirect(ROUTES.APPOINTMENTS)}`}
            onClick={() => {
              handleClickMenuItem(ROUTES.APPOINTMENTS, true);
            }}
          >
            <CalendarDaysIcon className="h-5 w-5" />
            Citas
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
