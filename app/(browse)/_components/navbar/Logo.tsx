import React from 'react'
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';



const font = Poppins({
    subsets: ["latin"],
    weight: ["100", "300", "400", "700", "900"],
  });

const Logo = () => {

  return (
    <Link href="/">
        <div className='flex -items-center gap-x-4 hover:opacity-75 transition'>
            <div className='bg-white rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink items-center flex' >
                <Image
                alt="game-icon"
                height="35"
                width="35"
                src="/oni.svg"
                />
            </div>
            <div className={cn("hidden lg:block",font.className)}>
                <p className='text-lg font-bold'>
                    Gamehub
                </p>
                <p className='text-xs text-muted-foreground'>
                  Let&apos;s play
                </p>
            </div>
        </div>
    </Link>
  )
}

export default Logo