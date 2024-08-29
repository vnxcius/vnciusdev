import { SquareArrowOutUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import * as icons from "../assets/icons";

type Props = {
  image: string,
  title: string,
  link?: string,
  repo?: string,
  description: string,
  date: string,
  stack: JSX.Element[],
}

const ProjectCard = (props: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="bg-white border p-5 pb-8 rounded-3xl dark:bg-neutral-900 dark:border-neutral-800">
      <Link to={props.link!} target="_blank">
        <img src={props.image} alt={props.title} className="rounded-xl sm:h-72 h-36 object-cover border dark:border-neutral-800" />
      </Link>
      <div className="flex items-center gap-5 my-2 bg-neutral-50 border w-fit mx-auto py-1.5 px-5 rounded-full dark:bg-neutral-900 dark:border-neutral-800">
        {props.stack.map((stack) => (
          <span key={stack.key} title={stack.key!}>
            {stack}
          </span>
        ))}
      </div>
      <hr className="mb-6 dark:border-neutral-800" />
      <Link to={props.link!} target="_blank"
        className="flex items-center gap-2 w-fit underline-offset-2 hover:underline">
        <h3 className="font-adamina text-lg">{props.title}</h3>
        <SquareArrowOutUpRight className="size-4" />
      </Link>
      <p className="text-neutral-500">{props.description}</p>
      <p className="text-neutral-400 text-xs my-1">Feito em {props.date}</p>
      {props.repo && (
        <Link to={props.repo} target="_blank" className="w-fit block mt-2">
          <icons.Github className="fill-neutral-400 hover:fill-neutral-500 size-6" />
        </Link>
      )}
    </motion.div>
  )
}

export default ProjectCard