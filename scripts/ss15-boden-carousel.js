/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-backgroundsize-csstransforms-csstransitions-testprop-testallprops-domprefixes
 */
;window.Modernizr=function(a,b,c){function w(a){i.cssText=a}function x(a,b){return w(prefixes.join(a+";")+(b||""))}function y(a,b){return typeof a===b}function z(a,b){return!!~(""+a).indexOf(b)}function A(a,b){for(var d in a){var e=a[d];if(!z(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function B(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:y(f,"function")?f.bind(d||b):f}return!1}function C(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+m.join(d+" ")+d).split(" ");return y(b,"string")||y(b,"undefined")?A(e,b):(e=(a+" "+n.join(d+" ")+d).split(" "),B(e,b,c))}var d="2.8.3",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l="Webkit Moz O ms",m=l.split(" "),n=l.toLowerCase().split(" "),o={},p={},q={},r=[],s=r.slice,t,u={}.hasOwnProperty,v;!y(u,"undefined")&&!y(u.call,"undefined")?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=s.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(s.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(s.call(arguments)))};return e}),o.backgroundsize=function(){return C("backgroundSize")},o.csstransforms=function(){return!!C("transform")},o.csstransitions=function(){return C("transition")};for(var D in o)v(o,D)&&(t=D.toLowerCase(),e[t]=o[D](),r.push((e[t]?"":"no-")+t));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)v(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},w(""),h=j=null,e._version=d,e._domPrefixes=n,e._cssomPrefixes=m,e.testProp=function(a){return A([a])},e.testAllProps=C,e}(this,this.document);

