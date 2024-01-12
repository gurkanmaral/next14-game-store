"use client";

import { useCurrentRole } from "@/hooks/useCurrentRole";
import { UserRole } from "@prisma/client";
import FormError from "./FormError";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: UserRole;
}


const RoleGate = ({children,allowedRole}:RoleGateProps) => {

    const role = useCurrentRole();

    if(role !== allowedRole) {
        return (
            <Card className="w-[600px]">
                <CardHeader className="text-2xl font-semibold text-center">
                    Admin
                </CardHeader>
                <CardContent>
                    <FormError message="you do not have permissions" />
                </CardContent>
                <CardFooter className="text-xl font-bold  ">
                    <p>Return home</p>
                </CardFooter>
            </Card>       
        )
    }

  return (
    <>
        {children}
    </>
  )
}

export default RoleGate