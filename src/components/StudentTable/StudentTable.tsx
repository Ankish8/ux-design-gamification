'use client'

import React, { useState } from 'react'
import { Plus, Minus, Search, Info, GripVertical, Candy, CheckCircle2, Star } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from 'framer-motion'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'

interface Student {
  id: number
  name: string
  kitKatPoints: number
  xp: number
  level: number
  streak: number
  avatar: string
}

const LEVEL_THRESHOLDS = [0, 100, 200, 300, 400, 500]
const XP_PER_KIT_KAT = 100
const MAX_MULTIPLIER = 5

const calculateMultiplier = (streak: number) => streak === 0 ? 1 : Math.min(1 + streak * 0.1, MAX_MULTIPLIER)

const StudentTable = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Alice Johnson", kitKatPoints: 0, xp: 0, level: 0, streak: 0, avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Bob Smith", kitKatPoints: 0, xp: 0, level: 0, streak: 0, avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Charlie Davis", kitKatPoints: 0, xp: 0, level: 0, streak: 0, avatar: "/placeholder.svg?height=40&width=40" }
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [showAnimation, setShowAnimation] = useState<{ id: number, change: number } | null>(null)

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleKitKatChange = (studentId: number, change: number) => {
    setStudents(prevStudents => 
      prevStudents.map(student => {
        if (student.id === studentId) {
          const multiplier = calculateMultiplier(student.streak)
          const newKitKatPoints = Math.max(0, student.kitKatPoints + change)
          const xpChange = change * XP_PER_KIT_KAT * multiplier
          const newXP = Math.max(0, student.xp + xpChange)
          const newLevel = LEVEL_THRESHOLDS.findIndex(threshold => newXP < threshold)
          return { 
            ...student, 
            kitKatPoints: newKitKatPoints, 
            xp: newXP, 
            level: newLevel === -1 ? LEVEL_THRESHOLDS.length : newLevel 
          }
        }
        return student
      })
    )
    setShowAnimation({ id: studentId, change })
    setTimeout(() => setShowAnimation(null), 300)
  }

  const handleStreakIncrease = (studentId: number) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId
          ? { ...student, streak: student.streak + 1 }
          : student
      )
    )
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(students)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setStudents(items)
  }

  return (
    <div className="p-4 overflow-x-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div className="flex items-center gap-2">
          <Candy className="h-8 w-8 text-amber-500" />
          <h2 className="text-2xl font-bold">Student Rewards</h2>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="w-full sm:w-72">
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>XP needed for each level:</p>
                <ul>
                  {LEVEL_THRESHOLDS.map((threshold, index) => (
                    <li key={index}>Level {index + 1}: {threshold} XP</li>
                  ))}
                </ul>
                <p>1 Kit Kat point = {XP_PER_KIT_KAT} base XP</p>
                <p>Streak multiplier: 1 + (streak * 0.1), max {MAX_MULTIPLIER}x</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="students">
          {(provided) => (
            <Table className="w-full" {...provided.droppableProps} ref={provided.innerRef}>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="w-[120px]">Kit Kat Points</TableHead>
                  <TableHead className="w-[120px]">XP</TableHead>
                  <TableHead className="w-[100px]">Level</TableHead>
                  <TableHead className="w-[150px]">Streak</TableHead>
                  <TableHead className="w-[100px]">Multiplier</TableHead>
                  <TableHead className="w-[200px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student, index) => (
                  <Draggable key={student.id} draggableId={student.id.toString()} index={index}>
                    {(provided) => (
                      <TableRow
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TableCell>
                          <GripVertical className="h-5 w-5 text-gray-500" />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={student.avatar} alt={student.name} />
                              <AvatarFallback>{student.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="hidden sm:inline">{student.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                              {student.kitKatPoints} <Candy className="h-4 w-4 inline ml-1" />
                            </Badge>
                            <AnimatePresence>
                              {showAnimation?.id === student.id && (
                                <motion.span
                                  key={`animation-${student.id}-${showAnimation.change}`}
                                  initial={{ opacity: 0, y: showAnimation.change > 0 ? -20 : 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: showAnimation.change > 0 ? -20 : 20 }}
                                  transition={{ duration: 0.3 }}
                                  className={`absolute ml-16 font-bold ${showAnimation.change > 0 ? 'text-green-500' : 'text-red-500'}`}
                                >
                                  {showAnimation.change > 0 ? '+' : ''}{showAnimation.change}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>
                        </TableCell>
                        <TableCell>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Badge variant="secondary">
                                  {student.xp} XP
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{LEVEL_THRESHOLDS[student.level] - student.xp} XP to next level</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">Level {student.level}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {student.streak} days <Star className="h-4 w-4 inline ml-1 text-yellow-500" />
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`bg-gradient-to-r ${getMultiplierColor(calculateMultiplier(student.streak))}`}
                          >
                            {calculateMultiplier(student.streak).toFixed(1)}x
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleKitKatChange(student.id, 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleKitKatChange(student.id, -1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      onClick={() => handleStreakIncrease(student.id)}
                                    >
                                      <CheckCircle2 className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Increase attendance streak</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </motion.div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TableBody>
            </Table>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

const getMultiplierColor = (multiplier: number) => {
  if (multiplier < 2) return 'from-blue-200 to-blue-300 text-blue-800'
  if (multiplier < 3) return 'from-green-200 to-green-300 text-green-800'
  if (multiplier < 4) return 'from-yellow-200 to-yellow-300 text-yellow-800'
  return 'from-red-200 to-red-300 text-red-800'
}

export default StudentTable