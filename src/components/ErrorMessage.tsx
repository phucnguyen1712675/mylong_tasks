interface ErrorMessageProps {
  message?: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = '' }) => {
  if (!message) return null;
  
  return (
    <p className={`text-red-500 text-sm mt-1 ${className}`}>
      {message}
    </p>
  );
};

export default ErrorMessage; 