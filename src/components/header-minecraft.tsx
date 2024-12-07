"use client"

import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "@/components/theme-switcher";
import minecraft_tools_logo from "../../public/img/minecraft_tools_logo.png"
import LanguageSelector from "./language-selector";
import { useEffect, useState } from "react";

export default function HeaderMinecraft() {
  const [storedLang, setStoredLang] = useState('en');

  useEffect(() => {
    setStoredLang(localStorage.getItem('lang') ?? 'en');
  },[]);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex gap-3 items-start mx-auto w-2/3 translate-x-7">
        <Link href={`/${storedLang}/minecraft`}>
          <Image
            src={minecraft_tools_logo}
            alt="Minecraft Tools logo"
            priority
          />
        </Link>
        <ThemeSwitcher />
      </div>
      <LanguageSelector />
    </div>
  )
};