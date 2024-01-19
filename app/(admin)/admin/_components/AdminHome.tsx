import Link from 'next/link'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'



const AdminHome = () => {
  return (
    <div className=' w-full h-full px-4 md:px-0 min-h-screen mx-auto max-w-[1440px] items-center justify-center flex' >    
        <Card className='w-full md:w-[600px] bg-black border border-white/15 '>
          <CardHeader>
            <CardTitle>Admin Page</CardTitle>
            <CardDescription>Create and update games. See the list of users and bought games. </CardDescription>
          </CardHeader>
            <CardContent className='flex w-full justify-between'>
            <Button asChild>
                <Link href="/admin/create-game">
                  Create Game
              </Link>
            </Button>
            <Button asChild>
                <Link href="/admin/create-game">
                  Update Game
              </Link>
            </Button>
            <Button asChild>
                <Link href="/admin/create-game">
                  Users List
              </Link>
            </Button>
            <Button asChild>
                <Link href="/admin/create-game">
                  Bought games
              </Link>
            </Button>
            </CardContent>
              <CardFooter>
             
              </CardFooter>
          </Card>
  
    </div>
  )
}

export default AdminHome