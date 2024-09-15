import { MoveLeftIcon } from "lucide-react"

const ErrorPage = () => {
  const theme = localStorage.getItem("theme");
  if (theme === "light") document.documentElement.classList.remove("dark");

  return (
    <section className="bg-primary h-screen w-full flex flex-col justify-center items-center text-neutral-700">
      <p className="text-2xl">Oops!</p>
      <p className="text-xl">A página que você procurou não foi encontrada.</p>
      <h1 className="text-9xl font-extrabold leading-snug">ERROR 404</h1>
      <hr className="my-5 w-full max-w-sm border-neutral-200" />
      <button onClick={() => window.location.href = '/'}
        className="flex items-center gap-3 my-20 bg-neutral-800 hover:bg-neutral-700 text-primary shadow py-2 px-6 rounded-full">
        <MoveLeftIcon className="size-4" />{' '}
        Voltar a página inicial
      </button>
    </section>
  )
}

export default ErrorPage