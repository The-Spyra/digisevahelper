interface Props {
  title: string
  docs: string[]
}

function DocReq({ title, docs }: Props) {
  return (
    <div className=" bg-[#9B9E9E80] rounded-xl">
      <p className="bg-[#9B9E9E80] text-xl md:text-[32px] font-extrabold text-center rounded-t-xl">
        {title}
      </p>
      <div className="p-2">
        <ul className="list-decimal text-[20px] font-[500] list-inside">
          {docs.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DocReq
