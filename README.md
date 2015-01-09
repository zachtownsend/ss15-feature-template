# ss15-feature-template

## Description
This is the Boden feature template which is designed to improve the feature development workflow and maintain a 
consistent experience to the customer. It follows a modular design allowing features to be switched on and off easily.

## Basic Usage
### Create new instance
Create a new instance of the template and use the  ``` init() ```  method to initialise the template:

 ``` javascript
var Slider = new BodenCarousel();
Slider.init();
 ``` 

This will create the template with the default settings

### Customising the template
In order to customise the template, define the custom settings in an object, then pass this to the constructor function when instantiating the carousel:

 ``` javascript
var custom_settings = {
  global_settings: {
    cm_tag: 'SS15-TEMPLATE',
    imgPath: '/images/magazine/features/SS15-carousel/',
    animationSpeed: 400, //in ms
    productCodes: 
      [
        null,
        'WG590RED|WG590RED|WG590RED|WG590RED',
        'WG590RED|WG590RED|WG590RED',
        'WG590RED|WG590RED',
        'WG590RED|WG590RED|WG590RED|WG590RED',
        'WG590RED|WG590RED|WG590RED|WG590RED'
      ]
  }
}
 ``` 

Each module has it's own settings object within which you can define your custom settings. Here is a list of the settings and their defaults

 ``` javascript
global_settings: {
  cm_tag: 'SS15-TEMPLATE',
  imgPath: '/images/magazine/features/SS15-carousel/',
  quickshopPath: '/products/outfitting.aspx?qr=',
  animationSpeed: 400, //in ms
  body: $('body'),
  fontSize: 25,
  PSDWidth: 1724,
  fontParent: '#viewport-container',
  productCodes: 
    [
      null,
      'WH793LAV|WU003PPK|AR660NUD|AV090YEL',
      'WK959SPK|WH779BLU|AR654PPK',
      'WG590RED|AR662BLK',
      'WC114OAT|WV020GRY|WE479OYS|AR662BLK',
      'WE465NAV|WH787PPK|AR654BLK|AM224YEL'
    ],
  market: $('html').attr('lang')
},
slider_settings: {
  initialSlide: 0,
  activeClass: 'active-slide',
  normalWidth: 1000,
  fullscreenEnabled: true,
  fullscreenButton: $('.fullscreen-btn'),
  body: globalSettings.body,
  resizeTimerDelay: 200,
  dynamicFontSize: true,
  navLocation: {
    normal: '#ghost-', 
    fullscreen: '#fullscreen_nav-'
  },
  timer: null,
  uiSwitchSliders: false, //integer or array, depending on the index of slide that requires switching. false if not necessary
  translateEnabled: false //if true, all default live copy will be translated
},
pager_settings: {
  enabled: true,
  fullscreenStyle: 'overlay',             
  hoverStyle: 'normal',                 
  imageType: (Modernizr.backgroundsize) ? 'background' : 'inline', // inline|background
  scrollable: false,                  
  animationSpeed: globalSettings.animationSpeed,    
  animationEase: 'ease',
  animationDelay: 0,
  imgPath: globalSettings.imgPath,
  nameFormat: {prefix: 'slide', suffix: '-thumbnail.jpg'},
  wrapper: $('#pager-wrapper'),           
  container: $('#pager-container'),         
  item: $('.bx-pager-item'),              
  img: $('.thumb-img'),               
  ui: {
    toggleBtn: $('#pager-tab'),
    textBased: false
  }
},
productgrid_settings: {
  enabled: true,
  defaultHidden: true,
  container: $('.grid-container'),
  listContainer: $('#grid'),
  codes: globalSettings.productCodes,
  quickshopPath: globalSettings.quickshopPath,
  animationSpeed: globalSettings.animationSpeed,
  animationEasing: 'ease',  
  animationDelay: 0, 
  openClass: 'open', 
  maxHeight: 210, 
  market: globalSettings.market,
  ui: {
    completeLook: $('#complete-look'),
    toggleBtn: $('#toggle-grid'),
    showBtnClass: 'show-btn',
    itemClass: 'page-nav',
    textBased: true
  }
},
quicklink_settings: {
  updateBagAfterLoad: true,
  updateBagBeforeClose: true
},
jpganimate_settings: {
  enabled: false,
  container: '.bg-container',
  slidePrefix: '.slide',
  imgPath: globalSettings.imgPath,
  speed: 300, //in ms
  repeat: -1,
  paused: true,
  yoyo: true,
  repeatDelay: 0, //in ms
  scene: [null, 8, 8, 10, 8, 10],
  css3: Modernizr.backgroundsize,
  ctl: null
},
layers_settings: {
  enabled: false,
  layerClass: 'layer',
  duration: 1,
  delay: 0.4
},
ghosts_settings: {
  enabled: true,
  selector: $('.ghost')
}
 ``` 

## Settings

### General
Most modules have an option called "enabled". If you wish to turn off that particular functionality set this to 
false.

