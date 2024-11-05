'use client'

import React from 'react';
import { useGamification } from '../../context/GamificationContext';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Zap, Clock, Star, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { POWER_UPS } from '../../config/constants';

const PowerUpIcon = ({ id }: { id: string }) => {
  switch (id) {
    case 'doublePoints':
      return <Zap className="h-5 w-5 text-yellow-500" />;
    case 'instantLevel':
      return <Star className="h-5 w-5 text-purple-500" />;
    case 'bonusStreak':
      return <Shield className="h-5 w-5 text-blue-500" />;
    default:
      return <Star className="h-5 w-5" />;
  }
};

export function PowerUpsCard() {
  const { state, dispatch } = useGamification();

  const handlePurchase = (studentId: number, powerUpId: string) => {
    const powerUp = POWER_UPS.find(p => p.id === powerUpId);
    if (powerUp) {
      dispatch({
        type: 'PURCHASE_POWERUP',
        payload: { studentId, powerUp }
      });
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: `Power-up ${powerUp.name} purchased!`
      });
    }
  };

  const getRemainingTime = (expiresAt: number) => {
    const remaining = Math.max(0, expiresAt - Date.now());
    const minutes = Math.floor(remaining / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {POWER_UPS.map(powerUp => (
          <motion.div
            key={powerUp.id}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2">
                <Badge variant="secondary">{powerUp.cost} points</Badge>
              </div>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <PowerUpIcon id={powerUp.id} />
                  <CardTitle className="text-lg">{powerUp.name}</CardTitle>
                </div>
                <CardDescription>{powerUp.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {state.students.map(student => {
                    const activePowerUp = student.activePowerUps.find(
                      p => p.id === powerUp.id && p.expiresAt && p.expiresAt > Date.now()
                    );

                    return (
                      <div key={student.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{student.name}</p>
                          {activePowerUp && activePowerUp.expiresAt && (
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {getRemainingTime(activePowerUp.expiresAt)}
                            </div>
                          )}
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <Button
                                  size="sm"
                                  variant={activePowerUp ? "secondary" : "default"}
                                  onClick={() => handlePurchase(student.id, powerUp.id)}
                                  disabled={student.points < powerUp.cost || !!activePowerUp}
                                >
                                  {activePowerUp ? 'Active' : 'Purchase'}
                                </Button>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              {activePowerUp 
                                ? 'Power-up is active' 
                                : student.points < powerUp.cost 
                                  ? 'Not enough points' 
                                  : 'Purchase power-up'
                              }
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Power-ups</CardTitle>
          <CardDescription>Currently active power-ups for each student</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {state.students.map(student => {
              const activePowerUps = student.activePowerUps.filter(
                p => p.expiresAt && p.expiresAt > Date.now()
              );

              return (
                <div key={student.id} className="space-y-2">
                  <h3 className="font-medium">{student.name}</h3>
                  {activePowerUps.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {activePowerUps.map(powerUp => (
                        <Badge key={powerUp.id} variant="secondary" className="flex items-center gap-1">
                          <PowerUpIcon id={powerUp.id} />
                          {powerUp.name}
                          {powerUp.expiresAt && (
                            <span className="text-xs ml-1">
                              ({getRemainingTime(powerUp.expiresAt)})
                            </span>
                          )}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No active power-ups</p>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}