import LoginButton from '@/components/browse/LoginButton';
import UserButton from '@/components/browse/UserButton';
import { Button } from '@/components/ui/button';
import { currentUser } from '@/lib/auth'
import { ShoppingCart } from 'lucide-react';
import React from 'react'
import CartBox from './Cart';

const Actions =async () => {

  const user = await currentUser();
  return (
    <div>
        {!user && (
          <div className='flex items-center justify-center gap-5'>
            <LoginButton mode="redirect" asChild>
              <Button variant="outline" size="lg">
                Sign in
              </Button>
            </LoginButton>
            <div>
             <ShoppingCart className='w-5 h-5 cursor-pointer' />
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