"use client";
import { Card, CardContent } from "@/components/ui/card";
import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import Link from "next/link";


interface SliderProps {
  games: SliderGameProps[];
}

interface SliderGameProps {
  id:string;
  title:string;
  allImages:string[];
  description:string;
  SpecialPrice:string;
  price:string;
}

const Slider = ({games}:SliderProps) => {



 
  return (
    <Carousel className="w-[85%] 2xl:max-w-5xl border-none hidden md:block">
    <CarouselContent>
      {games.map((game, index) => (
        <CarouselItem key={game.id} className="">
          <div className="p-1">
            <Card className="border-none ">
              <CardContent className="relative flex  h-[700px] items-center justify-center">
                <Link href={`/game-details/${game.id}`} className="">                   
                      <Image
                      src={game.allImages[0]}
                      alt="slider-image"
                      fill
                      className=" rounded-xl opacity-85"
                      />              
                    <div className="absolute bottom-[20%] right-[10%] w-[20%] h-auto ">
                      <h1 className="text-xl md:text-3xl lg:text-5xl font-bold ">
                        {game.title}
                      </h1>
                    </div>
                </Link>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious className="bg-black border border-white-/15" />
    <CarouselNext className="bg-black border border-white-/15"  />
  </Carousel>
  )
}

export default Slider