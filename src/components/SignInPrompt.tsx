import React from 'react';
import { SignInButton } from '@clerk/clerk-react';
import { LogIn } from 'lucide-react';

export default function SignInPrompt() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="text-center">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <LogIn size={32} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to TodoApp
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Sign in to create and manage your todo lists across all your devices.
          </p>
          <SignInButton mode="modal">
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors w-full">
              <LogIn size={20} />
              Sign in to continue
            </button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
}