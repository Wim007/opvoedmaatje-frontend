import React from 'react';
import './AppScreen.css';

/**
 * AppScreen - Reusable mobile-first layout component
 * Provides consistent 100vh fullscreen experience for all onboarding screens
 * 
 * Structure:
 * - Top: Logo/branding (optional)
 * - Content: Main scrollable area (minimal scroll preferred)
 * - Bottom: Fixed action zone (CTA buttons always visible)
 */
function AppScreen({ 
  showLogo = false, 
  logo,
  children, 
  actions,
  className = '' 
}) {
  return (
    <div className={`app-screen ${className}`}>
      {showLogo && logo && (
        <div className="app-screen-header">
          {logo}
        </div>
      )}
      
      <div className="app-screen-content">
        {children}
      </div>
      
      {actions && (
        <div className="app-screen-actions">
          {actions}
        </div>
      )}
    </div>
  );
}

export default AppScreen;
