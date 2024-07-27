import { SquareArrowOutUpRight } from "lucide-react"
import { Link } from "react-router-dom"

type Props = {
  image: string,
  title: string,
  link?: string,
  description: string,
}

const ProjectCard = (props: Props) => {
  return (
    <div className="bg-white border p-5 pb-8 rounded-3xl">
      <Link to={props.link!} target="_blank">
        <img src={props.image} alt={props.title} className="rounded-xl h-72 object-cover object-left" />
      </Link>
      <Link to={props.link!} target="_blank"
        className="flex items-center gap-2 pt-5 w-fit underline-offset-2 hover:underline">
        <h3 className="font-adamina text-lg">{props.title}</h3>
        <SquareArrowOutUpRight className="size-4" />
      </Link>
      <p className="text-neutral-500">{props.description}</p>
    </div>
  )
}

export default ProjectCard