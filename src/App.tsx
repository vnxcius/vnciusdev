import { t } from "i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Copy, MoonIcon } from "lucide-react";
import * as icons from "./assets/icons";
import LanguageSelector from "./components/languague-selector";
import Button from "./components/button";
import ProjectCard from "./components/project-card";

function App() {

  return (
    <>
      <header className="py-5">
        <nav className="max-w-5xl flex mx-auto justify-end">
          <ul className="relative flex items-center gap-5">
            <li>
              <MoonIcon className="text-neutral-300" />
            </li>
            <li>
              <LanguageSelector />
            </li>
          </ul>
        </nav>
      </header>
      <section className="grid grid-cols-2 relative max-w-5xl my-14 mx-auto text-neutral-800 dark:text-neutral-300">
        <div className="sticky top-10 flex flex-col place-self-start items-start gap-10">
          <div className="relative">
            <img src="/img/quack.webp" alt="Vinícius Simon" className="rounded-[36px]" width={190} height={'auto'} />
            <span className="absolute -bottom-2 -left-3 text-4xl">👋</span>
          </div>
          <div className="space-y-2">
            <div className="font-adamina text-3xl">
              <span>{t('hi')} Vinícius Simon</span>
            </div>
            <p className="text-2xl text-neutral-600 dark:text-neutral-400">
              {t('role')}
            </p>

            <hr className="border-neutral-200 dark:border-neutral-800" />

            <h3 className="text-neutral-500 text-lg font-adamina dark:text-neutral-600">
              {t('socials')}
            </h3>

            <div className="flex space-x-5">
              <Link
                to="/linkedin" target="_blank" title="LinkedIn"
                className="w-fit block">
                <icons.LinkedIn className="size-6 fill-neutral-500 hover:brightness-75 duration-300 dark:fill-neutral-600" />
              </Link>
              <Link
                to="/linkedin" target="_blank" title="Github"
                className="w-fit block">
                <icons.Github className="size-6 fill-neutral-500 hover:brightness-75 duration-300 dark:fill-neutral-600" />
              </Link>
              <div className="flex gap-2 items-center">
                <icons.Discord className="size-6 fill-neutral-500 dark:fill-neutral-600" />
                <p className="text-neutral-500">vncius.dev</p>
                <button onClick={() => navigator.clipboard.writeText('vncius.dev')} className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded">
                  <Copy className="size-4 text-neutral-500" />
                </button>
              </div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5, delay: .5 }}>
              <h3 className="text-neutral-500 text-lg font-adamina pt-4 dark:text-neutral-600">
                {t('shortcuts')}
              </h3>

              <ul className="list-disc list-inside text-neutral-500">
                <motion.li
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: .5, delay: .8, ease: 'circOut', type: 'spring', stiffness: 100, bounce: true }}>
                  <a href="#stack" className="underline-offset-2 hover:underline">
                    Stack
                  </a>
                </motion.li>
                <motion.li
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: .5, delay: .9, ease: 'circOut', type: 'spring', stiffness: 100, bounce: true }}>
                  <a href="#projects" className="underline-offset-2 hover:underline">
                    {t('myProjects')}
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </div>
        <div className="space-y-3">
          <p className="font-adamina text-2xl pb-5">
            {t('description')}
          </p>

          <div className="space-x-4 pb-16">
            <Button content={t('contact')} onClick={() => window.location.href = ('mailto:contato@vncius.dev')} />
            <Button content={t('myWork')} variant="secondary" onClick={() => window.location.href = ('/#projects')} />
          </div>

          <hr className="border-neutral-200 dark:border-neutral-800" />

          <section>
            <h2 id="stack" className="text-2xl font-adamina">
              Stack
            </h2>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, type: "tween", stiffness: 100 }}
              className="text-neutral-700 uppercase font-light text-sm tracking-wider dark:text-neutral-400">
              {t('stackPrimary')}
            </motion.p>
            <div className="flex mx-auto w-fit gap-5 my-7">
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", delay: 0.1, stiffness: 100 }}>
                <icons.Go className="w-14 h-8" />
              </motion.span>
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", delay: 0.2, stiffness: 100 }}>
                <icons.ReactIcon className="size-8" />
              </motion.span>
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", delay: 0.3, stiffness: 100 }}>
                <icons.Nextjs className="size-8" />
              </motion.span>
              <motion.span
                initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", delay: 0.4, stiffness: 100 }}>
                <icons.Docker className="size-8" />
              </motion.span>
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", delay: 0.5, stiffness: 100 }}>
                <icons.PostgreSQL className="size-8" />
              </motion.span>
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", delay: 0.6, stiffness: 100 }}>
                <icons.TailwindCSS className="size-8" />
              </motion.span>
            </div>

            <motion.hr
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1 }}
              className="border-neutral-200 mb-5 mt-10 max-w-xs mx-auto dark:border-neutral-800"
            />

            <motion.p
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              className="text-neutral-700 uppercase font-light text-sm tracking-wider dark:text-neutral-400">
              {t('stackSecondary')}
            </motion.p>

            <div className="flex mx-auto w-fit gap-5 my-7">
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", delay: 0.8, stiffness: 100 }}>
                <icons.MySQL className="size-8" />
              </motion.span>
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", delay: 0.9, stiffness: 100 }}>
                <icons.TypeScript className="size-8" />
              </motion.span>
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", delay: 1, stiffness: 100 }}>
                <icons.Firebase className="size-8" />
              </motion.span>
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", delay: 1.1, stiffness: 100 }}>
                <icons.Figma className="size-8" />
              </motion.span>
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", delay: 1.2, stiffness: 100 }}>
                <icons.Laravel className="size-8" />
              </motion.span>
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", delay: 1.3, stiffness: 100 }}>
                <icons.Php className="size-8" />
              </motion.span>
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", delay: 1.4, stiffness: 100 }}>
                <icons.Java className="size-8" />
              </motion.span>
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", delay: 1.5, stiffness: 100 }}>
                <icons.JavaScript className="size-8" />
              </motion.span>
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", delay: 1.6, stiffness: 100 }}>
                <icons.Cobol className="size-8" />
              </motion.span>
            </div>

            <hr className="border-neutral-200 dark:border-neutral-800 mb-5 mt-10" />

          </section>
          <section>
            <h2 id="projects" className="text-2xl font-adamina mb-7">
              {t('myProjects')}
            </h2>
            <div className="space-y-5">
              <ProjectCard
                title="Medellin Original Company"
                link="https://medellincompany.com.br/"
                image="/img/medellin.webp"
                description={t('medellinDescription')}
              />
              <ProjectCard
                title="JVLF"
                link="https://jvlf.site/"
                image="/img/jvlf_site.webp"
                description={t('jvlfDescription')}
              />
              <ProjectCard
                title="RESTful API com Gin"
                link="https://github.com/vnxcius/rest-api-gin"
                image="/img/api_gin.webp"
                description={t('restfulApiDescription')}
              />
            </div>
          </section>
        </div>
      </section>
    </>
  )
}

export default App