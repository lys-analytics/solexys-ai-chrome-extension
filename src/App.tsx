import React, { useEffect, useState } from 'react';
import InteractiveBubbles from './components/InteractiveBubbles';
import ReactDOM from 'react-dom/client';
import TokenStatsBanner from './components/TokenStatsBanner';

function App() {
  const [isEligibleSite, setIsEligibleSite] = useState(false);
  
  useEffect(() => {
    // Check if we're on a supported site
    const hostname = window.location.hostname;
    const isSupported = hostname.includes('pump.fun') || hostname.includes('raydium.io');
    setIsEligibleSite(isSupported);
    
    if (isSupported) {
      let bannerRoot: ReactDOM.Root | null = null;
      let bannerContainer: HTMLElement | null = null;
      
      // Function to determine if we should show the banner
      const shouldShowBanner = () => {
        // Only show on pump.fun for /coin/ routes
        if (hostname.includes('pump.fun') && window.location.pathname.startsWith('/coin/')) {
          return true;
        }
        return false;
      };
      
      // Clean up any existing banner
      const cleanupBanner = () => {
        if (bannerRoot) {
          bannerRoot.unmount();
          bannerRoot = null;
        }
        
        if (bannerContainer && bannerContainer.parentNode) {
          bannerContainer.parentNode.removeChild(bannerContainer);
          bannerContainer = null;
        }
      };
      
      // Inject the banner component
      const injectBanner = () => {
        // Clean up existing banner first
        cleanupBanner();
        
        // Only proceed if we should show the banner
        if (!shouldShowBanner()) return;
        
        // Find the target element
        const holderDistributionElement = document.querySelector('[data-sentry-component="HolderDistribution"]');
        if (!holderDistributionElement) return;
        
        // Create container for the banner
        bannerContainer = document.createElement('div');
        bannerContainer.id = 'solexys-holder-banner';
        bannerContainer.style.opacity = '0';
        
        // Insert the banner container before the holder distribution element
        holderDistributionElement.parentNode?.insertBefore(bannerContainer, holderDistributionElement);
        
        // Render the banner component
        bannerRoot = ReactDOM.createRoot(bannerContainer);
        bannerRoot.render(<TokenStatsBanner />);
        
        // Fade in the banner
        setTimeout(() => {
          if (bannerContainer) {
            bannerContainer.style.opacity = '1';
            bannerContainer.style.transition = 'opacity 0.3s ease-in-out';
          }
        }, 50);
      };
      
      // Handle SPA navigation
      const handleNavigation = () => {
        if (shouldShowBanner()) {
          // Wait a short time for the DOM to update
          setTimeout(injectBanner, 100);
        } else {
          cleanupBanner();
        }
      };
      
      // Check if the document is ready, otherwise wait for it
      if (document.readyState === 'complete') {
        injectBanner();
      } else {
        window.addEventListener('load', injectBanner, { once: true });
      }
      
      // Listen for history changes (SPA navigation)
      window.addEventListener('popstate', handleNavigation);
      
      // Simple mutation observer to detect when the holder distribution element appears
      const observer = new MutationObserver(() => {
        const hasHolderDistribution = !!document.querySelector('[data-sentry-component="HolderDistribution"]');
        const bannerExists = !!document.getElementById('solexys-holder-banner');
        
        if (hasHolderDistribution && !bannerExists && shouldShowBanner()) {
          injectBanner();
        }
      });
      
      // Start observing with a focus on the holder distribution component
      observer.observe(document.body, { 
        childList: true, 
        subtree: true,
        attributes: true,
        attributeFilter: ['data-sentry-component']
      });
      
      // Monitor for programmatic navigation
      const originalPushState = window.history.pushState;
      const originalReplaceState = window.history.replaceState;
      
      window.history.pushState = function() {
        originalPushState.apply(this, arguments as any);
        handleNavigation();
      };
      
      window.history.replaceState = function() {
        originalReplaceState.apply(this, arguments as any);
        handleNavigation();
      };
      
      // Clean up on unmount
      return () => {
        observer.disconnect();
        window.removeEventListener('popstate', handleNavigation);
        window.removeEventListener('load', injectBanner);
        
        // Restore original history methods
        window.history.pushState = originalPushState;
        window.history.replaceState = originalReplaceState;
        
        // Clean up banner
        cleanupBanner();
      };
    }
  }, []);
  
  // Only show the extension if we're on a supported site
  if (!isEligibleSite) {
    return null;
  }
  
  return (
    <div className="solexys-pointer-events-auto" data-extension-root="true">
      <InteractiveBubbles />
    </div>
  );
}

export default App;
