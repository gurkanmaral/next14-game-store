import React from "react"
const AuthLayout = ({children}:{children :React.ReactNode}) =>{

    return (
        <div className="h-full w-[100vw] flex items-center justify-center  login-bg">           
                {children}
        </div>
    )
}

export default AuthLayout