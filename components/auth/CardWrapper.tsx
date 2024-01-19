"use client";
import { Card,CardContent,CardFooter,CardHeader } from "../ui/card";
import BackButton from "./BackButton";
import Header from "./Header";
import Social from "./Social";

interface CardWrapperProps {
    children:React.ReactNode;
    headerLabel:string;
    backButtonLabel:string;
    backButtonHref:string;
    showSocial?:boolean;
}

const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
}:CardWrapperProps) => {



  return (
   <Card className="border-none  w-[300px] md:w-[400px] shadow-lg shadow-black bg-black">
        <CardHeader>
            <Header label={headerLabel} />
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
        <CardFooter>
            <BackButton 
            label={backButtonLabel}
            href={backButtonHref}
            />
        </CardFooter>
   </Card>
  )
}

export default CardWrapper