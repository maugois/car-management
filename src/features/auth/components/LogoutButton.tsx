'use client'

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { CgLogOut } from "react-icons/cg";

interface LogoutButtonProps {
  label: string;
}

export function LogoutButton({ label }: LogoutButtonProps) {
  return (
    <Button 
      variant={'outline'} 
      onClick={() => signOut({ callbackUrl: '/pt/login?logout=success' })}
      className='flex items-center cursor-pointer mb-10 font-semibold shadow-md'
    >
      <CgLogOut className='size-5' />
      {label}
    </Button>
  );
}