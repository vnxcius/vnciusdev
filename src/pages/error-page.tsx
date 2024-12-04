import { MoveLeftIcon } from "lucide-react";
import { useEffect } from "react";
import { t } from "i18next";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  const initialTheme = localStorage.getItem("theme") ?? "light";

  useEffect(() => {
    document.documentElement.className = initialTheme;
    localStorage.setItem("theme", initialTheme);
  }, []);

  return (
    <section
      className="
        bg-primary h-screen w-full flex flex-col
        items-center text-neutral-700 justify-center
        dark:bg-neutral-925 dark:text-neutral-200
      ">
      <p className="text-2xl">Oops!</p>
      <p className="text-xl">{t("404")}</p>
      <h1 className="text-9xl font-extrabold leading-snug">
        ERROR 404
      </h1>
      <hr
        className="
          my-5 w-full max-w-sm border-neutral-200
          dark:border-neutral-800
        "
      />
      <NavLink to={"/"}
        className="
          flex items-center gap-3 my-20 bg-neutral-800
          hover:bg-neutral-700 text-primary shadow py-2
          px-6 rounded-full
        ">
        <MoveLeftIcon className="size-4" />{' '}
        {t("goBack")}
      </NavLink>
    </section>
  )
}

export default ErrorPage