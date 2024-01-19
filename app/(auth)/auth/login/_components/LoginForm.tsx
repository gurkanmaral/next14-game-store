"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import CardWrapper from "@/components/auth/CardWrapper";
import { LoginSchema } from "@/schemas/loginSchema";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {Form,FormControl,FormField,FormItem,FormLabel,
FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FormError from "@/components/auth/FormError";
import FormSuccess from "@/components/auth/FormSuccess";
import { login } from "@/actions/login";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["100", "300", "400", "700", "900"],
  });



const LoginForm = () => {

    const searchParams = useSearchParams();

    const callbackUrl = searchParams.get("callbackUrl");
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email already in use with different provider"  : "" ;

    const [isPending,startTransition] = useTransition();
    const [error,setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>("");
    const [showTwoFactor,setShowTwoFactor] = useState(false);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues:{
            email:"",
        },
    });

    const onSubmit = (values:z.infer<typeof LoginSchema>) =>{
        setError("");
        setSuccess("");
        startTransition(()=>{
            login(values,callbackUrl)
                .then((data)=>{
                    if(data?.error) {
                        form.reset();
                        setError(data.error);
                    }
                    if(data?.success) {
                        form.reset();
                        setSuccess(data.success);
                    }
                    if(data?.twoFactor) {
                        setShowTwoFactor(true);
                    }
                    
                })
                .catch(()=>setError("Something went wrong!"));
        })
    }


  return (
    <CardWrapper
    headerLabel="Welcome back"
    backButtonHref="/auth/register"
    backButtonLabel="Don't you have an account?"
    showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
                {showTwoFactor && (
                     <FormField 
                     control={form.control}
                     name="code"
                     render={({field}) =>(
                         <FormItem>
                             <FormLabel>Two Factor Code</FormLabel>
                             <FormControl>
                                 <Input 
                                 disabled={isPending}
                                 {...field}
                                 placeholder="123456"
                                 />
                             </FormControl>
                             <FormMessage 
                             
                             />
                         </FormItem>
                     )}
                     />
                )}
                {!showTwoFactor && (
        <>
        <FormField 
            control={form.control}
            name="email"
            render={({field}) =>(
               <FormItem>
                   <FormLabel>Email</FormLabel>
                   <FormControl>
                       <Input
                       disabled={isPending}
                       {...field}
                       placeholder="John.doe@example.com"
                       type="email"
                       className="bg-black border border-white"
                       />
                   </FormControl>
                   <FormMessage 
                   
                   />
               </FormItem>
           )}
           />
            <FormField 
           control={form.control}
           name="password"
           render={({field}) =>(
               <FormItem>
                   <FormLabel>Password</FormLabel>
                   <FormControl>
                       <Input 
                       disabled={isPending}
                       {...field}
                       placeholder="******"
                       type="password"
                       className="bg-black border border-white"
                       />
                   </FormControl>
                   <Button size="sm" variant="link" asChild className="px-0 font-normal">
                       <Link href="/auth/reset">
                           Forgot Password?
                       </Link>
                   </Button>
                   <FormMessage                           
                   />
               </FormItem>
           )}
           />
        </>
    )}
            </div>
            <FormError 
            message={error || urlError}
            />
            <FormSuccess 
            message={success}
            />
            <Button type="submit" className="w-full" disabled={isPending} >
                    Login            
            </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm