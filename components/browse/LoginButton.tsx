"use client";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import LoginForm from "@/app/(auth)/auth/login/_components/LoginForm";


interface LoginButtonProps{
    children:React.ReactNode;
    mode?:"modal" | "redirect",
    asChild?:boolean;
}

const LoginButton = ({
    children,
    mode="redirect",
    asChild

}:LoginButtonProps) => {
    const router = useRouter();
    const onClick = ()=>{
        router.push('auth/login')
    }

    if(mode === "modal"){
        return (
            <Dialog>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="p-0 w-auto ">
                    <LoginForm />
                </DialogContent>
            </Dialog>
        )
    }

  return (
    <span className="cursor-pointer" onClick={onClick}>
        {children}
    </span>
  )
}

export default LoginButton