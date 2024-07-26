import { Link } from "react-router-dom";
import LanguageSelector from "./components/languague-selector";
import { t } from "i18next";
import Button from "./components/button";

function App() {

  return (
    <>
      <header className="py-5">
        <nav className="max-w-5xl flex mx-auto justify-between items-center">
          <Link to="/" className="text-2xl font-playwrite">vncius</Link>
          <ul className="relative">
            <li>
              <LanguageSelector />
            </li>
          </ul>
        </nav>
      </header>
      <section className="grid grid-cols-2 relative max-w-5xl my-14 mx-auto text-neutral-800">
        <div className="sticky top-0 flex flex-col place-self-start items-start gap-10">
          <img src="/img/handsome.webp" alt="Vinícius Simon" className="rounded-[36px]" width={190} height={'auto'} />
          <div className="space-y-2">
            <p className="font-merriweather text-3xl">
              {t('hi')} Vinícius Simon
            </p>
            <p className="text-2xl">
              {t('role')}
            </p>
          </div>
        </div>
        <div className="space-y-10">
          <p className="font-merriweather text-2xl">
            {t('description')}
          </p>

          <div className="space-x-4 pb-16">
            <Button content={t('contact')} />
            <Button content={t('myWork')} variant="secondary" />
          </div>

          <hr className="border-neutral-200" />
        </div>
      </section>
    </>
  )
}

export default App