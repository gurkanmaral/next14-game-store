"use client";
import React, { ChangeEvent, ElementRef, useRef, useState, useTransition } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash } from 'lucide-react';
import { updateUser } from '@/actions/user';
import { toast } from 'sonner';

interface EditModalProps {
    initialImage?:string;
    initialName:string;
}

const EditModal = ({initialImage,initialName}:EditModalProps) => {

    const closeRef = useRef<ElementRef<"button">>(null);
    const [name, setName] = useState(initialName || '');
    const [imageUrl,setImageUrl] = useState(initialImage || "");
    const [isPending, startTransition] = useTransition();
    const [files, setFiles] = useState<File[]>([])

    const domain = process.env.NEXT_PUBLIC_APP_URL;

    const onRemove = () => {
        startTransition(()=>{
            updateUser({ image:null })
                .then(()=>toast.success("Image removed"))
                setImageUrl("");
                closeRef?.current?.click();
        })
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
      };

      const handleImage = (e:ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault()
  
        const fileReader = new FileReader();
        if(e.target.files && e.target.files.length > 0){
          const file = e.target.files[0];
  
          setFiles(Array.from(e.target.files));
  
          if(!file.type.includes('image')) return;
  
          fileReader.onload = async (event)=>{
            const imageDataUrl = event.target?.result?.toString() || '';
  
            setImageUrl(imageDataUrl)
  
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

    const onSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(files.length > 0 ) {
            const imgUrl = await uploadImage(imageUrl)
            startTransition(() => {
              updateUser({ name: name, image:imgUrl.url})
                .then(() => {
                  toast.success("Profile is updated");
                  closeRef.current?.click();
                })
                .catch(() => toast.error("Something went wrong"));
            });
        }else{
            startTransition(() => {
                updateUser({ name: name})
                  .then(() => {
                    toast.success("asdasda");
                    closeRef.current?.click();
                  })
                  .catch(() => toast.error("Something went wrong"));
              });
        }

               
              
    }

  return (
   <Dialog >
         <DialogTrigger asChild>
        <Button  className='w-full'>
            Edit Profile
        </Button>
      </DialogTrigger>
    <DialogContent className="bg-black border-none rounded-lg " >
         <DialogHeader>
           <DialogTitle>Edit user info</DialogTitle>
        </DialogHeader>
        <form className='space-y-14' onSubmit={onSubmit}>
           <div className='space-y-2'>
           <Label>
                Name
            </Label>
            <Input 
            value={name}
            onChange={onChange}
            className='bg-white border border-white/15 text-black '
            />
           </div>
            <div className='space-y-2 flex justify-center items-center gap-3'>
            <div>
           {imageUrl === initialImage ? (
                 <div className='items-center justify-center flex flex-col gap-3'>
                    <div className=' rounded-[50%] max-w-[150px] aspect-square overflow-hidden border border-white/15 '>
                         <img src={imageUrl} alt="profileImage" className='w-[150px] h-[150px] object-cover rounded-full' />
                     </div>   
                    <div className=''>
                        <Button type='button' disabled={isPending} onClick={onRemove} className="h-auto w-auto p-1.5" >
                            <Trash className='h-4 w-4' />
                        </Button>
                    </div>
                 </div>
            ): imageUrl && imageUrl !== initialImage ? (
                <div>
                    <div className='items-center justify-center flex flex-col gap-3'>
                        <div className=' rounded-[50%] max-w-[150px] aspect-square overflow-hidden border border-white/15 '>
                            <img src={imageUrl} alt="profileImage" className='w-[150px] h-[150px] object-cover rounded-full' />
                        </div>   
                 </div>
                </div>
            ) : (
                <div className='items-center justify-center flex flex-col gap-3'>
                    <div className=' rounded-[50%] max-w-[150px] aspect-square overflow-hidden border border-white/15 '>
                    <img src="/char.svg" alt="profileImage" className='w-[150px] h-[150px] object-cover rounded-full' />
                 </div>   
                 </div>
            )}
           </div>
         <div className='space-y-2'>
            <Label>
                Profile Image
                </Label>
                <Input 
                type='file'
                accept='image/*'
                onChange={(e)=> handleImage(e)}
                className='bg-white text-black'
                />
         </div>        
            </div>
            <div className='flex justify-between'>
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button>
                Save
            </Button>
            </div>
        </form>    
    </DialogContent>  
   </Dialog>
  )
}

export default EditModal