### Global Settings
 ``` cm_tag ``` 
  This sets the string you provide for the Coremetrics tracking.
  
 ``` imgPath ``` 
  This is the path to the image folders for this feature.
  
 ``` quickshopPath ``` 
  This is the standard quickshop path. You should probably never need to change this, but this is just in case the 
  back-end of the site is changed for some reason.
  
 ``` animationSpeed ``` 
  This is the general animation speed used throughout the feature. This helps the different modules maintain
  consistent animation speeds. These can be overwritten in individual module settings.
  
 ``` body ``` 
  This caches the 'body' tag as a jQuery selector
  
 ``` fontSize/PSDWidth ``` 
  This was meant to make responsive live text easy to calculate by working out the ratio of the font size and canvas
  width in the original PSD's, but as the designers quite often resize the texts this makes this calculation
  redundant. However, you can still tweak the fontSize attribute to get the effect you want, but it is a case of
  trial-and-error.
  
 ``` fontParent ``` 
  This is the element that has an absolute font-size CSS style set, from which the aforementioned responsive live
  text is calculated.
  
 ``` productCodes ``` 
  This is where you set the product codes for each slide. This is purely for dynamically creating the product grid, 
  so if this module is disabled this setting is irrelevent. Each cell represents the slide number, so put the 
  product code string into the relevent cell to generate the grid for that cell. If the slide doesn't have any 
  products just enter null.
  
 ``` market ``` 
  This automatically gets the market code (eg. en-GB, en-US, de-AT etc.).
  


### Slider
This is the core module where all the settings are initialised. This is the only module that is dependent on other modules, and it's purpose is to pull all the modules together and run them correctly.
 ``` initialSlide ``` 
  Index of starting slide.
  
 ``` activeClass ``` 
  This is the class added to the container of the active slide.
  
 ``` normalWidth ``` 
  This is the width of the slide in small screen mode.
  
 ``` fullscreenEnabled ``` 
  This switches the fixed width/fullscreen toggle functionality
  
 ``` fullscreenButton ``` 
  This is the selector for the button that toggles the fullscreen mode
  
 ``` body ``` 
  See global settings
  
 ``` resizeTimerDelay ``` 
  When you resize the window in fullscreen mode, the bx-slider reloads itself with new settings. This sets the delay
  before this happens to prevent the reload from happening after the window resize has complete.
  
 ``` dynamicFontSize ``` 
  This enables the responsive live text functionality mentioned in the global settings section above.
  
 ``` navLocation ``` 
  This is the prefix for the the navigation arrows for fixed width mode ('normal') and fullscreen mode 
  ('fullscreen'). Probably leave these as they are.
  
 ``` uiSwitchSliders ``` 
  This is in case you need a different UI style on particular slides. This is typically required if the UI element  
  colour is obscured by the slide.
  
 ``` translateEnabled ``` 
  This enables the generic live copy on the page to be automatically translated into the appropriate language. Leave
  this as false for English language countries.


### Pager
This handles all the settings and methods for the pagination of the feature.
 ``` fullscreenStyle ``` 
  This declares the style for pagination. This should probably be removed at some point as 'overlay' mode will probably be the only mode used.
  
 ``` hoverStyle ``` 
This selects the effect that happens when the user hovers over the thumbnail. As above, this may be removed in the future if other options aren't used.

 ``` imageType ``` 
This declares the type of image that is used for the thumbnails, either inline or background. Background is probably the preferable option as it is more responsive

 ``` scrollable ``` 
This feature is unfinished, but the original idea is if there are a lot of slides, the pagination could be scrollable to fit more in.

 ``` animationSpeed / imgPath ``` 
See globalSettings

 ``` animationEase ``` 
This sets the ease mode for the CSS3 animations

 ``` animationDelay ``` 
This is the delay before the animation starts

 ``` nameFormat ``` 
This sets the prefix and suffix for the thumbnail images.

 ``` wrapper/container/item/img ``` 
Caches useful selectors


### ProductGrid
This handles all the settings and methods for the dynamic product grid.

 ``` defaultHidden ``` 
This sets whether the product grid is hidden or shown by default

 ``` codes ``` 
Here you can either enter an array of product codes (see productCodes in Global Settings), or you can set this to retrieve the codes from your HTML if you enter 'auto'. Add 'retrieve' to each 'quicklink' class that you want to retrieve the codes from. There can only be 1 retrieve class per slide for this to work.

 ``` Open Class ``` 
Sets the class that is added when the product grid is open

 ``` maxHeight ``` 
Set's max height for product grid in fullscreen mode

 ``` ui ``` 
Selectors for UI elements


### Quicklink
This handles the quicklink functionality

 ``` updateBagAfterLoad ``` 
If true, the shopping bag will be updated after you open a quickshop

 ``` updateBagBeforeClose ``` 
If true, the shopping bag will be updated just before the quickshop closes


### JpgAnimate
This handles the Jpeg animation functionality.

 ``` container ``` 
This sets the container for which the animation frames are generated

 ``` slidePrefix ``` 
Just leave this as it is...

 ``` speed ``` 
This is the framerate of the animation in ms

 ``` repeat ``` 
This is how many times the animation repeats. -1 is continous loop.

 ``` paused ``` 
If true, the animation will be paused until it is told to play when you go to that slide.

 ``` yoyo ``` 
If true, the animation will go through all the frames and then reverse back through them

 ``` repeatDelay ``` 
This is the delay between each repeat in ms.


### scene
Here you declare the number of animation frames for each slide. If no animation is required, enter null.


### Ghosts
  This controls the "ghost" overlay for the small screen mode
