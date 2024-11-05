'use client'

import React from 'react';
import { useGamification } from '../../context/GamificationContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Settings,
  Moon,
  Sun,
  Palette,
  Bell,
  Shield,
  Save,
} from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function SettingsPanel() {
  const { state, dispatch } = useGamification();
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(state.theme === 'dark');
  const [autoSave, setAutoSave] = React.useState(true);

  const handleThemeChange = (isDark: boolean) => {
    setDarkMode(isDark);
    dispatch({
      type: 'SET_THEME',
      payload: isDark ? 'dark' : 'light'
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Dashboard Settings</SheetTitle>
          <SheetDescription>
            Customize your dashboard experience
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                </div>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={handleThemeChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Palette className="h-4 w-4" />
                  <Label htmlFor="animations">Enable Animations</Label>
                </div>
                <Switch
                  id="animations"
                  defaultChecked
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4" />
                  <Label htmlFor="notifications">Enable Notifications</Label>
                </div>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Data Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <Label htmlFor="auto-save">Auto Save</Label>
                </div>
                <Switch
                  id="auto-save"
                  checked={autoSave}
                  onCheckedChange={setAutoSave}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <Label htmlFor="backup">Auto Backup</Label>
                </div>
                <Switch
                  id="backup"
                  defaultChecked
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}