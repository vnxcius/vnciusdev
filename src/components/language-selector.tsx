"use client"

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { GlobeIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const lang = pathname.split('/')[1];
  const router = useRouter();
  
  const handleLanguageChange = () => {
    const newLang = lang === 'br' ? 'en' : 'br';
    localStorage.setItem('lang', newLang);
    router.replace(pathname.replace(lang, newLang));
  };
  
  useEffect(() => {
    const storedLang = localStorage.getItem('lang') ?? 'en';
    // if URL is different from the one in localStorage, redirect to stored lang
    if (lang !== storedLang) {
      window.location.href = pathname.replace(lang, storedLang);
    }
  },[])

  useEffect(() => {
    const handleWindowClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest('button');
      if (target) {
        return;
      };
      setIsOpen(false);
    }
    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    }
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          px-4 py-2 text-sm text-start items-center flex gap-2
          hover:backdrop-brightness-95 dark:hover:bg-neutral-200/10 rounded-md
        "
      >
        <GlobeIcon className="size-4" />
        <p>
          {lang === 'br' ? 'Português' : 'English'}
        </p>
      </button>
      {isOpen && <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          absolute right-0 mt-2 w-max rounded-md dark:bg-gray-800 border
          border-neutral-200 text-neutral-800 z-50 bg-soapstone shadow
          dark:border-gray-700 dark:text-neutral-200
        "
      >
        <button
          onClick={() => handleLanguageChange()}
          className="flex flex-col w-full gap-2 rounded-md"
        >
          <div
            className="
              px-4 py-2 text-sm text-start items-center flex gap-2
              hover:backdrop-brightness-95 dark:hover:bg-neutral-200/10
            "
          >
            {lang === 'br' ? 'English' : 'Português'}
          </div>
        </button>
      </motion.div>}
    </div>
  )
};