"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { genreData, platformData } from "@/constants";
import React from 'react'

interface FiltersProps {
  setSortOption: (option: 'Alpha' | 'lowToHigh' | 'highToLow') => void;
  sortOption: 'Alpha' | 'lowToHigh' | 'highToLow';
  setGenres: React.Dispatch<React.SetStateAction<string>>;
  genres: string;
  selectedPlatforms: string[];
  setSelectedPlatforms: React.Dispatch<React.SetStateAction<string[]>>;
}


const Filters = ({setSortOption,sortOption,setGenres,genres,selectedPlatforms,setSelectedPlatforms}:FiltersProps) => {



    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const platform = event.target.id;
        if (selectedPlatforms.includes(platform)) {
          setSelectedPlatforms((prevSelectedPlatforms) =>
            prevSelectedPlatforms.filter((p) => p !== platform)
          );
        } else {
          setSelectedPlatforms((prevSelectedPlatforms) => [
            ...prevSelectedPlatforms,
            platform,
          ]);
        }
      };


  return (
    <div className='hidden md:grid w-full grid-cols-8 bg-[#222] rounded-sm p-2 shadow-lg shadow-black/15 '>
        <div className="flex col-span-2 gap-2 items-center">
           <p className="text-base">Show:</p>
           <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Upcoming">Coming Soon</SelectItem>
                <SelectItem value="TopRated">Top Rated</SelectItem>
                <SelectItem value="Popular">Popular</SelectItem>
            </SelectContent>
            </Select>
        </div>
        <div className="flex gap-2 items-center col-span-2">
          <p>Order by:</p>
          <Select onValueChange={setSortOption} value={sortOption} >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Alphabetical" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Alpha">Alphabetical</SelectItem>
                <SelectItem value="highToLow">Price: High to Low</SelectItem>
                <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
            </SelectContent>
            </Select>
        </div>
        <div className="flex gap-2 items-center col-span-2">
            <p>Select Genres:</p>
            <Select onValueChange={setGenres} value={genres}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem  value="All">All</SelectItem>
                {genreData.map((genre)=>(
                    <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
            </SelectContent>
            </Select>
        </div>
        <div className="flex gap-2 items-center col-span-2">
               <p>Platforms:</p>                  
               <div className="flex gap-6">
               {platformData.map((platform) => (
                <div className="flex flex-col gap-2 items-center justify-center" key={platform}>
                  <Input
                    type="checkbox"
                    id={platform}
                    checked={selectedPlatforms.includes(platform)}
                    onChange={handleCheckboxChange}
                    className="bg-black w-5 h-5"
                  />
                  <label
                    htmlFor={platform}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {platform}
                  </label>
                </div>
               ))}
               </div>          
        </div>
         <div>
       </div>
    </div>
  )
}

export default Filters