import React from "react";

const ErrorBox = ({ message }) => (
  <div className="p-6 bg-red-100/80 dark:bg-red-900/50 backdrop-blur-sm rounded-2xl border border-red-200 dark:border-red-800/50 m-6">
    <div className="flex items-center gap-3 text-red-700 dark:text-red-200">
      <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span className="font-medium">{message}</span>
    </div>
  </div>
);

export default ErrorBox;