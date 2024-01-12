import CardWrapper from '@/components/auth/CardWrapper'
import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'

const AuthErrorCard = () => {
  return (
    <CardWrapper
    headerLabel='Something went wrong'
    backButtonHref='/auth/login'
    backButtonLabel='Back to login'
    >
        <div className='w-full items-center flex justify-center'>
            <FaExclamationTriangle className="text-desctructive" />
        </div>
    </CardWrapper>
  )
}

export default AuthErrorCard