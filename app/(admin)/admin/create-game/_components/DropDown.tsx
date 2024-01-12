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
console.log(selectedGenres)
  return (

    <div>
        <Select  onValueChange={handleSelect} defaultValue="Category" >
        <SelectTrigger>
            <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
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
    <Button onClick={()=>{}} type='button'>
        Add Genre
    </Button>
    <div>
        <h3>Selected Genres:</h3>
        <ul>
          {selectedGenres.map((genre) => (
            <li key={genre}>{genre}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DropDown