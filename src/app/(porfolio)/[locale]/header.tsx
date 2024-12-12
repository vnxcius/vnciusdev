"use client"

import ThemeSwitcher from "@/components/ui/theme-switcher";
import LanguageSelector from "@/components/ui/language-selector";

export default function Header() {
  return (
    <header className="py-5">
      <nav className="sm:max-w-5xl max-w-xs flex mx-auto justify-end">
        <ul className="relative flex items-center gap-5">
          <li>
            <ThemeSwitcher />
          </li>
          <li>
            <LanguageSelector />
          </li>
        </ul>
      </nav>
    </header>
  )
};