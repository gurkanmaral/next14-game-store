import LoginButton from '@/components/browse/LoginButton';
import UserButton from '@/components/browse/UserButton';
import { Button } from '@/components/ui/button';
import { currentUser } from '@/lib/auth'
import { ShoppingCart } from 'lucide-react';
import React from 'react'
import CartBox from './Cart';

const Actions =async () => {

  const user = await currentUser();
  console.log(user)
  return (
    <div className='ml-2 md:ml-0'>
        {!user && (
          <div className='flex items-center justify-center gap-5'>
            <LoginButton mode="redirect" asChild>
              <Button size="lg" className='bg-black border border-white/15 text-white hover:bg-white hover:text-black transition-all'>
                Sign in
              </Button>
            </LoginButton>
            <div>
            <CartBox />     
            </div>
          </div>
        )}
        {!!user && (
          <div className='flex items-center gap-5 justify-center'>
            <UserButton />
             <CartBox />     
          </div>
        )}
    </div>
  )
}

export default Actions