
type Props = {
  id?: string,
  content: string,
  variant?: string
  onClick?: () => void
}

const Button = (props: Props) => {
  const variants: any = {
    base: " px-5 py-2 text-center rounded-full duration-300 hover:brightness-95 hover:cursor-pointer",
    primary: "bg-neutral-800 text-primary hover:bg-neutral-700",
    secondary: "bg-primary text-neutral-800 border border-neutral-300",
  }

  return (
    <button className={props.variant ?
      variants[props.variant] + variants["base"] : variants["primary"] + variants["base"]}
      onClick={props.onClick}
      id={props.id}>
      <span>{props.content}</span>
    </button>
  )
}

export default Button