import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {signIn} from "next-auth/react";

export default function LoginModal() {
  const handleLogin = () => {
      signIn("google",{
        callbackUrl: "/dashboard",
        redirect: true,
      })
  }



    return(<Dialog>
  <DialogTrigger asChild>
        <button>Getting Start</button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="text-2xl">Welcome to QuickChat</DialogTitle>
      <DialogDescription>
        Quick chat makes it easy to connect with people around the world.
        Sign up to start chatting with friends, family, and new connections.
      </DialogDescription>
    </DialogHeader>
    <Button variant="outline" onClick={handleLogin}>
        <Image 
        src="/images/google.png" 
        className='mr-4'
        width={25} 
        height={25} 
        alt='google_logo' />

        Continue with Google
        
    </Button>
  </DialogContent>
</Dialog>)
}