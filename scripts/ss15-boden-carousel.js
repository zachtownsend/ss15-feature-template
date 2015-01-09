/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-backgroundsize-csstransforms-csstransitions-testprop-testallprops-domprefixes
 */
;window.Modernizr=function(a,b,c){function w(a){i.cssText=a}function x(a,b){return w(prefixes.join(a+";")+(b||""))}function y(a,b){return typeof a===b}function z(a,b){return!!~(""+a).indexOf(b)}function A(a,b){for(var d in a){var e=a[d];if(!z(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function B(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:y(f,"function")?f.bind(d||b):f}return!1}function C(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+m.join(d+" ")+d).split(" ");return y(b,"string")||y(b,"undefined")?A(e,b):(e=(a+" "+n.join(d+" ")+d).split(" "),B(e,b,c))}var d="2.8.3",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l="Webkit Moz O ms",m=l.split(" "),n=l.toLowerCase().split(" "),o={},p={},q={},r=[],s=r.slice,t,u={}.hasOwnProperty,v;!y(u,"undefined")&&!y(u.call,"undefined")?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=s.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(s.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(s.call(arguments)))};return e}),o.backgroundsize=function(){return C("backgroundSize")},o.csstransforms=function(){return!!C("transform")},o.csstransitions=function(){return C("transition")};for(var D in o)v(o,D)&&(t=D.toLowerCase(),e[t]=o[D](),r.push((e[t]?"":"no-")+t));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)v(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},w(""),h=j=null,e._version=d,e._domPrefixes=n,e._cssomPrefixes=m,e.testProp=function(a){return A([a])},e.testAllProps=C,e}(this,this.document);

