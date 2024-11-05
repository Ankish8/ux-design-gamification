'use client'

import React from 'react';
import { Bell, Paintbrush } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGamification } from '../../context/GamificationContext';
import { THEMES } from '../../config/constants';

export function Header() {
  const { state, dispatch } = useGamification();

  const handleThemeChange = (theme: string) => {
    dispatch({ type: 'SET_THEME', payload: theme });
    document.documentElement.className = THEMES[theme].className;
  };

  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h1 className="text-3xl font-bold">UX Design Gamification Dashboard</h1>
      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Bell className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Recent Activities</SheetTitle>
              <SheetDescription>
                Stay updated with the latest events
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4 space-y-4">
              {state.notifications.map(notification => (
                <div key={notification.id} className="bg-muted p-3 rounded-lg">
                  {notification.message}
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Paintbrush className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Object.entries(THEMES).map(([key, { name, icon }]) => (
              <DropdownMenuItem 
                key={key}
                onClick={() => handleThemeChange(key)}
              >
                <span className="mr-2">{icon}</span> {name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}