import { motion, AnimatePresence } from "framer-motion"

interface TimerProps {
  timeRemaining: number
}

const DigitContainer = ({ digit }: { digit: string }) => (
  <div className="w-12 h-16 relative overflow-hidden rounded-lg bg-gradient-to-b from-background to-muted flex items-center justify-center">
    <AnimatePresence mode="popLayout">
      <motion.span
        key={digit}
        className="absolute inset-0 flex items-center justify-center font-medium"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {digit}
      </motion.span>
    </AnimatePresence>
  </div>
)

export default function Timer({ timeRemaining }: TimerProps) {
  const hours = Math.floor(timeRemaining / 3600)
  const minutes = Math.floor((timeRemaining % 3600) / 60)
  const seconds = timeRemaining % 60

  const formatTime = (value: number) => value.toString().padStart(2, "0")

  return (
    <div className="flex justify-center items-center gap-2 text-4xl">
      {hours > 0 && (
        <>
          <DigitContainer digit={formatTime(hours)[0]} />
          <DigitContainer digit={formatTime(hours)[1]} />
          <span className="text-muted-foreground">:</span>
        </>
      )}
      <DigitContainer digit={formatTime(minutes)[0]} />
      <DigitContainer digit={formatTime(minutes)[1]} />
      <span className="text-muted-foreground">:</span>
      <DigitContainer digit={formatTime(seconds)[0]} />
      <DigitContainer digit={formatTime(seconds)[1]} />
    </div>
  )
}

