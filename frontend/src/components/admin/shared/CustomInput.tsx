import { forwardRef, HTMLProps } from "react"
import cn from "../../../utils/cn"

const CustomInput = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(
  (props, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        type="text"
        className={cn(
          "outline-none border-2 border-custom-primary px-3 py-2 w-full rounded-lg",
          props.className
        )}
      />
    )
  }
)

export default CustomInput
