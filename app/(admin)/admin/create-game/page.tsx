import RoleGate from '@/components/auth/role-gate'
import React from 'react'
import CreateGame from './_components/CreateGame'
import { UserRole } from '@prisma/client'

const CreateGamePage = () => {
  return (
    <RoleGate allowedRole={UserRole.ADMIN}>
        <CreateGame />
    </RoleGate>
  )
}

export default CreateGamePage