function BodenCarousel(custom) {
	var globalSettings = $.extend({
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
	}, custom.global_settings);
	//console.log(globalSettings);
	// SLIDER
	var Slider = {
		settings: $.extend({
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
		}, custom.slider_settings),
		slider: null,
		bindUIactions: function() {
			
			Slider.settings.fullscreenButton.click(function() {
				Slider.toggleFullscreen();
			});
			
			$('.next').click(function(e) {
				e.preventDefault();
				Slider.slider.goToNextSlide();
			});
			
		},
		bindWindowResize: function() {
			$(window).resize(function(){
				if(Slider.isFullscreen()) {
					clearTimeout(Slider.settings.timer);
					Slider.settings.timer = setTimeout(function(){
						var currentSlide = $('.' + Slider.settings.activeClass).index() - 1;
						Slider.slider.reloadSlider(Slider.mode.fullscreen());
						
					}, Slider.settings.resizeTimerDelay);
					Slider.setFontSize(globalSettings.fontSize, globalSettings.PSDWidth, $(this).width(), globalSettings.fontParent, Slider.isFullscreen());
				}
				
				Ghosts.set();
			});
		},
		moveToTop: function() {
			var height = $('.topBarContainer').height();
			$('html').scrollTop(height);
		},
		ie8Fullscreen: function(array){
			if(Modernizr.backgroundsize) {
				return false;
			}
			var target = (array instanceof jQuery) ? array : $(array);
			target.each(function(){
				var $this = $(this);
				var bg = $this.css('background-image').split('"');
				$this.prepend('<img class="ie-fullscreen" src="' + bg[1] + '" />');
			});
		},
		setFontSize: function(fontSize, origWidth, newWidth, target, fullscreen){
			if(this.settings.dynamicFontSize) {
				if(!fullscreen) {
					$(target).removeAttr('style');
					return false;
				}
				var pc = fontSize / origWidth;
				var size = newWidth * pc;
				$(target).css({'font-size': size});
			}
			return false;
		},
		translate: function(market) {
			if(!this.settings.translateEnabled) return false;
			var bag = ['Bag', 'Warenkorb', 'Panier' ];
			var show = ['Show','Anzeigen', 'Montrer' ];
			var hide = ['Hide', 'Verbergen', 'Cacher' ];
			var buylook = ['Buy complete look', 'Den kompletten Look shoppen', 'Acheter la tenue compl&#232;te'];
			var mkt = market.slice(0,2);
			var lang = (mkt === 'en') ? 0 : (mkt === 'de') ? 1 : (mkt === 'fr') ? 2 : 0;
			$('#bag-copy').text(bag[lang]);
			$('#show-copy').text(show[lang]);
			$('#hide-copy').text(hide[lang]);
			$('#complete-look').text(buylook[lang]);
		},
		initialise: function(slider) {
			
			$('.bxslider').bxSlider(Slider.mode.normal());
			if(Slider.settings.fullscreenEnabled) {
				Slider.bindUIactions();
			} else {
				Slider.settings.fullscreenButton.remove();
			}
			
			Slider.ie8Fullscreen($('.slide-container'));
			$('#Head1').find('meta[name=viewport]').remove();
			ProductGrid.initialise();
			Pager.initialise();
			Ghosts.initialise();
			Slider.bindWindowResize();
			
			Slider.moveToTop();
			JpgAnimate.initialise();
			Slider.translate(globalSettings.market);
			ShoppingBag.update();
		},
		mode: {
			normal: function() { return  Slider.getSliderAttr(Slider.settings.normalWidth, Slider.settings.initialSlide, Slider.settings.navLocation.normal)},
			fullscreen: function() { return Slider.getSliderAttr($(window).width(), Slider.settings.initialSlide, Slider.settings.navLocation.fullscreen)},
			
		},
		uiSwitch: function(newIndex, slideNumber) {
			if(!slideNumber) return false;
			var switchClass = 'ui-switch';
			var array = (slideNumber.constructor === Array) ? slideNumber : [slideNumber];
			var $featureWrapper = $('.feature-wrapper');
			$.each(array, function(index, value) {
				if(value == newIndex) {
					$featureWrapper.addClass('ui-switch');
					return false;
				} 
				if ($featureWrapper.hasClass('ui-switch')) {
					$featureWrapper.removeClass('ui-switch');
					return false;
				}
			});
		},
		isFullscreen: function() { return this.settings.body.hasClass('fullscreen') },
		toggleFullscreen: function() {
			this.settings.body.toggleClass('fullscreen');
			if(this.isFullscreen()) {
				Slider.slider.reloadSlider(this.mode.fullscreen());
			} else {
				Slider.slider.reloadSlider(this.mode.normal());
				Ghosts.set();
			}
		},
		
		updateActive: function(newIndex) {
			$('.' + this.settings.activeClass).removeClass(this.settings.activeClass);
			$('li', '.bxslider').eq(newIndex + 1).addClass(this.settings.activeClass);
		},
		
		autoHide: function(currentIndex, fade) {
			var gridUI = ProductGrid.settings.ui;
			if(Slider.isFullscreen()) {
				ProductGrid.autoHide([gridUI.completeLook, gridUI.toggleBtn], currentIndex, fade);
			} else {
				gridUI.toggleBtn.hide();
				ProductGrid.autoHide([gridUI.completeLook], currentIndex, fade);
			}
		},
		vpWidth: function() {
			var vpWidth = (this.isFullscreen()) ? $(window).width() : this.settings.normalWidth;
			return vpWidth;
		},
		// Dynamically create bxSlider attributes
		getSliderAttr: function(width, currentIndex, navLocation) {
			return {
					slideWidth: width
					,startSlide: currentIndex
					,pager: Pager.settings.enabled
					,pagerSelector: Pager.settings.container
					,buildPager: function(slideIndex){
						return Pager.generateThumbnail(slideIndex);
					}
					,onSliderLoad: function(currentIndex) {
						
						cmCreateElementTag(globalSettings.cm_tag + '_' + currentIndex, 'OUTFIT');
						Quicklink.apply();
						Slider.settings.initialSlide = currentIndex;
						Slider.autoHide(currentIndex, false);	
						Slider.setFontSize(globalSettings.fontSize, globalSettings.PSDWidth, $(window).width(), globalSettings.fontParent, Slider.isFullscreen());
						JpgAnimate.playFrames(currentIndex);
					}
					,onSlideBefore: function($slideElement, oldIndex, newIndex){	
						Slider.updateActive(newIndex);
						Slider.autoHide(newIndex, true);
						if(Pager.isOpen()) {
							Pager.togglePager(true);
						}
						Layers.slide($slideElement, Slider.vpWidth(), oldIndex, newIndex);
						ProductGrid.applyMix(newIndex);
						ProductGrid.updateOutfit(newIndex);
						Slider.settings.initialSlide = newIndex;
						Slider.uiSwitch(newIndex, Slider.settings.uiSwitchSliders);
					}
					,onSlideAfter: function($slideElement, oldIndex, newIndex) {
						Slider.updateActive(newIndex);
						JpgAnimate.playFrames(newIndex, oldIndex);
						
						cmCreateElementTag(globalSettings.cm_tag + '_' + newIndex, 'OUTFIT');
					}
					,prevSelector: navLocation + 'left'
					,nextSelector: navLocation + 'right'
				}
			}
	};

	// PAGER
	// This is the module that controls the pagination
	var Pager = {
		settings: $.extend({
			enabled: true,
			fullscreenStyle: 'overlay', 						// overlay|top
			hoverStyle: 'normal', 								// normal|dot|box
			imageType: (Modernizr.backgroundsize) ? 'background' : 'inline', // inline|background
			scrollable: false,									// Boolean
			animationSpeed: globalSettings.animationSpeed, 		// integer (in ms)
			animationEase: 'ease',
			animationDelay: 0,
			imgPath: globalSettings.imgPath,
			nameFormat: {prefix: 'slide', suffix: '-thumbnail.jpg'},
			wrapper: $('#pager-wrapper'),						// jQuery selector
			container: $('#pager-container'),					// jQuery selector
			item: $('.bx-pager-item'),							// jQuery selector
			img: $('.thumb-img'),								// jQuery selector
			ui: {
				toggleBtn: $('#pager-tab'),						// jQuery selector
				textBased: false									// Boolean
			},
		}, custom.pager_settings),
		bindUIactions: function() {
			this.settings.ui.toggleBtn.click(function(){
				Pager.togglePager();
			});
		},
		initialise: function() {
			if(this.settings.enabled) {
				this.bindUIactions();
				
				this.settings.wrapper
					.addClass(this.settings.fullscreenStyle)
					.addClass(this.settings.hoverStyle);
				
				if(Modernizr.csstransitions) {
					this.settings.ui.toggleBtn.css({
						'transition': 'all ' + this.settings.animationSpeed + 'ms ' + this.settings.animationEase + ' ' + this.settings.animationDelay + 'ms'
					});
					this.settings.wrapper.css({
						'transition': 'left ' + this.settings.animationSpeed + 'ms ' + this.settings.animationEase + ' ' + this.settings.animationDelay + 'ms'
					});
				}
				
				if(this.settings.ui.textBased) {
					this.settings.ui.toggleBtn.find('.close-copy').addClass('hide');
				} else {
					this.settings.ui.toggleBtn.find('span').hide();
				}
			} else {
				this.settings.wrapper.remove();
			}
			return false;

		},
		isOpen: function() { return this.settings.wrapper.hasClass('open') },
		togglePager: function(loadDelay) {
			var $pager = this.settings;
			var load = (typeof loadDelay == 'undefined') ? false : true;
			var dly = (load) ? $pager.animationSpeed : 0;
			
			if(this.isOpen()) {
				var delay = 0;
				var len = $pager.item.length;
				var delayMod = $pager.animationSpeed / len;
				
				$pager.item.each(function(){
					$(this).delay(delay += delayMod).fadeOut(function(){
						if($(this).index() + 1 === len) {
							$pager.item.each(function(){
								$(thiS).removeAttr('style');
							});
						}
					});
					
				});
			}
			
			if(!Modernizr.csstransitions) {
				var end = (this.isOpen()) ? '-100%' : '0%';
				var tabEnd = (this.isOpen()) ? '-70px' : '10px';
				this.changeText();
				$pager.wrapper.stop(true).delay(dly).animate(
					{'left': end}, 
					$pager.animationSpeed, 
					function(){	Pager.settings.wrapper.toggleClass('open')	}
				);
				$pager.ui.toggleBtn.delay(dly).animate(
					{'right': tabEnd},
					$pager.animationSpeed
				);
				
			} else {
				$pager.wrapper.toggleClass('open');
			};
		},
		changeText: function() {
			if(this.settings.ui.textBased) {
				var tab = this.settings.ui.toggleBtn;
				tab.find('.open-copy').toggleClass('hide');
				tab.find('.close-copy').toggleClass('hide');
			}
			return false;
		},
		resetPager: function() {
			this.wrapper.removeClass('open').removeAttr('style');
		},
		generateThumbnail: function(slideIndex) {
				var thumb;
				var image = this.settings.imgPath + this.settings.nameFormat.prefix + slideIndex + this.settings.nameFormat.suffix;
				switch(this.settings.imageType) {
					case 'background':
						thumb = 
						'<div class="thumb-inner"><div class="thumb-img" style="background-image: url(' + image + ')"></div></div>';
						break;
					case 'inline':
						thumb = '<img src="' + image + '" />';	
						break;
				}
				return thumb;
			return false;
		}
	}

	// PRODUCT GRID
	// This module controls the product grid functionality
	var ProductGrid = {
		settings: $.extend({
			enabled: true,				// Boolean
			defaultHidden: true,		// Boolean
			container: $('.grid-container'), // jQuery selector
			listContainer: $('#grid'),	// jQuery selector
			codes: globalSettings.productCodes, // Array or 'auto'
			quickshopPath: globalSettings.quickshopPath, // String
			animationSpeed: globalSettings.animationSpeed, // Integer (in ms)
			animationEasing: 'ease', 	// String, options: ease|linear|ease-in|ease-out|ease-in-out|cubic-bezier()|initial|inherit;
			animationDelay: 0, 			// integer (in ms)
			openClass: 'open',			// String
			maxHeight: 210,				// Integer
			market: globalSettings.market,
			ui: {
				completeLook: $('#complete-look'),
				toggleBtn: $('#toggle-grid'),
				showBtnClass: 'show-btn',
				itemClass: 'page-nav',
				textBased: true
			},
		}, custom.productgrid_settings),
		initialise: function() {
			if(this.settings.enabled) {
				this.autoCodes();
				this.generate();
				this.applyMix();
				this.bindUIactions();
				
				if(Modernizr.csstransitions) {
					this.settings.container.css({'transition': 'max-height ' + this.settings.animationSpeed + 'ms ' + this.settings.animationEasing + ' ' + this.settings.animationDelay + 'ms'});
					this.settings.ui.toggleBtn.css({'transition': 'top ' + this.settings.animationSpeed + 'ms ' + this.settings.animationEasing + ' ' + this.settings.animationDelay + 'ms'});
				}
				
				if(this.settings.ui.textBased) {
					this.settings.ui.toggleBtn.find('.close-copy').addClass('hide');
				} else {
					this.settings.ui.toggleBtn.find('span').hide();
				}
				
				
			} else {
				this.settings.container.remove();
			}
			return false;

		},
		autoCodes: function() {
			var array = (this.settings.codes === 'auto') ?
				this.retrieveCodes() :
				this.settings.codes;
			this.settings.codes = array;
		},
		bindUIactions: function() {
			this.settings.ui.toggleBtn.click(function(){
				ProductGrid.toggleGrid();
			});
		},
		applyMix: function(newIndex) {
			if(ProductGrid.settings.enabled) {
				if(!ProductGrid.settings.listContainer.mixItUp('isLoaded')) {
					ProductGrid.createMix();
				} else {
					ProductGrid.filterGrid(newIndex);
				}
			}
		},
		retrieveCodes: function() {
			var li = $('.bxslider').children('li').not('.bx-clone');
			var $retrieve = $('.quicklink.retrieve');
			var array = Array();
			var exclStr = ProductGrid.settings.market + ProductGrid.settings.quickshopPath;
			li.each(function() {
				var $retrieve = $('.quicklink.retrieve',this);
				if($retrieve.length == 0) {
					array.push(null);
				} else {
					var href = $retrieve.attr('href');
					var codes = href.replace('/' + ProductGrid.settings.market + ProductGrid.settings.quickshopPath, '');
					array.push(codes);
				}
			});
			return array;
		},
		mergedCodes: function() {
			return this.settings.codes.toString().replace(/,/g , '|');
		},
		generate: function() {
			var html = '';
			var path = this.settings.quickshopPath + this.mergedCodes();
			var productCodes = this.settings.codes;
			
			$.get(path, function(data) {
				var $data = $(data);
				var img = $data.find('.ProductMain');
				var imgEq = 0;
				for(i = 0; i < productCodes.length; i++) {
					
					if(productCodes[i] != null) {
						var current = productCodes[i];
						var array = productCodes[i].split('|');
						for(x = 0; x < array.length; x++) {
							var baseCode = array[x].slice(0,5);
							if($('[data-productcode=' + baseCode + ']', $data).data('productcode') != null) {
								var tag = '<li class="mix slide' + i + '"><a class="quicklink" href="~/products/outfitting.aspx?qr=' + array[x] + '"><img src="' + img.eq(imgEq).attr('src') + '" /></a></li>';
								imgEq++;
								html += tag;
							} else {
								console.log('The product code does not exist: ' + array[x]);
							}
						}
					}
				}
				ProductGrid.settings.listContainer.prepend(html);
				Quicklink.apply();
			});
		},
		toggleGrid: function() {
			var $grid = ProductGrid.settings;
			var gridIsOpen = ($grid.listContainer.hasClass($grid.openClass));
			this.changeText();
			
			if(!Modernizr.csstransitions) { 
				var end = (gridIsOpen) ? 0 : $grid.maxHeight;
				$grid.listContainer.animate(
					{ maxHeight: end },
					$grid.animationSpeed,
					function(){
						if(gridIsOpen) {
							ProductPanel.settings.ui.toggleBtn.text(text);
						} else {
							$grid.listContainer.removeAttr('style');
						}
					}
				);
				
			}
			$grid.container.toggleClass('open');
		},
		changeText: function() {
			if(this.settings.ui.textBased) {
				var tab = this.settings.ui.toggleBtn;
				tab.find('.open-copy').toggleClass('hide');
				tab.find('.close-copy').toggleClass('hide');
			}
			return false;
		},
		autoHide: function(target, index, fade) {
			var fadeFx = (typeof fade == 'undefined') ? false : true;
			var codes = ProductGrid.settings.codes;
			for(i = (target.length - 1); i >= 0; i--) {
				var current = target[i];
				
				if(codes[index] === null) {
					(fadeFx) ? current.fadeOut(ProductGrid.settings.animationSpeed) : current.hide();
				} else {
					if(current.is(':visible')) return false;
					(fadeFx) ? current.fadeIn(ProductGrid.settings.animationSpeed) : current.show();
				}
			}
		},
		createMix: function() {
			this.settings.listContainer.mixItUp({
				load: {
					filter: 'none'
				}
			});	
		},
		filterGrid: function(newIndex) {
			var code = this.settings.codes;
			var filter = (code[newIndex] != null) ? '.slide' + newIndex : 'none';
			this.settings.listContainer.mixItUp('filter', filter);
		},
		updateOutfit: function(newIndex) {
			var $grid = this.settings;
			$grid.ui.completeLook.attr('href', $grid.quickshopPath + $grid.codes[newIndex]);
		}
		
		
	};

	// QUICKLINK
	// This module controls the quicklink functionality
	var Quicklink = {
		settings: $.extend({
			updateBagAfterLoad: true,
			updateBagBeforeClose: true
		}, custom.quicklink_settings),
		apply: function() {
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
						if (Quicklink.settings.updateBagAfterLoad) ShoppingBag.afterLoad();
					},
					'beforeClose' : function() {
						if (Quicklink.settings.updateBagBeforeClose) ShoppingBag.beforeClose();
					}
				});    
			});
		}
	};

	// SHOPPING BAG
	// This module controls the shopping bag functionality
	var ShoppingBag = {
		market: globalSettings.market,
		afterLoad: function() {
			if(Slider.isFullscreen()) {
				var btn = $('.fancybox-iframe').contents().find('#addToBagBtn');
				btn.click(function(){
					if($(this).hasClass('enabled')) {
						$('#shopping-bag').removeClass('changed').addClass('changed');
						setTimeout(function() {
							ShoppingBag.update();
						}, 1500);
						
					}
				});
				
			}
		},
		beforeClose: function() {
			this.update();
			$('#shopping-bag').removeClass('changed');
		},
		update: function() {
			var bag = $('#bagPreview');
			$.get('/ClientControls/Products/ShoppingBag.aspx?LanguageCode=' + this.market, function(data) {
				var $data = $(data);
				var shopping = {qty: $data.find('#ShoppingBag1_lblCount').text(), value: $data.find('#ShoppingBag1_lblTotal').text()};
				$('#sb-qty').text(shopping.qty);
				$('#sb-value').text(shopping.value);
			});
		}
	};

	// ANIMATED JPEG
	var JpgAnimate = {
		settings: $.extend({
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
		}, custom.jpganimate_settings),
		addFrames: function(target, frames, index) {
			var settings = this.settings;
			var target = $(target);
			var container = target.find(settings.container);
			//var slide = target.index();
			var imgVar = '';
			var css3 = true;
			for(i = 1; i <= frames; i++) {
				var first = (i === 1) ? ' first' : '';
				var div = (settings.css3) ? 
					'<div class="animation-frame' + first + '" style="background-image: url(' + settings.imgPath + 'slide' + index + '/slide' + i + '.jpg);"></div>' :
					'<div class="animation-frame' + first + '"><img class="ie-bg" src="' + settings.imgPath + 'slide' + index + '/slide' + i + '.jpg" /></div>';
				imgVar += div;
			}
			container.append(imgVar);
		},
		control: function(target, frames) {
			var settings = this.settings;
			var framesArray = $(target).find(settings.container).children();
			var duration = settings.speed / 1000;
			var animate = 
				new TimelineMax({repeat: settings.repeat, paused: settings.paused, yoyo: settings.yoyo, repeatDelay: (settings.repeatDelay / 1000)})
					.staggerFromTo(framesArray, duration, {zIndex: 0}, {zIndex: 1}, (settings.speed / 1000));
			return animate;
		},
		initialise: function() {
			if(!this.settings.enabled) return false;
			var settings = this.settings;
			var scenes = Array();
			$.each(settings.scene, function(index, value) {
				var target = settings.slidePrefix + index;
				if(value != null) {
					JpgAnimate.addFrames(target, value, index);
					scenes[index] = JpgAnimate.control('.slide' + index, settings.scene[index]);
				}
			});
			settings.ctl = scenes;
		},
		playFrames: function(newIndex, oldIndex) {
			if(!this.settings.enabled) return false;
			if(this.settings.ctl == null) return false;
			var settings = this.settings;
			var newScene = settings.ctl[newIndex];
			var oldScene = settings.ctl[oldIndex];
			if(newScene != undefined) newScene.play();
			if(oldScene != undefined) oldScene.pause();
		}
	}

	//Parallax layers
	var Layers = {
		settings: $.extend({
			enabled: false,
			layerClass: 'layer',
			duration: 1,
			delay: 0.4
		}, custom.layers_settings),
		slide: function(parent, vpWidth, oldIndex, newIndex) {
			var settings = this.settings;
			if(!settings.enabled) return false;
			var layers = parent.find('.' + settings.layerClass);
			var forward = (oldIndex - newIndex) ? true : false;
			var startPoint = vpWidth;
			var attr = (forward) ? {left: startPoint, right: 'auto'} : {right: startPoint, left: 'auto'};
			TweenMax.staggerFrom(layers, settings.duration, attr, settings.delay);
		}
	}

	// GHOSTS
	// This module controls the navigation "ghost" overlay
	var Ghosts = {
		settings: $.extend({
			enabled: true,
			selector: $('.ghost')
		}, custom.ghosts_settings),
		initialise: function() {
			if(this.settings.enabled) {
				Ghosts.set();
			}
			return false;
		},
		set: function() {
			var offset = $('.bx-viewport').offset().left + $('.bx-viewport').width();
			this.settings.selector.each(function(){
				var $this = $(this);
				var side = $this.attr('id').replace('ghost-', '');
				var css = (side === 'left') ? {right: offset} : {left: offset};
				$this.css(css);
			});
		}
	}
	
	/*Slider.initialise();
	ProductGrid.applyMix(0);
	ProductGrid.autoHide();*/
	return {
		init: Slider.initialise,
		applyMix: ProductGrid.applyMix 
	}
}