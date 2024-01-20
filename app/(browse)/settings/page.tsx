"use client";

import FormError from "@/components/auth/FormError";
import FormSuccess from "@/components/auth/FormSuccess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { SettingsSchema } from "@/schemas/settingsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { useForm } from "react-hook-form";
import * as z from "zod";

const SettingsPage = () => {
    const user = useCurrentUser();
   const router = useRouter();
    if(!user) {
      router.push("/auth/login")
    }
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const { update } = useSession();
    const [isPending, startTransition] = useTransition();

    
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      name: user?.name || undefined,
      email: user?.email || undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    }
  });




  return (
    <div className='pt-10 max-w-screen-lg mx-auto justify-center p-2 md:p-0 gap-10 flex flex-col items-center h-full'>
        <Card className=" w-full md:w-[700px] bg-black shadow-md shadow-white/15">
            <CardHeader>
            <p className="text-2xl font-semibold text-center">
                  ⚙️ Settings
            </p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-6"
                     >
                    <div className="space-y-4">
                        <FormField 
                           control={form.control}
                           name="name"
                           render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="John Doe"
                                  disabled={isPending}
                                  className="bg-black text-white border border-white/15"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {user?.isOAuth === false && (
                            <>
                             <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="john.doe@example.com"
                            type="email"
                            disabled={isPending}
                            className="bg-black text-white border border-white/15"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="******"
                            type="password"
                            disabled={isPending}
                            className="bg-black text-white border border-white/15"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="******"
                            type="password"
                            disabled={isPending}
                            className="bg-black text-white border border-white/15"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
                )}
                 {user?.isOAuth === false && (
                <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/15 p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription>
                          Enable two factor authentication for your account
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="bg-black text-white border border-white/15"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        disabled={isPending}
                        type="submit"
                        >
                         Save
                      </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  )
}

export default SettingsPage