"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CustomTimerInputProps {
  onCustomTimeSet: (totalSeconds: number) => void
  onEdit: () => void
  showEditButton: boolean
}

export default function CustomTimerInput({ onCustomTimeSet, onEdit, showEditButton }: CustomTimerInputProps) {
  const [hours, setHours] = useState("")
  const [minutes, setMinutes] = useState("")
  const [seconds, setSeconds] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const totalSeconds =
      Number.parseInt(hours || "0", 10) * 3600 +
      Number.parseInt(minutes || "0", 10) * 60 +
      Number.parseInt(seconds || "0", 10)

    if (totalSeconds > 0) {
      onCustomTimeSet(totalSeconds)
      setHours("")
      setMinutes("")
      setSeconds("")
    }
  }

  if (showEditButton) {
    return (
      <div className="flex justify-center">
        <Button variant="outline" onClick={onEdit}>
          Edit Custom Time
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <Input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="Hours"
          min="0"
          className="text-center"
        />
        <Input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          placeholder="Minutes"
          min="0"
          max="59"
          className="text-center"
        />
        <Input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
          placeholder="Seconds"
          min="0"
          max="59"
          className="text-center"
        />
      </div>
      <Button type="submit" className="w-full">Set Timer</Button>
    </form>
  )
}

