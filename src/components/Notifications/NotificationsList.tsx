'use client'

import React from 'react';
import { useGamification } from '../../context/GamificationContext';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, XCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function NotificationsList() {
  const { state } = useGamification();

  const getNotificationIcon = (type?: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Notifications</CardTitle>
          <Badge variant="secondary">
            {state.notifications.length} new
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          <div className="space-y-4">
            {state.notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted"
              >
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <p className="text-sm">{notification.message}</p>
                  {notification.timestamp && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {getTimeAgo(notification.timestamp)}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
            {state.notifications.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No new notifications</p>
              </div>
            )}
          </div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}