function BodenCarousel(custom) {
	var user_settings = custom || {};
	
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
	var warnings = [];
	var market = $('html').attr('lang');
	
	// ====================== //
	// == HELPER FUNCTIONS == //
	// ====================== //
	
	// Apply quicklinks
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
	
	// Get appropriate copy for market
	function translation(copy) {
		var mkt = market.slice(0,2);
		var lang = (mkt === 'en') ? 0 : (mkt === 'de') ? 1 : (mkt === 'fr') ? 2 : 0;
		return copy[lang];
	}
	
	// Append html to the feature 
	function feature_append(html) {
		global_settings.feature_wrapper.append(html);
	}
	
	// =============== //
	// === MODULES === //
	// =============== //
	
	// == Staggered animation layers functionality
	var Layers = function() {
		var settings = $.extend({
			enabled: false,
			layer_class: 'layer',
			duration: 1,
			delay: 0.4
		}, custom.layers_settings);
		
		var public_props = {
			enabled : settings.enabled,
			slide : function() { return false }
		};
		
		if(!settings.enabled) return public_props;
		
		public_props.slide = function(parent, vpWidth, oldIndex, newIndex) {
			var layers = parent.find('.' + settings.layer_class);
			var forward = (oldIndex - newIndex) ? true : false;
			var startPoint = vpWidth;
			var attr = (forward) ? {left: startPoint, right: 'auto'} : {right: startPoint, left: 'auto'};
			TweenMax.staggerFrom(layers, settings.duration, attr, settings.delay);
		}
		
		return public_props;
	}();
	
	// == Jpeg animation functionality
	var Jpeg_animate = function() {
		var settings = $.extend({
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
		}, custom.jpganimate_settings);
		
		var public_props = {
			enabled : settings.enabled,
			playFrames : function() { return false },
			initialise : function() { return false }
		};
		
		if(!settings.enabled) return public_props;
		
		var css3 = Modernizr.backgroundsize;
		var ctl = null;
		
		var add_frames = function(target, frames, index) {
			var target = $(target);
			var container = target.find(settings.container);
			var imgVar = '';
			var css3 = true;
			for(i = 1; i <= frames; i++) {
				var first = (i === 1) ? ' first' : '';
				var div = (settings.css3) ? 
					'<div class="animation-frame' + first + '" style="background-image: url(' + settings.img_path + 'slide' + index + '/slide' + i + '.jpg);"></div>' :
					'<div class="animation-frame' + first + '"><img class="ie-bg" src="' + settings.img_path + 'slide' + index + '/slide' + i + '.jpg" /></div>';
				imgVar += div;
			}
			container.append(imgVar);
		};
		
		var control = function(target, frames) {
			var framesArray = $(target).find(settings.container).children();
			var duration = settings.speed / 1000;
			var animate = 
				new TimelineMax({repeat: settings.repeat, paused: settings.paused, yoyo: settings.yoyo, repeat_delay: (settings.repeat_delay / 1000)})
					.staggerFromTo(framesArray, duration, {zIndex: 0}, {zIndex: 1}, (settings.speed / 1000));
			return animate;
		};
		
		public_props.playFrames = function(newIndex, oldIndex) {
			if(ctl === null) return false;
			var newScene = ctl[newIndex];
			var oldScene = ctl[oldIndex];
			if(newScene != undefined) newScene.play();
			if(oldScene != undefined) oldScene.pause();
		};
		
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
			name_format: {prefix: 'slide', suffix: '-thumbnail.jpg'},
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
		
		public_props.generate_thumbnail =  function(slideIndex) {
			var thumb;
			var image = settings.img_path + settings.name_format.prefix + slideIndex + settings.name_format.suffix;
			var thumb = '<div class="thumb-inner"><div class="thumb-img" style="background-image: url(' + image + ')"></div></div>';
			return thumb;
		}
		
		var is_open = function() { return $pager_wrapper.hasClass(open_class) };
		
		public_props.toggle_pager = function(override_close) {
			var override = override_close || false;
			if(override && is_open) {
				$pager_wrapper.removeClass(open_class);
				return false;
			}
			var toggle_class = function() { $pager_wrapper.toggleClass(open_class); };
			toggle_class();
		};
				
		var bindUI = function() {
			$toggle_btn.click(function(){
				public_props.toggle_pager();
			});
		}
		
		public_props.initialise = function() {
			var html = [
				'<div id="pager-wrapper">',
					'<div id="pager-container">',
					'</div>',
					'<div id="pager-tab"></div>',
				'</div>'
			].join('\n');
			
			feature_append(html);
			public_props.container = $('#pager-container');
			$pager_wrapper = $('#pager-wrapper');
			$toggle_btn = $('#pager-tab');
			bindUI();
		}
		
		return public_props;
	}();
	
	// == Product Grid functionality
	var ProductGrid = function() {
		var settings = $.extend({
			enabled: true,				// Boolean
			slider_class: '.bxslider',
			codes: global_settings.product_codes, // Array or 'auto'
			quickshop_path: global_settings.quickshop_path, // String
			open_class: 'open',			// String
			max_height: 210,				// Integer
			market: market
		}, custom.productgrid_settings);
		
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
			var merged_codes = function() {
				return settings.codes.toString().replace(/,/g , '|');
			};
			var path = settings.quickshop_path + merged_codes();
			var product_codes = settings.codes;
			
			$.get(path, function(data) {
				var $data = $(data);
				var img = $data.find('.ProductMain');
				var imgEq = 0;
				for(i = 0; i < product_codes.length; i++) {
					
					if(product_codes[i] != null) {
						var current = product_codes[i];
						var array = product_codes[i].split('|');
						for(x = 0; x < array.length; x++) {
							var baseCode = array[x].slice(0,5);
							if($('[data-productcode=' + baseCode + ']', $data).data('productcode') != null) {
								var tag = '<li class="mix slide' + i + '"><a class="quicklink" href="/products/outfitting.aspx?qr=' + array[x] + '"><img src="' + img.eq(imgEq).attr('src') + '" /></a></li>';
								imgEq++;
								html += tag;
							} else {
								warnings.push('The product code does not exist: ' + array[x]);
							}
						}
					}
				}
				
				$grid.prepend(html);
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
		
		var bindUI = function() {
			$toggle_btn.click(function() {
				toggle_grid();
			});
		}
		
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
			bindUI();
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
		
		public_props.after_load = function() {
			var btn = $('.fancybox-iframe').contents().find('#addToBagBtn');
			btn.click(function(){
				if($(this).hasClass('enabled')) {
					$('#shopping-bag').removeClass('changed').addClass('changed');
					Shopping_bag.update();					
				}
			});
		}
		
		public_props.update = function() {
			var items = $('#ShoppingBag1_lblCount');
			var value = items.text();
			var cap = 25;
			var timer = setInterval(function() {
				var new_val = items.text();
				if(new_val != value) {
					items.text(new_val);
					clearInterval(timer);
				}
				if(cap === 0) clearInterval(timer);
				cap--;
			}, 200);
		}
		
		public_props.before_close = function() {
			$('#shopping-bag').removeClass('changed');
		};
		
		public_props.initialise = function() {
			var bag = translation(['Bag', 'Warenkorb', 'Panier' ]);
			var html = [
				'<a title="Bag" href="~/checkout/shopping-bag.html#nav" id="shopping-bag">',
					'<h2 id="bag-copy">' + bag + '</h2>',
					'<span class="bagCounter" id="sb-qty">0</span><span class="sbItemText">items</span>',
					'<span class="sbTotalPriceText">Total</span>',
					'<span id="sb-value">&pound;0.00</span>',
				'</a>'
			].join('\n');
			
			$('.fullscreen-info').prepend(html);
		}
		
		return public_props;
	}();
	
	// ==================== //
	// === Core Feature === //
	// ==================== //
	var settings = $.extend({
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
			ui_switch: false, //integer or array, depending on the index of slide that requires switching. false if not necessary
		}, user_settings.slider_settings);
	
	var slider, timer;
	
	var fullscreen = {
		is_active: function() { return false },
		mode: function() { return get_attrs( settings.normal_width, settings.initial_slide, settings.nav_location.normal ) },
		apply_ui: function() { return false }
	}
	
	var viewport_width = function() { return fullscreen.is_active() ? $(window).width() : settings.normal_width};
	
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
		fullscreen = {
			is_active: function() { return settings.body.hasClass('fullscreen') },
			mode: function() {
				return this.is_active() ?
					get_attrs( $(window).width(), settings.initial_slide, settings.nav_location.fullscreen ) :
					get_attrs( settings.normal_width, settings.initial_slide, settings.nav_location.normal );
			},
			apply_ui: function() { 
				feature_append(html[0]);
				$('#ghost-right').append(html[1]);
				this.bind_ui();
			},
			bind_ui: function() {
				$('.fullscreen-btn').click(function() {
					fullscreen.toggle();
				});
			},
			toggle: function() {
				settings.body.toggleClass('fullscreen');
				slider.reloadSlider(fullscreen.mode());
				if(!fullscreen.is_active()) set_ghosts();
				ProductGrid.update(settings.initial_slide, false);
			}
		}
	};
	
	if( settings.ui_switch.constructor === Array ) {
		
	}
	
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
		
	var set_ghosts = function() {
		var offset = $('.bx-viewport').offset().left + $('.bx-viewport').width();
		$('.ghost').each(function(){
			var $this = $(this);
			var side = $this.attr('id').replace('ghost-', '');
			var css = (side === 'left') ? {right: offset} : {left: offset};
			$this.css(css);
		});
	};
		
	var get_attrs = function( width, current_index, nav_location ) {
		return {
				slideWidth: width
				,startSlide: current_index
				,pager: Pager.enabled // ####
				,pagerSelector: Pager.container // ####
				,buildPager: function(slideIndex){
					return Pager.generate_thumbnail(slideIndex); // ####
				}
				,onSliderLoad: function(current_index) {
					
					cmCreateElementTag(global_settings.cm_tag + '_' + current_index, 'OUTFIT');
					settings.initial_slide = current_index;
					set_ghosts();
					Jpeg_animate.playFrames(current_index);
					//JpgAnimate.playFrames(current_index);
				}
				,onSlideBefore: function($slideElement, oldIndex, newIndex){	
					//Slider.updateActive(newIndex);
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
	
	var log_warnings = function() {
		if(global_settings.cm_tag === 'SS15-TEMPLATE') warnings.push('You have not changed the coremetrics tag');
		
		for(i in warnings) {
			console.log('WARNING: ' + warnings[i]);
		}
	};

	var initialise = function() {
		$('[name=viewport]', '#Head1').attr('content', 'width=1000');
		Pager.initialise();
		Jpeg_animate.initialise();
		ProductGrid.initialise(function(){
			apply_quicklinks();
			log_warnings();
			Shopping_bag.initialise();
		});
		slider = $('.bxslider').bxSlider(fullscreen.mode());
		fullscreen.apply_ui();
		apply_quicklinks();
	};
	
	var bindUIelements = function() {
		if(settings.fullscreen_enabled) settings.fullscreen_button.click(function() { toggle_fullscreen() });
		$(window).resize(function() { window_resize() });
	}();
	
	
	return {
		init: initialise
	};
}