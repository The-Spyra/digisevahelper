
interface Props {
    redirectUrl: string;
    imageUrl: string;
    title:string;
}

function ServicesIcon({imageUrl,redirectUrl,title}:Props) {
  return (
    <a href={redirectUrl} className='flex flex-col w-[100px]'>
        <div className='bg-[#2AA88F] p-3  aspect-square rounded-full'>
            <img src={imageUrl} alt=""  className='rounded-full shadow-md shadow-[#00000086] aspect-square'/>
        </div>
        <h3 className='text-center'>{title}</h3>
    </a>
  )
}

export default ServicesIcon