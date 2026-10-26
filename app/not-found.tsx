import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] w-full items-center justify-center bg-white px-4 pb-20 pt-36">
        <div className="max-w-lg text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-accent">Page not found</p>
          <h1 className="mt-4 font-heading text-4xl font-bold text-foreground sm:text-5xl">This layer is missing.</h1>
          <p className="mt-4 text-lg text-muted-foreground">The page you were looking for doesn’t exist or has moved.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full bg-accent px-7 font-heading font-semibold hover:bg-accent/90">
              <Link href="/">Go to the homepage</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-7 font-heading font-semibold">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
