"use client";

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createFormSchema } from '@/schemas/createFormSchema'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { ChangeEvent, startTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod";
import DropDown from './DropDown';
import { createGame } from '@/actions/game';
import FormSuccess from '@/components/auth/FormSuccess';

const CreateForm = () => {
    const [files, setFiles] = useState<File[]>([])
    const [success,setSuccess] = useState<string | undefined>('');
    const form = useForm<z.infer<typeof createFormSchema>>({
        resolver:zodResolver(createFormSchema),
        defaultValues: {
            title: "",
            price: "",
            images: "",
            images2: "",
            images3: "",
            images4: "",
            allImages: [],
            SpecialPrice: "",
            description: "",
            Genres: [],
            metacritic: "",
            released: "",
            platforms: [],
            developer:"",
        }
    })

    const domain = process.env.NEXT_PUBLIC_APP_URL;
    const handleImage = (e:ChangeEvent<HTMLInputElement>,fieldChange: (value:string)=>void)=>{
        e.preventDefault()
  
        const fileReader = new FileReader();
        if(e.target.files && e.target.files.length > 0){
          const file = e.target.files[0];
  
          setFiles(Array.from(e.target.files));
  
          if(!file.type.includes('image')) return;
  
          fileReader.onload = async (event)=>{
            const imageDataUrl = event.target?.result?.toString() || '';
  
            fieldChange(imageDataUrl);
  
          }
          fileReader.readAsDataURL(file);
        }
      
      }
  
     const uploadImage = async(imagePath:string)=>{
        try {
    
            const response = await fetch(`${domain}/api/upload`,{
                method: 'POST',
                body: JSON.stringify({path: imagePath})
            })
            
            return response.json();
        } catch (error) {
            throw error
        }
    }

    const onSubmit =async (values: z.infer<typeof createFormSchema>) => {
            console.log(values)
            let imagesArray = [];
            try {
                const imageUrl1 = await uploadImage(values.images)
                const imageUrl2 = await uploadImage(values.images2)
                const imageUrl3 = await uploadImage(values.images3)
                const imageUrl4 = await uploadImage(values.images4)

                if(imageUrl1.url && imageUrl2 && imageUrl3 && imageUrl4) {
                        imagesArray.push(imageUrl1.url,imageUrl2.url,imageUrl3.url,imageUrl4.url)
                        values.allImages = imagesArray
                }else{
                    console.log("error")
                }

                startTransition(()=>{
                    createGame(values)
                        .then((data)=>{
                            setSuccess(data.success);
                        })
                })


            } catch (error) {
                console.log(error)
            }

    }

    console.log(files)
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
            control={form.control}
            name="title"
            render={({field})=> (
                <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                        <Input 
                        {...field}
                        placeholder='Title'

                        />
                    </FormControl>
                    <FormMessage
                             
                             />
                </FormItem>
            )}
            />
             <FormField
            control={form.control}
            name="description"
            render={({field})=> (
                <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea
                        {...field}
                        placeholder='Description'

                        />
                    </FormControl>
                    <FormMessage
                             
                             />
                </FormItem>
            )}
            />
        <FormField
            control={form.control}
            name="images"
            render={({field})=> (
                <FormItem>
                    <FormLabel>Image 1</FormLabel>
                    <FormControl>
                        <Input 
                        type="file"
                        accept='image/*'
                        placeholder='Upload a photo'
                        onChange={(e)=> handleImage(e,field.onChange)}
                        />
                    </FormControl>
                    <FormMessage
                             
                             />
                </FormItem>
            )}
            />
                 
        <FormField
            control={form.control}
            name="images2"
            render={({field})=> (
                <FormItem>
                    <FormLabel>Image 2</FormLabel>
                    <FormControl>
                    <Input 
                        type="file"
                        accept='image/*'
                        placeholder='Upload a photo'
                        onChange={(e)=> handleImage(e,field.onChange)}
                        />
                    </FormControl>
                    <FormMessage
                             
                             />
                </FormItem>
            )}
            />
             <FormField
            control={form.control}
            name="images3"
            render={({field})=> (
                <FormItem>
                    <FormLabel>Image 3</FormLabel>
                    <FormControl>
                    <Input 
                        type="file"
                        accept='image/*'
                        placeholder='Upload a photo'
                        onChange={(e)=> handleImage(e,field.onChange)}
                        />
                    </FormControl>
                    <FormMessage
                             
                             />
                </FormItem>
            )}
            />
             <FormField
            control={form.control}
            name="images4"
            render={({field})=> (
                <FormItem>
                    <FormLabel>Image 4</FormLabel>
                    <FormControl>
                    <Input 
                        type="file"
                        accept='image/*'
                        placeholder='Upload a photo'
                        onChange={(e)=> handleImage(e,field.onChange)}
                        />
                    </FormControl>
                    <FormMessage
                             
                             />
                </FormItem>
            )}
            />
             <FormField
            control={form.control}
            name="price"
            render={({field})=> (
                <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                    <Input 
                        {...field}
                        placeholder='Price'

                        />
                    </FormControl>
                    <FormMessage
                             
                             />
                </FormItem>
            )}
            />
             <FormField
            control={form.control}
            name="SpecialPrice"
            render={({field})=> (
                <FormItem>
                    <FormLabel>Special Price</FormLabel>
                    <FormControl>
                    <Input 
                        {...field}
                        placeholder='Special Price'

                        />
                    </FormControl>
                    <FormMessage
                             
                             />
                </FormItem>
            )}
            />
             <FormField
            control={form.control}
            name="Genres"
            render={({field})=> (
                <FormItem>
                    <FormLabel>Genres</FormLabel>
                    <FormControl>
                    <DropDown onChangeHandler={field.onChange} value={field.value} isGenre={true}  />
                    </FormControl>
                    <FormMessage                      
                />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="metacritic"
            render={({field})=> (
                <FormItem>
                    <FormLabel>Metacritic Score</FormLabel>
                    <FormControl>
                    <Input 
                        {...field}
                        placeholder='Score'

                        />
                    </FormControl>
                    <FormMessage
                             
                />
                </FormItem>
            )}
            />
             <FormField
            control={form.control}
            name="released"
            render={({field})=> (
                <FormItem>
                    <FormLabel>Released Date</FormLabel>
                    <FormControl>
                    <Input 
                        {...field}
                        placeholder='Score'

                        />
                    </FormControl>
                    <FormMessage
                             
                />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="platforms"
            render={({field})=> (
                <FormItem>
                    <FormLabel>Platforms</FormLabel>
                    <FormControl>
                    <DropDown onChangeHandler={field.onChange} value={field.value} isGenre={false}  />
                    </FormControl>
                    <FormMessage
                             
                />
                </FormItem>
            )}
            />
             <FormField
            control={form.control}
            name="developer"
            render={({field})=> (
                <FormItem>
                    <FormLabel>Developer</FormLabel>
                    <FormControl>
                    <Input 
                        {...field}
                        placeholder='Developer'

                        />
                    </FormControl>
                    <FormMessage
                             
                />
                </FormItem>
            )}
            />
            {success && <FormSuccess message='Game created' />}
            <Button type='submit'>
                Create
            </Button>
        </form>
    </Form>
  )
}

export default CreateForm