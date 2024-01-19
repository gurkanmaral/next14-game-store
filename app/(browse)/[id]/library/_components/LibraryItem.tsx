
interface LibraryItemProps {
  item: {
      id: string;
      title: string;
      allImages: string[];
  } | null;
}

const LibraryItem = ({item}:LibraryItemProps) => {

 
  return (
    <div className='grid grid-cols-4 col-span-1 py-6 px-7  gap-4 bg-black rounded-lg shadow-md shadow-white/15  '>
       <div className='col-span-4 overflow-hidden rounded-lg'>
        <img src={item?.allImages[0]} alt="image" className='object-cover w-full h-full  rounded-lg ' />
       </div>
        <div className='col-span-4'>
          <span className='text-2xl font-bold'>
           {item?.title}
          </span>
        </div>
    </div>
  )
}

export default LibraryItem