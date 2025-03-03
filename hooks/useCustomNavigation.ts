import { useEffect } from 'react';

/**
 * Custom hook to navigate from splash screen to onboarding index
 * after a specified delay
 */
export function useNavigateAfterDelay(delay: number = 3000) {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Use direct navigation approach
      if (typeof window !== 'undefined') {
        // This should work in both web and native environments
        window.location.href = '/onboarding/index';
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);
} 