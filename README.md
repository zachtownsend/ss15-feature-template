<h1>ss15-feature-template</h1>

<h2>Description</h2>
<p>This is the Boden feature template which is designed to improve the feature development workflow and maintain a 
consistent experience to the customer. It follows a modular design allowing features to be switched on and off easily.</p>

<h2>Modules</h2>
  <h4>Slider</h4>
    This is the core module where all the settings are initialised. This is the only module that is dependent on other
    modules, and it's purpose is to pull all the modules together and run them correctly.
  
  <h4>Pager</h4>
    TThis handles all the settings and methods for the pagination of the feature.
    
  <h4>ProductGrid</h4>
    This handles all the settings and methods for the dynamic product grid.
    
  <h4>Quicklink</h4>
    This handles the quicklink functionality
    
  <h4>ShoppingBag</h4>
    This handles the shopping bag functionality for full screen mode
    
  <h4>JpgAnimate</h4>
    This handles the Jpeg animation functionality.
    
  <h4>Ghosts</h4>
    This controls the "ghost" overlay for the small screen mode
  
  
<h2>Settings</h2>

  <h3>General</h3>
  Most modules have an option called "enabled". If you wish to turn off that particular functionality set this to 
  false.
    
  <h3>Global Settings</h3>
  <h4>cm_tag</h4>
    This sets the string you provide for the Coremetrics tracking.
    
  <h4>imgPath</h4>
    This is the path to the image folders for this feature.
    
  <h4>quickshopPath</h4>
    This is the standard quickshop path. You should probably never need to change this, but this is just in case the 
    back-end of the site is changed for some reason.
    
  <h4>animationSpeed</h4>
    This is the general animation speed used throughout the feature. This helps the different modules maintain
    consistent animation speeds. These can be overwritten in individual module settings.
    
  <h4>body</h4>
    This caches the 'body' tag as a jQuery selector
    
  <h4>fontSize/PSDWidth</h4>
    This was meant to make responsive live text easy to calculate by working out the ratio of the font size and canvas
    width in the original PSD's, but as the designers quite often resize the texts this makes this calculation
    redundant. However, you can still tweak the fontSize attribute to get the effect you want, but it is a case of
    trial-and-error.
    
  <h4>fontParent</h4>
    This is the element that has an absolute font-size CSS style set, from which the aforementioned responsive live
    text is calculated.
    
  <h4>productCodes</h4>
    This is where you set the product codes for each slide. This is purely for dynamically creating the product grid, 
    so if this module is disabled this setting is irrelevent. Each cell represents the slide number, so put the 
    product code string into the relevent cell to generate the grid for that cell. If the slide doesn't have any 
    products just enter null.
    
  <h4>market</h4>
    This automatically gets the market code (eg. en-GB, en-US, de-AT etc.).
    
  
  <h2>Slider</h2>
  <h4>initialSlide</h4>
    Index of starting slide.
    
  <h4>activeClass</h4>
    This is the class added to the container of the active slide.
    
  <h4>normalWidth</h4>
    This is the width of the slide in small screen mode.
    
  <h4>fullscreenEnabled</h4>
    This switches the fixed width/fullscreen toggle functionality
    
  <h4>fullscreenButton</h4>
    This is the selector for the button that toggles the fullscreen mode
    
  <h4>body</h4>
    See global settings
    
  <h4>resizeTimerDelay</h4>
    When you resize the window in fullscreen mode, the bx-slider reloads itself with new settings. This sets the delay
    before this happens to prevent the reload from happening after the window resize has complete.
    
  <h4>dynamicFontSize</h4>
    This enables the responsive live text functionality mentioned in the global settings section above.
    
  <h4>navLocation</h4>
    This is the prefix for the the navigation arrows for fixed width mode ('normal') and fullscreen mode 
    ('fullscreen'). Probably leave these as they are.
    
  <h4>uiSwitchSliders</h4>
    This is in case you need a different UI style on particular slides. This is typically required if the UI element  
    colour is obscured by the slide.
    

