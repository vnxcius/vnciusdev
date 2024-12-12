"use client"

import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "@/components/ui/theme-switcher";
import LanguageSelector from "@/components/ui/language-selector";
import { useEffect, useState } from "react";

export default function Header() {
  const [storedLang, setStoredLang] = useState('en');

  useEffect(() => {
    setStoredLang(localStorage.getItem('lang') ?? 'en');
  },[]);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex gap-3 items-start mx-auto w-2/3 max-sm:w-4/5 translate-x-7">
        <Link href={`/${storedLang}/minecraft`}>
          <Image
            src={'/img/minecraft/minecraft_tools_logo.png'}
            alt="Minecraft Tools logo"
            width={794}
            height={216}
            priority
          />
        </Link>
        <ThemeSwitcher />
      </div>
      <LanguageSelector />
    </div>
  )
};