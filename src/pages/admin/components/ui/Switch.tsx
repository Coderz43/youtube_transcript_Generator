import * as React from 'react';
import { cn } from '../../utils';

interface SwitchProps extends React.HTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: 'sm' | 'md';
}

export function Switch({
  checked = false,
  onCheckedChange,
  size = 'md',
  className,
  ...props
}: SwitchProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        'relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        checked ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700',
        size === 'sm' ? 'h-5 w-9' : 'h-6 w-11',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          size === 'sm' ? 'h-4 w-4' : 'h-5 w-5',
          checked
            ? size === 'sm'
              ? 'translate-x-4'
              : 'translate-x-5'
            : 'translate-x-0.5'
        )}
      />
    </button>
  );
}