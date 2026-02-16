import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react'

interface LabelProps {
  label: string
  required?: boolean
  hint?: string
  children: ReactNode
}

export function FormField({ label, required, hint, children }: LabelProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-text-secondary">
        {label}
        {required && <span className="text-alert-500 mr-1">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-text-muted">{hint}</p>}
    </div>
  )
}

const inputBase =
  'w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-clinical-500 focus:outline-none focus:ring-2 focus:ring-clinical-200 transition-colors'

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${inputBase} ${props.className ?? ''}`} {...props} />
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`${inputBase} min-h-[80px] resize-y ${props.className ?? ''}`}
      {...props}
    />
  )
}

export function Select({ children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={`${inputBase} ${props.className ?? ''}`} {...props}>
      {children}
    </select>
  )
}
