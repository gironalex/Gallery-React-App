// Error Route Component - displays a message when URL does not match existing Route.

import React from 'react';

const ErrorRoute = () => {
  return (
    <div className="error-route">
      <h1>404 Error</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  )
}

export default ErrorRoute;