export default function Banner() {
  return (
    <div className="bg-background/50 backdrop-blur-sm border-b border-border/40 px-4 py-2.5">
      <p className="flex justify-center items-center gap-2 text-sm font-medium text-foreground/80">
        <span className="inline-block animate-pulse">✨</span>
        Pomodoro Timer
      </p>
    </div>
  );
}
