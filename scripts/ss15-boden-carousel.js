/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-backgroundsize-csstransforms-csstransitions-testprop-testallprops-domprefixes
 */
;window.Modernizr=function(a,b,c){function w(a){i.cssText=a}function x(a,b){return w(prefixes.join(a+";")+(b||""))}function y(a,b){return typeof a===b}function z(a,b){return!!~(""+a).indexOf(b)}function A(a,b){for(var d in a){var e=a[d];if(!z(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function B(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:y(f,"function")?f.bind(d||b):f}return!1}function C(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+m.join(d+" ")+d).split(" ");return y(b,"string")||y(b,"undefined")?A(e,b):(e=(a+" "+n.join(d+" ")+d).split(" "),B(e,b,c))}var d="2.8.3",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l="Webkit Moz O ms",m=l.split(" "),n=l.toLowerCase().split(" "),o={},p={},q={},r=[],s=r.slice,t,u={}.hasOwnProperty,v;!y(u,"undefined")&&!y(u.call,"undefined")?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=s.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(s.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(s.call(arguments)))};return e}),o.backgroundsize=function(){return C("backgroundSize")},o.csstransforms=function(){return!!C("transform")},o.csstransitions=function(){return C("transition")};for(var D in o)v(o,D)&&(t=D.toLowerCase(),e[t]=o[D](),r.push((e[t]?"":"no-")+t));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)v(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},w(""),h=j=null,e._version=d,e._domPrefixes=n,e._cssomPrefixes=m,e.testProp=function(a){return A([a])},e.testAllProps=C,e}(this,this.document);

