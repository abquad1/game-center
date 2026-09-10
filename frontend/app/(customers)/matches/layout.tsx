export default function MatchesLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="px-auto md:px-4 bg-[#0f0f12] h-full">
        <h1 className="block md:hidden text-xl md:text-3xl mb-4 font-bold text-secondary-foreground">
          BABS-SPORT
        </h1>
        <div className="flex items-center justify-between mb-2">
          <p className="text-lg font-bold text-foreground/80">Matches</p>
        </div>
  
        <div className="h-px w-full bg-secondary-foreground/20 shrink-0 mb-4" />
  
        {children}
      </div>
    )
  }