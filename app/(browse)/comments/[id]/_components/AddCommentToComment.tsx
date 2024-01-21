"use client";

import { addCommentToComment } from "@/actions/comment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";

interface AddCommentToCommentProps {
    userId:string;
    gameId:string;
    parentId:string;
}

const AddCommentToComment = ({userId,gameId,parentId}:AddCommentToCommentProps) => {

    const [message,setMessage] = useState("");
    const [isPending,startTransition] = useTransition();

    const handleAddComment = () => {
        startTransition(()=>{
            addCommentToComment(userId,parentId,gameId,message)
        })
        setMessage("");
    }

  return (
    <div className="px-4 w-full flex flex-col items-center justify-center gap-4">
       <Textarea 
       value={message}
       onChange={(e)=>setMessage(e.target.value)}
       className="bg-black text-white w-[100%] md:w-[50%] border border-white/15"
       />
        <Button disabled={isPending} onClick={handleAddComment}>
            Send Comment
        </Button>
    </div>
  )
}

export default AddCommentToComment