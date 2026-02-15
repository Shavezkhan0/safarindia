import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-transparent to-amber-50/50 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-[12rem] leading-none font-bold text-primary font-[var(--font-playfair)] animate-fade-up" style={{ fontFamily: 'var(--font-playfair)' }}>
          404
        </h1>
        
        <div className="text-6xl mb-6 animate-float">
          🧭
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4 font-[var(--font-playfair)]" style={{ fontFamily: 'var(--font-playfair)' }}>
          Oops! This destination doesn&apos;t exist
        </h2>
        
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          The page you&apos;re looking for has gone on an adventure of its own.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link href="/packages" className="btn-outline">
            Explore Packages
          </Link>
        </div>
      </div>
    </div>
  )
}
