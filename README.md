<h1>ss15-feature-template</h1>

<h2>Description</h2>
<p>This is the Boden feature template which is designed to improve the feature development workflow and maintain a 
consistent experience to the customer. It follows a modular design allowing features to be switched on and off easily.</p>

<h2>Modules</h2>
  <h3>Slider</h3>
    This is the core module where all the settings are initialised. This is the only module that is dependent on other
    modules, and it's purpose is to pull all the modules together and run them correctly.
  
  <h3>Pager</h3>
    TThis handles all the settings and methods for the pagination of the feature.
    
  <h3>ProductGrid</h3>
    This handles all the settings and methods for the dynamic product grid.
    
  <h3>Quicklink</h3>
    This handles the quicklink functionality
    
  <h3>ShoppingBag</h3>
    This handles the shopping bag functionality for full screen mode
    
  <h3>JpgAnimate</h3>
    This handles the Jpeg animation functionality.
    
  <h3>Ghosts</h3>
    This controls the "ghost" overlay for the small screen mode
  
  
<h2>Settings</h2>

  <h3>General</h3>
  Most modules have an option called "enabled". If you wish to turn off that particular functionality set this to 
  false.
    
  <h2>Global Settings</h2>
  <h3>cm_tag</h3>
    This sets the string you provide for the Coremetrics tracking.
    
  <h3>imgPath</h3>
    This is the path to the image folders for this feature.
    
  <h3>quickshopPath</h3>
    This is the standard quickshop path. You should probably never need to change this, but this is just in case the 
    back-end of the site is changed for some reason.
    
  <h3>animationSpeed</h3>
    This is the general animation speed used throughout the feature. This helps the different modules maintain
    consistent animation speeds. These can be overwritten in individual module settings.
    
  <h3>body</h3>
    This caches the 'body' tag as a jQuery selector
    
  <h3>fontSize/PSDWidth</h3>
    This was meant to make responsive live text easy to calculate by working out the ratio of the font size and canvas
    width in the original PSD's, but as the designers quite often resize the texts this makes this calculation
    redundant. However, you can still tweak the fontSize attribute to get the effect you want, but it is a case of
    trial-and-error.
    
  <h3>fontParent</h3>
    This is the element that has an absolute font-size CSS style set, from which the aforementioned responsive live
    text is calculated.
    
  <h3>productCodes</h3>
    This is where you set the product codes for each slide. This is purely for dynamically creating the product grid, 
    so if this module is disabled this setting is irrelevent. Each cell represents the slide number, so put the 
    product code string into the relevent cell to generate the grid for that cell. If the slide doesn't have any 
    products just enter null.
    
  <h3>market</h3>
    This automatically gets the market code (eg. en-GB, en-US, de-AT etc.).
    
  
  <h2>Slider</h2>
  ------
  <h3>initialSlide</h3>
    Index of starting slide.
    
  <h3>activeClass</h3>
    This is the class added to the container of the active slide.
    
  <h3>normalWidth</h3>
    This is the width of the slide in small screen mode.
    
  <h3>fullscreenEnabled</h3>
    This switches the fixed width/fullscreen toggle functionality
    
  <h3>fullscreenButton</h3>
    This is the selector for the button that toggles the fullscreen mode
    
  <h3>body</h3>
    See global settings
    
  <h3>resizeTimerDelay</h3>
    When you resize the window in fullscreen mode, the bx-slider reloads itself with new settings. This sets the delay
    before this happens to prevent the reload from happening after the window resize has complete.
    
  <h3>dynamicFontSize</h3>
    This enables the responsive live text functionality mentioned in the global settings section above.
    
  <h3>navLocation</h3>
    This is the prefix for the the navigation arrows for fixed width mode ('normal') and fullscreen mode 
    ('fullscreen'). Probably leave these as they are.
    
  <h3>uiSwitchSliders</h3>
    This is in case you need a different UI style on particular slides. This is typically required if the UI element  
    colour is obscured by the slide.
    
To be continued!...
