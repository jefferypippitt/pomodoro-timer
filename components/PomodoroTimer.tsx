"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import TabSelector from "@/components/TabSelector"
import Timer from "@/components/Timer"
import ControlButtons from "@/components/ControlButtons"
import CustomTimerInput from "@/components/CustomTimerInput"
import Banner from "@/components/Banner"

const TIMER_DURATIONS = [25, 15, 5, "Custom"] as const

export default function PomodoroTimer() {
  const [selectedTab, setSelectedTab] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(
    typeof TIMER_DURATIONS[0] === 'number' ? TIMER_DURATIONS[0] * 60 : 0
  )
  const [isRunning, setIsRunning] = useState(false)
  const [customDuration, setCustomDuration] = useState<number | null>(null)
  const [isEditingCustomTime, setIsEditingCustomTime] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeRemaining === 0) {
      setIsRunning(false)
    }

    return () => clearInterval(interval)
  }, [isRunning, timeRemaining])

  const handleTabChange = (index: number) => {
    setSelectedTab(index)
    if (typeof TIMER_DURATIONS[index] === "number") {
      setTimeRemaining((TIMER_DURATIONS[index] as number) * 60)
      resetCustomDuration()
    } else if (customDuration) {
      setTimeRemaining(customDuration)
    }
    setIsRunning(false)
  }

  const handleStartPause = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    if (typeof TIMER_DURATIONS[selectedTab] === "number") {
      setTimeRemaining((TIMER_DURATIONS[selectedTab] as number) * 60)
    } else if (customDuration) {
      setTimeRemaining(customDuration)
    } else {
      resetCustomDuration()
    }
    setIsRunning(false)
  }

  const handleResetCustom = () => {
    setCustomDuration(null)
    setIsEditingCustomTime(true)
    setIsRunning(false)
  }

  const handleCustomTimeSet = (totalSeconds: number) => {
    setCustomDuration(totalSeconds)
    setTimeRemaining(totalSeconds)
    setSelectedTab(TIMER_DURATIONS.indexOf("Custom"))
    setIsRunning(false)
  }

  const resetCustomDuration = () => {
    setCustomDuration(null)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Banner />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-xl rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 p-8 shadow-lg">
          <TabSelector tabs={TIMER_DURATIONS} selectedTab={selectedTab} onTabChange={handleTabChange} />
          <div className="mt-6 mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={
                  selectedTab === TIMER_DURATIONS.indexOf("Custom") && (isEditingCustomTime || !customDuration)
                    ? "custom"
                    : "timer"
                }
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                {selectedTab === TIMER_DURATIONS.indexOf("Custom") && (isEditingCustomTime || !customDuration) ? (
                  <CustomTimerInput
                    onCustomTimeSet={(totalSeconds) => {
                      handleCustomTimeSet(totalSeconds)
                      setIsEditingCustomTime(false)
                    }}
                    onEdit={() => setIsEditingCustomTime(true)}
                    showEditButton={!isEditingCustomTime && customDuration !== null}
                  />
                ) : (
                  <Timer timeRemaining={timeRemaining} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <ControlButtons
            isRunning={isRunning}
            onStartPause={handleStartPause}
            onReset={handleReset}
            onResetCustom={handleResetCustom}
            showResetCustom={selectedTab === TIMER_DURATIONS.indexOf("Custom") && customDuration !== null}
          />
        </div>
      </div>
    </div>
  )
}

