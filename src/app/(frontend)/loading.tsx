import { Compass } from 'lucide-react'
import { SITE_NAME, SITE_TAGLINE } from '@/lib/constants'

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <Compass className="w-10 h-10 text-primary animate-[spin_3s_linear_infinite]" />
          <span 
            className="text-3xl font-bold text-secondary" 
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {SITE_NAME}
          </span>
        </div>
        
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-200 rounded-full" />
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        
        <p className="text-muted-foreground text-sm animate-pulse">
          {SITE_TAGLINE}
        </p>
      </div>
    </div>
  )
}
