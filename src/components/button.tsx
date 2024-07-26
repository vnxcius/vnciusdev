
type Props = {
  content: string,
  onClick?: () => void
}

const Button = (props: Props) => {
  return (
    <button onClick={props.onClick}>
      {props.content}
    </button>
  )
}

export default Button