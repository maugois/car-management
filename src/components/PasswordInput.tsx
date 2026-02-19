'use client';

import { useState } from 'react';
import { FaEyeSlash } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface PasswordInputProps {
  id: string;
  placeholder: string;
}

export default function PasswordInput({ id, placeholder }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        id={id}
        placeholder={placeholder}
        className="w-full pr-10"
        required
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer"
      >
        {showPassword ? (
          <IoEyeSharp className="size-5" />
        ) : (
          <FaEyeSlash className="size-5" />
        )}
      </Button>
    </div>
  );
}
