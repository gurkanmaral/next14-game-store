"use client";
import { newPassword } from '@/actions/new-password';
import CardWrapper from '@/components/auth/CardWrapper';
import FormError from '@/components/auth/FormError';
import FormSuccess from '@/components/auth/FormSuccess';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { NewPasswordSchema } from '@/schemas/newPasswordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod";


const NewPasswordForm = () => {

    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [isPending,startTransition] = useTransition();
    const [error,setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
      resolver: zodResolver(NewPasswordSchema),
      defaultValues: {
        password: "",
      },
    });
    const onSubmit = (values:z.infer<typeof NewPasswordSchema>)=>{
      setError("");
      setSuccess("");
       startTransition(()=>{
          newPassword(values,token)
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
    headerLabel="Enter a new Password"
    backButtonHref="/auth/login"
    backButtonLabel="Back to login"
   >
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
      className='space-y-6'>
                  <div className="space-y-4">
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
                   Reset Password
                </Button> 
      </form>
    </Form>
   </CardWrapper>
  )
}

export default NewPasswordForm