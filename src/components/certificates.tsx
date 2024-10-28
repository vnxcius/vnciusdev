interface Props {
  link: string,
  image: string,
  title: string,
  year: string,
}

function Certificates(props: Readonly<Props>) {
  return (
    <div>
      <a
        href={props.link}
        target="_blank"
        className="
          flex items-start gap-2.5 hover:bg-neutral-200 p-1.5
          rounded-md hover:shadow-sm duration-200
          dark:hover:bg-neutral-800
        ">
        <img
          className="rounded-sm"
          src={props.image}
          alt={props.title}
          width={35}
          height={35}
        />
        <div>
          <p className="font-semibold leading-5">
            {props.title}
          </p>
          <p className="text-xs text-neutral-500">
            {props.year}
          </p>
        </div>
      </a>
    </div>
  )
}

export default Certificates