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


const Slider = () => {

  return (
    <Carousel className="w-full max-w-7xl ">
    <CarouselContent>
      {Array.from({ length: 5 }).map((_, index) => (
        <CarouselItem key={index} className="">
          <div className="p-1">
            <Card>
              <CardContent className=" flex h-[700px] items-center justify-center">
                <div className="">
                    <Image
                    src="/assas1.jpg"
                    alt="image"
                    fill
                    className=" rounded-xl"
                    />
                </div>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
  )
}

export default Slider