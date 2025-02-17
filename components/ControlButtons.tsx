import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Play, Pause, RotateCcw, RefreshCw } from "lucide-react"

interface ControlButtonsProps {
  isRunning: boolean
  onStartPause: () => void
  onReset: () => void
  onResetCustom: () => void
  showResetCustom: boolean
}

export default function ControlButtons({
  isRunning,
  onStartPause,
  onReset,
  onResetCustom,
  showResetCustom,
}: ControlButtonsProps) {
  return (
    <TooltipProvider>
      <div className="flex justify-center space-x-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={onStartPause} size="icon" variant="outline">
              {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isRunning ? 'Pause' : 'Start'}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={onReset} variant="outline" size="icon">
              <RotateCcw className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reset Timer</p>
          </TooltipContent>
        </Tooltip>

        {showResetCustom && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={onResetCustom}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Change Custom Timer</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  )
}

