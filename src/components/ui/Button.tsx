import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  fullWidth?: boolean
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-clinical-600 text-white hover:bg-clinical-700 active:bg-clinical-800 focus:ring-clinical-300',
  secondary:
    'bg-surface border border-border-strong text-text-primary hover:bg-surface-bright active:bg-surface-dim focus:ring-clinical-200',
  ghost:
    'bg-transparent text-text-secondary hover:bg-surface-bright active:bg-surface-dim focus:ring-clinical-200',
  danger:
    'bg-alert-600 text-white hover:bg-alert-500 focus:ring-alert-100',
}

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5
        text-sm font-medium transition-colors duration-150
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
