import { lazy, useEffect, useState } from "react"
import CertCard from "./components/CertCard"
import ProjectCard from "./components/ProjectCard"
import Github from "./assets/icons/github";
import LinkedIn from "./assets/icons/linkedin";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import i18n from "./utils/i18n";
const SkillCard = lazy(() => import("./components/SkillCard"));

function App() {
  const { t } = useTranslation()
  const { lng } = useParams()

  const [show, setShow] = useState(false)
  const [lastScroll, setLastScroll] = useState(100)

  const controlNavbar = () => {
    if (window.scrollY > lastScroll) { // 
      setShow(true)
    } else {
      setShow(false)
    }
    setLastScroll(100)
  }

  useEffect(() => {
    if (lng && i18n.language !== lng) {
      i18n.changeLanguage(lng)
    }
  }, [lng])

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar)
    return () => {
      window.removeEventListener("scroll", controlNavbar)
    }
  }, [lastScroll])
  return (
    <>
      <nav className={"p-5 fixed w-full bg-neutral-900/80 backdrop-blur left-0 top-0 transition-all duration-500 z-50 " + (show ? "visible -translate-y-0 " : "invisible -translate-y-16")}>
        <ul className="flex justify-center md:justify-normal items-center gap-10 text-neutral-50 max-w-xs md:max-w-3xl lg:max-w-5xl mx-auto">
          <li>
            <a href="#sobre" className="hover:underline underline-offset-2">
              <span className="text-accent">#</span> {t("about")}
            </a>
          </li>
          <li>
            <a href="#projetos" className="hover:underline underline-offset-2">
              <span className="text-accent">#</span> {t("projects")}
            </a>
          </li>
          <li>
            <a href="#certificacoes" className="hover:underline underline-offset-2">
              <span className="text-accent">#</span> {t("certifications")}
            </a>
          </li>
          <li>
            <a href="https://github.com/vnxcius" target="_blank" className="fill-white hover:fill-accent duration-150">
              <Github width={20} height={20} />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/vinicius-simon-gouveia-hilton" target="_blank" className="fill-white hover:fill-accent duration-150">
              <LinkedIn width={20} height={20} />
            </a>
          </li>
        </ul>
      </nav>

      <div className="bg-accent rounded-full absolute top-28 left-1/3 -z-10 opacity-10 w-64 h-52 md:w-[500px] md:h-[300px] blur-3xl"></div>

      <section id="sobre"
        className="text-neutral-300 py-32 relative">
          <div className="bg-[url('/img/grid.svg')] bg-repeat grid-mask w-full h-full absolute top-0 -z-10"></div>
        <div className="
        mx-auto flex gap-20 justify-between items-end
        max-w-xs md:max-w-3xl lg:max-w-5xl
        flex-col-reverse md:flex-row">
          <div className="max-w-lg clear-start">
            <h1 className="text-lg text-neutral-300 mb-8 font-mono">
              <span className="text-accent">#</span> {t('about')}
            </h1>
            <p className="text-accent font-mono">{t('hi')}</p>
            <div className="my-5">
              <h1 className="text-2xl font-extrabold tracking-wide">Vinícius Simon</h1>
              <h2 className="tracking-wider italic">Fullstack Developer Jr</h2>
            </div>

            <p className="my-10">
              {t('aboutMe')}
            </p>
            <div className="flex items-center gap-5">
              <div>
                <a href="mailto:contato@vncius.dev" target="_blank" title="contato@vncius.dev"
                  className="flex items-center gap-2 w-fit px-6 py-1.5 bg-accent text-neutral-925 font-medium rounded hover:brightness-75
                focus:outline-none focus:ring-2 ring-purple-300">
                  <img src="/icons/gmail.svg" alt="" className="size-5" />
                  <span className="font-medium">{t('contact')}</span>
                </a>
              </div>
              <span className="text-neutral-600">{t('or')}</span>
              <ul className="flex gap-4">
                <li>
                  <a href="https://github.com/vnxcius" target="_blank" className="fill-white hover:fill-accent duration-150">
                    <Github width={20} height={20} />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/vinicius-simon-gouveia-hilton" target="_blank" className="fill-white hover:fill-accent duration-150">
                    <LinkedIn width={20} height={20} />
                  </a>
                </li>
              </ul>
            </div>
            <p className="text-neutral-500 text-sm m-1">contato@vncius.dev</p>
          </div>

          <div>
            <img src="/img/handsome.webp" alt="" className="rounded-xl md:min-w-96 md:w-96 md:min-h-96 md:h-96" />
          </div>
        </div>

      </section>

      <section className="w-full py-8 relative bg-neutral-900 z-20">
        <h1 className="text-lg text-neutral-300 mb-8 font-mono mx-auto max-w-xs md:max-w-3xl lg:max-w-5xl">
          <span className="text-accent">#</span> {t('skillsInterests')}
        </h1>
        <div className="max-w-sm md:max-w-3xl lg:max-w-5xl mx-auto w-fit flex gap-7 overflow-hidden">
          <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <SkillCard icon="/icons/react.svg" name="React" />
            <SkillCard icon="/icons/go.svg" name="Golang" />
            <SkillCard icon="/icons/docker.svg" name="Docker" />
            <SkillCard icon="/icons/postgresql.svg" name="PostgreSQL" />
            <SkillCard icon="/icons/php_dark.svg" name="PHP" />
            <SkillCard icon="/icons/tailwind.svg" name="TailwindCSS" />
            <SkillCard icon="/icons/java.svg" name="Java" />
            <SkillCard icon="/icons/figma.svg" name="Figma" />
            <SkillCard icon="/icons/cobol.svg" name="Cobol" />
            <SkillCard icon="/icons/ibm.svg" name="z/OS" />
            <SkillCard icon="/icons/laravel.svg" name="Laravel" />
            <SkillCard icon="/icons/gin.svg" name="Gin" />
          </div>
        </div>
      </section>

      <section id="projetos" className="w-full py-10">
        <div className="mx-auto max-w-xs md:max-w-3xl lg:max-w-5xl">
          <h1 className="text-lg text-neutral-300 mb-8 font-mono">
            <span className="text-accent">#</span> {t('projects')}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <ProjectCard
              link="https://jvlf.site"
              name="jvlf.site"
              img="/img/jvlf_site.webp"
              description={t('jvlfDesc')}
              stack={[
                "react",
                "tailwind",
              ]}
            />
            <ProjectCard
              link="https://medellincompany.com.br"
              name="Medellin Original Company"
              img="/img/medellin.webp"
              description={t('medellinDesc')}
              stack={[
                "go",
                "tailwind",
                "docker",
                "postgresql",
              ]}
            />

            <ProjectCard
              link="https://olieart.com.br"
              name="Olie Art - Portfólio"
              img="/img/olieart.webp"
              description={t('olieArtDesc')}
              stack={[
                "firebase",
                "html",
                "tailwind",
              ]}
            />

            <ProjectCard
              link="https://github.com/vnxcius/rest-api-gin"
              name="RESTful API com Gin"
              img="/img/api-gin.webp"
              description={t('restfulApiDesc')}
              stack={[
                "go",
                "gin",
                "mysql"
              ]}
            />
          </div>
        </div>
      </section>

      <section id="certificacoes" className="w-full py-10">
        <div className="mx-auto max-w-xs md:max-w-3xl lg:max-w-5xl">
          <h1 className="text-lg text-neutral-300 mb-8 font-mono">
            <span className="text-accent">#</span> {t('certifications')}
          </h1>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 place-items-center">
            <CertCard
              link="https://www.credly.com/badges/bbfbb6ac-ed1e-446e-a3ff-fff3b48ae80c/public_url"
              img="/img/zxplore.webp"
              name="IBM Z Xplore - Concepts"
            />
            <CertCard
              link="https://www.credly.com/badges/670aeee4-679c-4ebb-adb8-0790eefc15fb/public_url"
              img="/img/scrum.webp"
              name="Scrum Foundation - SFPC™"
            />
          </div>
        </div>
      </section>

      <footer className="w-full my-10 mt-20 flex justify-center">
        <a href="https://github.com/vnxcius/vinisimondev" target="_blank" className="flex items-center gap-5 text-neutral-600 text-center px-5 hover:underline hover:text-accent">
          <span>&copy; 2024 Developed with ❤ by Vinícius S. G. Hilton</span>
          <Github width={16} height={16} fill="white" />
        </a>
      </footer>
    </>
  )
}

export default App