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
	img_path: '/images/magazine/features/SS15-carousel/',
	quickshop_path: '/products/outfitting.aspx?qr=',
	animation_speed: 400, //in ms
	body: $('body'),
	feature_wrapper: $('.feature-wrapper'),
	product_codes: 
		[
			null,
			'WH793LAV|WU003PPK|AR660NUD|AV090YEL',
			'WK959SPK|WH779BLU|AR654PPK',
			'WG590RED|AR662BLK',
			'WC114OAT|WV020GRY|WE479OYS|AR662BLK',
			'WE465NAV|WH787PPK|AR654BLK|AM224YEL'
		]
},
slider_settings: {
	initial_slide: 0,
	active_class: 'active-slide',
	normal_width: 1000,
	fullscreen_enabled: true,
	fullscreen_button: $('.fullscreen-btn'),
	body: global_settings.body,
	resize_delay: 100,
	nav_location: {
		normal: '#ghost-', 
		fullscreen: '#fullscreen_nav-'
	},
	ui_switch: false
},
pager_settings: {
	enabled: true,
	img_path: global_settings.img_path,
	name_format: {prefix: 'slide', suffix: '-thumbnail.jpg'},
	animation_speed: global_settings.animation_speed
},
productgrid_settings: {
	enabled: true,				// Boolean
	slider_class: '.bxslider',
	codes: global_settings.product_codes, // Array or 'auto'
	quickshop_path: global_settings.quickshop_path, // String
	open_class: 'open',			// String
	max_height: 210,				// Integer
	market: market
},
shoppingbag_settings: {
	enabled: true,
	market: market
},
jpganimate_settings: {
	enabled: false,
	container: '.bg-container',
	slide_prefix: '.slide',
	img_path: global_settings.img_path,
	speed: 300, //in ms
	repeat: -1,
	paused: true,
	yoyo: true,
	repeat_delay: 0, //in ms
	scene: [2, null, null, null, null, null]
},
layers_settings: {
	enabled: false,
	layer_class: 'layer',
	duration: 1,
	delay: 0.4
}
 ``` 

## Settings

### General
Most modules have an option called "enabled". If you wish to turn off that particular functionality set this to 
false.

### Global Settings
 ``` cm_tag ``` 
  This sets the string you provide for the Coremetrics tracking.
  
 ``` img_path ``` 
  This is the path to the image folders for this feature.
  
 ``` quickshop_path ``` 
  This is the standard quickshop path. You should probably never need to change this, but this is just in case the 
  back-end of the site is changed for some reason.
  
 ``` animation_speed ``` 
  This is the general animation speed used throughout the feature. This helps the different modules maintain
  consistent animation speeds. These can be overwritten in individual module settings.
  
 ``` body ``` 
  This caches the 'body' tag as a jQuery selector
  
 ``` productCodes ``` 
  This is where you set the product codes for each slide. This is purely for dynamically creating the product grid, 
  so if this module is disabled this setting is irrelevent. Each cell represents the slide number, so put the 
  product code string into the relevent cell to generate the grid for that cell. If the slide doesn't have any 
  products just enter null.


### Slider
This is the core module where all the settings are initialised. This is the only module that is dependent on other modules, and it's purpose is to pull all the modules together and run them correctly.
 ``` initial_slide ``` 
  Index of starting slide.
  
 ``` active_class ``` 
  This is the class added to the container of the active slide.
  
 ``` normal_width ``` 
  This is the width of the slide in small screen mode.
  
 ``` fullscreen_enabled ``` 
  This switches the fixed width/fullscreen toggle functionality
  
 ``` fullscreen_button ``` 
  This is the selector for the button that toggles the fullscreen mode
  
 ``` body ``` 
  See global settings
  
 ``` resize_delay ``` 
  When you resize the window in fullscreen mode, the bx-slider reloads itself with new settings. This sets the delay
  before this happens to prevent the reload from happening after the window resize has complete.
  
 ``` nav_location: {normal/fullscreen} ``` 
  This is the prefix for the the navigation arrows for fixed width mode ('normal') and fullscreen mode 
  ('fullscreen'). Probably leave these as they are.
  
 ``` ui_switch ``` 
  This is in case you need a different UI style on particular slides. This is typically required if the UI element  
  colour is obscured by the slide.

### Pager
This handles all the settings and methods for the pagination of the feature.

 ``` animation_speed, img_path ``` 
See globalSettings

 ``` name_format ``` 
This sets the prefix and suffix for the thumbnail images.

### ProductGrid
This handles all the settings and methods for the dynamic product grid.

 ``` codes ``` 
Here you can either enter an array of product codes (see productCodes in Global Settings), or you can set this to retrieve the codes from your HTML if you enter 'auto'. Add 'retrieve' to each 'quicklink' class that you want to retrieve the codes from. There can only be 1 retrieve class per slide for this to work.

 ``` open_class ``` 
Sets the class that is added when the product grid is open

 ``` max_height ``` 
Set's max height for product grid in fullscreen mode

### JpgAnimate
This handles the Jpeg animation functionality.

 ``` container ``` 
This sets the container for which the animation frames are generated

 ``` slide_prefix ``` 
Just leave this as it is...

``` img_path ```
See global_settings

 ``` speed ``` 
This is the framerate of the animation in ms

 ``` repeat ``` 
This is how many times the animation repeats. -1 is continous loop.

 ``` paused ``` 
If true, the animation will be paused until it is told to play when you go to that slide.

 ``` yoyo ``` 
If true, the animation will go through all the frames and then reverse back through them

 ``` repeat_delay ``` 
This is the delay between each repeat in ms.

CHANGE
