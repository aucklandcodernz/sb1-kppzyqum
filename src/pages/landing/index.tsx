import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building2 } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <div className="flex items-center gap-2 font-semibold">
          <Building2 className="h-6 w-6" />
          <span>Ask Your HR</span>
        </div>
        <div className="ml-auto">
          <Link to="/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link to="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Your HR Management Solution
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Streamline your HR processes with our powerful platform. Manage employees, handle requests, and stay compliant.
              </p>
              <Link to="/signup">
                <Button size="lg">Start Your Free Trial</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}