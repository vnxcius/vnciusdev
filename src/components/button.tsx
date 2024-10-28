
type Props = {
  id?: string,
  icon?: JSX.Element,
  className?: string,
  content?: string,
  variant?: "primary" | "secondary" | "tertiary",
  onClick?: () => void
}

const Button = (props: Props) => {
  const variants = {
    base:
      props.className +
      " px-5 py-2 text-center inline-flex items-center gap-2 rounded-full" +
      " duration-300 hover:brightness-95 hover:cursor-pointer",
    primary:
      "bg-neutral-800 text-primary hover:bg-neutral-700 dark:text-neutral-200 ",
    secondary:
      "bg-primary text-neutral-800 border border-neutral-300" +
      " dark:bg-neutral-925 dark:text-neutral-300 dark:border-neutral-700 ",
    tertiary:
      "bg-neutral-50 border border-neutral-300 text-neutral-800 hover:cursor-default ",
  }

  return (
    <button
      id={props.id}
      onClick={props.onClick}
      className={
        props.variant ?
          variants[props.variant] + variants["base"]
          :
          variants["primary"] + variants["base"]
      }
    >
      {props.icon}
      <span>{props.content}</span>
    </button>
  )
}

export default Button