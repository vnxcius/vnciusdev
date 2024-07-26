import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "./button";
import { motion } from "framer-motion"

interface Language {
  key: string,
  name: string,
  emoji: string
}

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const languages: Language[] = ([
    { key: "en", name: "English", emoji: "🇺🇸" },
    { key: "br", name: "Português", emoji: "🇧🇷" },
  ])

  const selectedLanguage = languages.find(language => language.key === i18n.language);

  const handleLanguageChange = async (language: Language) => {
    await i18n.changeLanguage(language.key);
    setIsOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    const handleWindowClick = (event: any) => {
      const target = event.target.closest('button');
      if (target) {
        return;
      }
      setIsOpen(false);
    }
    window.addEventListener('click', handleWindowClick)
    return () => {
      window.removeEventListener('click', handleWindowClick);
    }
  }, []);

  return (
    <>
      <Button content={selectedLanguage?.emoji!} variant="secondary" onClick={() => setIsOpen(!isOpen)} />
      {isOpen && <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute right-0 mt-2 w-max rounded-md bg-primary border border-neutral-200 text-neutral-800 z-50"
        role="menu"
        aria-orientation="vertical"
      >
        <div className="py-1 flex flex-col w-full gap-2" role="none">
          {languages.map((language) => {
            return (
              <button
                key={language.key}
                onClick={() => handleLanguageChange(language)}
                className={`${selectedLanguage?.key === language.key
                  ? "backdrop-brightness-95"
                  : "text-neutral-600"
                  } px-4 py-2 text-sm text-start items-center inline-flex gap-2 hover:backdrop-brightness-95 `}
                role="menuitem"
              >
                <span className="text-lg">{language.emoji}</span>
                <span className="truncate">{language.name}</span>
              </button>
            );
          })}
        </div>
      </motion.div>}
    </>
  )
}

export default LanguageSelector