ss15-feature-template
=====================

Description
===========
This is the Boden feature template which is designed to improve the feature development workflow and maintain a 
consistent experience to the customer. It follows a modular design allowing features to be switched on and off easily.

First Commit
============
  Modules
  =======
  Slider
    This is the core module where all the settings are initialised. This is the only module that is dependent on other
    modules, and it's purpose is to pull all the modules together and run them correctly.
  
  Pager
    TThis handles all the settings and methods for the pagination of the feature.
    
  ProductGrid
    This handles all the settings and methods for the dynamic product grid.
    
  Quicklink
    This handles the quicklink functionality
    
  ShoppingBag
    This handles the shopping bag functionality for full screen mode
    
  JpgAnimate
    This handles the Jpeg animation functionality.
    
  Ghosts
    This controls the "ghost" overlay for the small screen mode
  
  
  Settings
  ========
  General
  -------
  Most modules have an option called "enabled". If you wish to turn off that particular functionality set this to 
  false.
    
  Global Settings:
  ----------------
  cm_tag
    This sets the string you provide for the Coremetrics tracking.
    
  imgPath
    This is the path to the image folders for this feature.
    
  quickshopPath
    This is the standard quickshop path. You should probably never need to change this, but this is just in case the 
    back-end of the site is changed for some reason.
    
  animationSpeed
    This is the general animation speed used throughout the feature. This helps the different modules maintain
    consistent animation speeds. These can be overwritten in individual module settings.
    
  body
    This caches the 'body' tag as a jQuery selector
    
  fontSize/PSDWidth
    This was meant to make responsive live text easy to calculate by working out the ratio of the font size and canvas
    width in the original PSD's, but as the designers quite often resize the texts this makes this calculation
    redundant. However, you can still tweak the fontSize attribute to get the effect you want, but it is a case of
    trial-and-error.
    
  fontParent
    This is the element that has an absolute font-size CSS style set, from which the aforementioned responsive live
    text is calculated.
    
  productCodes
    This is where you set the product codes for each slide. This is purely for dynamically creating the product grid, 
    so if this module is disabled this setting is irrelevent. Each cell represents the slide number, so put the 
    product code string into the relevent cell to generate the grid for that cell. If the slide doesn't have any 
    products just enter null.
    
  market
    This automatically gets the market code (eg. en-GB, en-US, de-AT etc.).
    
  
  Slider
  ------
  initialSlide
    Index of starting slide.
    
  activeClass
    This is the class added to the container of the active slide.
    
  normalWidth
    This is the width of the slide in small screen mode.
    
  fullscreenEnabled
    This switches the fixed width/fullscreen toggle functionality
    
  fullscreenButton
    This is the selector for the button that toggles the fullscreen mode
    
  body
    See global settings
    
  resizeTimerDelay
    When you resize the window in fullscreen mode, the bx-slider reloads itself with new settings. This sets the delay
    before this happens to prevent the reload from happening after the window resize has complete.
    
  dynamicFontSize
    This enables the responsive live text functionality mentioned in the global settings section above.
    
  navLocation
    This is the prefix for the the navigation arrows for fixed width mode ('normal') and fullscreen mode 
    ('fullscreen'). Probably leave these as they are.
    
  uiSwitchSliders
    This is in case you need a different UI style on particular slides. This is typically required if the UI element colour is obscured by the slide.
    
To be continued!...
