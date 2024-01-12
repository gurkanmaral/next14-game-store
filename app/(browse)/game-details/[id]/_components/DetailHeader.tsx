"use client";
import React, { useEffect, useState } from 'react'

const DetailHeader = ({allImages}:{allImages:string[]}) => {
    const [selectedImage, setSelectedImage] = useState(allImages[0]);

    const handleImageClick = (image:string) => {
        setSelectedImage(image)
    }

    // useEffect(() =>{
    //     let currentIndex = 0;

    //     const intervalId = setInterval(()=>{
    //         currentIndex = (currentIndex + 1) % allImages.length;
    //         setSelectedImage(allImages[currentIndex])
    //     },5000 )
        
    //     return () => clearInterval(intervalId)
    // },[allImages])

  return (
   <>
     <div className='col-span-4 '>
            <img src="/sekiro2.jpg" alt="" className='w-full  object-cover rounded-lg ' />
        </div>
        <div className='col-span-1 flex flex-col gap-4 p-4'>
        {allImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            className='h-[138px] object-cover rounded-md'
            onClick={() => handleImageClick(image)}
          />
        ))}
    </div>
   </>
  )
}

export default DetailHeader