import React, { forwardRef } from 'react'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, className = '', ...props }, ref) => (
    <textarea
      ref={ref}
      className={`input ${error ? 'border-red-500' : ''} ${className}`}
      {...props}
    />
  )
)

TextArea.displayName = 'TextArea'

export default TextArea 