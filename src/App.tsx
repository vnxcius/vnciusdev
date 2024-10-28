import { t } from "i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Copy, MoonIcon, SunIcon } from "lucide-react";
import * as icons from "./assets/icons";
import LanguageSelector from "./components/languague-selector";
import Button from "./components/button";
import ProjectCard from "./components/project-card";
import AnimatedIcon from "./components/animated-icon";
import Certificates from "./components/certificates";
import { useEffect, useState } from "react";

function App() {
  const initialTheme = localStorage.getItem("theme") ?? "light";
  const [theme, setTheme] = useState(initialTheme);

  const changeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const [clicks, setClicks] = useState(0)
  const easterEgg = () => setClicks(clicks + 1);

  if (clicks >= 19) {
    setClicks(0)
    alert("🐝")
  }

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <header className="py-5">
        <nav className="sm:max-w-5xl max-w-xs flex mx-auto justify-end">
          <ul className="relative flex items-center gap-5">
            <li>
              <button onClick={changeTheme} className="block">
                <MoonIcon
                  className="text-neutral-300 dark:invisible dark:hidden"
                />
                <SunIcon
                  className="
                    invisible hidden dark:visible dark:block
                    dark:text-neutral-300
                  "
                />
              </button>
            </li>
            <li>
              <LanguageSelector />
            </li>
          </ul>
        </nav>
      </header>
      <section
        className="
          grid sm:grid-cols-2 gap-10 relative max-w-xs sm:max-w-5xl
          my-14 mx-auto text-neutral-800 dark:text-neutral-300
        ">
        <div
          className="
            sm:sticky top-10 flex flex-col place-self-start items-start
            gap-10
          ">
          <button onClick={easterEgg} className="relative">
            <img
              src="/img/handsome.webp"
              alt="Vinícius Simon"
              className="rounded-[36px]"
              width={190}
              height={'auto'}
            />
            <span className="absolute -bottom-2 -left-3 text-4xl">👋</span>
          </button>
          <div className="space-y-2">
            <div className="font-adamina text-3xl">
              <span>{t('hi')} Vinícius Simon</span>
            </div>
            <p className="text-2xl text-neutral-600 dark:text-neutral-400">
              {t('role')}
            </p>
            <a
              href="mailto:contato@vncius.dev"
              className="text-neutral-500 hover:underline"
            >
              contato@vncius.dev
            </a>

            <hr className="border-neutral-200 dark:border-neutral-800" />

            <h3
              className="
                text-neutral-500 text-lg font-adamina
                dark:text-neutral-600
              "
            >
              {t('socials')}
            </h3>

            <div className="flex space-x-5">
              <Link
                to="/linkedin"
                target="_blank"
                title="LinkedIn"
                className="w-fit block"
              >
                <icons.LinkedIn
                  className="
                    size-6 fill-neutral-500 hover:brightness-75
                    duration-300 dark:fill-neutral-600
                  "
                />
              </Link>
              <Link
                to="/github" target="_blank" title="Github"
                className="w-fit block">
                <icons.Github
                  className="
                    size-6 fill-neutral-500 hover:brightness-75 duration-300
                    dark:fill-neutral-600
                  "
                />
              </Link>
              <div className="flex flex-col items-start">
                <icons.Discord
                  className="
                    size-6 fill-neutral-500 dark:fill-neutral-600
                  "
                />
                <div className="inline-flex items-center gap-1 -translate-x-5">
                  <p className="text-neutral-500 text-xs">@vncius.dev</p>
                  <button
                    onClick={() => navigator.clipboard.writeText('vncius.dev')}
                    className="
                      p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800
                      rounded
                    "
                  >
                    <Copy className="size-3 text-neutral-500" />
                  </button>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: .5, delay: .5 }}
            >
              <h3 className="text-neutral-500 text-lg font-adamina pt-4 dark:text-neutral-600">
                {t('shortcuts')}
              </h3>

              <ul className="list-disc list-inside text-neutral-500">
                <motion.li
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: .5,
                    delay: .8,
                    ease: 'circOut',
                    type: 'spring',
                    stiffness: 100,
                    bounce: true
                  }}
                >
                  <a
                    href="#stack"
                    className="underline-offset-2 hover:underline"
                  >
                    Stack
                  </a>
                </motion.li>
                <motion.li
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: .5,
                    delay: .9,
                    ease: 'circOut',
                    type: 'spring',
                    stiffness: 100,
                    bounce: true
                  }}
                >
                  <a
                    href="#projects"
                    className="underline-offset-2 hover:underline"
                  >
                    {t('myProjects')}
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          </div>

          <div className="w-full">
            <motion.hr
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1 }}
              className="border-neutral-200 dark:border-neutral-800"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: .5, delay: .6 }}
            >
              <h3
                className="
                  text-neutral-500 text-lg font-adamina dark:text-neutral-600
                  pt-4
                "
              >
                {t('certificates')}
              </h3>

              <div className="flex flex-wrap items-center gap-2 my-2.5">
                <Certificates
                  link="https://cursos.alura.com.br/user/vnxcius/fullCertificate/e5d5e3892dbee786c875e49e0ee45efc"
                  image={"/img/alura_icon.webp"}
                  title="Cursos Alura"
                  year="2022-2023"
                />
                <Certificates
                  link="https://www.credly.com/badges/670aeee4-679c-4ebb-adb8-0790eefc15fb/public_url"
                  image={"/img/scrum.webp"}
                  title="Scrum FPC"
                  year="2023"
                />
                <Certificates
                  link="https://www.credly.com/badges/bbfbb6ac-ed1e-446e-a3ff-fff3b48ae80c/public_url"
                  image={"/img/zxplore.webp"}
                  title="IBM Z Xplore - Concepts"
                  year="2024"
                />
                <Certificates
                  link="/certificado-faculdade"
                  image={"/img/facsenac.webp"}
                  title="Participação no Soft Skills Check"
                  year="2024"
                />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="space-y-3">
          <p className="font-adamina text-2xl pb-5">
            {t('description')}
          </p>

          <div className="space-x-4 pb-16">
            <Button
              content={t('contact')}
              onClick={() => window.location.href = ('mailto:contato@vncius.dev')}
            />
            <Button
              content={t('myWork')}
              variant="secondary"
              onClick={() => window.location.href = ('/#projects')}
            />
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
              className="
                text-neutral-700 uppercase font-light text-sm tracking-wider
                dark:text-neutral-400
              "
            >
              {t('stackPrimary')}
            </motion.p>
            <div
              className="
                flex flex-wrap justify-items-center mx-auto w-fit gap-5 my-7
              "
            >
              <AnimatedIcon delay={.10}>
                <icons.Go className="w-14 h-8" />
              </AnimatedIcon>
              <AnimatedIcon delay={.15}>
                <icons.ReactIcon className="size-8" />
              </AnimatedIcon>
              <AnimatedIcon delay={.20}>
                <icons.Nextjs className="size-8" />
              </AnimatedIcon>
              <AnimatedIcon delay={.25}>
                <icons.Docker className="size-8" />
              </AnimatedIcon>
              <AnimatedIcon delay={.30}>
                <icons.PostgreSQL className="size-8" />
              </AnimatedIcon>
              <AnimatedIcon delay={.35}>
                <icons.TailwindCSS className="size-8" />
              </AnimatedIcon>
            </div>

            <motion.hr
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1 }}
              className="
                border-neutral-200 mb-5 mt-10 max-w-xs
                mx-auto dark:border-neutral-800
              "
            />

            <motion.p
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.40 }}
              className="
                text-neutral-700 uppercase font-light text-sm tracking-wider
                dark:text-neutral-400
              "
            >
              {t('stackSecondary')}
            </motion.p>

            <div
              className="flex flex-wrap justify-center mx-auto w-fit gap-5 my-7"
            >
              <AnimatedIcon delay={.45}>
                <icons.MySQL className="size-8" />
              </AnimatedIcon>
              <AnimatedIcon delay={.50}>
                <icons.TypeScript className="size-8" />
              </AnimatedIcon>
              <AnimatedIcon delay={.55}>
                <icons.Firebase className="size-8" />
              </AnimatedIcon>
              <AnimatedIcon delay={.60}>
                <icons.Figma className="size-8" />
              </AnimatedIcon>
              <AnimatedIcon delay={.65}>
                <icons.Laravel className="size-8" />
              </AnimatedIcon>
              <AnimatedIcon delay={.70}>
                <icons.Php className="size-8" />
              </AnimatedIcon>
              {/* <AnimatedIcon delay={.75}>
                <icons.Java className="size-8" />
              </AnimatedIcon> */}
              <AnimatedIcon delay={.80}>
                <icons.JavaScript className="size-8" />
              </AnimatedIcon>
              {/* <AnimatedIcon delay={.85}>
                <icons.Cobol className="size-8" />
              </AnimatedIcon> */}
            </div>

            <hr
              className="
                border-neutral-200 dark:border-neutral-800 mb-5 mt-10
              "
            />

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
                date="08/2024"
                stack={[
                  <icons.Nextjs className="size-6" key={'nextjs 14'} />,
                  <icons.TypeScript className="size-6" key={'typescript'} />,
                  <icons.Prisma className="size-6 dark:fill-white" key={'prisma'} />,
                  <icons.PostgreSQL className="size-6" key={'postgresql'} />,
                ]}
              />
              <ProjectCard
                title="Soft Skills Check"
                link="https://softskillscheck.app.br"
                repo="https://github.com/senac-volunteers/soft-skills-app"
                image="/img/soft_skills_check.webp"
                description={t('softSkillsCheckDescription')}
                date="08/2024"
                stack={[
                  <icons.Nextjs className="size-6" key={'nextjs 14'} />,
                  <icons.TypeScript className="size-6" key={'typescript'} />,
                ]}
              />
              <ProjectCard
                title="Facilitando"
                link="https://facilitando.vncius.dev/"
                repo="https://github.com/vnxcius/facilitando"
                image="/img/facilitando.webp"
                description={t('facilitandoDescription')}
                date="08/2024"
                stack={[
                  <icons.Nextjs className="size-6" key={'nextjs 14'} />,
                  <icons.TypeScript className="size-6" key={'typescript'} />,
                  <icons.Prisma className="size-6 dark:fill-white" key={'prisma'} />,
                  <icons.PostgreSQL className="size-6" key={'postgresql'} />,
                ]}
              />
              <ProjectCard
                title="JVLF"
                link="https://jvlf.site/"
                repo="https://github.com/vnxcius/jvlf"
                image="/img/jvlf_site.webp"
                description={t('jvlfDescription')}
                date="06/2024"
                stack={[
                  <icons.ReactIcon className="size-6" key={'react'} />,
                  <icons.TypeScript className="size-6" key={'typescript'} />,
                ]}
              />
              <ProjectCard
                title="RESTful API com Gin"
                link="https://github.com/vnxcius/rest-api-gin"
                repo="https://github.com/vnxcius/rest-api-gin"
                image="/img/api_gin.webp"
                description={t('restfulApiDescription')}
                date="07/2023"
                stack={[
                  <icons.Go className="w-10 h-6" key={'go'} />
                ]}
              />
            </div>
          </section>
        </div>
      </section>
    </>
  )
}

export default App