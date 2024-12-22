import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Building2 } from 'lucide-react';

interface AuthFormProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
}

export function AuthForm({ title, subtitle, className, children, ...props }: AuthFormProps) {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex items-center gap-2 text-lg font-medium">
          <Building2 className="h-6 w-6" />
          Ask Your HR
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "This platform has completely transformed how we handle HR processes. It's intuitive, efficient, and saves us countless hours."
            </p>
            <footer className="text-sm">Sofia Davis, HR Director</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center">
        <div className={cn('mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]', className)} {...props}>
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}