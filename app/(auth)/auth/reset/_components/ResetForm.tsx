"use client";
import { reset } from '@/actions/reset';
import CardWrapper from '@/components/auth/CardWrapper';
import FormError from '@/components/auth/FormError';
import FormSuccess from '@/components/auth/FormSuccess';
import { Button } from '@/components/ui/button';
import { Form,FormControl,FormField,FormItem,FormLabel,
    FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ResetSchema } from '@/schemas/resetSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod";

const ResetForm = () => {

    const [isPending,startTransition] = useTransition();
    const [error,setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver:zodResolver(ResetSchema),
        defaultValues:{
            email: "",
        },
    });

    const onSubmit = (values:z.infer<typeof ResetSchema>)=>{
        setError("");
        setSuccess("");

         startTransition(()=>{
             reset(values)
                 .then((data)=>{
                    if (data?.error) {
                       form.reset();
                         setError(data.error);
                       }
            
                       if (data?.success) {
                         form.reset();
                         setSuccess(data.success);
                       }
                 });

         })       
      }


  return (
   <CardWrapper
   headerLabel="Forgot your password?"
   backButtonHref="/auth/login"
   backButtonLabel="Back to login"
   >
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
                <FormField 
                control={form.control}
                name="email"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input 
                            disabled={isPending}
                            {...field}
                            placeholder='John.doe@example.com'
                            type="email"
                            />
                        </FormControl>
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
            <Button type="submit" className="w-full" disabled={isPending}>
                Send reset email
            </Button>
        </form>
    </Form>
   </CardWrapper>
  )
}

export default ResetForm