import { HTMLProps } from "react"
import cn from "../../../utils/cn"

const CustomSubmitButton = ({
  className,
  ...props
}: HTMLProps<HTMLButtonElement> & { type: "button" | "submit" | "reset" }) => {
  return (
    <button
      {...props}
      className={cn(
        "bg-custom-primary rounded-lg w-full py-2 text-white font-semibold",
        className
      )}
    >
      {props.children || "Save"}
    </button>
  )
}

export default CustomSubmitButton
