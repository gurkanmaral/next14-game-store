"use client"
import React, { startTransition, useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { genreData, platformData } from '@/constants'
import { Button } from '@/components/ui/button'

  type DropDownProps = {
    value?:string[],
    onChangeHandler: (value: string[])=>void,
    isGenre:boolean,
  }

const DropDown = ({value,onChangeHandler,isGenre}:DropDownProps) => {

    const [selectedGenres,setSelectedGenres] = useState<string[]>([]);
    
    const handleSelect = (genre: string) => {
        if (!selectedGenres.includes(genre)) {
            setSelectedGenres([...selectedGenres, genre]);
            onChangeHandler([...selectedGenres, genre])
        }
    }
    const handleRemove = (genre: string) => {
      const newSelectedGenres = selectedGenres.filter(g => g !== genre);
      setSelectedGenres(newSelectedGenres);
      onChangeHandler(newSelectedGenres);
  };
console.log(selectedGenres)
  return (

    <div>
        <Select  onValueChange={handleSelect} defaultValue="Category"  >
        <SelectTrigger>
            <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className='bg-black'>
             {isGenre ? genreData.map((genre)=>(
                <SelectItem key={genre} value={genre}  >
                    {genre}
                </SelectItem>
             )): platformData.map((genre)=>(
                <SelectItem  key={genre} value={genre} >
                    {genre}
                </SelectItem>
             )) }   
        </SelectContent>
    </Select>
    <div className='flex gap-3 items-center mt-2'>
        <h3 className='text-lg font-bold'>{isGenre ? "Selected Genres:" : "Selected Platforms:"}</h3>
        <ul className='flex flex-wrap gap-2 w-full h-auto'>
          {selectedGenres.map((genre) => (
            <li 
            className='bg-emerald-500 rounded-md p-2 px-4 cursor-pointer' 
            key={genre}
            onClick={()=>handleRemove(genre)}
            
            >
              {genre}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DropDown