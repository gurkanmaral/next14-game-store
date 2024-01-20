"use client";
import { onFollow, onUnfollow } from '@/actions/follow';
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import { toast } from 'sonner';

interface FollowButtonProps {
    isFollowing:boolean;
    userId:string;
    selfId?:string;
}

const FollowButton = ({isFollowing,userId,selfId}:FollowButtonProps) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();


    const handleFollow = () => {
        startTransition(()=>{
            onFollow(userId)
                .then((data)=> toast.success(`You are now following ${data.following.name}`))
                .catch(()=> toast.error("Something went wrong"))
        })
    }
    const handleUnfollow = () => {
        startTransition(()=>{
            onUnfollow(userId)
                .then((data)=> toast.success(`You have unfollowed ${data.following.name}`))
                .catch(()=> toast.error("Something went wrong"))
        })
    }

    const toggleFollow = () => {
        if (!selfId) {
            return router.push("/auth/login");
          }

          if (isFollowing) {
            handleUnfollow();
          } else {
            handleFollow();
          }
       
    }

  return (
    <Button disabled={isPending} onClick={toggleFollow} className='w-full'>
                {isFollowing ? "following" : "follow"}
    </Button>
  )
}

export default FollowButton