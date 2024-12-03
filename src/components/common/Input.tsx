import React, { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = '', ...props }, ref) => (
    <input
      ref={ref}
      className={`input ${error ? 'border-red-500' : ''} ${className}`}
      {...props}
    />
  )
)

Input.displayName = 'Input'

export default Input 