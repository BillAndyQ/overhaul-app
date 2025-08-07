"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BtnLogout from "@/components/BtnLogout"
import { useUser } from "@/app/userContext";
import { PATH_FRONT } from "@/utils/endpoints";

export default function SidebarUI({ paths = [] , urlLogout=""}) {
  
  const pathname = usePathname();
  const dropdownRef = useRef(null);
  
  const { user, isLoading } = useUser();
    
  const [pathsValids, setPathsValids] =  useState([])
    
  useEffect(() => {
      if (user) {
        const filteredPaths = Object.values(PATH_FRONT).filter((item) =>
          item.roles?.includes(user.role)
        );
        setPathsValids(filteredPaths);
      }
    }, [user]);

  useEffect(() => {
    // Cierra el dropdown si se hace clic fuera
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  
  return (
    <nav className="h-screen d-flex flex-column navbar-ui w-45 py-2 position-relative">
  <div className="text-white fs-weight px-3 py-2">
    <p>OVER-SITE</p>
  </div>

  {/* Este contenedor crecerá y empujará el BtnLogout hacia abajo */}
  <div className="d-flex flex-column justify-content-between flex-grow-1 ">
    <div>
      {pathsValids.map(({ url, label }) => {
        const pathFromUrl = new URL(url).pathname;
        const isActive =
          pathFromUrl === "/"
            ? pathname === "/"
            : pathname === pathFromUrl || pathname.startsWith(pathFromUrl + "/");

        return (
          <a
            key={`${label}-${url}`}
            href={url} // Navegación forzada con recarga completa
            className={`py-1.5 w-full text-start rounded-0 btn ${isActive ? "btn-light-ui" : ""}`}
          >
            {label}
          </a>
        );
      })}
    </div>
    <div>
    <button className="py-1.5 w-full text-start rounded-0 btn d-flex align-items-center gap-2 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128m89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4"/></svg>
      <span className="text-xs">{user?.role || "user"}</span>
    </button>
    <BtnLogout
      urlLogout={urlLogout}
      className="py-1.5 w-full text-start rounded-0 btn text-white"
    >
      Salir
    </BtnLogout>
    </div>
    
  </div>
</nav>

  );
}
