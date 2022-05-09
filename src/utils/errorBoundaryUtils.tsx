import React from 'react';
import type { FallbackProps } from 'react-error-boundary';

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

export const errorHandler = () => {
  window.location.reload();
};
