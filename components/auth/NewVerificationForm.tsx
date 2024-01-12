"use client"

import { newVerification } from "@/actions/new-verification";
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";
import {BeatLoader} from "react-spinners";
import CardWrapper from "./CardWrapper";

const NewVerificationForm = () => {

    const searchParams = useSearchParams();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const token = searchParams.get("token");


    const onSubmit = useCallback(()=>{
        if(success || error) return;
        
        if(!token) {
            setError("Missing Token");
            return;
        }
        newVerification(token)
        .then((data)=> {
            setSuccess(data.success);
            setError(data.error);
        })
        .catch(()=>{
            setError("Something went wrong!")
        })

        
    },[token,error,success])

    useEffect(()=>{
        onSubmit();
    },[onSubmit])


  return (
    <CardWrapper
    headerLabel="Confirming your verification"
    backButtonHref="/auth/login"
    backButtonLabel="Back to login"
    >
        <div className="flex items-center w-full justify-center">
            {!success && !error && (
                <BeatLoader />
            )}
            <FormSuccess message={success} />
            
            {!success && (
                <FormError message={error} />
            )}
            
        </div>
    </CardWrapper>
  )
}

export default NewVerificationForm