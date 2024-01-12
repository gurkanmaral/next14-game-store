"use client";

import { register } from "@/actions/register";
import CardWrapper from "@/components/auth/CardWrapper";
import FormError from "@/components/auth/FormError";
import FormSuccess from "@/components/auth/FormSuccess";
import { Button } from "@/components/ui/button";
import { Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "@/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";


const RegisterForm = () => {

    const [isPending,startTransition] = useTransition();
    const [error,setError] = useState<string | undefined>('');
    const [success,setSuccess] = useState<string | undefined>('');


    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver:zodResolver(RegisterSchema),
        defaultValues:{
            email:"",
            password: "",
            name: "",
        },
    });
    
    const onSubmit = (values:z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        startTransition(()=>{
            register(values)
                .then((data)=>{
                    setError(data.error);
                    setSuccess(data.success);
                });
        })
    }


  return (
    <CardWrapper
    headerLabel="Create an account"
    backButtonHref="/auth/login"
    backButtonLabel="Do you have an account?"
    showSocial
    >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6">
                <div className="space-y-4">
                <FormField 
                    control={form.control}
                    name="name"
                    render={({field}) =>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input 
                                disabled={isPending}
                                {...field}
                                placeholder="John Doe"
                                type="name"
                                />
                            </FormControl>
                            <FormMessage
                            
                            />
                        </FormItem>
                    )}
                    />
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
                                />
                            </FormControl>
                            <FormMessage                           
                            />
                        </FormItem>
                    )}
                    />
                </div>
                <FormError
                    message={error}
                    />
                <FormSuccess
                message={success}
                />
                <Button type="submit" className="w-full"  disabled={isPending}>
                    Create an account
                </Button>
            </form>
        </Form>
    </CardWrapper>
  )
}

export default RegisterForm