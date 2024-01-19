"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { useState, useTransition } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { getSearchedGames } from "@/data/search/search-game";



const AddFavoriteGames = () => {

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [isPending,startTransition] = useTransition();
    
    let debounceTimer;

    const handleSearch = async (query) => {
      "use server";
      if(!query) {
       setSearchResults([]);
       return;
      }
      clearTimeout(debounceTimer);

      debounceTimer = setTimeout(async () => {
       try {
         const data = await getSearchedGames(query);
         setSearchResults(data);
       } catch (error) {
         console.error('Error fetching data:', error);
       }
     }, 300);
     };
    console.log(searchResults)


      const handleSelectGame = (game) => {
        setSelectedGame(game);
        // Clear search results
        setSearchResults([]);
      };
    
      const addGameToFavorites = () => {
        
      };
  return (
    <Dialog >
  <DialogTrigger>  <Plus className='w-10 h-10' /></DialogTrigger>
  <DialogContent className="w-[1000px]">
    <DialogHeader>
      <DialogTitle>Add Favorite Game</DialogTitle>
        <Input 
        placeholder="Search Games"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          handleSearch(e.target.value);
        }}
        />
        {search && (
          <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>  
        )}
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}

export default AddFavoriteGames


