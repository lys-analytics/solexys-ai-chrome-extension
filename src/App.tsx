import React, { useEffect, useState } from 'react';
import InteractiveBubbles from './components/InteractiveBubbles';

function App() {
  const [isEligibleSite, setIsEligibleSite] = useState(false);
  
  useEffect(() => {
    // Check if we're on a supported site
    const hostname = window.location.hostname;
    const isSupported = hostname.includes('pump.fun') || hostname.includes('raydium.io');
    setIsEligibleSite(isSupported);
  }, []);
  
  // Only show the extension if we're on a supported site
  if (!isEligibleSite) {
    return null;
  }
  
  return (
    <div className="solexys-ai-extension" data-extension-root="true">
      <InteractiveBubbles />
    </div>
  );
}

export default App;
