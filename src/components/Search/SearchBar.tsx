'use client'

import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Search students..." 
}: SearchBarProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
}