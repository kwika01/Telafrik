import { useEffect, useState } from "react"
import { useTheme } from "@/components/providers/theme-provider"
import { Particles } from "@/components/ui/particles"

export function ParticlesDemo() {
  const { theme } = useTheme()
  const [color, setColor] = useState("#ffffff")

  useEffect(() => {
    // Set particle color based on theme
    // For TelAfrik brand: use emerald/primary color in light mode, white in dark mode
    setColor(theme === "dark" ? "#ffffff" : "#10b981")
  }, [theme])

  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Particles
      </span>
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
    </div>
  )
}

/**
 * Hero Section with Particles Background
 * Use this on landing/homepage for a stunning visual effect
 */
export function ParticlesHero() {
  const { theme } = useTheme()
  const [color, setColor] = useState("#10b981") // TelAfrik brand color

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#10b981")
  }, [theme])

  return (
    <div className="relative flex min-h-[600px] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background to-secondary/30">
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
          Africa's Startup Ecosystem
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
          Discover, track, and connect with the most promising startups across Africa
        </p>
      </div>
      <Particles
        className="absolute inset-0"
        quantity={150}
        ease={80}
        color={color}
        staticity={30}
        size={0.5}
      />
    </div>
  )
}

/**
 * Auth Page Background with Particles
 * Subtle animated background for login/signup pages
 */
export function ParticlesAuth() {
  const [color, setColor] = useState("#10b981")

  return (
    <div className="relative w-full h-full">
      <Particles
        className="absolute inset-0"
        quantity={80}
        ease={70}
        color={color}
        staticity={40}
        size={0.4}
      />
    </div>
  )
}
