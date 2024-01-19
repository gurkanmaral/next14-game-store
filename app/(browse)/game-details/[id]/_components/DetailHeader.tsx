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
     <div className='col-span-1 md:col-span-4 '>
            <img src={selectedImage} alt="" className='w-full h-auto   object-cover rounded-lg ' />
        </div>
        <div className='col-span-1 grid grid-cols-4 gap-4'>
        {allImages.map((image, index) => (
         <div key={index} className='col-span-1 md:col-span-4'>
             <img
            key={index}
            src={image}
            alt=""
            className={`h-[138px] object-cover rounded-md cursor-pointer ${selectedImage === image ? "border-2 border-emerald-500" : "border-2 border-transparent"}`}
            onClick={() => handleImageClick(image)}
          />
         </div>
        ))}
    </div>
   </>
  )
}

export default DetailHeader