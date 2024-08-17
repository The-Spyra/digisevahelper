import { HTMLProps } from "react"

const CustomSubmitButton = ({ ...props }: HTMLProps<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      type="submit"
      className="bg-custom-primary rounded-lg w-full py-2 text-white font-semibold"
    >
      Save
    </button>
  )
}

export default CustomSubmitButton
