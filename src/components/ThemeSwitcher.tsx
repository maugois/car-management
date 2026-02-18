'use client';

import { useTheme } from 'next-themes';
import { MdOutlineLightMode, MdOutlineNightlight } from 'react-icons/md';
import { Button } from '@/components/ui/button';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      suppressHydrationWarning
      className='cursor-pointer'
    >
      {theme === 'light' ? (
        <MdOutlineNightlight className="size-5" />
      ) : (
        <MdOutlineLightMode className="size-5" />
      )}
    </Button>
  );
}