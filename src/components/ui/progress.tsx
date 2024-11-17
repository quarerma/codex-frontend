'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '../../../lib/utils';

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  insideClassName?: string; // Classe para a barra principal
  secondaryClassName?: string; // Classe para a barra secundária
  secondaryValue?: number; // Valor percentual para a barra secundária
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(({ className, value, insideClassName, secondaryValue, secondaryClassName, ...props }, ref) => (
  <ProgressPrimitive.Root ref={ref} className={cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className)} {...props}>
    {/* Secondary Progress Bar (Background Layer) */}
    {typeof secondaryValue === 'number' && (
      <ProgressPrimitive.Indicator className={cn('absolute h-full w-full bg-red-500 transition-all', secondaryClassName)} style={{ transform: `translateX(-${100 - secondaryValue}%)` }} />
    )}
    {/* Primary Progress Bar (Foreground Layer) */}
    <ProgressPrimitive.Indicator className={cn('absolute h-full w-full flex-1 bg-primary transition-all', insideClassName)} style={{ transform: `translateX(-${100 - (value || 0)}%)` }} />
  </ProgressPrimitive.Root>
));

Progress.displayName = 'Progress';

export { Progress };
