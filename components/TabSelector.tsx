import { Button } from "@/components/ui/button"

type TabSelectorProps = {
  tabs: readonly (number | "Custom")[]
  selectedTab: number
  onTabChange: (index: number) => void
}

export default function TabSelector({ tabs, selectedTab, onTabChange }: TabSelectorProps) {
  return (
    <div className="flex justify-center">
      <div className="inline-flex rounded-lg p-1 bg-muted/30 gap-1">
        {tabs.map((tab, index) => (
          <Button
            key={tab}
            variant={selectedTab === index ? "default" : "ghost"}
            onClick={() => onTabChange(index)}
            className={`flex-1 text-sm ${
              selectedTab === index ? 'shadow-sm' : ''
            }`}
            size="sm"
          >
            {typeof tab === "number" ? `${tab}m` : tab}
          </Button>
        ))}
      </div>
    </div>
  )
}

