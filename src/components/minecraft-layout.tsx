import { MoonIcon, SunIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

function isThemeSetToDark() {
  if (window == undefined) return;

  return (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  )
};

const MinecraftLayout = ({
  children
}: {
  children: React.ReactNode,
}) => {
  document.documentElement.classList.toggle("dark", localStorage.theme ===
    "dark" || (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches));

  const [isDarkMode, setIsDarkMode] = useState(isThemeSetToDark());

  const toggleTheme = () => {
    if (isDarkMode) {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  };

  useEffect(() => {
    if (isThemeSetToDark()) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Minecraft Tools</title>
        <meta name="description" content="Minecraft Tools" />
        <link rel="manifest" href="/mine_site.webmanifest" />
        <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous"
          href="/fonts/Mojangles.woff2"
        />
        <link
          rel="apple-touch-icon" sizes="180x180"
          href="/mine_apple-touch-icon.png"
        />
        <link rel="icon" type="image/png" sizes="32x32"
          href="/mine_favicon-32x32.png"
        />
        <link rel="icon" type="image/png" sizes="16x16"
          href="/mine_favicon-16x16.png"
        />
      </Helmet>
      <main className="max-w-screen-md mx-auto w-full py-16">
        <div className="flex gap-3 items-start mx-auto w-2/3 translate-x-7">
          <NavLink to="/minecraft">
            <img
              src="/img/minecraft_tools_logo.png"
              alt="Minecraft Tools logo"
              className="flex-1"
              width={500}
              height={500}
            />
          </NavLink>

          <ul className="flex justify-center items-center">
            <li>
              <button onClick={toggleTheme}
                className="
                  block p-2 rounded-md hover:bg-neutral-800/10 duration-300
                  dark:hover:bg-neutral-200/10
                "
              >
                {isDarkMode ? (
                  <SunIcon className="text-neutral-200" />
                ) : (
                  <MoonIcon className="text-neutral-800" />
                )}
              </button>
            </li>
          </ul>
        </div>
        <section className="my-16">
          {children}
        </section>
      </main>
      <footer>
        <p className="text-center text-sm text-neutral-700 dark:text-neutral-400">
          &copy; 2024. Made with love by{' '}
          <NavLink to="/" target="_blank" rel="noopener noreferrer"
            className="hover:underline"
          >
            Vinicius Hilton.
          </NavLink>
        </p>
      </footer>
    </>
  )
};

export default MinecraftLayout;