// ====== BODEN CAROUSEL TEMPLATE ====== //
function BodenCarousel(custom) {
	
	// This checks if an argument has been passed into the function, and
	// if it doesn't, it creates an empty object.
	var user_settings = custom || {};
	
	// This is the default global settings for the feature, which can be 
	// overridden when declaring the plugin.
	var global_settings = $.extend({
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
		}, user_settings.global_settings);
	
	// Private variables
	var warnings = []; // This array holds all the feature warning to 
	var market = $('html').attr('lang'); // This gets the market 
	
	// ====================== //
	// == HELPER FUNCTIONS == //
	// ====================== //
	
	// Applies quicklinks
	function apply_quicklinks() {
		$('.quicklink').each(function(){
			$(this).fancybox({				
				'type':'iframe',
				'width':420,
				'height':190,
				'padding':25,
				'onComplete' : function() {
					$('#fancybox-frame').load(function() { 
						$('#fancybox-content').height($(this).contents().find('body').height()+15);
						$.fancybox.center(true);
					});
				},
				'afterLoad' : function() {
					Shopping_bag.after_load();
				},
				'beforeClose' : function() {
					Shopping_bag.before_close();
				}
			});    
		});
	};
	
	// Determines appropriate language to use
	function translation(copy) {
		var mkt = market.slice(0,2);
		var lang = (mkt === 'en') ? 0 : (mkt === 'de') ? 1 : (mkt === 'fr') ? 2 : 0;
		return copy[lang];
	}
	
	// Appends html to the feature
	function feature_append(html) {
		global_settings.feature_wrapper.append(html);
	}
	
	function bindUI(element, event, callback) {
		var el = element instanceof jQuery ? element : $(element);
		el.on(event, callback);
	};
	
	// =============== //
	// === MODULES === //
	// =============== //
	
	// == Staggered animation layers functionality
	var Layers = function() {
		var settings = $.extend({
			enabled: false,
			layer_class: 'layer', // The class that you are going to stagger
			duration: 1000, // The duration of each element's animation
			delay: 200 // The delay between the beginning of each animation
		}, user_settings.layers_settings);
		
		var public_props = {
			enabled : settings.enabled,
			slide : function() { return false }
		};
		
		if(!settings.enabled) return public_props;
		
		// Applies the staggered layer animations
		var layer_animation = function(layers, duration, attr, delay) {
			var layers_group = layers;
			var dly = 0;
			
			// This determines the current state of the element's CSS position
			var get_props = function(layer, attr) {
				var props = {};
				for(key in attr) {
					props[key] = layer.css(key);
					if(props[key] === 'auto') props[key] = 0;
				}
				return props;
			};
			
			// This animates each element and adds the delay offset for each one
			layers.each(function() {
				var layer = $(this);
				var end_pos = get_props(layer, attr);
				var start_pos = attr;
				layer.css(start_pos).delay(dly).animate(end_pos, duration, 'easeInOutQuad');
				dly += delay;
			});
		}
		
		// This is the public method that triggers the animation
		public_props.slide = function(parent, vpWidth, oldIndex, newIndex) {
			var layers = parent.find('.' + settings.layer_class);
			var forward = (oldIndex - newIndex) ? true : false;
			var startPoint = vpWidth;
			var attr = {left: startPoint}
			layer_animation(layers, settings.duration, attr, settings.delay);
		}
		
		return public_props;
	}();
	
	// == Jpeg animation functionality
	var Jpeg_animate = function() {
		var settings = $.extend({
			enabled: false,
			container: '.bg-container', // This is the class that contains the animated jpeg
			slide_prefix: '.slide',
			img_path: global_settings.img_path,
			speed: 300, //in ms
			repeat: -1, // How many times the animation repeats, -1 for infinite
			paused: true, // This declares whether the animation is paused by default
			yoyo: false, // If true, the animation will increment up the frames until it reaches the last one, where it will go into reverse
			repeat_delay: 1, // Delay between repeats
			scene: [3, 3, 3, null, 3, null] // This is the number of frames in each slide (each array cell is the slide number, in order)
		}, user_settings.jpganimate_settings);
		
		var public_props = {
			enabled : settings.enabled,
			playFrames : function() { return false },
			initialise : function() { return false }
		};
		
		if(!settings.enabled) return public_props;
		
		var css3 = Modernizr.backgroundsize; // Check whether background-size: cover is supported by the browser
		var ctl = null;
		var animation;
		
		// This adds the frames into the container
		var add_frames = function(target, frames, index) {
			var target = $(target);
			var container = target.find(settings.container);
			var imgVar = '';
			for(i = 1; i <= frames; i++) {
				var first = (i === 1) ? ' first' : '';
				var div = (css3) ? 
					'<div class="animation-frame' + first + '" style="background-image: url(' + settings.img_path + 'slide' + index + '/slide' + i + '.jpg);"></div>' :
					'<div class="animation-frame' + first + '"><img class="ie-bg" src="' + settings.img_path + 'slide' + index + '/slide' + i + '.jpg" /></div>';
				imgVar += div;
				
			}
			container.append(imgVar);
		};
		
		// This sets up how the animation runs
		function control(target, frames) {
			var animation;
			var framesArray = $(target).find(settings.container).children(); // Array of frames
			var animation_length = framesArray.length + settings.repeat_delay; // Total animation length
			var pos = 0; // Starting frame position
			var up = true; // Direction of animation (true = forward, false = reverse)
			
			var play = function() {
				// Clear any existing animation ...
				clearInterval(animation);
				
				// Begin new animation ...
				animation = setInterval(function() {
					up ? pos++ : pos--;
					var z = up ? 1 : 0;
					framesArray.eq(pos).css({ 'z-index' : z });
					if(settings.yoyo) {
						if( pos === animation_length ) up = false;
						if( pos === 0 ) up = true;
					} else {
						if( pos === animation_length ) { 
							framesArray.css({'z-index' : 0});
							pos = 0;
						}
					}
				}, settings.speed);
			}
			
			// Pause animation
			var pause = function() {
				clearInterval(animation);
			}
			
			return {
				play : play,
				pause : pause
			}
		}
		
		// This handles how the animation is handled within the slider
		public_props.playFrames = function(newIndex, oldIndex) {
			if(ctl === null) return false;
			var newScene = ctl[newIndex];
			var oldScene = ctl[oldIndex];
			if(newScene != undefined) newScene.play();
			if(oldScene != undefined) oldScene.pause();
		};
		
		// This initialises the animation
		public_props.initialise = function() {
			var scenes = Array();
			
			$.each(settings.scene, function(index, value) {
				var target = settings.slide_prefix + index;
				
				if(value != null) {
					add_frames(target, value, index);
					scenes[index] = control('.slide' + index, settings.scene[index]);
				}
			});
			ctl = scenes;
		};
		
		return public_props;
		
	}();
	
	// == Pagination functionality
	var Pager = function() {
		var settings = $.extend({
			enabled: true,
			img_path: global_settings.img_path,
			name_format: {prefix: 'slide', suffix: '-thumbnail.jpg'}, // This determines what the name of the thumbnail should be
			animation_speed: global_settings.animation_speed
		}, user_settings.pager_settings);
		
		var public_props = {
			enabled : settings.enabled,
			container : false,
			toggle_pager : function() { return false },
			generate_thumbnail : function() { return false },
			close_pager : function() { return false },
			initialise : function() { return false }
		};
		
		if(!settings.enabled) return public_props;
		
		var $pager_wrapper, $toggle_btn;
		var open_class = 'open';
		
		// Generate the thumbnail
		public_props.generate_thumbnail =  function(slideIndex) {
			var thumb;
			var image = settings.img_path + settings.name_format.prefix + slideIndex + settings.name_format.suffix;
			var thumb = '<div class="thumb-inner"><div class="thumb-img" style="background-image: url(' + image + ')"></div></div>';
			return thumb;
		}
		
		// Determines whether the thumbnails are open
		var is_open = function() { return $pager_wrapper.hasClass(open_class) };
		
		// Open/close pager toggle
		public_props.toggle_pager = function(override_close) {
			var override = override_close || false;
			if(override && is_open) {
				$pager_wrapper.removeClass(open_class);
				return false;
			}
			var toggle_class = function() { $pager_wrapper.toggleClass(open_class); };
			toggle_class();
		};
				
		// Initialises the module
		public_props.initialise = function() {
			var html = [
				'<div id="pager-wrapper">',
					'<div id="pager-container">',
					'</div>',
					'<div id="pager-tab"></div>',
				'</div>'
			].join('\n');
			
			feature_append(html); // Inserts the HTML
			public_props.container = $('#pager-container'); // Caches container selector
			$pager_wrapper = $('#pager-wrapper'); // Caches pager wrapper
			$toggle_btn = $('#pager-tab'); // Caches toggle button
			
			// Binds the toggle function to an element
			bindUI($toggle_btn, 'click', function() {
				public_props.toggle_pager();
			});
		}
		
		return public_props;
	}();
	
	// == Product Grid functionality
	var ProductGrid = function() {
		var settings = $.extend({
			enabled: true,
			slider_class: '.bxslider',
			codes: global_settings.product_codes, // Array or 'auto'
			quickshop_path: global_settings.quickshop_path,
			open_class: 'open', // Declares the 'open' class
			max_height: 210, // Maximum height of the product thumbnail
			market: market
		}, user_settings.productgrid_settings);
		
		var public_props = {
			enabled : settings.enabled,
			initialise : function() { return false },
			update : function() { return false }
		};
		
		if(!settings.enabled) return public_props;
		
		// Set jquery selectors
		var slider = $(settings.slider_class);
		
		// Declare variables
		var $grid, $grid_container, $grid_ui, $outfit_btn, $toggle_btn;
		
		// Auto retrieve codes if necessary
		if(settings.codes === 'auto') settings.codes = retrieve_codes();
		
		// Generate product grid
		var generate = function(callback) {
			var html = '';
			var codes = settings.codes;
			
			// Gets all product codes and merges them into one long string, delimited with "|"
			var merged_codes = function() {
				return settings.codes.toString().replace(/,/g , '|');
			};
			
			// Creates the quickshop path
			var path = settings.quickshop_path + merged_codes();
			
			var product_codes = settings.codes;
			
			// AJAX function to get the data of the products
			$.get(path, function(data) {
				var $data = $(data);
				var img = $data.find('.ProductMain'); // Parent element of the products
				var imgEq = 0;
				
				// For every product code ...
				for(i = 0; i < product_codes.length; i++) {
					
					// If the slide has product codes ...
					if(product_codes[i] != null) {
						var current = product_codes[i];
						var array = product_codes[i].split('|'); // Split all product codes on this slide into an array
						
						// For every product in the slide ...
						for(x = 0; x < array.length; x++) {
							var baseCode = array[x].slice(0,5);
							
							// If the product code exists ...
							if($('[data-productcode=' + baseCode + ']', $data).data('productcode') != null) {
								
								// Add the html to the html variable
								var tag = '<li class="mix slide' + i + '"><a class="quicklink" href="/products/outfitting.aspx?qr=' + array[x] + '"><img src="' + img.eq(imgEq).attr('src') + '" /></a></li>';
								imgEq++;
								html += tag;
							} else {
								warnings.push('The product code does not exist: ' + array[x]);
							}
						}
					}
				}
				
				$grid.prepend(html); // Append the generated list items to the grid
				callback();
			});
		};
		
		// Update mix filter
		public_props.update = function(newIndex, fade) {
			var code = settings.codes;
			var fade = fade || false;
			var has_products = settings.codes[newIndex] != null ? true : false;
			var filter = has_products ? '.slide' + newIndex : 'none';
			if(!$grid.mixItUp('isLoaded')) $grid.mixItUp({load: {'filter' : 'none'}});
			$grid.mixItUp('filter', filter);
			var is_fullscreen = $('body').hasClass('fullscreen');
			
			if(has_products) {
				$outfit_btn.attr('href', settings.quickshop_path + settings.codes[newIndex]);
				if(!$('#grid-ui').is(':visible')) { 
					if(fade) {
						$('#grid-ui').fadeIn();
					} else {
						$('#grid-ui').show();
					}
				}
			} else {
				$outfit_btn.attr('href', '#');
				if($grid_ui.is(':visible')) { 
					$grid_ui.fadeOut();
				} else {
					if(fade) {
						$grid_ui.fadeOut();
					} else {
						$grid_ui.hide();
					}
				}
			}			
		};
		
		// Retreive codes function
		function retrieve_codes() {
			var li = slider.children('li').not('.bx-clone');
			var array = [];
			var exclStr = settings.market + settings.quickshop_path;
			li.each(function() {
				var $retrieve = $('.quicklink.retrieve',this);
				if($retrieve.length == 0) {
					array.push(null);
				} else {
					var href = $retrieve.attr('href');
					var codes = href.replace('/' + settings.market + settings.quickshop_path, '');
					array.push(codes);
				}
			});
			return array;
		}
		
		// Toggle the product grid (opened/closed)
		var toggle_grid = function() {
			var gridIsOpen = ($grid.hasClass($grid.open_class));			
			if(!Modernizr.csstransitions) { 
				var end = (gridIsOpen) ? 0 : settings.max_height;
				$grid.animate(
					{ max_height: end },
					settings.animation_speed,
					function(){
						if(gridIsOpen) {
							$toggle_btn.text(text);
						} else {
							$grid.removeAttr('style');
						}
					}
				);
				
			}
			$grid_container.toggleClass('open');
		}		
		
		// Initialise the product grid
		public_props.initialise = function(callback) {
			var buylook_copy = translation(['Buy complete look', 'Den kompletten Look shoppen', 'Acheter la tenue compl\u00e8te']);
			var show_copy = translation(['Show','Anzeigen', 'Montrer' ]);
			var hide_copy = translation(['Hide', 'Verbergen', 'Cacher' ]);
			var html = 
				['<div id="grid-container">',
					
					'<div id="grid-ui" style="display: none">',
						'<a href="#" class="quicklink" id="complete-look">' + buylook_copy + '</a>',
						'<a href="#" id="toggle-grid">',
							'<span class="show-hide" id="show-copy">' + show_copy + '</span>',
							'<span class="show-hide" id="hide-copy">' + hide_copy + '</span>',
						'</a>',
					'</div>',
					'<ul id="grid">',
						'<!-- Products are dynamically created here -->',
					'</ul>',
				'</div>'].join('\n');
			feature_append(html);
			$grid = $('#grid');
			$grid_container = $('#grid-container');
			$grid_ui = $('#grid-ui');
			$outfit_btn = $('#complete-look');
			$toggle_btn = $('#toggle-grid');
			public_props.update(0);
			generate(callback);
			bindUI($toggle_btn, 'click', function(){
				toggle_grid();
			});
		};
		public_props.ui = settings.ui;
		return public_props;
		
	}();
	
	// == Shopping Bag functionality
	var Shopping_bag = function() {
		var settings = $.extend({
			enabled: true,
			market: market
		}, user_settings.shoppingbag_settings);
		
		
		
		var public_props = {
			after_load: function() { return false },
			before_close: function() { return false },
			update: function() { return false },
			initialise: function() { return false }
		}
		
		if(!settings.enabled) return public_props;
		
		var $fs_qty, $fs_val, $nm_qty, $nm_val;
		
		// To do after quicklink load
		public_props.after_load = function() {
			var btn = $('.fancybox-iframe').contents().find('#addToBagBtn');
			btn.click(function(){
				if($(this).hasClass('enabled')) {
					$('#shopping-bag').removeClass('changed').addClass('changed');
					Shopping_bag.update();					
				}
			});
		};
		
		// Get the text of a specific element
		var get_text = function(id) {
			var id = $(id).text();
			return id;
		}
		
		// Updates the values in the fullscreen shopping bag
		var update_values = function() {
			var new_qty = get_text('#ShoppingBag1_lblCount');
			var new_val = get_text('#ShoppingBag1_lblTotal');
			$fs_qty.text(new_qty);
			$fs_val.text(new_val);
		}
		
		// Checks whether the new and old values are different then updates the fullscreen shopping bag values
		public_props.update = function() {
			
			var current_qty = $('#sb-qty').text();
			var cap = 25;
			var timer = setInterval(function() {
				var new_qty = $('#ShoppingBag1_lblCount').text();
				if(new_qty != current_qty) {
					update_values();
					clearInterval(timer);
					
				}
				if(cap === 0) clearInterval(timer);
				cap--;
			}, 200);
			
		}
		
		// Do this after fancybox close
		public_props.before_close = function() {
			$('#shopping-bag').removeClass('changed');
		};
		
		// Initialises the shopping bag
		public_props.initialise = function() {
			var bag = translation(['Bag', 'Warenkorb', 'Panier' ]);
			var value = $('#ShoppingBag1_lblTotal').text();
			var html = [
				'<a title="Bag" href="~/checkout/shopping-bag.html#nav" id="shopping-bag">',
					'<h2 id="bag-copy">' + bag + '</h2>',
					'<span class="bagCounter" id="sb-qty"></span><span class="sbItemText">items</span>',
					'<span class="sbTotalPriceText">Total</span>',
					'<span id="sb-value">' + value + '</span>',
				'</a>'
			].join('\n');
			
			$('.fullscreen-info').prepend(html);
			$fs_qty = $('#sb-qty');
			$fs_val = $('#sb-value');
			public_props.update();
		}
		
		return public_props;
	}();
	
	// ==================== //
	// = Core Processing == //
	// ==================== //
	
	// This sets the initial slide
	var initial_slide = (function() {
		function getParameterByName(name) {
			name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
				results = regex.exec(location.search);
			return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		}
		var slide = getParameterByName('slide');
		slide = slide != '' ? slide : 0;
		return slide;
	})();
	
	var settings = $.extend({
			initial_slide: initial_slide,
			active_class: 'active-slide',
			normal_width: 1000,
			fullscreen_enabled: true,
			fullscreen_button: $('.fullscreen-btn'),
			body: global_settings.body,
			resize_delay: 100,
			border: 10,
			nav_location: {
				normal: '#ghost-', 
				fullscreen: '#fullscreen_nav-'
			},
			ui_switch: false, //integer or array, depending on the index of slide that requires switching. false if not necessary
		}, user_settings.slider_settings);
	
	var slider, timer;
	
	// Fullscreen object
	var fullscreen = {
		is_active: function() { return false },
		mode: function() { return get_attrs( settings.normal_width, settings.initial_slide, settings.nav_location.normal ) },
		apply_ui: function() { return false }
	}
	
	// Determine viewport width
	var viewport_width = function() { return fullscreen.is_active() ? $(window).width() : settings.normal_width};
	
	// If fullscreen is enabled ...
	if(settings.fullscreen_enabled) {
		var html = [];
		html[0] = [
			'<div id="fullscreen_nav-container">',
				'<div id="fullscreen_nav-left" class="fullscreen-nav"></div>',
				'<div id="fullscreen_nav-right" class="fullscreen-nav"></div>',
				'<div class="fullscreen-info">',
					'<a class="fullscreen-btn" href="#">Small screen</a>',
				'</div>',
			'</div>	'    
		].join('\n');
		html[1] = [
			'<div class="fullscreen-btn">',
				'<a href="#">Full screen</a>',
			'</div>'
		].join('\n');
		
		// ... apply methods and properties ...
		fullscreen = {
			// Checks if fullscreen is active
			is_active: function() { return settings.body.hasClass('fullscreen') },
			
			// Gets fullscreen mode status, and returns appropriate attributes for slider
			mode: function() {
				return this.is_active() ?
					get_attrs( $(window).width(), settings.initial_slide, settings.nav_location.fullscreen ) :
					get_attrs( settings.normal_width, settings.initial_slide, settings.nav_location.normal );
			},
			
			// Creates UI and binds appropriate events
			apply_ui: function() { 
				feature_append(html[0]);
				$('#ghost-right').append(html[1]);
				bindUI('.fullscreen-btn', 'click', function() { fullscreen.toggle(); });
			},
			
			// Toggles the fullscreen/fixed width modes
			toggle: function() {
				settings.body.toggleClass('fullscreen');
				slider.reloadSlider(fullscreen.mode());
				if(!fullscreen.is_active()) set_ghosts();
				ProductGrid.update(settings.initial_slide, false);
			}
		}
	};
	
	// This function switches to a different UI style (e.g. if the UI on a particular slide doesn't contrast well with the background
	var ui_switch = function(newIndex, slideNumber) {
		if(!settings.ui_switch) return false;
		var switchClass = 'ui-switch';
		var array = (slideNumber.constructor === Array) ? slideNumber : [slideNumber];
		var $featureWrapper = $('.feature-wrapper');
		$.each(array, function(index, value) {
			if(value == newIndex) {
				global_settings.feature_wrapper.addClass('ui-switch');
				return false;
			} 
			if (global_settings.feature_wrapper.hasClass('ui-switch')) {
				global_settings.feature_wrapper.removeClass('ui-switch');
				return false;
			}
		});
	}
	
	// This sets the ghosts for the fullscreen mode
	var set_ghosts = function() {
		var offset = $('.bx-viewport').offset().left + $('.bx-viewport').width();
		$('.ghost').each(function(){
			var $this = $(this);
			var side = $this.attr('id').replace('ghost-', '');
			var css = (side === 'left') ? {right: offset} : {left: offset};
			$this.css(css);
		});
	};
	
	// This returns the the attributes for the slider
	var get_attrs = function( width, current_index, nav_location ) {
		return {
				slideWidth: width
				,startSlide: current_index
				,pager: Pager.enabled
				,pagerSelector: Pager.container
				,oneToOneTouch: false
				,buildPager: function(slideIndex){
					return Pager.generate_thumbnail(slideIndex);
				}
				,onSliderLoad: function(current_index) {
					
					cmCreateElementTag(global_settings.cm_tag + '_' + current_index, 'OUTFIT');
					settings.initial_slide = current_index;
					set_ghosts();
					Jpeg_animate.playFrames(current_index);
					ProductGrid.update(current_index);
				}
				,onSlideBefore: function($slideElement, oldIndex, newIndex){	
					Pager.toggle_pager(true);
					settings.initial_slide = newIndex;
					Layers.slide($slideElement, viewport_width(), oldIndex, newIndex);
					ProductGrid.update(newIndex, true);
					ui_switch(newIndex);
				}
				,onSlideAfter: function($slideElement, oldIndex, newIndex) {
					Jpeg_animate.playFrames(newIndex, oldIndex);
					cmCreateElementTag(global_settings.cm_tag + '_' + newIndex, 'OUTFIT');
				}
				,prevSelector: nav_location + 'left'
				,nextSelector: nav_location + 'right'
			}
	};
	
	// This is what to do when the user resizes the window
	var window_resize = function() {
		set_ghosts();
		if(fullscreen.is_active()) {
			clearTimeout(timer);
			timer = setTimeout(function(){
				var currentSlide = $('.' + settings.active_class).index() - 1;
				slider.reloadSlider(fullscreen.mode());
				
			}, settings.resize_delay);
			return false;
		}
	}
	
	// This binds the main UI elements
	var bindUIelements = function() {
		
		bindUI(window, 'resize', function() { window_resize() });
		bindUI('.next', 'click', function(e) {
			e.preventDefault();
			slider.goToNextSlide();
		});
		if(!settings.fullscreen_enabled) return false;
		bindUI(settings.fullscreen_button, 'click', function() { toggle_fullscreen() });
	};
	
	
	// This logs warnings
	var log_warnings = function() {
		try {
			if(global_settings.cm_tag === 'SS15-TEMPLATE') throw 'You have not changed the coremetrics tag';
			if(global_settings.img_path === '/images/magazine/features/SS15-carousel/') throw 'You haven\'t changed the default image path';
		} 
		catch(err) {
			console.error(err);
		}
	};
	
	// This initialises the feature carousel
	var initialise = function() {
		$('[name=viewport]', '#Head1').attr('content', 'width=1000');
		Pager.initialise();
		Jpeg_animate.initialise();
		ProductGrid.initialise(function(){
			apply_quicklinks();
			log_warnings();
		});
		slider = $('.bxslider').bxSlider(fullscreen.mode());
		fullscreen.apply_ui();
		apply_quicklinks();
		bindUIelements();
		Shopping_bag.initialise();
	};
	
	return {
		init: initialise
	};
}