import React from 'react';
import { Settings as SettingsIcon, Sun, Moon, RefreshCw, Download, Upload } from 'lucide-react';
import { UserButton, useUser, SignInButton } from '@clerk/clerk-react';

interface Props {
  isDark: boolean;
  onToggleTheme: () => void;
  onSync: () => Promise<void>;
  onLoad: () => Promise<void>;
  onUpload: () => Promise<void>;
}

export default function Settings({ isDark, onToggleTheme, onSync, onLoad, onUpload }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const { isSignedIn } = useUser();

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await onSync();
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLoad = async () => {
    setIsLoading(true);
    try {
      await onLoad();
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      await onUpload();
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
      >
        <SettingsIcon size={20} className="text-gray-700 dark:text-gray-300" />
      </button>

      {isOpen && (
        <div className="absolute bottom-12 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 min-w-[200px] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? (
                <Sun size={20} className="text-gray-700 dark:text-gray-300" />
              ) : (
                <Moon size={20} className="text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>

          {isSignedIn && (
            <>
              <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                <span className="text-sm text-gray-700 dark:text-gray-300">Sync Data</span>
                <div className="flex gap-2">
                  <button
                    onClick={handleLoad}
                    disabled={isLoading}
                    title="Load from server"
                    className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <Download 
                      size={20} 
                      className={`text-gray-700 dark:text-gray-300 ${
                        isLoading ? 'animate-pulse' : ''
                      }`} 
                    />
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    title="Upload to server"
                    className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      isUploading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <Upload 
                      size={20} 
                      className={`text-gray-700 dark:text-gray-300 ${
                        isUploading ? 'animate-pulse' : ''
                      }`} 
                    />
                  </button>
                  <button
                    onClick={handleSync}
                    disabled={isSyncing}
                    title="Sync with server"
                    className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      isSyncing ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <RefreshCw 
                      size={20} 
                      className={`text-gray-700 dark:text-gray-300 ${
                        isSyncing ? 'animate-spin' : ''
                      }`} 
                    />
                  </button>
                </div>
              </div>
            </>
          )}
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Account</span>
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <SignInButton mode="modal">
                  <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    Sign In
                  </button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}