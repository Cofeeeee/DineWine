jQuery(function () {
	//Global
	initCustomForms();
	initFancybox();
	initMobileNav();
	initTouchNav();
	initDropDownClasses();
	initAddClasses();
	initHeaderSmallScroll();
	initBackToTop();

	//Home
	initHome1PageSlider();
	initCycleCarousel();

	//Static
	initTabs();
	initAccordion();

	//  Blog
	initOpenClose();

	//Gallery
	initSlideshowGallerySlider();
	initFlowGallery();

	initWebApp2DetailPaging();
	initAjaxLoadMoreFunction();
	initCounterFunction();
	initSubMenuToSidebar();
	initTabNav();
	initFullYear();

});

// Full Year
function initFullYear() {
	document.getElementById("year").innerHTML = new Date().getFullYear();
}


// &quot;tab&quot; key handling
function initTabNav() {
	jQuery('#nav').tabNav({
		items: 'li'
	});
}


function initSubMenuToSidebar() {
	var menuSelector = '#nav ul:eq(0)';
	var sidebarPlaceHolderSelect = '.sidebarSubmenuPlaceHolder';
	var activeSelector = '.active';

	var condition = $(sidebarPlaceHolderSelect).length && $(menuSelector + ' ' + activeSelector + ":has(ul)").length
	init(condition);

	function init(condition) {
		if (condition || condition == null) {
			copyToSidebar();
		}
	}

	function copyToSidebar() {
		var submenuCopy = $(menuSelector).find(activeSelector + ':first ul:eq(0)').clone();

		submenuCopy.addClass('sub-nav');
		submenuCopy.removeClass('dropdown-content right-position');

		submenuCopy.find('a').addClass('collection-item');

		$(sidebarPlaceHolderSelect).append(submenuCopy);
	}
}

function initCounterFunction() {
	var condition = $('.countersHolder').length
		// && false
		; init(condition);

	function init(condition) {

		if (condition || condition == null) {
			Number.prototype.formatMoney = function (c, d, t) {
				var n = this,
					c = isNaN(c = Math.abs(c)) ? 2 : c,
					d = d == undefined ? "." : d,
					t = t == undefined ? "," : t,
					s = n < 0 ? "-" : "",
					i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
					j = (j = i.length) > 3 ? j % 3 : 0;
				return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
			};
			$('.countersHolder').viewportChecker({
				offset: '20%',
				callbackFunction: function (elem, action) {
					$('.countersHolder .item-wrap').each(function (index, elm) {
						var $container = $(this),
							$number = $container.find('.value'),
							initial = ($container.data('initial') || '0') + '',
							target = ($container.data('target') || '10') + '',
							prefix = $container.data('prefix') || '',
							suffix = $container.data('suffix') || '',
							commaNumber;
						// 0 for integers, 1+ for floats (number of digits after the decimal)
						precision = 0,
							usingComma = false;
						if (target.indexOf('.') != -1) {
							precision = target.length - 1 - target.indexOf('.');
						} else if (target.indexOf(',') != -1) {
							precision = target.length - 1 - target.indexOf(',');
							usingComma = true;
							target = target.replace(/\,/gim, '');
						}
						initial = window[precision ? 'parseFloat' : 'parseInt'](initial, 10);
						target = window[precision ? 'parseFloat' : 'parseInt'](target, 10);

						if (/bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent)) {
							if (usingComma) {
								$number.html(prefix + target.toFixed(precision).replace('\.', ',') + suffix);
							} else {
								$number.html(prefix + target.toFixed(precision) + suffix);
							}

							return;
						}

						if (usingComma) {
							commaNumber = +initial.toFixed(precision);
							$number.html(prefix + commaNumber.formatMoney(0, '', ',') + suffix);
						} else {
							$number.html(prefix + initial.toFixed(precision) + suffix);
						}

						var current = initial,
							step = 25,
							stepValue = (target - initial) / 25,
							interval = setInterval(function (usingComma) {
								current += stepValue;
								step--;
								if (usingComma) {
									commaNumber = +current.toFixed(precision);
									$number.html(prefix + commaNumber.formatMoney(0, '', ',') + suffix);
								} else {
									$number.html(prefix + current.toFixed(precision) + suffix);
								}
								if (step <= 0) {
									if (usingComma) {
										commaNumber = +target.toFixed(precision);
										$number.html(prefix + commaNumber.formatMoney(0, '', ',') + suffix);
									} else {
										$number.html(prefix + target.toFixed(precision) + suffix);
									}
									window.clearInterval(interval);
								}
							}, 40, usingComma);
					});
				}
			});
		}
	}
}

function initAjaxLoadMoreFunction() {
	var condition = $('.ajaxListHolder').length
		// && false
		; init(condition);

	function init(condition) {
		if (condition || condition == null) {
			if ($('.ajaxListHolder .pagination ul li.active').next().length) {
				$('.loadMoreBtn').attr('href', $('.ajaxListHolder .pagination ul li.active').next().find('a').attr('href'));
			}
			else {
				$('.load-holder').hide();
			}

			$('.loadMoreBtn').click(function () {
				var _this = $(this);
				var _href = _this.attr('href');

				$.ajax({
					url: _href,
					success: function (data) {
						var requiredObject = $('section.ajaxListHolder', data);
						var _items = requiredObject.find('.load-item');
						var _nextPage = requiredObject.find('.pagination ul li.active').next().find('a');

						$('.ajaxListHolder .pagination').before(_items);

						if (_nextPage.length) {
							$('.load-holder a').attr('href', _nextPage.attr('href'));
						}
						else {
							$('.load-holder a').hide();
						}
					}
				});

				return false;
			});
		}
	}
}

function initWebApp2DetailPaging() {
	var condition = $('.webAppDetailPaging').length
		// && false
		; init(condition);

	function init(condition) {
		if (condition || condition == null) {

			var currentId = $('[data-current_id]').data('current_id');
			var index = $('.hiddenWebAppListHolder [data-id="' + currentId + '"]').index();
			var prevIndex = index - 1;
			var nextIndex = index + 1;

			if (prevIndex >= 0) {
				$('.webAppDetailPaging .prev').show();
				$('.webAppDetailPaging .prev').attr('href', $('.hiddenWebAppListHolder .hiddenItem').eq(prevIndex).data('link'));
				$('.webAppDetailPaging .prev h4').html($('.hiddenWebAppListHolder .hiddenItem').eq(prevIndex).data('name'));
				$('.webAppDetailPaging .prev .position').html($('.hiddenWebAppListHolder .hiddenItem').eq(prevIndex).data('position'));
			}

			if (nextIndex < $('.hiddenWebAppListHolder .hiddenItem').length) {
				$('.webAppDetailPaging .next').show();
				$('.webAppDetailPaging .next').attr('href', $('.hiddenWebAppListHolder .hiddenItem').eq(nextIndex).data('link'));
				$('.webAppDetailPaging .next h4').html($('.hiddenWebAppListHolder .hiddenItem').eq(nextIndex).data('name'));
				$('.webAppDetailPaging .next .position').html($('.hiddenWebAppListHolder .hiddenItem').eq(nextIndex).data('position'));
			}
		}
	}
}

function initHeaderSmallScroll() {
	$(window).scroll(function () {
		scroll();
	});

	scroll();

	function scroll() {
		var x = $(document).scrollTop();
		var _offset = 0;

		if ($('.login-nav').length) {
			_offset = 31;
		}

		if (x > _offset) {
			$('body').addClass('scroll');
		}
		else {
			$('body').removeClass('scroll');
		}
	}
}


//GLOBAL
function initAddClasses() {
	jQuery('.search-opener').clickClass({
		classAdd: 'search-active',
		addToParent: 'header-form'
	});

	jQuery('.login-opener').clickClass({
		classAdd: 'login-active',
		addToParent: 'login-block'
	});
}

function initCustomForms() {
	jcf.setOptions('Select', {
		wrapNative: false,
		wrapNativeOnMobile: false,
		flipDropToFit: false,
	});
	jcf.replaceAll();
}

function initFancybox() {
	jQuery('a.lightbox, [data-fancybox]').fancybox({
		parentEl: 'body',
		margin: [50, 0]
	});
}

function initMobileNav() {
	jQuery('body').mobileNav({
		menuActiveClass: 'nav-active',
		menuOpener: '.nav-opener'
	});
}

function initTouchNav() {
	jQuery('#nav').each(function () {
		new TouchNav({
			navBlock: this
		});
	});
}

function initDropDownClasses() {
	jQuery('#nav li').each(function () {
		var item = jQuery(this);
		var drop = item.find('ul');
		var link = item.find('a').eq(0);
		if (drop.length) {
			item.addClass('has-drop-down');
			if (link.length) link.addClass('has-drop-down-a');
		}
	});
}

function initBackToTop() {
	var condition = $('.back-to-top').length
		// && false
		; init(condition);

	function init(condition) {
		if (condition || condition == null) {
			$('.back-to-top').click(function () {
				$('body,html').animate({
					scrollTop: 0
				}, 500);

				return false;
			});
		}
	}
}

//HOME
function initHome1PageSlider() {
	var condition = $('.homePage1SliderHolder').length
		// && false
		; init(condition);

	function init(condition) {
		if (condition || condition == null) {
			var homeSliderPause = +$('.homePage1SliderHolder').data('pause');
			var homeSliderAuto = true;

			if (!homeSliderPause) homeSliderAuto = false;

			var homeSlider = $('.homePage1SliderHolder .slideset').bxSlider({
				mode: 'fade',
				slideSelector: $('.homePage1SliderHolder .slide'),
				pager: false,
				controls: false,
				auto: homeSliderAuto,
				pause: homeSliderPause
			});

			$('.homePage1SliderHolder .btn-next').click(function () {
				homeSlider.goToNextSlide();

				return false;
			});

			$('.homePage1SliderHolder .btn-prev').click(function () {
				homeSlider.goToPrevSlide();
				return false;
			});


		}

	}

	if ($('.homePage1SliderHolder .slide').length == 1) {
		$('.homePage1SliderHolder .btn-next, .homePage1SliderHolder .btn-prev').addClass('disabled');
	} else {
		$('.homePage1SliderHolder .btn-next, .homePage1SliderHolder .btn-prev').removeClass('disabled');
	}

}

// cycle scroll gallery init
function initCycleCarousel() {
	jQuery('.cycle-gallery').scrollAbsoluteGallery({
		mask: '.mask',
		slider: '.slideset',
		slides: '.slide',
		btnPrev: '.btn-prev',
		btnNext: '.btn-next',
		generatePagination: '.pagination',
		stretchSlideToMask: true
	});
}

//STATIC

function initTabs() {
	jQuery('.tabset').tabset({
		tabLinks: 'a',
		defaultTab: true
	});
}

function initAccordion() {
	jQuery('.accordion').slideAccordion({
		opener: '.opener',
		slider: '.slide',
		animSpeed: 300
	});
}

//BLOG

function initOpenClose() {
	jQuery('.open-close').openClose({
		activeClass: 'active',
		opener: '.opener',
		slider: '.slide',
		animSpeed: 400,
		effect: 'slide'
	});
}

//GALLERY

function initSlideshowGallerySlider() {
	var condition = $('.slideshowGalleryHolder').length
		// && false
		; init(condition);

	function init(condition) {
		if (condition || condition == null) {
			var slideshowGallerySlider = $('.slideshowGalleryHolder .slideset').bxSlider({
				mode: 'fade',
				slideSelector: $('.slideshowGalleryHolder .slide'),
				pager: false,
				controls: false,
				auto: true,
				adaptiveHeight: true
			});

			$('.slideshowGalleryHolder .btn-next').click(function () {
				slideshowGallerySlider.goToNextSlide();

				return false;
			});

			$('.slideshowGalleryHolder .btn-prev').click(function () {
				slideshowGallerySlider.goToPrevSlide();

				return false;
			});
		}
	}
}

function initFlowGallery() {
	var condition = $('.flowGalleryHolder').length
		// && false
		; init(condition);

	function init(condition) {
		if (condition || condition == null) {
			$('.flowGalleryHolder ul').slick({
				centerMode: true,
				centerPadding: '50px',
				slidesToShow: 3,
				responsive: [
					{
						breakpoint: 768,
						settings: {
							arrows: false,
							centerMode: true,
							centerPadding: '40px',
							slidesToShow: 3
						}
					},
					{
						breakpoint: 480,
						settings: {
							arrows: false,
							centerMode: true,
							centerPadding: '40px',
							slidesToShow: 1
						}
					}
				]
			});
		}
	}
}

//Custom Module 1

function initWebApp1NumberCounter() {
	var condition = $('.countersHolder').length
		// && false
		; init(condition);

	function init(condition) {
		if (condition || condition == null) {
			$('.countersHolder').viewportChecker({
				offset: '20%',
				callbackFunction: function (elem, action) {
					$('.countersHolder .item-wrap').each(function (index, elm) {
						var $container = $(this),
							$number = $container.find('.value'),
							initial = ($container.data('initial') || '0') + '',
							target = ($container.data('target') || '10') + '',
							prefix = $container.data('prefix') || '',
							suffix = $container.data('suffix') || '',
							// 0 for integers, 1+ for floats (number of digits after the decimal)
							precision = 0,
							usingComma = false;
						if (target.indexOf('.') != -1) {
							precision = target.length - 1 - target.indexOf('.');
						} else if (target.indexOf(',') != -1) {
							precision = target.length - 1 - target.indexOf(',');
							usingComma = true;
							target = target.replace(',', '.');
						}
						initial = window[precision ? 'parseFloat' : 'parseInt'](initial, 10);
						target = window[precision ? 'parseFloat' : 'parseInt'](target, 10);

						if (/bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent)) {
							if (usingComma) {
								$number.html(prefix + target.toFixed(precision).replace('\.', ',') + suffix);
							} else {
								$number.html(prefix + target.toFixed(precision) + suffix);
							}

							return;
						}

						if (usingComma) {
							$number.html(prefix + initial.toFixed(precision).replace('\.', ',') + suffix);
						} else {
							$number.html(prefix + initial.toFixed(precision) + suffix);
						}
						var current = initial,
							step = 25,
							stepValue = (target - initial) / 25,
							interval = setInterval(function () {
								current += stepValue;
								step--;
								if (usingComma) {
									$number.html(prefix + current.toFixed(precision).replace('\.', ',') + suffix);
								} else {
									$number.html(prefix + current.toFixed(precision) + suffix);
								}
								if (step <= 0) {
									if (usingComma) {
										$number.html(prefix + target.toFixed(precision).replace('\.', ',') + suffix);
									} else {
										$number.html(prefix + target.toFixed(precision) + suffix);
									}
									window.clearInterval(interval);
								}
							}, 40);
					});
				}
			});
		}
	}
}

/*
Global
*/
jQuery.fn.clickClass = function (opt) {
	var options = jQuery.extend({
		classAdd: 'add-class',
		addToParent: false,
		event: 'click'
	}, opt);

	return this.each(function () {
		var classItem = jQuery(this);
		if (options.addToParent) {
			if (typeof options.addToParent === 'boolean') {
				classItem = classItem.parent();
			} else {
				classItem = classItem.parents('.' + options.addToParent);
			}
		}
		jQuery(this).bind(options.event, function (e) {
			classItem.toggleClass(options.classAdd);
			e.preventDefault();
		});
	});
};

/*
 * Accessible TAB navigation
 */
; (function ($) {
	var isWindowsPhone = /Windows Phone/.test(navigator.userAgent);
	var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

	$.fn.tabNav = function (opt) {
		var options = $.extend({
			hoverClass: 'hover',
			items: 'li',
			opener: '>a',
			delay: 10
		}, opt);

		if (isWindowsPhone || isTouchDevice) {
			return this;
		}

		return this.each(function () {
			var nav = $(this), items = nav.find(options.items);

			items.each(function (index, navItem) {
				var item = $(this), navActive, touchNavActive;
				var link = item.find(options.opener), timer;

				link.bind('focus', function () {
					navActive = nav.hasClass('js-nav-active');
					touchNavActive = window.TouchNav && TouchNav.isActiveOn(navItem);
					if (!navActive || touchNavActive) {
						initSimpleNav();
					}
					item.trigger(navActive && touchNavActive ? 'itemhover' : 'mouseenter');
				}).bind('blur', function () {
					item.trigger(navActive && touchNavActive ? 'itemleave' : 'mouseleave');
				});

				var initSimpleNav = function () {
					if (!initSimpleNav.done) {
						initSimpleNav.done = true;
						item.hover(function () {
							clearTimeout(timer);
							timer = setTimeout(function () {
								item.addClass(options.hoverClass);
							}, options.delay);
						}, function () {
							clearTimeout(timer);
							timer = setTimeout(function () {
								item.removeClass(options.hoverClass);
							}, options.delay);
						});
					}
				};
			});
		});
	};
}(jQuery));

// ==================================================
// fancyBox v3.2.10
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2017 fancyApps
//
// ==================================================
!function (t, e, n, o) { "use strict"; function i(t) { var e = n(t.currentTarget), o = t.data ? t.data.options : {}, i = e.attr("data-fancybox") || "", a = 0, s = []; t.isDefaultPrevented() || (t.preventDefault(), i ? (s = o.selector ? n(o.selector) : t.data ? t.data.items : [], s = s.length ? s.filter('[data-fancybox="' + i + '"]') : n('[data-fancybox="' + i + '"]'), a = s.index(e), a < 0 && (a = 0)) : s = [e], n.fancybox.open(s, o, a)) } if (n) { if (n.fn.fancybox) return void ("console" in t && console.log("fancyBox already initialized")); var a = { loop: !1, margin: [44, 0], gutter: 50, keyboard: !0, arrows: !0, infobar: !0, toolbar: !0, buttons: ["slideShow", "fullScreen", "thumbs", "share", "close"], idleTime: 3, smallBtn: "auto", protect: !1, modal: !1, image: { preload: "auto" }, ajax: { settings: { data: { fancybox: !0 } } }, iframe: { tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>', preload: !0, css: {}, attr: { scrolling: "auto" } }, defaultType: "image", animationEffect: "zoom", animationDuration: 500, zoomOpacity: "auto", transitionEffect: "fade", transitionDuration: 366, slideClass: "", baseClass: "", baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div></div></div>', spinnerTpl: '<div class="fancybox-loading"></div>', errorTpl: '<div class="fancybox-error"><p>{{ERROR}}<p></div>', btnTpl: { download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}"><svg viewBox="0 0 40 40"><path d="M20,23 L20,8 L20,23 L13,16 L20,23 L27,16 L20,23 M26,28 L13,28 L27,28 L14,28" /></svg></a>', zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg viewBox="0 0 40 40"><path d="M 18,17 m-8,0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0 M25,23 L31,29 L25,23" /></svg></button>', close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg viewBox="0 0 40 40"><path d="M10,10 L30,30 M30,10 L10,30" /></svg></button>', smallBtn: '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"></button>', arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><svg viewBox="0 0 40 40"><path d="M10,20 L30,20 L10,20 L18,28 L10,20 L18,12 L10,20"></path></svg></button>', arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><svg viewBox="0 0 40 40"><path d="M30,20 L10,20 L30,20 L22,28 L30,20 L22,12 L30,20"></path></svg></button>' }, parentEl: "body", autoFocus: !1, backFocus: !0, trapFocus: !0, fullScreen: { autoStart: !1 }, touch: { vertical: !0, momentum: !0 }, hash: null, media: {}, slideShow: { autoStart: !1, speed: 4e3 }, thumbs: { autoStart: !1, hideOnClose: !0, parentEl: ".fancybox-container", axis: "y" }, wheel: "auto", onInit: n.noop, beforeLoad: n.noop, afterLoad: n.noop, beforeShow: n.noop, afterShow: n.noop, beforeClose: n.noop, afterClose: n.noop, onActivate: n.noop, onDeactivate: n.noop, clickContent: function (t, e) { return "image" === t.type && "zoom" }, clickSlide: "close", clickOutside: "close", dblclickContent: !1, dblclickSlide: !1, dblclickOutside: !1, mobile: { idleTime: !1, margin: 0, clickContent: function (t, e) { return "image" === t.type && "toggleControls" }, clickSlide: function (t, e) { return "image" === t.type ? "toggleControls" : "close" }, dblclickContent: function (t, e) { return "image" === t.type && "zoom" }, dblclickSlide: function (t, e) { return "image" === t.type && "zoom" } }, lang: "en", i18n: { en: { CLOSE: "Close", NEXT: "Next", PREV: "Previous", ERROR: "The requested content cannot be loaded. <br/> Please try again later.", PLAY_START: "Start slideshow", PLAY_STOP: "Pause slideshow", FULL_SCREEN: "Full screen", THUMBS: "Thumbnails", DOWNLOAD: "Download", SHARE: "Share", ZOOM: "Zoom" }, de: { CLOSE: "Schliessen", NEXT: "Weiter", PREV: "Zurück", ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.", PLAY_START: "Diaschau starten", PLAY_STOP: "Diaschau beenden", FULL_SCREEN: "Vollbild", THUMBS: "Vorschaubilder", DOWNLOAD: "Herunterladen", SHARE: "Teilen", ZOOM: "Maßstab" } } }, s = n(t), r = n(e), c = 0, l = function (t) { return t && t.hasOwnProperty && t instanceof n }, u = function () { return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function (e) { return t.setTimeout(e, 1e3 / 60) } }(), d = function () { var t, n = e.createElement("fakeelement"), i = { transition: "transitionend", OTransition: "oTransitionEnd", MozTransition: "transitionend", WebkitTransition: "webkitTransitionEnd" }; for (t in i) if (n.style[t] !== o) return i[t]; return "transitionend" }(), f = function (t) { return t && t.length && t[0].offsetHeight }, p = function (t, o, i) { var a = this; a.opts = n.extend(!0, { index: i }, n.fancybox.defaults, o || {}), n.fancybox.isMobile && (a.opts = n.extend(!0, {}, a.opts, a.opts.mobile)), o && n.isArray(o.buttons) && (a.opts.buttons = o.buttons), a.id = a.opts.id || ++c, a.group = [], a.currIndex = parseInt(a.opts.index, 10) || 0, a.prevIndex = null, a.prevPos = null, a.currPos = 0, a.firstRun = null, a.createGroup(t), a.group.length && (a.$lastFocus = n(e.activeElement).blur(), a.slides = {}, a.init()) }; n.extend(p.prototype, { init: function () { var i, a, s, c = this, l = c.group[c.currIndex], u = l.opts, d = n.fancybox.scrollbarWidth; c.scrollTop = r.scrollTop(), c.scrollLeft = r.scrollLeft(), n.fancybox.getInstance() || (n("body").addClass("fancybox-active"), /iPad|iPhone|iPod/.test(navigator.userAgent) && !t.MSStream ? "image" !== l.type && n("body").css("top", n("body").scrollTop() * -1).addClass("fancybox-iosfix") : !n.fancybox.isMobile && e.body.scrollHeight > t.innerHeight && (d === o && (i = n('<div style="width:50px;height:50px;overflow:scroll;" />').appendTo("body"), d = n.fancybox.scrollbarWidth = i[0].offsetWidth - i[0].clientWidth, i.remove()), n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: ' + d + "px; }</style>"), n("body").addClass("compensate-for-scrollbar"))), s = "", n.each(u.buttons, function (t, e) { s += u.btnTpl[e] || "" }), a = n(c.translate(c, u.baseTpl.replace("{{buttons}}", s).replace("{{arrows}}", u.btnTpl.arrowLeft + u.btnTpl.arrowRight))).attr("id", "fancybox-container-" + c.id).addClass("fancybox-is-hidden").addClass(u.baseClass).data("FancyBox", c).appendTo(u.parentEl), c.$refs = { container: a }, ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function (t) { c.$refs[t] = a.find(".fancybox-" + t) }), c.trigger("onInit"), c.activate(), c.jumpTo(c.currIndex) }, translate: function (t, e) { var n = t.opts.i18n[t.opts.lang]; return e.replace(/\{\{(\w+)\}\}/g, function (t, e) { var i = n[e]; return i === o ? t : i }) }, createGroup: function (t) { var e = this, i = n.makeArray(t); n.each(i, function (t, i) { var a, s, r, c, l, u = {}, d = {}; n.isPlainObject(i) ? (u = i, d = i.opts || i) : "object" === n.type(i) && n(i).length ? (a = n(i), d = a.data(), d = n.extend({}, d, d.options || {}), d.$orig = a, u.src = d.src || a.attr("href"), u.type || u.src || (u.type = "inline", u.src = i)) : u = { type: "html", src: i + "" }, u.opts = n.extend(!0, {}, e.opts, d), n.isArray(d.buttons) && (u.opts.buttons = d.buttons), s = u.type || u.opts.type, c = u.src || "", !s && c && (c.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? s = "image" : c.match(/\.(pdf)((\?|#).*)?$/i) ? s = "pdf" : (r = c.match(/\.(mp4|mov|ogv)((\?|#).*)?$/i)) ? (s = "video", u.opts.videoFormat || (u.opts.videoFormat = "video/" + ("ogv" === r[1] ? "ogg" : r[1]))) : "#" === c.charAt(0) && (s = "inline")), s ? u.type = s : e.trigger("objectNeedsType", u), u.index = e.group.length, u.opts.$orig && !u.opts.$orig.length && delete u.opts.$orig, !u.opts.$thumb && u.opts.$orig && (u.opts.$thumb = u.opts.$orig.find("img:first")), u.opts.$thumb && !u.opts.$thumb.length && delete u.opts.$thumb, "function" === n.type(u.opts.caption) && (u.opts.caption = u.opts.caption.apply(i, [e, u])), "function" === n.type(e.opts.caption) && (u.opts.caption = e.opts.caption.apply(i, [e, u])), u.opts.caption instanceof n || (u.opts.caption = u.opts.caption === o ? "" : u.opts.caption + ""), "ajax" === s && (l = c.split(/\s+/, 2), l.length > 1 && (u.src = l.shift(), u.opts.filter = l.shift())), "auto" == u.opts.smallBtn && (n.inArray(s, ["html", "inline", "ajax"]) > -1 ? (u.opts.toolbar = !1, u.opts.smallBtn = !0) : u.opts.smallBtn = !1), "pdf" === s && (u.type = "iframe", u.opts.iframe.preload = !1), u.opts.modal && (u.opts = n.extend(!0, u.opts, { infobar: 0, toolbar: 0, smallBtn: 0, keyboard: 0, slideShow: 0, fullScreen: 0, thumbs: 0, touch: 0, clickContent: !1, clickSlide: !1, clickOutside: !1, dblclickContent: !1, dblclickSlide: !1, dblclickOutside: !1 })), e.group.push(u) }) }, addEvents: function () { var o = this; o.removeEvents(), o.$refs.container.on("click.fb-close", "[data-fancybox-close]", function (t) { t.stopPropagation(), t.preventDefault(), o.close(t) }).on("click.fb-prev touchend.fb-prev", "[data-fancybox-prev]", function (t) { t.stopPropagation(), t.preventDefault(), o.previous() }).on("click.fb-next touchend.fb-next", "[data-fancybox-next]", function (t) { t.stopPropagation(), t.preventDefault(), o.next() }).on("click.fb", "[data-fancybox-zoom]", function (t) { o[o.isScaledDown() ? "scaleToActual" : "scaleToFit"]() }), s.on("orientationchange.fb resize.fb", function (t) { t && t.originalEvent && "resize" === t.originalEvent.type ? u(function () { o.update() }) : (o.$refs.stage.hide(), setTimeout(function () { o.$refs.stage.show(), o.update() }, 600)) }), r.on("focusin.fb", function (t) { var i = n.fancybox ? n.fancybox.getInstance() : null; i.isClosing || !i.current || !i.current.opts.trapFocus || n(t.target).hasClass("fancybox-container") || n(t.target).is(e) || i && "fixed" !== n(t.target).css("position") && !i.$refs.container.has(t.target).length && (t.stopPropagation(), i.focus(), s.scrollTop(o.scrollTop).scrollLeft(o.scrollLeft)) }), r.on("keydown.fb", function (t) { var e = o.current, i = t.keyCode || t.which; if (e && e.opts.keyboard && !n(t.target).is("input") && !n(t.target).is("textarea")) return 8 === i || 27 === i ? (t.preventDefault(), void o.close(t)) : 37 === i || 38 === i ? (t.preventDefault(), void o.previous()) : 39 === i || 40 === i ? (t.preventDefault(), void o.next()) : void o.trigger("afterKeydown", t, i) }), o.group[o.currIndex].opts.idleTime && (o.idleSecondsCounter = 0, r.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function (t) { o.idleSecondsCounter = 0, o.isIdle && o.showControls(), o.isIdle = !1 }), o.idleInterval = t.setInterval(function () { o.idleSecondsCounter++, o.idleSecondsCounter >= o.group[o.currIndex].opts.idleTime && !o.isDragging && (o.isIdle = !0, o.idleSecondsCounter = 0, o.hideControls()) }, 1e3)) }, removeEvents: function () { var e = this; s.off("orientationchange.fb resize.fb"), r.off("focusin.fb keydown.fb .fb-idle"), this.$refs.container.off(".fb-close .fb-prev .fb-next"), e.idleInterval && (t.clearInterval(e.idleInterval), e.idleInterval = null) }, previous: function (t) { return this.jumpTo(this.currPos - 1, t) }, next: function (t) { return this.jumpTo(this.currPos + 1, t) }, jumpTo: function (t, e, i) { var a, s, r, c, l, u, d, p = this, h = p.group.length; if (!(p.isDragging || p.isClosing || p.isAnimating && p.firstRun)) { if (t = parseInt(t, 10), s = p.current ? p.current.opts.loop : p.opts.loop, !s && (t < 0 || t >= h)) return !1; if (a = p.firstRun = null === p.firstRun, !(h < 2 && !a && p.isDragging)) { if (c = p.current, p.prevIndex = p.currIndex, p.prevPos = p.currPos, r = p.createSlide(t), h > 1 && ((s || r.index > 0) && p.createSlide(t - 1), (s || r.index < h - 1) && p.createSlide(t + 1)), p.current = r, p.currIndex = r.index, p.currPos = r.pos, p.trigger("beforeShow", a), p.updateControls(), u = n.fancybox.getTranslate(r.$slide), r.isMoved = (0 !== u.left || 0 !== u.top) && !r.$slide.hasClass("fancybox-animated"), r.forcedDuration = o, n.isNumeric(e) ? r.forcedDuration = e : e = r.opts[a ? "animationDuration" : "transitionDuration"], e = parseInt(e, 10), a) return r.opts.animationEffect && e && p.$refs.container.css("transition-duration", e + "ms"), p.$refs.container.removeClass("fancybox-is-hidden"), f(p.$refs.container), p.$refs.container.addClass("fancybox-is-open"), r.$slide.addClass("fancybox-slide--current"), p.loadSlide(r), void p.preload("image"); n.each(p.slides, function (t, e) { n.fancybox.stop(e.$slide) }), r.$slide.removeClass("fancybox-slide--next fancybox-slide--previous").addClass("fancybox-slide--current"), r.isMoved ? (l = Math.round(r.$slide.width()), n.each(p.slides, function (t, o) { var i = o.pos - r.pos; n.fancybox.animate(o.$slide, { top: 0, left: i * l + i * o.opts.gutter }, e, function () { o.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous"), o.pos === p.currPos && (r.isMoved = !1, p.complete()) }) })) : p.$refs.stage.children().removeAttr("style"), r.isLoaded ? p.revealContent(r) : p.loadSlide(r), p.preload("image"), c.pos !== r.pos && (d = "fancybox-slide--" + (c.pos > r.pos ? "next" : "previous"), c.$slide.removeClass("fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous"), c.isComplete = !1, e && (r.isMoved || r.opts.transitionEffect) && (r.isMoved ? c.$slide.addClass(d) : (d = "fancybox-animated " + d + " fancybox-fx-" + r.opts.transitionEffect, n.fancybox.animate(c.$slide, d, e, function () { c.$slide.removeClass(d).removeAttr("style") })))) } } }, createSlide: function (t) { var e, o, i = this; return o = t % i.group.length, o = o < 0 ? i.group.length + o : o, !i.slides[t] && i.group[o] && (e = n('<div class="fancybox-slide"></div>').appendTo(i.$refs.stage), i.slides[t] = n.extend(!0, {}, i.group[o], { pos: t, $slide: e, isLoaded: !1 }), i.updateSlide(i.slides[t])), i.slides[t] }, scaleToActual: function (t, e, i) { var a, s, r, c, l, u = this, d = u.current, f = d.$content, p = parseInt(d.$slide.width(), 10), h = parseInt(d.$slide.height(), 10), g = d.width, b = d.height; "image" != d.type || d.hasError || !f || u.isAnimating || (n.fancybox.stop(f), u.isAnimating = !0, t = t === o ? .5 * p : t, e = e === o ? .5 * h : e, a = n.fancybox.getTranslate(f), c = g / a.width, l = b / a.height, s = .5 * p - .5 * g, r = .5 * h - .5 * b, g > p && (s = a.left * c - (t * c - t), s > 0 && (s = 0), s < p - g && (s = p - g)), b > h && (r = a.top * l - (e * l - e), r > 0 && (r = 0), r < h - b && (r = h - b)), u.updateCursor(g, b), n.fancybox.animate(f, { top: r, left: s, scaleX: c, scaleY: l }, i || 330, function () { u.isAnimating = !1 }), u.SlideShow && u.SlideShow.isActive && u.SlideShow.stop()) }, scaleToFit: function (t) { var e, o = this, i = o.current, a = i.$content; "image" != i.type || i.hasError || !a || o.isAnimating || (n.fancybox.stop(a), o.isAnimating = !0, e = o.getFitPos(i), o.updateCursor(e.width, e.height), n.fancybox.animate(a, { top: e.top, left: e.left, scaleX: e.width / a.width(), scaleY: e.height / a.height() }, t || 330, function () { o.isAnimating = !1 })) }, getFitPos: function (t) { var e, o, i, a, s, r = this, c = t.$content, l = t.width, u = t.height, d = t.opts.margin; return !(!c || !c.length || !l && !u) && ("number" === n.type(d) && (d = [d, d]), 2 == d.length && (d = [d[0], d[1], d[0], d[1]]), e = parseInt(r.$refs.stage.width(), 10) - (d[1] + d[3]), o = parseInt(r.$refs.stage.height(), 10) - (d[0] + d[2]), i = Math.min(1, e / l, o / u), a = Math.floor(i * l), s = Math.floor(i * u), { top: Math.floor(.5 * (o - s)) + d[0], left: Math.floor(.5 * (e - a)) + d[3], width: a, height: s }) }, update: function () { var t = this; n.each(t.slides, function (e, n) { t.updateSlide(n) }) }, updateSlide: function (t, e) { var o = this, i = t && t.$content; i && (t.width || t.height) && (o.isAnimating = !1, n.fancybox.stop(i), n.fancybox.setTranslate(i, o.getFitPos(t)), t.pos === o.currPos && o.updateCursor()), t.$slide.trigger("refresh"), o.trigger("onUpdate", t) }, centerSlide: function (t, e) { var i, a, s = this; s.current && (i = Math.round(t.$slide.width()), a = t.pos - s.current.pos, n.fancybox.animate(t.$slide, { top: 0, left: a * i + a * t.opts.gutter, opacity: 1 }, e === o ? 0 : e, null, !1)) }, updateCursor: function (t, e) { var n, i = this, a = i.$refs.container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut"); i.current && !i.isClosing && (i.isZoomable() ? (a.addClass("fancybox-is-zoomable"), n = t !== o && e !== o ? t < i.current.width && e < i.current.height : i.isScaledDown(), n ? a.addClass("fancybox-can-zoomIn") : i.current.opts.touch ? a.addClass("fancybox-can-drag") : a.addClass("fancybox-can-zoomOut")) : i.current.opts.touch && a.addClass("fancybox-can-drag")) }, isZoomable: function () { var t, e = this, o = e.current; if (o && !e.isClosing) return !!("image" === o.type && o.isLoaded && !o.hasError && ("zoom" === o.opts.clickContent || n.isFunction(o.opts.clickContent) && "zoom" === o.opts.clickContent(o)) && (t = e.getFitPos(o), o.width > t.width || o.height > t.height)) }, isScaledDown: function () { var t = this, e = t.current, o = e.$content, i = !1; return o && (i = n.fancybox.getTranslate(o), i = i.width < e.width || i.height < e.height), i }, canPan: function () { var t = this, e = t.current, n = e.$content, o = !1; return n && (o = t.getFitPos(e), o = Math.abs(n.width() - o.width) > 1 || Math.abs(n.height() - o.height) > 1), o }, loadSlide: function (t) { var e, o, i, a = this; if (!t.isLoading && !t.isLoaded) { switch (t.isLoading = !0, a.trigger("beforeLoad", t), e = t.type, o = t.$slide, o.off("refresh").trigger("onReset").addClass("fancybox-slide--" + (e || "unknown")).addClass(t.opts.slideClass), e) { case "image": a.setImage(t); break; case "iframe": a.setIframe(t); break; case "html": a.setContent(t, t.src || t.content); break; case "inline": n(t.src).length ? a.setContent(t, n(t.src)) : a.setError(t); break; case "ajax": a.showLoading(t), i = n.ajax(n.extend({}, t.opts.ajax.settings, { url: t.src, success: function (e, n) { "success" === n && a.setContent(t, e) }, error: function (e, n) { e && "abort" !== n && a.setError(t) } })), o.one("onReset", function () { i.abort() }); break; case "video": a.setContent(t, '<video controls><source src="' + t.src + '" type="' + t.opts.videoFormat + "\">Your browser doesn't support HTML5 video</video>"); break; default: a.setError(t) }return !0 } }, setImage: function (e) { var o, i, a, s, r = this, c = e.opts.srcset || e.opts.image.srcset; if (c) { a = t.devicePixelRatio || 1, s = t.innerWidth * a, i = c.split(",").map(function (t) { var e = {}; return t.trim().split(/\s+/).forEach(function (t, n) { var o = parseInt(t.substring(0, t.length - 1), 10); return 0 === n ? e.url = t : void (o && (e.value = o, e.postfix = t[t.length - 1])) }), e }), i.sort(function (t, e) { return t.value - e.value }); for (var l = 0; l < i.length; l++) { var u = i[l]; if ("w" === u.postfix && u.value >= s || "x" === u.postfix && u.value >= a) { o = u; break } } !o && i.length && (o = i[i.length - 1]), o && (e.src = o.url, e.width && e.height && "w" == o.postfix && (e.height = e.width / e.height * o.value, e.width = o.value)) } e.$content = n('<div class="fancybox-image-wrap"></div>').addClass("fancybox-is-hidden").appendTo(e.$slide), e.opts.preload !== !1 && e.opts.width && e.opts.height && (e.opts.thumb || e.opts.$thumb) ? (e.width = e.opts.width, e.height = e.opts.height, e.$ghost = n("<img />").one("error", function () { n(this).remove(), e.$ghost = null, r.setBigImage(e) }).one("load", function () { r.afterLoad(e), r.setBigImage(e) }).addClass("fancybox-image").appendTo(e.$content).attr("src", e.opts.thumb || e.opts.$thumb.attr("src"))) : r.setBigImage(e) }, setBigImage: function (t) { var e = this, o = n("<img />"); t.$image = o.one("error", function () { e.setError(t) }).one("load", function () { clearTimeout(t.timouts), t.timouts = null, e.isClosing || (t.width = t.opts.width || this.naturalWidth, t.height = t.opts.height || this.naturalHeight, t.opts.image.srcset && o.attr("sizes", "100vw").attr("srcset", t.opts.image.srcset), e.hideLoading(t), t.$ghost ? t.timouts = setTimeout(function () { t.timouts = null, t.$ghost.hide() }, Math.min(300, Math.max(1e3, t.height / 1600))) : e.afterLoad(t)) }).addClass("fancybox-image").attr("src", t.src).appendTo(t.$content), (o[0].complete || "complete" == o[0].readyState) && o[0].naturalWidth && o[0].naturalHeight ? o.trigger("load") : o[0].error ? o.trigger("error") : t.timouts = setTimeout(function () { o[0].complete || t.hasError || e.showLoading(t) }, 100) }, setIframe: function (t) { var e, i = this, a = t.opts.iframe, s = t.$slide; t.$content = n('<div class="fancybox-content' + (a.preload ? " fancybox-is-hidden" : "") + '"></div>').css(a.css).appendTo(s), e = n(a.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(a.attr).appendTo(t.$content), a.preload ? (i.showLoading(t), e.on("load.fb error.fb", function (e) { this.isReady = 1, t.$slide.trigger("refresh"), i.afterLoad(t) }), s.on("refresh.fb", function () { var n, i, s, r = t.$content, c = a.css.width, l = a.css.height; if (1 === e[0].isReady) { try { i = e.contents(), s = i.find("body") } catch (t) { } s && s.length && (c === o && (n = e[0].contentWindow.document.documentElement.scrollWidth, c = Math.ceil(s.outerWidth(!0) + (r.width() - n)), c += r.outerWidth() - r.innerWidth()), l === o && (l = Math.ceil(s.outerHeight(!0)), l += r.outerHeight() - r.innerHeight()), c && r.width(c), l && r.height(l)), r.removeClass("fancybox-is-hidden") } })) : this.afterLoad(t), e.attr("src", t.src), t.opts.smallBtn === !0 && t.$content.prepend(i.translate(t, t.opts.btnTpl.smallBtn)), s.one("onReset", function () { try { n(this).find("iframe").hide().attr("src", "//about:blank") } catch (t) { } n(this).empty(), t.isLoaded = !1 }) }, setContent: function (t, e) { var o = this; o.isClosing || (o.hideLoading(t), t.$slide.empty(), l(e) && e.parent().length ? (e.parent(".fancybox-slide--inline").trigger("onReset"), t.$placeholder = n("<div></div>").hide().insertAfter(e), e.css("display", "inline-block")) : t.hasError || ("string" === n.type(e) && (e = n("<div>").append(n.trim(e)).contents(), 3 === e[0].nodeType && (e = n("<div>").html(e))), t.opts.filter && (e = n("<div>").html(e).find(t.opts.filter))), t.$slide.one("onReset", function () { n(this).find("video,audio").trigger("pause"), t.$placeholder && (t.$placeholder.after(e.hide()).remove(), t.$placeholder = null), t.$smallBtn && (t.$smallBtn.remove(), t.$smallBtn = null), t.hasError || (n(this).empty(), t.isLoaded = !1) }), t.$content = n(e).appendTo(t.$slide), this.afterLoad(t)) }, setError: function (t) { t.hasError = !0, t.$slide.removeClass("fancybox-slide--" + t.type), this.setContent(t, this.translate(t, t.opts.errorTpl)) }, showLoading: function (t) { var e = this; t = t || e.current, t && !t.$spinner && (t.$spinner = n(e.opts.spinnerTpl).appendTo(t.$slide)) }, hideLoading: function (t) { var e = this; t = t || e.current, t && t.$spinner && (t.$spinner.remove(), delete t.$spinner) }, afterLoad: function (t) { var e = this; e.isClosing || (t.isLoading = !1, t.isLoaded = !0, e.trigger("afterLoad", t), e.hideLoading(t), t.opts.smallBtn && !t.$smallBtn && (t.$smallBtn = n(e.translate(t, t.opts.btnTpl.smallBtn)).appendTo(t.$content.filter("div,form").first())), t.opts.protect && t.$content && !t.hasError && (t.$content.on("contextmenu.fb", function (t) { return 2 == t.button && t.preventDefault(), !0 }), "image" === t.type && n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)), e.revealContent(t)) }, revealContent: function (t) { var e, i, a, s, r, c = this, l = t.$slide, u = !1; return e = t.opts[c.firstRun ? "animationEffect" : "transitionEffect"], a = t.opts[c.firstRun ? "animationDuration" : "transitionDuration"], a = parseInt(t.forcedDuration === o ? a : t.forcedDuration, 10), !t.isMoved && t.pos === c.currPos && a || (e = !1), "zoom" !== e || t.pos === c.currPos && a && "image" === t.type && !t.hasError && (u = c.getThumbPos(t)) || (e = "fade"), "zoom" === e ? (r = c.getFitPos(t), r.scaleX = r.width / u.width, r.scaleY = r.height / u.height, delete r.width, delete r.height, s = t.opts.zoomOpacity, "auto" == s && (s = Math.abs(t.width / t.height - u.width / u.height) > .1), s && (u.opacity = .1, r.opacity = 1), n.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"), u), f(t.$content), void n.fancybox.animate(t.$content, r, a, function () { c.complete() })) : (c.updateSlide(t), e ? (n.fancybox.stop(l), i = "fancybox-animated fancybox-slide--" + (t.pos >= c.prevPos ? "next" : "previous") + " fancybox-fx-" + e, l.removeAttr("style").removeClass("fancybox-slide--current fancybox-slide--next fancybox-slide--previous").addClass(i), t.$content.removeClass("fancybox-is-hidden"), f(l), void n.fancybox.animate(l, "fancybox-slide--current", a, function (e) { l.removeClass(i).removeAttr("style"), t.pos === c.currPos && c.complete() }, !0)) : (f(l), t.$content.removeClass("fancybox-is-hidden"), void (t.pos === c.currPos && c.complete()))) }, getThumbPos: function (o) { var i, a = this, s = !1, r = function (e) { for (var o, i = e[0], a = i.getBoundingClientRect(), s = []; null !== i.parentElement;)"hidden" !== n(i.parentElement).css("overflow") && "auto" !== n(i.parentElement).css("overflow") || s.push(i.parentElement.getBoundingClientRect()), i = i.parentElement; return o = s.every(function (t) { var e = Math.min(a.right, t.right) - Math.max(a.left, t.left), n = Math.min(a.bottom, t.bottom) - Math.max(a.top, t.top); return e > 0 && n > 0 }), o && a.bottom > 0 && a.right > 0 && a.left < n(t).width() && a.top < n(t).height() }, c = o.opts.$thumb, l = c ? c.offset() : 0; return l && c[0].ownerDocument === e && r(c) && (i = a.$refs.stage.offset(), s = { top: l.top - i.top + parseFloat(c.css("border-top-width") || 0), left: l.left - i.left + parseFloat(c.css("border-left-width") || 0), width: c.width(), height: c.height(), scaleX: 1, scaleY: 1 }), s }, complete: function () { var t = this, o = t.current, i = {}; o.isMoved || !o.isLoaded || o.isComplete || (o.isComplete = !0, o.$slide.siblings().trigger("onReset"), t.preload("inline"), f(o.$slide), o.$slide.addClass("fancybox-slide--complete"), n.each(t.slides, function (e, o) { o.pos >= t.currPos - 1 && o.pos <= t.currPos + 1 ? i[o.pos] = o : o && (n.fancybox.stop(o.$slide), o.$slide.off().remove()) }), t.slides = i, t.updateCursor(), t.trigger("afterShow"), o.$slide.find("video,audio").first().trigger("play"), (n(e.activeElement).is("[disabled]") || o.opts.autoFocus && "image" != o.type && "iframe" !== o.type) && t.focus()) }, preload: function (t) { var e = this, n = e.slides[e.currPos + 1], o = e.slides[e.currPos - 1]; n && n.type === t && e.loadSlide(n), o && o.type === t && e.loadSlide(o) }, focus: function () { var t, e = this.current; this.isClosing || (e && e.isComplete && (t = e.$slide.find("input[autofocus]:enabled:visible:first"), t.length || (t = e.$slide.find("button,:input,[tabindex],a").filter(":enabled:visible:first"))), t = t && t.length ? t : this.$refs.container, t.focus()) }, activate: function () { var t = this; n(".fancybox-container").each(function () { var e = n(this).data("FancyBox"); e && e.id !== t.id && !e.isClosing && (e.trigger("onDeactivate"), e.removeEvents(), e.isVisible = !1) }), t.isVisible = !0, (t.current || t.isIdle) && (t.update(), t.updateControls()), t.trigger("onActivate"), t.addEvents() }, close: function (t, e) { var o, i, a, s, r, c, l = this, p = l.current, h = function () { l.cleanUp(t) }; return !l.isClosing && (l.isClosing = !0, l.trigger("beforeClose", t) === !1 ? (l.isClosing = !1, u(function () { l.update() }), !1) : (l.removeEvents(), p.timouts && clearTimeout(p.timouts), a = p.$content, o = p.opts.animationEffect, i = n.isNumeric(e) ? e : o ? p.opts.animationDuration : 0, p.$slide.off(d).removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"), p.$slide.siblings().trigger("onReset").remove(), i && l.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing"), l.hideLoading(p), l.hideControls(), l.updateCursor(), "zoom" !== o || t !== !0 && a && i && "image" === p.type && !p.hasError && (c = l.getThumbPos(p)) || (o = "fade"), "zoom" === o ? (n.fancybox.stop(a), r = n.fancybox.getTranslate(a), r.width = r.width * r.scaleX, r.height = r.height * r.scaleY, s = p.opts.zoomOpacity, "auto" == s && (s = Math.abs(p.width / p.height - c.width / c.height) > .1), s && (c.opacity = 0), r.scaleX = r.width / c.width, r.scaleY = r.height / c.height, r.width = c.width, r.height = c.height, n.fancybox.setTranslate(p.$content, r), f(p.$content), n.fancybox.animate(p.$content, c, i, h), !0) : (o && i ? t === !0 ? setTimeout(h, i) : n.fancybox.animate(p.$slide.removeClass("fancybox-slide--current"), "fancybox-animated fancybox-slide--previous fancybox-fx-" + o, i, h) : h(), !0))) }, cleanUp: function (t) { var o, i, a = this, r = n("body"); a.current.$slide.trigger("onReset"), a.$refs.container.empty().remove(), a.trigger("afterClose", t), a.$lastFocus && a.current.opts.backFocus && a.$lastFocus.focus(), a.current = null, o = n.fancybox.getInstance(), o ? o.activate() : (s.scrollTop(a.scrollTop).scrollLeft(a.scrollLeft), r.removeClass("fancybox-active compensate-for-scrollbar"), r.hasClass("fancybox-iosfix") && (i = parseInt(e.body.style.top, 10), r.removeClass("fancybox-iosfix").css("top", "").scrollTop(i * -1)), n("#fancybox-style-noscroll").remove()) }, trigger: function (t, e) { var o, i = Array.prototype.slice.call(arguments, 1), a = this, s = e && e.opts ? e : a.current; return s ? i.unshift(s) : s = a, i.unshift(a), n.isFunction(s.opts[t]) && (o = s.opts[t].apply(s, i)), o === !1 ? o : void ("afterClose" !== t && a.$refs ? a.$refs.container.trigger(t + ".fb", i) : r.trigger(t + ".fb", i)) }, updateControls: function (t) { var e = this, n = e.current, o = n.index, i = n.opts.caption, a = e.$refs.container, s = e.$refs.caption; n.$slide.trigger("refresh"), e.$caption = i && i.length ? s.html(i) : null, e.isHiddenControls || e.isIdle || e.showControls(), a.find("[data-fancybox-count]").html(e.group.length), a.find("[data-fancybox-index]").html(o + 1), a.find("[data-fancybox-prev]").prop("disabled", !n.opts.loop && o <= 0), a.find("[data-fancybox-next]").prop("disabled", !n.opts.loop && o >= e.group.length - 1), "image" === n.type ? a.find("[data-fancybox-download]").attr("href", n.opts.image.src || n.src).show() : a.find("[data-fancybox-download],[data-fancybox-zoom]").hide() }, hideControls: function () { this.isHiddenControls = !0, this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav") }, showControls: function () { var t = this, e = t.current ? t.current.opts : t.opts, n = t.$refs.container; t.isHiddenControls = !1, t.idleSecondsCounter = 0, n.toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons)).toggleClass("fancybox-show-infobar", !!(e.infobar && t.group.length > 1)).toggleClass("fancybox-show-nav", !!(e.arrows && t.group.length > 1)).toggleClass("fancybox-is-modal", !!e.modal), t.$caption ? n.addClass("fancybox-show-caption ") : n.removeClass("fancybox-show-caption") }, toggleControls: function () { this.isHiddenControls ? this.showControls() : this.hideControls() } }), n.fancybox = { version: "3.2.10", defaults: a, getInstance: function (t) { var e = n('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"), o = Array.prototype.slice.call(arguments, 1); return e instanceof p && ("string" === n.type(t) ? e[t].apply(e, o) : "function" === n.type(t) && t.apply(e, o), e) }, open: function (t, e, n) { return new p(t, e, n) }, close: function (t) { var e = this.getInstance(); e && (e.close(), t === !0 && this.close()) }, destroy: function () { this.close(!0), r.off("click.fb-start") }, isMobile: e.createTouch !== o && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), use3d: function () { var n = e.createElement("div"); return t.getComputedStyle && t.getComputedStyle(n).getPropertyValue("transform") && !(e.documentMode && e.documentMode < 11) }(), getTranslate: function (t) { var e; if (!t || !t.length) return !1; if (e = t.eq(0).css("transform"), e && e.indexOf("matrix") !== -1 ? (e = e.split("(")[1], e = e.split(")")[0], e = e.split(",")) : e = [], e.length) e = e.length > 10 ? [e[13], e[12], e[0], e[5]] : [e[5], e[4], e[0], e[3]], e = e.map(parseFloat); else { e = [0, 0, 1, 1]; var n = /\.*translate\((.*)px,(.*)px\)/i, o = n.exec(t.eq(0).attr("style")); o && (e[0] = parseFloat(o[2]), e[1] = parseFloat(o[1])) } return { top: e[0], left: e[1], scaleX: e[2], scaleY: e[3], opacity: parseFloat(t.css("opacity")), width: t.width(), height: t.height() } }, setTranslate: function (t, e) { var n = "", i = {}; if (t && e) return e.left === o && e.top === o || (n = (e.left === o ? t.position().left : e.left) + "px, " + (e.top === o ? t.position().top : e.top) + "px", n = this.use3d ? "translate3d(" + n + ", 0px)" : "translate(" + n + ")"), e.scaleX !== o && e.scaleY !== o && (n = (n.length ? n + " " : "") + "scale(" + e.scaleX + ", " + e.scaleY + ")"), n.length && (i.transform = n), e.opacity !== o && (i.opacity = e.opacity), e.width !== o && (i.width = e.width), e.height !== o && (i.height = e.height), t.css(i) }, animate: function (t, e, i, a, s) { n.isFunction(i) && (a = i, i = null), n.isPlainObject(e) || t.removeAttr("style"), t.on(d, function (i) { (!i || !i.originalEvent || t.is(i.originalEvent.target) && "z-index" != i.originalEvent.propertyName) && (n.fancybox.stop(t), n.isPlainObject(e) ? (e.scaleX !== o && e.scaleY !== o && (t.css("transition-duration", ""), e.width = Math.round(t.width() * e.scaleX), e.height = Math.round(t.height() * e.scaleY), e.scaleX = 1, e.scaleY = 1, n.fancybox.setTranslate(t, e)), s === !1 && t.removeAttr("style")) : s !== !0 && t.removeClass(e), n.isFunction(a) && a(i)) }), n.isNumeric(i) && t.css("transition-duration", i + "ms"), n.isPlainObject(e) ? n.fancybox.setTranslate(t, e) : t.addClass(e), e.scaleX && t.hasClass("fancybox-image-wrap") && t.parent().addClass("fancybox-is-scaling"), t.data("timer", setTimeout(function () { t.trigger("transitionend") }, i + 16)) }, stop: function (t) { clearTimeout(t.data("timer")), t.off("transitionend").css("transition-duration", ""), t.hasClass("fancybox-image-wrap") && t.parent().removeClass("fancybox-is-scaling") } }, n.fn.fancybox = function (t) { var e; return t = t || {}, e = t.selector || !1, e ? n("body").off("click.fb-start", e).on("click.fb-start", e, { options: t }, i) : this.off("click.fb-start").on("click.fb-start", { items: this, options: t }, i), this }, r.on("click.fb-start", "[data-fancybox]", i) } }(window, document, window.jQuery || jQuery), function (t) {
	"use strict"; var e = function (e, n, o) { if (e) return o = o || "", "object" === t.type(o) && (o = t.param(o, !0)), t.each(n, function (t, n) { e = e.replace("$" + t, n || "") }), o.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + o), e }, n = {
		youtube: {
			matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i, params: { autoplay: 1, autohide: 1, fs: 1, rel: 0, hd: 1, wmode: "transparent", enablejsapi: 1, html5: 1 }, paramPlace: 8, type: "iframe", url: "//www.youtube.com/embed/$4", thumb: "//img.youtube.com/vi/$4/hqdefault.jpg"
		}, vimeo: { matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/, params: { autoplay: 1, hd: 1, show_title: 1, show_byline: 1, show_portrait: 0, fullscreen: 1, api: 1 }, paramPlace: 3, type: "iframe", url: "//player.vimeo.com/video/$2" }, metacafe: { matcher: /metacafe.com\/watch\/(\d+)\/(.*)?/, type: "iframe", url: "//www.metacafe.com/embed/$1/?ap=1" }, dailymotion: { matcher: /dailymotion.com\/video\/(.*)\/?(.*)/, params: { additionalInfos: 0, autoStart: 1 }, type: "iframe", url: "//www.dailymotion.com/embed/video/$1" }, vine: { matcher: /vine.co\/v\/([a-zA-Z0-9\?\=\-]+)/, type: "iframe", url: "//vine.co/v/$1/embed/simple" }, instagram: { matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i, type: "image", url: "//$1/p/$2/media/?size=l" }, gmap_place: { matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i, type: "iframe", url: function (t) { return "//maps.google." + t[2] + "/?ll=" + (t[9] ? t[9] + "&z=" + Math.floor(t[10]) + (t[12] ? t[12].replace(/^\//, "&") : "") : t[12]) + "&output=" + (t[12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed") } }, gmap_search: { matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i, type: "iframe", url: function (t) { return "//maps.google." + t[2] + "/maps?q=" + t[5].replace("query=", "q=").replace("api=1", "") + "&output=embed" } }
	}; t(document).on("objectNeedsType.fb", function (o, i, a) { var s, r, c, l, u, d, f, p = a.src || "", h = !1; s = t.extend(!0, {}, n, a.opts.media), t.each(s, function (n, o) { if (c = p.match(o.matcher)) { if (h = o.type, d = {}, o.paramPlace && c[o.paramPlace]) { u = c[o.paramPlace], "?" == u[0] && (u = u.substring(1)), u = u.split("&"); for (var i = 0; i < u.length; ++i) { var s = u[i].split("=", 2); 2 == s.length && (d[s[0]] = decodeURIComponent(s[1].replace(/\+/g, " "))) } } return l = t.extend(!0, {}, o.params, a.opts[n], d), p = "function" === t.type(o.url) ? o.url.call(this, c, l, a) : e(o.url, c, l), r = "function" === t.type(o.thumb) ? o.thumb.call(this, c, l, a) : e(o.thumb, c), "vimeo" === n && (p = p.replace("&%23", "#")), !1 } }), h ? (a.src = p, a.type = h, a.opts.thumb || a.opts.$thumb && a.opts.$thumb.length || (a.opts.thumb = r), "iframe" === h && (t.extend(!0, a.opts, { iframe: { preload: !1, attr: { scrolling: "no" } } }), a.contentProvider = f, a.opts.slideClass += " fancybox-slide--" + ("gmap_place" == f || "gmap_search" == f ? "map" : "video"))) : p && (a.type = a.opts.defaultType) })
}(window.jQuery || jQuery), function (t, e, n) { "use strict"; var o = function () { return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function (e) { return t.setTimeout(e, 1e3 / 60) } }(), i = function () { return t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || function (e) { t.clearTimeout(e) } }(), a = function (e) { var n = []; e = e.originalEvent || e || t.e, e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e]; for (var o in e) e[o].pageX ? n.push({ x: e[o].pageX, y: e[o].pageY }) : e[o].clientX && n.push({ x: e[o].clientX, y: e[o].clientY }); return n }, s = function (t, e, n) { return e && t ? "x" === n ? t.x - e.x : "y" === n ? t.y - e.y : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)) : 0 }, r = function (t) { if (t.is('a,area,button,[role="button"],input,label,select,summary,textarea') || n.isFunction(t.get(0).onclick) || t.data("selectable")) return !0; for (var e = 0, o = t[0].attributes, i = o.length; e < i; e++)if ("data-fancybox-" === o[e].nodeName.substr(0, 14)) return !0; return !1 }, c = function (e) { var n = t.getComputedStyle(e)["overflow-y"], o = t.getComputedStyle(e)["overflow-x"], i = ("scroll" === n || "auto" === n) && e.scrollHeight > e.clientHeight, a = ("scroll" === o || "auto" === o) && e.scrollWidth > e.clientWidth; return i || a }, l = function (t) { for (var e = !1; ;) { if (e = c(t.get(0))) break; if (t = t.parent(), !t.length || t.hasClass("fancybox-stage") || t.is("body")) break } return e }, u = function (t) { var e = this; e.instance = t, e.$bg = t.$refs.bg, e.$stage = t.$refs.stage, e.$container = t.$refs.container, e.destroy(), e.$container.on("touchstart.fb.touch mousedown.fb.touch", n.proxy(e, "ontouchstart")) }; u.prototype.destroy = function () { this.$container.off(".fb.touch") }, u.prototype.ontouchstart = function (o) { var i = this, c = n(o.target), u = i.instance, d = u.current, f = d.$content, p = "touchstart" == o.type; if (p && i.$container.off("mousedown.fb.touch"), (!o.originalEvent || 2 != o.originalEvent.button) && c.length && !r(c) && !r(c.parent()) && (c.is("img") || !(o.originalEvent.clientX > c[0].clientWidth + c.offset().left))) { if (!d || i.instance.isAnimating || i.instance.isClosing) return o.stopPropagation(), void o.preventDefault(); if (i.realPoints = i.startPoints = a(o), i.startPoints) { if (o.stopPropagation(), i.startEvent = o, i.canTap = !0, i.$target = c, i.$content = f, i.opts = d.opts.touch, i.isPanning = !1, i.isSwiping = !1, i.isZooming = !1, i.isScrolling = !1, i.sliderStartPos = i.sliderLastPos || { top: 0, left: 0 }, i.contentStartPos = n.fancybox.getTranslate(i.$content), i.contentLastPos = null, i.startTime = (new Date).getTime(), i.distanceX = i.distanceY = i.distance = 0, i.canvasWidth = Math.round(d.$slide[0].clientWidth), i.canvasHeight = Math.round(d.$slide[0].clientHeight), n(e).off(".fb.touch").on(p ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", n.proxy(i, "ontouchend")).on(p ? "touchmove.fb.touch" : "mousemove.fb.touch", n.proxy(i, "ontouchmove")), n.fancybox.isMobile && e.addEventListener("scroll", i.onscroll, !0), !i.opts && !u.canPan() || !c.is(i.$stage) && !i.$stage.find(c).length) return void (c.is("img") && o.preventDefault()); n.fancybox.isMobile && (l(c) || l(c.parent())) || o.preventDefault(), 1 === i.startPoints.length && ("image" === d.type && (i.contentStartPos.width > i.canvasWidth + 1 || i.contentStartPos.height > i.canvasHeight + 1) ? (n.fancybox.stop(i.$content), i.$content.css("transition-duration", ""), i.isPanning = !0) : i.isSwiping = !0, i.$container.addClass("fancybox-controls--isGrabbing")), 2 !== i.startPoints.length || u.isAnimating || d.hasError || "image" !== d.type || !d.isLoaded && !d.$ghost || (i.canTap = !1, i.isSwiping = !1, i.isPanning = !1, i.isZooming = !0, n.fancybox.stop(i.$content), i.$content.css("transition-duration", ""), i.centerPointStartX = .5 * (i.startPoints[0].x + i.startPoints[1].x) - n(t).scrollLeft(), i.centerPointStartY = .5 * (i.startPoints[0].y + i.startPoints[1].y) - n(t).scrollTop(), i.percentageOfImageAtPinchPointX = (i.centerPointStartX - i.contentStartPos.left) / i.contentStartPos.width, i.percentageOfImageAtPinchPointY = (i.centerPointStartY - i.contentStartPos.top) / i.contentStartPos.height, i.startDistanceBetweenFingers = s(i.startPoints[0], i.startPoints[1])) } } }, u.prototype.onscroll = function (t) { self.isScrolling = !0 }, u.prototype.ontouchmove = function (t) { var e = this, o = n(t.target); return e.isScrolling || !o.is(e.$stage) && !e.$stage.find(o).length ? void (e.canTap = !1) : (e.newPoints = a(t), void ((e.opts || e.instance.canPan()) && e.newPoints && e.newPoints.length && (e.isSwiping && e.isSwiping === !0 || t.preventDefault(), e.distanceX = s(e.newPoints[0], e.startPoints[0], "x"), e.distanceY = s(e.newPoints[0], e.startPoints[0], "y"), e.distance = s(e.newPoints[0], e.startPoints[0]), e.distance > 0 && (e.isSwiping ? e.onSwipe(t) : e.isPanning ? e.onPan() : e.isZooming && e.onZoom())))) }, u.prototype.onSwipe = function (e) { var a, s = this, r = s.isSwiping, c = s.sliderStartPos.left || 0; if (r !== !0) "x" == r && (s.distanceX > 0 && (s.instance.group.length < 2 || 0 === s.instance.current.index && !s.instance.current.opts.loop) ? c += Math.pow(s.distanceX, .8) : s.distanceX < 0 && (s.instance.group.length < 2 || s.instance.current.index === s.instance.group.length - 1 && !s.instance.current.opts.loop) ? c -= Math.pow(-s.distanceX, .8) : c += s.distanceX), s.sliderLastPos = { top: "x" == r ? 0 : s.sliderStartPos.top + s.distanceY, left: c }, s.requestId && (i(s.requestId), s.requestId = null), s.requestId = o(function () { s.sliderLastPos && (n.each(s.instance.slides, function (t, e) { var o = e.pos - s.instance.currPos; n.fancybox.setTranslate(e.$slide, { top: s.sliderLastPos.top, left: s.sliderLastPos.left + o * s.canvasWidth + o * e.opts.gutter }) }), s.$container.addClass("fancybox-is-sliding")) }); else if (Math.abs(s.distance) > 10) { if (s.canTap = !1, s.instance.group.length < 2 && s.opts.vertical ? s.isSwiping = "y" : s.instance.isDragging || s.opts.vertical === !1 || "auto" === s.opts.vertical && n(t).width() > 800 ? s.isSwiping = "x" : (a = Math.abs(180 * Math.atan2(s.distanceY, s.distanceX) / Math.PI), s.isSwiping = a > 45 && a < 135 ? "y" : "x"), s.canTap = !1, "y" === s.isSwiping && n.fancybox.isMobile && (l(s.$target) || l(s.$target.parent()))) return void (s.isScrolling = !0); s.instance.isDragging = s.isSwiping, s.startPoints = s.newPoints, n.each(s.instance.slides, function (t, e) { n.fancybox.stop(e.$slide), e.$slide.css("transition-duration", ""), e.inTransition = !1, e.pos === s.instance.current.pos && (s.sliderStartPos.left = n.fancybox.getTranslate(e.$slide).left) }), s.instance.SlideShow && s.instance.SlideShow.isActive && s.instance.SlideShow.stop() } }, u.prototype.onPan = function () { var t = this; return s(t.newPoints[0], t.realPoints[0]) < (n.fancybox.isMobile ? 10 : 5) ? void (t.startPoints = t.newPoints) : (t.canTap = !1, t.contentLastPos = t.limitMovement(), t.requestId && (i(t.requestId), t.requestId = null), void (t.requestId = o(function () { n.fancybox.setTranslate(t.$content, t.contentLastPos) }))) }, u.prototype.limitMovement = function () { var t, e, n, o, i, a, s = this, r = s.canvasWidth, c = s.canvasHeight, l = s.distanceX, u = s.distanceY, d = s.contentStartPos, f = d.left, p = d.top, h = d.width, g = d.height; return i = h > r ? f + l : f, a = p + u, t = Math.max(0, .5 * r - .5 * h), e = Math.max(0, .5 * c - .5 * g), n = Math.min(r - h, .5 * r - .5 * h), o = Math.min(c - g, .5 * c - .5 * g), h > r && (l > 0 && i > t && (i = t - 1 + Math.pow(-t + f + l, .8) || 0), l < 0 && i < n && (i = n + 1 - Math.pow(n - f - l, .8) || 0)), g > c && (u > 0 && a > e && (a = e - 1 + Math.pow(-e + p + u, .8) || 0), u < 0 && a < o && (a = o + 1 - Math.pow(o - p - u, .8) || 0)), { top: a, left: i, scaleX: d.scaleX, scaleY: d.scaleY } }, u.prototype.limitPosition = function (t, e, n, o) { var i = this, a = i.canvasWidth, s = i.canvasHeight; return n > a ? (t = t > 0 ? 0 : t, t = t < a - n ? a - n : t) : t = Math.max(0, a / 2 - n / 2), o > s ? (e = e > 0 ? 0 : e, e = e < s - o ? s - o : e) : e = Math.max(0, s / 2 - o / 2), { top: e, left: t } }, u.prototype.onZoom = function () { var e = this, a = e.contentStartPos.width, r = e.contentStartPos.height, c = e.contentStartPos.left, l = e.contentStartPos.top, u = s(e.newPoints[0], e.newPoints[1]), d = u / e.startDistanceBetweenFingers, f = Math.floor(a * d), p = Math.floor(r * d), h = (a - f) * e.percentageOfImageAtPinchPointX, g = (r - p) * e.percentageOfImageAtPinchPointY, b = (e.newPoints[0].x + e.newPoints[1].x) / 2 - n(t).scrollLeft(), m = (e.newPoints[0].y + e.newPoints[1].y) / 2 - n(t).scrollTop(), y = b - e.centerPointStartX, v = m - e.centerPointStartY, x = c + (h + y), w = l + (g + v), $ = { top: w, left: x, scaleX: e.contentStartPos.scaleX * d, scaleY: e.contentStartPos.scaleY * d }; e.canTap = !1, e.newWidth = f, e.newHeight = p, e.contentLastPos = $, e.requestId && (i(e.requestId), e.requestId = null), e.requestId = o(function () { n.fancybox.setTranslate(e.$content, e.contentLastPos) }) }, u.prototype.ontouchend = function (t) { var o = this, s = Math.max((new Date).getTime() - o.startTime, 1), r = o.isSwiping, c = o.isPanning, l = o.isZooming, u = o.isScrolling; return o.endPoints = a(t), o.$container.removeClass("fancybox-controls--isGrabbing"), n(e).off(".fb.touch"), e.removeEventListener("scroll", o.onscroll, !0), o.requestId && (i(o.requestId), o.requestId = null), o.isSwiping = !1, o.isPanning = !1, o.isZooming = !1, o.isScrolling = !1, o.instance.isDragging = !1, o.canTap ? o.onTap(t) : (o.speed = 366, o.velocityX = o.distanceX / s * .5, o.velocityY = o.distanceY / s * .5, o.speedX = Math.max(.5 * o.speed, Math.min(1.5 * o.speed, 1 / Math.abs(o.velocityX) * o.speed)), void (c ? o.endPanning() : l ? o.endZooming() : o.endSwiping(r, u))) }, u.prototype.endSwiping = function (t, e) { var o = this, i = !1, a = o.instance.group.length; o.sliderLastPos = null, "y" == t && !e && Math.abs(o.distanceY) > 50 ? (n.fancybox.animate(o.instance.current.$slide, { top: o.sliderStartPos.top + o.distanceY + 150 * o.velocityY, opacity: 0 }, 150), i = o.instance.close(!0, 300)) : "x" == t && o.distanceX > 50 && a > 1 ? i = o.instance.previous(o.speedX) : "x" == t && o.distanceX < -50 && a > 1 && (i = o.instance.next(o.speedX)), i !== !1 || "x" != t && "y" != t || (e || a < 2 ? o.instance.centerSlide(o.instance.current, 150) : o.instance.jumpTo(o.instance.current.index)), o.$container.removeClass("fancybox-is-sliding") }, u.prototype.endPanning = function () { var t, e, o, i = this; i.contentLastPos && (i.opts.momentum === !1 ? (t = i.contentLastPos.left, e = i.contentLastPos.top) : (t = i.contentLastPos.left + i.velocityX * i.speed, e = i.contentLastPos.top + i.velocityY * i.speed), o = i.limitPosition(t, e, i.contentStartPos.width, i.contentStartPos.height), o.width = i.contentStartPos.width, o.height = i.contentStartPos.height, n.fancybox.animate(i.$content, o, 330)) }, u.prototype.endZooming = function () { var t, e, o, i, a = this, s = a.instance.current, r = a.newWidth, c = a.newHeight; a.contentLastPos && (t = a.contentLastPos.left, e = a.contentLastPos.top, i = { top: e, left: t, width: r, height: c, scaleX: 1, scaleY: 1 }, n.fancybox.setTranslate(a.$content, i), r < a.canvasWidth && c < a.canvasHeight ? a.instance.scaleToFit(150) : r > s.width || c > s.height ? a.instance.scaleToActual(a.centerPointStartX, a.centerPointStartY, 150) : (o = a.limitPosition(t, e, r, c), n.fancybox.setTranslate(a.content, n.fancybox.getTranslate(a.$content)), n.fancybox.animate(a.$content, o, 150))) }, u.prototype.onTap = function (t) { var e, o = this, i = n(t.target), s = o.instance, r = s.current, c = t && a(t) || o.startPoints, l = c[0] ? c[0].x - o.$stage.offset().left : 0, u = c[0] ? c[0].y - o.$stage.offset().top : 0, d = function (e) { var i = r.opts[e]; if (n.isFunction(i) && (i = i.apply(s, [r, t])), i) switch (i) { case "close": s.close(o.startEvent); break; case "toggleControls": s.toggleControls(!0); break; case "next": s.next(); break; case "nextOrClose": s.group.length > 1 ? s.next() : s.close(o.startEvent); break; case "zoom": "image" == r.type && (r.isLoaded || r.$ghost) && (s.canPan() ? s.scaleToFit() : s.isScaledDown() ? s.scaleToActual(l, u) : s.group.length < 2 && s.close(o.startEvent)) } }; if ((!t.originalEvent || 2 != t.originalEvent.button) && (i.is("img") || !(l > i[0].clientWidth + i.offset().left))) { if (i.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) e = "Outside"; else if (i.is(".fancybox-slide")) e = "Slide"; else { if (!s.current.$content || !s.current.$content.find(i).addBack().filter(i).length) return; e = "Content" } if (o.tapped) { if (clearTimeout(o.tapped), o.tapped = null, Math.abs(l - o.tapX) > 50 || Math.abs(u - o.tapY) > 50) return this; d("dblclick" + e) } else o.tapX = l, o.tapY = u, r.opts["dblclick" + e] && r.opts["dblclick" + e] !== r.opts["click" + e] ? o.tapped = setTimeout(function () { o.tapped = null, d("click" + e) }, 500) : d("click" + e); return this } }, n(e).on("onActivate.fb", function (t, e) { e && !e.Guestures && (e.Guestures = new u(e)) }) }(window, document, window.jQuery || jQuery), function (t, e) { "use strict"; e.extend(!0, e.fancybox.defaults, { btnTpl: { slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg viewBox="0 0 40 40"><path d="M13,12 L27,20 L13,27 Z" /><path d="M15,10 v19 M23,10 v19" /></svg></button>' }, slideShow: { autoStart: !1, speed: 3e3 } }); var n = function (t) { this.instance = t, this.init() }; e.extend(n.prototype, { timer: null, isActive: !1, $button: null, init: function () { var t = this; t.$button = t.instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function () { t.toggle() }), (t.instance.group.length < 2 || !t.instance.group[t.instance.currIndex].opts.slideShow) && t.$button.hide() }, set: function (t) { var e = this; e.instance && e.instance.current && (t === !0 || e.instance.current.opts.loop || e.instance.currIndex < e.instance.group.length - 1) ? e.timer = setTimeout(function () { e.isActive && e.instance.jumpTo((e.instance.currIndex + 1) % e.instance.group.length) }, e.instance.current.opts.slideShow.speed) : (e.stop(), e.instance.idleSecondsCounter = 0, e.instance.showControls()) }, clear: function () { var t = this; clearTimeout(t.timer), t.timer = null }, start: function () { var t = this, e = t.instance.current; e && (t.isActive = !0, t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"), t.set(!0)) }, stop: function () { var t = this, e = t.instance.current; t.clear(), t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"), t.isActive = !1 }, toggle: function () { var t = this; t.isActive ? t.stop() : t.start() } }), e(t).on({ "onInit.fb": function (t, e) { e && !e.SlideShow && (e.SlideShow = new n(e)) }, "beforeShow.fb": function (t, e, n, o) { var i = e && e.SlideShow; o ? i && n.opts.slideShow.autoStart && i.start() : i && i.isActive && i.clear() }, "afterShow.fb": function (t, e, n) { var o = e && e.SlideShow; o && o.isActive && o.set() }, "afterKeydown.fb": function (n, o, i, a, s) { var r = o && o.SlideShow; !r || !i.opts.slideShow || 80 !== s && 32 !== s || e(t.activeElement).is("button,a,input") || (a.preventDefault(), r.toggle()) }, "beforeClose.fb onDeactivate.fb": function (t, e) { var n = e && e.SlideShow; n && n.stop() } }), e(t).on("visibilitychange", function () { var n = e.fancybox.getInstance(), o = n && n.SlideShow; o && o.isActive && (t.hidden ? o.clear() : o.set()) }) }(document, window.jQuery || jQuery), function (t, e) { "use strict"; var n = function () { var e, n, o, i = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]], a = {}; for (n = 0; n < i.length; n++)if (e = i[n], e && e[1] in t) { for (o = 0; o < e.length; o++)a[i[0][o]] = e[o]; return a } return !1 }(); if (!n) return void (e && e.fancybox && (e.fancybox.defaults.btnTpl.fullScreen = !1)); var o = { request: function (e) { e = e || t.documentElement, e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT) }, exit: function () { t[n.exitFullscreen]() }, toggle: function (e) { e = e || t.documentElement, this.isFullscreen() ? this.exit() : this.request(e) }, isFullscreen: function () { return Boolean(t[n.fullscreenElement]) }, enabled: function () { return Boolean(t[n.fullscreenEnabled]) } }; e.extend(!0, e.fancybox.defaults, { btnTpl: { fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"><svg viewBox="0 0 40 40"><path d="M9,12 h22 v16 h-22 v-16 v16 h22 v-16 Z" /></svg></button>' }, fullScreen: { autoStart: !1 } }), e(t).on({ "onInit.fb": function (t, e) { var n; e && e.group[e.currIndex].opts.fullScreen ? (n = e.$refs.container, n.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function (t) { t.stopPropagation(), t.preventDefault(), o.toggle(n[0]) }), e.opts.fullScreen && e.opts.fullScreen.autoStart === !0 && o.request(n[0]), e.FullScreen = o) : e && e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide() }, "afterKeydown.fb": function (t, e, n, o, i) { e && e.FullScreen && 70 === i && (o.preventDefault(), e.FullScreen.toggle(e.$refs.container[0])) }, "beforeClose.fb": function (t) { t && t.FullScreen && o.exit() } }), e(t).on(n.fullscreenchange, function () { var t = o.isFullscreen(), n = e.fancybox.getInstance(); n && (n.current && "image" === n.current.type && n.isAnimating && (n.current.$content.css("transition", "none"), n.isAnimating = !1, n.update(!0, !0, 0)), n.trigger("onFullscreenChange", t), n.$refs.container.toggleClass("fancybox-is-fullscreen", t)) }) }(document, window.jQuery || jQuery), function (t, e) { "use strict"; e.fancybox.defaults = e.extend(!0, { btnTpl: { thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg viewBox="0 0 120 120"><path d="M30,30 h14 v14 h-14 Z M50,30 h14 v14 h-14 Z M70,30 h14 v14 h-14 Z M30,50 h14 v14 h-14 Z M50,50 h14 v14 h-14 Z M70,50 h14 v14 h-14 Z M30,70 h14 v14 h-14 Z M50,70 h14 v14 h-14 Z M70,70 h14 v14 h-14 Z" /></svg></button>' }, thumbs: { autoStart: !1, hideOnClose: !0, parentEl: ".fancybox-container", axis: "y" } }, e.fancybox.defaults); var n = function (t) { this.init(t) }; e.extend(n.prototype, { $button: null, $grid: null, $list: null, isVisible: !1, isActive: !1, init: function (t) { var e = this; e.instance = t, t.Thumbs = e; var n = t.group[0], o = t.group[1]; e.opts = t.group[t.currIndex].opts.thumbs, e.$button = t.$refs.toolbar.find("[data-fancybox-thumbs]"), e.opts && n && o && ("image" == n.type || n.opts.thumb || n.opts.$thumb) && ("image" == o.type || o.opts.thumb || o.opts.$thumb) ? (e.$button.show().on("click", function () { e.toggle() }), e.isActive = !0) : e.$button.hide() }, create: function () { var t, n, o = this, i = o.instance, a = o.opts.parentEl; o.$grid = e('<div class="fancybox-thumbs fancybox-thumbs-' + o.opts.axis + '"></div>').appendTo(i.$refs.container.find(a).addBack().filter(a)), t = "<ul>", e.each(i.group, function (e, o) { n = o.opts.thumb || (o.opts.$thumb ? o.opts.$thumb.attr("src") : null), n || "image" !== o.type || (n = o.src), n && n.length && (t += '<li data-index="' + e + '"  tabindex="0" class="fancybox-thumbs-loading"><img data-src="' + n + '" /></li>') }), t += "</ul>", o.$list = e(t).appendTo(o.$grid).on("click", "li", function () { i.jumpTo(e(this).data("index")) }), o.$list.find("img").hide().one("load", function () { var t, n, o, i, a = e(this).parent().removeClass("fancybox-thumbs-loading"), s = a.outerWidth(), r = a.outerHeight(); t = this.naturalWidth || this.width, n = this.naturalHeight || this.height, o = t / s, i = n / r, o >= 1 && i >= 1 && (o > i ? (t /= i, n = r) : (t = s, n /= o)), e(this).css({ width: Math.floor(t), height: Math.floor(n), "margin-top": n > r ? Math.floor(.3 * r - .3 * n) : Math.floor(.5 * r - .5 * n), "margin-left": Math.floor(.5 * s - .5 * t) }).show() }).each(function () { this.src = e(this).data("src") }), "x" === o.opts.axis && o.$list.width(parseInt(o.$grid.css("padding-right")) + i.group.length * o.$list.children().eq(0).outerWidth(!0) + "px") }, focus: function (t) { var e, n, o = this, i = o.$list; o.instance.current && (e = i.children().removeClass("fancybox-thumbs-active").filter('[data-index="' + o.instance.current.index + '"]').addClass("fancybox-thumbs-active"), n = e.position(), "y" === o.opts.axis && (n.top < 0 || n.top > i.height() - e.outerHeight()) ? i.stop().animate({ scrollTop: i.scrollTop() + n.top }, t) : "x" === o.opts.axis && (n.left < i.parent().scrollLeft() || n.left > i.parent().scrollLeft() + (i.parent().width() - e.outerWidth())) && i.parent().stop().animate({ scrollLeft: n.left }, t)) }, update: function () { this.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible), this.isVisible ? (this.$grid || this.create(), this.instance.trigger("onThumbsShow"), this.focus(0)) : this.$grid && this.instance.trigger("onThumbsHide"), this.instance.update() }, hide: function () { this.isVisible = !1, this.update() }, show: function () { this.isVisible = !0, this.update() }, toggle: function () { this.isVisible = !this.isVisible, this.update() } }), e(t).on({ "onInit.fb": function (t, e) { var o; e && !e.Thumbs && (o = new n(e), o.isActive && o.opts.autoStart === !0 && o.show()) }, "beforeShow.fb": function (t, e, n, o) { var i = e && e.Thumbs; i && i.isVisible && i.focus(o ? 0 : 250) }, "afterKeydown.fb": function (t, e, n, o, i) { var a = e && e.Thumbs; a && a.isActive && 71 === i && (o.preventDefault(), a.toggle()) }, "beforeClose.fb": function (t, e) { var n = e && e.Thumbs; n && n.isVisible && n.opts.hideOnClose !== !1 && n.$grid.hide() } }) }(document, window.jQuery), function (t, e) { "use strict"; function n(t) { var e = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;", "`": "&#x60;", "=": "&#x3D;" }; return String(t).replace(/[&<>"'`=\/]/g, function (t) { return e[t] }) } e.extend(!0, e.fancybox.defaults, { btnTpl: { share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg viewBox="0 0 40 40"><path d="M6,30 C8,18 19,16 23,16 L23,16 L23,10 L33,20 L23,29 L23,24 C19,24 8,27 6,30 Z"></svg></button>' }, share: { tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p class="fancybox-share__links"><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" /></p></div>' } }), e(t).on("click", "[data-fancybox-share]", function () { var t, o, i = e.fancybox.getInstance(); i && (t = i.current.opts.hash === !1 ? i.current.src : window.location, o = i.current.opts.share.tpl.replace(/\{\{media\}\}/g, "image" === i.current.type ? encodeURIComponent(i.current.src) : "").replace(/\{\{url\}\}/g, encodeURIComponent(t)).replace(/\{\{url_raw\}\}/g, n(t)).replace(/\{\{descr\}\}/g, i.$caption ? encodeURIComponent(i.$caption.text()) : ""), e.fancybox.open({ src: i.translate(i, o), type: "html", opts: { animationEffect: "fade", animationDuration: 250, afterLoad: function (t, e) { e.$content.find(".fancybox-share__links a").click(function () { return window.open(this.href, "Share", "width=550, height=450"), !1 }) } } })) }) }(document, window.jQuery || jQuery), function (t, e, n) { "use strict"; function o() { var t = e.location.hash.substr(1), n = t.split("-"), o = n.length > 1 && /^\+?\d+$/.test(n[n.length - 1]) ? parseInt(n.pop(-1), 10) || 1 : 1, i = n.join("-"); return o < 1 && (o = 1), { hash: t, index: o, gallery: i } } function i(t) { var e; "" !== t.gallery && (e = n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']").eq(t.index - 1), e.length || (e = n("#" + n.escapeSelector(t.gallery))), e.length && (s = !1, e.trigger("click"))) } function a(t) { var e; return !!t && (e = t.current ? t.current.opts : t.opts, e.hash || (e.$orig ? e.$orig.data("fancybox") : "")) } n.escapeSelector || (n.escapeSelector = function (t) { var e = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, n = function (t, e) { return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t }; return (t + "").replace(e, n) }); var s = !0, r = null, c = null; n(function () { n.fancybox.defaults.hash !== !1 && (n(t).on({ "onInit.fb": function (t, e) { var n, i; e.group[e.currIndex].opts.hash !== !1 && (n = o(), i = a(e), i && n.gallery && i == n.gallery && (e.currIndex = n.index - 1)) }, "beforeShow.fb": function (n, o, i) { var l; i && i.opts.hash !== !1 && (l = a(o), l && "" !== l && (e.location.hash.indexOf(l) < 0 && (o.opts.origHash = e.location.hash), r = l + (o.group.length > 1 ? "-" + (i.index + 1) : ""), "replaceState" in e.history ? (c && clearTimeout(c), c = setTimeout(function () { e.history[s ? "pushState" : "replaceState"]({}, t.title, e.location.pathname + e.location.search + "#" + r), c = null, s = !1 }, 300)) : e.location.hash = r)) }, "beforeClose.fb": function (o, i, s) { var l, u; c && clearTimeout(c), s.opts.hash !== !1 && (l = a(i), u = i && i.opts.origHash ? i.opts.origHash : "", l && "" !== l && ("replaceState" in history ? e.history.replaceState({}, t.title, e.location.pathname + e.location.search + u) : (e.location.hash = u, n(e).scrollTop(i.scrollTop).scrollLeft(i.scrollLeft))), r = null) } }), n(e).on("hashchange.fb", function () { var t = o(); n.fancybox.getInstance() ? !r || r === t.gallery + "-" + t.index || 1 === t.index && r == t.gallery || (r = null, n.fancybox.close()) : "" !== t.gallery && i(t) }), setTimeout(function () { i(o()) }, 50)) }) }(document, window, window.jQuery || jQuery), function (t, e) { "use strict"; var n = (new Date).getTime(); e(t).on({ "onInit.fb": function (t, e, o) { e.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function (t) { var o = e.current, i = (new Date).getTime(); e.group.length < 1 || o.opts.wheel === !1 || "auto" === o.opts.wheel && "image" !== o.type || (t.preventDefault(), t.stopPropagation(), o.$slide.hasClass("fancybox-animated") || (t = t.originalEvent || t, i - n < 250 || (n = i, e[(-t.deltaY || -t.deltaX || t.wheelDelta || -t.detail) < 0 ? "next" : "previous"]()))) }) } }) }(document, window.jQuery || jQuery);

/*
 * Simple Mobile Navigation
 */
; (function ($) {
	function MobileNav(options) {
		this.options = $.extend({
			container: null,
			hideOnClickOutside: false,
			menuActiveClass: 'nav-active',
			menuOpener: '.nav-opener',
			menuDrop: '.nav-drop',
			toggleEvent: 'click',
			outsideClickEvent: 'click touchstart pointerdown MSPointerDown'
		}, options);
		this.initStructure();
		this.attachEvents();
	}
	MobileNav.prototype = {
		initStructure: function () {
			this.page = $('html');
			this.container = $(this.options.container);
			this.opener = this.container.find(this.options.menuOpener);
			this.drop = this.container.find(this.options.menuDrop);
		},
		attachEvents: function () {
			var self = this;

			if (activateResizeHandler) {
				activateResizeHandler();
				activateResizeHandler = null;
			}

			this.outsideClickHandler = function (e) {
				if (self.isOpened()) {
					var target = $(e.target);
					if (!target.closest(self.opener).length && !target.closest(self.drop).length) {
						self.hide();
					}
				}
			};

			this.openerClickHandler = function (e) {
				e.preventDefault();
				self.toggle();
			};

			this.opener.on(this.options.toggleEvent, this.openerClickHandler);
		},
		isOpened: function () {
			return this.container.hasClass(this.options.menuActiveClass);
		},
		show: function () {
			this.container.addClass(this.options.menuActiveClass);
			if (this.options.hideOnClickOutside) {
				this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
			}
		},
		hide: function () {
			this.container.removeClass(this.options.menuActiveClass);
			if (this.options.hideOnClickOutside) {
				this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
			}
		},
		toggle: function () {
			if (this.isOpened()) {
				this.hide();
			} else {
				this.show();
			}
		},
		destroy: function () {
			this.container.removeClass(this.options.menuActiveClass);
			this.opener.off(this.options.toggleEvent, this.clickHandler);
			this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
		}
	};

	var activateResizeHandler = function () {
		var win = $(window),
			doc = $('html'),
			resizeClass = 'resize-active',
			flag, timer;
		var removeClassHandler = function () {
			flag = false;
			doc.removeClass(resizeClass);
		};
		var resizeHandler = function () {
			if (!flag) {
				flag = true;
				doc.addClass(resizeClass);
			}
			clearTimeout(timer);
			timer = setTimeout(removeClassHandler, 500);
		};
		win.on('resize orientationchange', resizeHandler);
	};

	$.fn.mobileNav = function (opt) {
		var args = Array.prototype.slice.call(arguments);
		var method = args[0];

		return this.each(function () {
			var $container = jQuery(this);
			var instance = $container.data('MobileNav');

			if (typeof opt === 'object' || typeof opt === 'undefined') {
				$container.data('MobileNav', new MobileNav($.extend({
					container: this
				}, opt)));
			} else if (typeof method === 'string' && instance) {
				if (typeof instance[method] === 'function') {
					args.shift();
					instance[method].apply(instance, args);
				}
			}
		});
	};
}(jQuery));

// navigation accesibility module
function TouchNav(opt) {
	this.options = {
		hoverClass: 'hover',
		menuItems: 'li',
		menuOpener: 'a',
		menuDrop: 'ul',
		navBlock: null
	};
	for (var p in opt) {
		if (opt.hasOwnProperty(p)) {
			this.options[p] = opt[p];
		}
	}
	this.init();
}
TouchNav.isActiveOn = function (elem) {
	return elem && elem.touchNavActive;
};
TouchNav.prototype = {
	init: function () {
		if (typeof this.options.navBlock === 'string') {
			this.menu = document.getElementById(this.options.navBlock);
		} else if (typeof this.options.navBlock === 'object') {
			this.menu = this.options.navBlock;
		}
		if (this.menu) {
			this.addEvents();
		}
	},
	addEvents: function () {
		// attach event handlers
		var self = this;
		var touchEvent = (navigator.pointerEnabled && 'pointerdown') || (navigator.msPointerEnabled && 'MSPointerDown') || (this.isTouchDevice && 'touchstart');
		this.menuItems = lib.queryElementsBySelector(this.options.menuItems, this.menu);

		var initMenuItem = function (item) {
			var currentDrop = lib.queryElementsBySelector(self.options.menuDrop, item)[0],
				currentOpener = lib.queryElementsBySelector(self.options.menuOpener, item)[0];

			// only for touch input devices
			if (currentDrop && currentOpener && (self.isTouchDevice || self.isPointerDevice)) {
				lib.event.add(currentOpener, 'click', lib.bind(self.clickHandler, self));
				lib.event.add(currentOpener, 'mousedown', lib.bind(self.mousedownHandler, self));
				lib.event.add(currentOpener, touchEvent, function (e) {
					if (!self.isTouchPointerEvent(e)) {
						self.preventCurrentClick = false;
						return;
					}
					self.touchFlag = true;
					self.currentItem = item;
					self.currentLink = currentOpener;
					self.pressHandler.apply(self, arguments);
				});
			}
			// for desktop computers and touch devices
			jQuery(item)
				.bind('mouseenter', function () {
					if (!self.touchFlag) {
						self.currentItem = item;
						self.mouseoverHandler();
					}
				});
			jQuery(item)
				.bind('mouseleave', function () {
					if (!self.touchFlag) {
						self.currentItem = item;
						self.mouseoutHandler();
					}
				});
			item.touchNavActive = true;
		};

		// addd handlers for all menu items
		for (var i = 0; i < this.menuItems.length; i++) {
			initMenuItem(self.menuItems[i]);
		}

		// hide dropdowns when clicking outside navigation
		if (this.isTouchDevice || this.isPointerDevice) {
			lib.event.add(document.documentElement, 'mousedown', lib.bind(this.clickOutsideHandler, this));
			lib.event.add(document.documentElement, touchEvent, lib.bind(this.clickOutsideHandler, this));
		}
	},
	mousedownHandler: function (e) {
		if (this.touchFlag) {
			e.preventDefault();
			this.touchFlag = false;
			this.preventCurrentClick = false;
		}
	},
	mouseoverHandler: function () {
		lib.addClass(this.currentItem, this.options.hoverClass);
		jQuery(this.currentItem)
			.trigger('itemhover');
	},
	mouseoutHandler: function () {
		lib.removeClass(this.currentItem, this.options.hoverClass);
		jQuery(this.currentItem)
			.trigger('itemleave');
	},
	hideActiveDropdown: function () {
		for (var i = 0; i < this.menuItems.length; i++) {
			if (lib.hasClass(this.menuItems[i], this.options.hoverClass)) {
				lib.removeClass(this.menuItems[i], this.options.hoverClass);
				jQuery(this.menuItems[i])
					.trigger('itemleave');
			}
		}
		this.activeParent = null;
	},
	pressHandler: function (e) {
		// hide previous drop (if active)
		if (this.currentItem !== this.activeParent) {
			if (this.activeParent && this.currentItem.parentNode === this.activeParent.parentNode) {
				lib.removeClass(this.activeParent, this.options.hoverClass);
			} else if (!this.isParent(this.activeParent, this.currentLink)) {
				this.hideActiveDropdown();
			}
		}
		// handle current drop
		this.activeParent = this.currentItem;
		if (lib.hasClass(this.currentItem, this.options.hoverClass)) {
			this.preventCurrentClick = false;
		} else {
			e.preventDefault();
			this.preventCurrentClick = true;
			lib.addClass(this.currentItem, this.options.hoverClass);
			jQuery(this.currentItem)
				.trigger('itemhover');
		}
	},
	clickHandler: function (e) {
		// prevent first click on link
		if (this.preventCurrentClick) {
			e.preventDefault();
		}
	},
	clickOutsideHandler: function (event) {
		var e = event.changedTouches ? event.changedTouches[0] : event;
		if (this.activeParent && !this.isParent(this.menu, e.target)) {
			this.hideActiveDropdown();
			this.touchFlag = false;
		}
	},
	isParent: function (parent, child) {
		while (child.parentNode) {
			if (child.parentNode == parent) {
				return true;
			}
			child = child.parentNode;
		}
		return false;
	},
	isTouchPointerEvent: function (e) {
		return (e.type.indexOf('touch') > -1) ||
			(navigator.pointerEnabled && e.pointerType === 'touch') ||
			(navigator.msPointerEnabled && e.pointerType == e.MSPOINTER_TYPE_TOUCH);
	},
	isPointerDevice: (function () {
		return !!(navigator.pointerEnabled || navigator.msPointerEnabled);
	}()),
	isTouchDevice: (function () {
		return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
	}())
};

/*
 * Utility module
 */
lib = {
	hasClass: function (el, cls) {
		return el && el.className ? el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)')) : false;
	},
	addClass: function (el, cls) {
		if (el && !this.hasClass(el, cls)) el.className += " " + cls;
	},
	removeClass: function (el, cls) {
		if (el && this.hasClass(el, cls)) { el.className = el.className.replace(new RegExp('(\\s|^)' + cls + '(\\s|$)'), ' '); }
	},
	extend: function (obj) {
		for (var i = 1; i < arguments.length; i++) {
			for (var p in arguments[i]) {
				if (arguments[i].hasOwnProperty(p)) {
					obj[p] = arguments[i][p];
				}
			}
		}
		return obj;
	},
	each: function (obj, callback) {
		var property, len;
		if (typeof obj.length === 'number') {
			for (property = 0, len = obj.length; property < len; property++) {
				if (callback.call(obj[property], property, obj[property]) === false) {
					break;
				}
			}
		} else {
			for (property in obj) {
				if (obj.hasOwnProperty(property)) {
					if (callback.call(obj[property], property, obj[property]) === false) {
						break;
					}
				}
			}
		}
	},
	event: (function () {
		var fixEvent = function (e) {
			e = e || window.event;
			if (e.isFixed) return e; else e.isFixed = true;
			if (!e.target) e.target = e.srcElement;
			e.preventDefault = e.preventDefault || function () { this.returnValue = false; };
			e.stopPropagation = e.stopPropagation || function () { this.cancelBubble = true; };
			return e;
		};
		return {
			add: function (elem, event, handler) {
				if (!elem.events) {
					elem.events = {};
					elem.handle = function (e) {
						var ret, handlers = elem.events[e.type];
						e = fixEvent(e);
						for (var i = 0, len = handlers.length; i < len; i++) {
							if (handlers[i]) {
								ret = handlers[i].call(elem, e);
								if (ret === false) {
									e.preventDefault();
									e.stopPropagation();
								}
							}
						}
					};
				}
				if (!elem.events[event]) {
					elem.events[event] = [];
					if (elem.addEventListener) elem.addEventListener(event, elem.handle, false);
					else if (elem.attachEvent) elem.attachEvent('on' + event, elem.handle);
				}
				elem.events[event].push(handler);
			},
			remove: function (elem, event, handler) {
				var handlers = elem.events[event];
				for (var i = handlers.length - 1; i >= 0; i--) {
					if (handlers[i] === handler) {
						handlers.splice(i, 1);
					}
				}
				if (!handlers.length) {
					delete elem.events[event];
					if (elem.removeEventListener) elem.removeEventListener(event, elem.handle, false);
					else if (elem.detachEvent) elem.detachEvent('on' + event, elem.handle);
				}
			}
		};
	}()),
	queryElementsBySelector: function (selector, scope) {
		scope = scope || document;
		if (!selector) return [];
		if (selector === '>*') return scope.children;
		if (typeof document.querySelectorAll === 'function') {
			return scope.querySelectorAll(selector);
		}
		var selectors = selector.split(',');
		var resultList = [];
		for (var s = 0; s < selectors.length; s++) {
			var currentContext = [scope || document];
			var tokens = selectors[s].replace(/^\s+/, '').replace(/\s+$/, '').split(' ');
			for (var i = 0; i < tokens.length; i++) {
				token = tokens[i].replace(/^\s+/, '').replace(/\s+$/, '');
				if (token.indexOf('#') > -1) {
					var bits = token.split('#'), tagName = bits[0], id = bits[1];
					var element = document.getElementById(id);
					if (element && tagName && element.nodeName.toLowerCase() != tagName) {
						return [];
					}
					currentContext = element ? [element] : [];
					continue;
				}
				if (token.indexOf('.') > -1) {
					var bits = token.split('.'), tagName = bits[0] || '*', className = bits[1], found = [], foundCount = 0;
					for (var h = 0; h < currentContext.length; h++) {
						var elements;
						if (tagName == '*') {
							elements = currentContext[h].getElementsByTagName('*');
						} else {
							elements = currentContext[h].getElementsByTagName(tagName);
						}
						for (var j = 0; j < elements.length; j++) {
							found[foundCount++] = elements[j];
						}
					}
					currentContext = [];
					var currentContextIndex = 0;
					for (var k = 0; k < found.length; k++) {
						if (found[k].className && found[k].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
							currentContext[currentContextIndex++] = found[k];
						}
					}
					continue;
				}
				if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
					var tagName = RegExp.$1 || '*', attrName = RegExp.$2, attrOperator = RegExp.$3, attrValue = RegExp.$4;
					if (attrName.toLowerCase() == 'for' && this.browser.msie && this.browser.version < 8) {
						attrName = 'htmlFor';
					}
					var found = [], foundCount = 0;
					for (var h = 0; h < currentContext.length; h++) {
						var elements;
						if (tagName == '*') {
							elements = currentContext[h].getElementsByTagName('*');
						} else {
							elements = currentContext[h].getElementsByTagName(tagName);
						}
						for (var j = 0; elements[j]; j++) {
							found[foundCount++] = elements[j];
						}
					}
					currentContext = [];
					var currentContextIndex = 0, checkFunction;
					switch (attrOperator) {
						case '=': checkFunction = function (e) { return (e.getAttribute(attrName) == attrValue) }; break;
						case '~': checkFunction = function (e) { return (e.getAttribute(attrName).match(new RegExp('(\\s|^)' + attrValue + '(\\s|$)'))) }; break;
						case '|': checkFunction = function (e) { return (e.getAttribute(attrName).match(new RegExp('^' + attrValue + '-?'))) }; break;
						case '^': checkFunction = function (e) { return (e.getAttribute(attrName).indexOf(attrValue) == 0) }; break;
						case '$': checkFunction = function (e) { return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length) }; break;
						case '*': checkFunction = function (e) { return (e.getAttribute(attrName).indexOf(attrValue) > -1) }; break;
						default: checkFunction = function (e) { return e.getAttribute(attrName) };
					}
					currentContext = [];
					var currentContextIndex = 0;
					for (var k = 0; k < found.length; k++) {
						if (checkFunction(found[k])) {
							currentContext[currentContextIndex++] = found[k];
						}
					}
					continue;
				}
				tagName = token;
				var found = [], foundCount = 0;
				for (var h = 0; h < currentContext.length; h++) {
					var elements = currentContext[h].getElementsByTagName(tagName);
					for (var j = 0; j < elements.length; j++) {
						found[foundCount++] = elements[j];
					}
				}
				currentContext = found;
			}
			resultList = [].concat(resultList, currentContext);
		}
		return resultList;
	},
	trim: function (str) {
		return str.replace(/^\s+/, '').replace(/\s+$/, '');
	},
	bind: function (f, scope, forceArgs) {
		return function () { return f.apply(scope, typeof forceArgs !== 'undefined' ? [forceArgs] : arguments); };
	}
};

/*!
 * JavaScript Custom Forms
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
; (function (root, factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require('jquery'));
	} else {
		root.jcf = factory(jQuery);
	}
}(this, function ($) {
	'use strict';

	// define version
	var version = '1.1.3';

	// private variables
	var customInstances = [];

	// default global options
	var commonOptions = {
		optionsKey: 'jcf',
		dataKey: 'jcf-instance',
		rtlClass: 'jcf-rtl',
		focusClass: 'jcf-focus',
		pressedClass: 'jcf-pressed',
		disabledClass: 'jcf-disabled',
		hiddenClass: 'jcf-hidden',
		resetAppearanceClass: 'jcf-reset-appearance',
		unselectableClass: 'jcf-unselectable'
	};

	// detect device type
	var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
		isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);
	commonOptions.isMobileDevice = !!(isTouchDevice || isWinPhoneDevice);

	var isIOS = /(iPad|iPhone).*OS ([0-9_]*) .*/.exec(navigator.userAgent);
	if (isIOS) isIOS = parseFloat(isIOS[2].replace(/_/g, '.'));
	commonOptions.ios = isIOS;

	// create global stylesheet if custom forms are used
	var createStyleSheet = function () {
		var styleTag = $('<style>').appendTo('head'),
			styleSheet = styleTag.prop('sheet') || styleTag.prop('styleSheet');

		// crossbrowser style handling
		var addCSSRule = function (selector, rules, index) {
			if (styleSheet.insertRule) {
				styleSheet.insertRule(selector + '{' + rules + '}', index);
			} else {
				styleSheet.addRule(selector, rules, index);
			}
		};

		// add special rules
		addCSSRule('.' + commonOptions.hiddenClass, 'position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none');
		addCSSRule('.' + commonOptions.rtlClass + ' .' + commonOptions.hiddenClass, 'right:-9999px !important; left: auto !important');
		addCSSRule('.' + commonOptions.unselectableClass, '-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);');
		addCSSRule('.' + commonOptions.resetAppearanceClass, 'background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);');

		// detect rtl pages
		var html = $('html'), body = $('body');
		if (html.css('direction') === 'rtl' || body.css('direction') === 'rtl') {
			html.addClass(commonOptions.rtlClass);
		}

		// handle form reset event
		html.on('reset', function () {
			setTimeout(function () {
				api.refreshAll();
			}, 0);
		});

		// mark stylesheet as created
		commonOptions.styleSheetCreated = true;
	};

	// simplified pointer events handler
	(function () {
		var pointerEventsSupported = navigator.pointerEnabled || navigator.msPointerEnabled,
			touchEventsSupported = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
			eventList, eventMap = {}, eventPrefix = 'jcf-';

		// detect events to attach
		if (pointerEventsSupported) {
			eventList = {
				pointerover: navigator.pointerEnabled ? 'pointerover' : 'MSPointerOver',
				pointerdown: navigator.pointerEnabled ? 'pointerdown' : 'MSPointerDown',
				pointermove: navigator.pointerEnabled ? 'pointermove' : 'MSPointerMove',
				pointerup: navigator.pointerEnabled ? 'pointerup' : 'MSPointerUp'
			};
		} else {
			eventList = {
				pointerover: 'mouseover',
				pointerdown: 'mousedown' + (touchEventsSupported ? ' touchstart' : ''),
				pointermove: 'mousemove' + (touchEventsSupported ? ' touchmove' : ''),
				pointerup: 'mouseup' + (touchEventsSupported ? ' touchend' : '')
			};
		}

		// create event map
		$.each(eventList, function (targetEventName, fakeEventList) {
			$.each(fakeEventList.split(' '), function (index, fakeEventName) {
				eventMap[fakeEventName] = targetEventName;
			});
		});

		// jQuery event hooks
		$.each(eventList, function (eventName, eventHandlers) {
			eventHandlers = eventHandlers.split(' ');
			$.event.special[eventPrefix + eventName] = {
				setup: function () {
					var self = this;
					$.each(eventHandlers, function (index, fallbackEvent) {
						if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);
						else self['on' + fallbackEvent] = fixEvent;
					});
				},
				teardown: function () {
					var self = this;
					$.each(eventHandlers, function (index, fallbackEvent) {
						if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);
						else self['on' + fallbackEvent] = null;
					});
				}
			};
		});

		// check that mouse event are not simulated by mobile browsers
		var lastTouch = null;
		var mouseEventSimulated = function (e) {
			var dx = Math.abs(e.pageX - lastTouch.x),
				dy = Math.abs(e.pageY - lastTouch.y),
				rangeDistance = 25;

			if (dx <= rangeDistance && dy <= rangeDistance) {
				return true;
			}
		};

		// normalize event
		var fixEvent = function (e) {
			var origEvent = e || window.event,
				touchEventData = null,
				targetEventName = eventMap[origEvent.type];

			e = $.event.fix(origEvent);
			e.type = eventPrefix + targetEventName;

			if (origEvent.pointerType) {
				switch (origEvent.pointerType) {
					case 2: e.pointerType = 'touch'; break;
					case 3: e.pointerType = 'pen'; break;
					case 4: e.pointerType = 'mouse'; break;
					default: e.pointerType = origEvent.pointerType;
				}
			} else {
				e.pointerType = origEvent.type.substr(0, 5); // "mouse" or "touch" word length
			}

			if (!e.pageX && !e.pageY) {
				touchEventData = origEvent.changedTouches ? origEvent.changedTouches[0] : origEvent;
				e.pageX = touchEventData.pageX;
				e.pageY = touchEventData.pageY;
			}

			if (origEvent.type === 'touchend') {
				lastTouch = { x: e.pageX, y: e.pageY };
			}
			if (e.pointerType === 'mouse' && lastTouch && mouseEventSimulated(e)) {
				return;
			} else {
				return ($.event.dispatch || $.event.handle).call(this, e);
			}
		};
	}());

	// custom mousewheel/trackpad handler
	(function () {
		var wheelEvents = ('onwheel' in document || document.documentMode >= 9 ? 'wheel' : 'mousewheel DOMMouseScroll').split(' '),
			shimEventName = 'jcf-mousewheel';

		$.event.special[shimEventName] = {
			setup: function () {
				var self = this;
				$.each(wheelEvents, function (index, fallbackEvent) {
					if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);
					else self['on' + fallbackEvent] = fixEvent;
				});
			},
			teardown: function () {
				var self = this;
				$.each(wheelEvents, function (index, fallbackEvent) {
					if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);
					else self['on' + fallbackEvent] = null;
				});
			}
		};

		var fixEvent = function (e) {
			var origEvent = e || window.event;
			e = $.event.fix(origEvent);
			e.type = shimEventName;

			// old wheel events handler
			if ('detail' in origEvent) { e.deltaY = -origEvent.detail; }
			if ('wheelDelta' in origEvent) { e.deltaY = -origEvent.wheelDelta; }
			if ('wheelDeltaY' in origEvent) { e.deltaY = -origEvent.wheelDeltaY; }
			if ('wheelDeltaX' in origEvent) { e.deltaX = -origEvent.wheelDeltaX; }

			// modern wheel event handler
			if ('deltaY' in origEvent) {
				e.deltaY = origEvent.deltaY;
			}
			if ('deltaX' in origEvent) {
				e.deltaX = origEvent.deltaX;
			}

			// handle deltaMode for mouse wheel
			e.delta = e.deltaY || e.deltaX;
			if (origEvent.deltaMode === 1) {
				var lineHeight = 16;
				e.delta *= lineHeight;
				e.deltaY *= lineHeight;
				e.deltaX *= lineHeight;
			}

			return ($.event.dispatch || $.event.handle).call(this, e);
		};
	}());

	// extra module methods
	var moduleMixin = {
		// provide function for firing native events
		fireNativeEvent: function (elements, eventName) {
			$(elements).each(function () {
				var element = this, eventObject;
				if (element.dispatchEvent) {
					eventObject = document.createEvent('HTMLEvents');
					eventObject.initEvent(eventName, true, true);
					element.dispatchEvent(eventObject);
				} else if (document.createEventObject) {
					eventObject = document.createEventObject();
					eventObject.target = element;
					element.fireEvent('on' + eventName, eventObject);
				}
			});
		},
		// bind event handlers for module instance (functions beggining with "on")
		bindHandlers: function () {
			var self = this;
			$.each(self, function (propName, propValue) {
				if (propName.indexOf('on') === 0 && $.isFunction(propValue)) {
					// dont use $.proxy here because it doesn't create unique handler
					self[propName] = function () {
						return propValue.apply(self, arguments);
					};
				}
			});
		}
	};

	// public API
	var api = {
		version: version,
		modules: {},
		getOptions: function () {
			return $.extend({}, commonOptions);
		},
		setOptions: function (moduleName, moduleOptions) {
			if (arguments.length > 1) {
				// set module options
				if (this.modules[moduleName]) {
					$.extend(this.modules[moduleName].prototype.options, moduleOptions);
				}
			} else {
				// set common options
				$.extend(commonOptions, moduleName);
			}
		},
		addModule: function (proto) {
			// add module to list
			var Module = function (options) {
				// save instance to collection
				if (!options.element.data(commonOptions.dataKey)) {
					options.element.data(commonOptions.dataKey, this);
				}
				customInstances.push(this);

				// save options
				this.options = $.extend({}, commonOptions, this.options, getInlineOptions(options.element), options);

				// bind event handlers to instance
				this.bindHandlers();

				// call constructor
				this.init.apply(this, arguments);
			};

			// parse options from HTML attribute
			var getInlineOptions = function (element) {
				var dataOptions = element.data(commonOptions.optionsKey),
					attrOptions = element.attr(commonOptions.optionsKey);

				if (dataOptions) {
					return dataOptions;
				} else if (attrOptions) {
					try {
						return $.parseJSON(attrOptions);
					} catch (e) {
						// ignore invalid attributes
					}
				}
			};

			// set proto as prototype for new module
			Module.prototype = proto;

			// add mixin methods to module proto
			$.extend(proto, moduleMixin);
			if (proto.plugins) {
				$.each(proto.plugins, function (pluginName, plugin) {
					$.extend(plugin.prototype, moduleMixin);
				});
			}

			// override destroy method
			var originalDestroy = Module.prototype.destroy;
			Module.prototype.destroy = function () {
				this.options.element.removeData(this.options.dataKey);

				for (var i = customInstances.length - 1; i >= 0; i--) {
					if (customInstances[i] === this) {
						customInstances.splice(i, 1);
						break;
					}
				}

				if (originalDestroy) {
					originalDestroy.apply(this, arguments);
				}
			};

			// save module to list
			this.modules[proto.name] = Module;
		},
		getInstance: function (element) {
			return $(element).data(commonOptions.dataKey);
		},
		replace: function (elements, moduleName, customOptions) {
			var self = this,
				instance;

			if (!commonOptions.styleSheetCreated) {
				createStyleSheet();
			}

			$(elements).each(function () {
				var moduleOptions,
					element = $(this);

				instance = element.data(commonOptions.dataKey);
				if (instance) {
					instance.refresh();
				} else {
					if (!moduleName) {
						$.each(self.modules, function (currentModuleName, module) {
							if (module.prototype.matchElement.call(module.prototype, element)) {
								moduleName = currentModuleName;
								return false;
							}
						});
					}
					if (moduleName) {
						moduleOptions = $.extend({ element: element }, customOptions);
						instance = new self.modules[moduleName](moduleOptions);
					}
				}
			});
			return instance;
		},
		refresh: function (elements) {
			$(elements).each(function () {
				var instance = $(this).data(commonOptions.dataKey);
				if (instance) {
					instance.refresh();
				}
			});
		},
		destroy: function (elements) {
			$(elements).each(function () {
				var instance = $(this).data(commonOptions.dataKey);
				if (instance) {
					instance.destroy();
				}
			});
		},
		replaceAll: function (context) {
			var self = this;
			$.each(this.modules, function (moduleName, module) {
				$(module.prototype.selector, context).each(function () {
					if (this.className.indexOf('jcf-ignore') < 0) {
						self.replace(this, moduleName);
					}
				});
			});
		},
		refreshAll: function (context) {
			if (context) {
				$.each(this.modules, function (moduleName, module) {
					$(module.prototype.selector, context).each(function () {
						var instance = $(this).data(commonOptions.dataKey);
						if (instance) {
							instance.refresh();
						}
					});
				});
			} else {
				for (var i = customInstances.length - 1; i >= 0; i--) {
					customInstances[i].refresh();
				}
			}
		},
		destroyAll: function (context) {
			if (context) {
				$.each(this.modules, function (moduleName, module) {
					$(module.prototype.selector, context).each(function (index, element) {
						var instance = $(element).data(commonOptions.dataKey);
						if (instance) {
							instance.destroy();
						}
					});
				});
			} else {
				while (customInstances.length) {
					customInstances[0].destroy();
				}
			}
		}
	};

	// always export API to the global window object
	window.jcf = api;

	return api;
}));

/*!
 * JavaScript Custom Forms : Select Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
; (function ($, window) {
	'use strict';

	jcf.addModule({
		name: 'Select',
		selector: 'select',
		options: {
			element: null,
			multipleCompactStyle: false
		},
		plugins: {
			ListBox: ListBox,
			ComboBox: ComboBox,
			SelectList: SelectList
		},
		matchElement: function (element) {
			return element.is('select');
		},
		init: function () {
			this.element = $(this.options.element);
			this.createInstance();
		},
		isListBox: function () {
			return this.element.is('[size]:not([jcf-size]), [multiple]');
		},
		createInstance: function () {
			if (this.instance) {
				this.instance.destroy();
			}
			if (this.isListBox() && !this.options.multipleCompactStyle) {
				this.instance = new ListBox(this.options);
			} else {
				this.instance = new ComboBox(this.options);
			}
		},
		refresh: function () {
			var typeMismatch = (this.isListBox() && this.instance instanceof ComboBox) ||
				(!this.isListBox() && this.instance instanceof ListBox);

			if (typeMismatch) {
				this.createInstance();
			} else {
				this.instance.refresh();
			}
		},
		destroy: function () {
			this.instance.destroy();
		}
	});

	// combobox module
	function ComboBox(options) {
		this.options = $.extend({
			wrapNative: true,
			wrapNativeOnMobile: true,
			fakeDropInBody: true,
			useCustomScroll: true,
			flipDropToFit: true,
			maxVisibleItems: 10,
			fakeAreaStructure: '<span class="jcf-select"><span class="jcf-select-text"></span><span class="jcf-select-opener"></span></span>',
			fakeDropStructure: '<div class="jcf-select-drop"><div class="jcf-select-drop-content"></div></div>',
			optionClassPrefix: 'jcf-option-',
			selectClassPrefix: 'jcf-select-',
			dropContentSelector: '.jcf-select-drop-content',
			selectTextSelector: '.jcf-select-text',
			dropActiveClass: 'jcf-drop-active',
			flipDropClass: 'jcf-drop-flipped'
		}, options);
		this.init();
	}
	$.extend(ComboBox.prototype, {
		init: function () {
			this.initStructure();
			this.bindHandlers();
			this.attachEvents();
			this.refresh();
		},
		initStructure: function () {
			// prepare structure
			this.win = $(window);
			this.doc = $(document);
			this.realElement = $(this.options.element);
			this.fakeElement = $(this.options.fakeAreaStructure).insertAfter(this.realElement);
			this.selectTextContainer = this.fakeElement.find(this.options.selectTextSelector);
			this.selectText = $('<span></span>').appendTo(this.selectTextContainer);
			makeUnselectable(this.fakeElement);

			// copy classes from original select
			this.fakeElement.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));

			// handle compact multiple style
			if (this.realElement.prop('multiple')) {
				this.fakeElement.addClass('jcf-compact-multiple');
			}

			// detect device type and dropdown behavior
			if (this.options.isMobileDevice && this.options.wrapNativeOnMobile && !this.options.wrapNative) {
				this.options.wrapNative = true;
			}

			if (this.options.wrapNative) {
				// wrap native select inside fake block
				this.realElement.prependTo(this.fakeElement).css({
					position: 'absolute',
					height: '100%',
					width: '100%'
				}).addClass(this.options.resetAppearanceClass);
			} else {
				// just hide native select
				this.realElement.addClass(this.options.hiddenClass);
				this.fakeElement.attr('title', this.realElement.attr('title'));
				this.fakeDropTarget = this.options.fakeDropInBody ? $('body') : this.fakeElement;
			}
		},
		attachEvents: function () {
			// delayed refresh handler
			var self = this;
			this.delayedRefresh = function () {
				setTimeout(function () {
					self.refresh();
					if (self.list) {
						self.list.refresh();
						self.list.scrollToActiveOption();
					}
				}, 1);
			};

			// native dropdown event handlers
			if (this.options.wrapNative) {
				this.realElement.on({
					focus: this.onFocus,
					change: this.onChange,
					click: this.onChange,
					keydown: this.onChange
				});
			} else {
				// custom dropdown event handlers
				this.realElement.on({
					focus: this.onFocus,
					change: this.onChange,
					keydown: this.onKeyDown
				});
				this.fakeElement.on({
					'jcf-pointerdown': this.onSelectAreaPress
				});
			}
		},
		onKeyDown: function (e) {
			if (e.which === 13) {
				this.toggleDropdown();
			} else if (this.dropActive) {
				this.delayedRefresh();
			}
		},
		onChange: function () {
			this.refresh();
		},
		onFocus: function () {
			if (!this.pressedFlag || !this.focusedFlag) {
				this.fakeElement.addClass(this.options.focusClass);
				this.realElement.on('blur', this.onBlur);
				this.toggleListMode(true);
				this.focusedFlag = true;
			}
		},
		onBlur: function () {
			if (!this.pressedFlag) {
				this.fakeElement.removeClass(this.options.focusClass);
				this.realElement.off('blur', this.onBlur);
				this.toggleListMode(false);
				this.focusedFlag = false;
			}
		},
		onResize: function () {
			if (this.dropActive) {
				this.hideDropdown();
			}
		},
		onSelectDropPress: function () {
			this.pressedFlag = true;
		},
		onSelectDropRelease: function (e, pointerEvent) {
			this.pressedFlag = false;
			if (pointerEvent.pointerType === 'mouse') {
				this.realElement.focus();
			}
		},
		onSelectAreaPress: function (e) {
			// skip click if drop inside fake element or real select is disabled
			var dropClickedInsideFakeElement = !this.options.fakeDropInBody && $(e.target).closest(this.dropdown).length;
			if (dropClickedInsideFakeElement || e.button > 1 || this.realElement.is(':disabled')) {
				return;
			}

			// toggle dropdown visibility
			this.selectOpenedByEvent = e.pointerType;
			this.toggleDropdown();

			// misc handlers
			if (!this.focusedFlag) {
				if (e.pointerType === 'mouse') {
					this.realElement.focus();
				} else {
					this.onFocus(e);
				}
			}
			this.pressedFlag = true;
			this.fakeElement.addClass(this.options.pressedClass);
			this.doc.on('jcf-pointerup', this.onSelectAreaRelease);
		},
		onSelectAreaRelease: function (e) {
			if (this.focusedFlag && e.pointerType === 'mouse') {
				this.realElement.focus();
			}
			this.pressedFlag = false;
			this.fakeElement.removeClass(this.options.pressedClass);
			this.doc.off('jcf-pointerup', this.onSelectAreaRelease);
		},
		onOutsideClick: function (e) {
			var target = $(e.target),
				clickedInsideSelect = target.closest(this.fakeElement).length || target.closest(this.dropdown).length;

			if (!clickedInsideSelect) {
				this.hideDropdown();
			}
		},
		onSelect: function () {
			this.refresh();

			if (this.realElement.prop('multiple')) {
				this.repositionDropdown();
			} else {
				this.hideDropdown();
			}

			this.fireNativeEvent(this.realElement, 'change');
		},
		toggleListMode: function (state) {
			if (!this.options.wrapNative) {
				if (state) {
					// temporary change select to list to avoid appearing of native dropdown
					this.realElement.attr({
						size: 4,
						'jcf-size': ''
					});
				} else {
					// restore select from list mode to dropdown select
					if (!this.options.wrapNative) {
						this.realElement.removeAttr('size jcf-size');
					}
				}
			}
		},
		createDropdown: function () {
			// destroy previous dropdown if needed
			if (this.dropdown) {
				this.list.destroy();
				this.dropdown.remove();
			}

			// create new drop container
			this.dropdown = $(this.options.fakeDropStructure).appendTo(this.fakeDropTarget);
			this.dropdown.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));
			makeUnselectable(this.dropdown);

			// handle compact multiple style
			if (this.realElement.prop('multiple')) {
				this.dropdown.addClass('jcf-compact-multiple');
			}

			// set initial styles for dropdown in body
			if (this.options.fakeDropInBody) {
				this.dropdown.css({
					position: 'absolute',
					top: -9999
				});
			}

			// create new select list instance
			this.list = new SelectList({
				useHoverClass: true,
				handleResize: false,
				alwaysPreventMouseWheel: true,
				maxVisibleItems: this.options.maxVisibleItems,
				useCustomScroll: this.options.useCustomScroll,
				holder: this.dropdown.find(this.options.dropContentSelector),
				multipleSelectWithoutKey: this.realElement.prop('multiple'),
				element: this.realElement
			});
			$(this.list).on({
				select: this.onSelect,
				press: this.onSelectDropPress,
				release: this.onSelectDropRelease
			});
		},
		repositionDropdown: function () {
			var selectOffset = this.fakeElement.offset(),
				selectWidth = this.fakeElement.outerWidth(),
				selectHeight = this.fakeElement.outerHeight(),
				dropHeight = this.dropdown.css('width', selectWidth).outerHeight(),
				winScrollTop = this.win.scrollTop(),
				winHeight = this.win.height(),
				calcTop, calcLeft, bodyOffset, needFlipDrop = false;

			// check flip drop position
			if (selectOffset.top + selectHeight + dropHeight > winScrollTop + winHeight && selectOffset.top - dropHeight > winScrollTop) {
				needFlipDrop = true;
			}

			if (this.options.fakeDropInBody) {
				bodyOffset = this.fakeDropTarget.css('position') !== 'static' ? this.fakeDropTarget.offset().top : 0;
				if (this.options.flipDropToFit && needFlipDrop) {
					// calculate flipped dropdown position
					calcLeft = selectOffset.left;
					calcTop = selectOffset.top - dropHeight - bodyOffset;
				} else {
					// calculate default drop position
					calcLeft = selectOffset.left;
					calcTop = selectOffset.top + selectHeight - bodyOffset;
				}

				// update drop styles
				this.dropdown.css({
					width: selectWidth,
					left: calcLeft,
					top: calcTop
				});
			}

			// refresh flipped class
			this.dropdown.add(this.fakeElement).toggleClass(this.options.flipDropClass, this.options.flipDropToFit && needFlipDrop);
		},
		showDropdown: function () {
			// do not show empty custom dropdown
			if (!this.realElement.prop('options').length) {
				return;
			}

			// create options list if not created
			if (!this.dropdown) {
				this.createDropdown();
			}

			// show dropdown
			this.dropActive = true;
			this.dropdown.appendTo(this.fakeDropTarget);
			this.fakeElement.addClass(this.options.dropActiveClass);
			this.refreshSelectedText();
			this.repositionDropdown();
			this.list.setScrollTop(this.savedScrollTop);
			this.list.refresh();

			// add temporary event handlers
			this.win.on('resize', this.onResize);
			this.doc.on('jcf-pointerdown', this.onOutsideClick);
		},
		hideDropdown: function () {
			if (this.dropdown) {
				this.savedScrollTop = this.list.getScrollTop();
				this.fakeElement.removeClass(this.options.dropActiveClass + ' ' + this.options.flipDropClass);
				this.dropdown.removeClass(this.options.flipDropClass).detach();
				this.doc.off('jcf-pointerdown', this.onOutsideClick);
				this.win.off('resize', this.onResize);
				this.dropActive = false;
				if (this.selectOpenedByEvent === 'touch') {
					this.onBlur();
				}
			}
		},
		toggleDropdown: function () {
			if (this.dropActive) {
				this.hideDropdown();
			} else {
				this.showDropdown();
			}
		},
		refreshSelectedText: function () {
			// redraw selected area
			var selectedIndex = this.realElement.prop('selectedIndex'),
				selectedOption = this.realElement.prop('options')[selectedIndex],
				selectedOptionImage = selectedOption ? selectedOption.getAttribute('data-image') : null,
				selectedOptionText = '',
				selectedOptionClasses,
				self = this;

			if (this.realElement.prop('multiple')) {
				$.each(this.realElement.prop('options'), function (index, option) {
					if (option.selected) {
						selectedOptionText += (selectedOptionText ? ', ' : '') + option.innerHTML;
					}
				});
				if (!selectedOptionText) {
					selectedOptionText = self.realElement.attr('placeholder') || '';
				}
				this.selectText.removeAttr('class').html(selectedOptionText);
			} else if (!selectedOption) {
				if (this.selectImage) {
					this.selectImage.hide();
				}
				this.selectText.removeAttr('class').empty();
			} else if (this.currentSelectedText !== selectedOption.innerHTML || this.currentSelectedImage !== selectedOptionImage) {
				selectedOptionClasses = getPrefixedClasses(selectedOption.className, this.options.optionClassPrefix);
				this.selectText.attr('class', selectedOptionClasses).html(selectedOption.innerHTML);

				if (selectedOptionImage) {
					if (!this.selectImage) {
						this.selectImage = $('<img>').prependTo(this.selectTextContainer).hide();
					}
					this.selectImage.attr('src', selectedOptionImage).show();
				} else if (this.selectImage) {
					this.selectImage.hide();
				}

				this.currentSelectedText = selectedOption.innerHTML;
				this.currentSelectedImage = selectedOptionImage;
			}
		},
		refresh: function () {
			// refresh fake select visibility
			if (this.realElement.prop('style').display === 'none') {
				this.fakeElement.hide();
			} else {
				this.fakeElement.show();
			}

			// refresh selected text
			this.refreshSelectedText();

			// handle disabled state
			this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(':disabled'));
		},
		destroy: function () {
			// restore structure
			if (this.options.wrapNative) {
				this.realElement.insertBefore(this.fakeElement).css({
					position: '',
					height: '',
					width: ''
				}).removeClass(this.options.resetAppearanceClass);
			} else {
				this.realElement.removeClass(this.options.hiddenClass);
				if (this.realElement.is('[jcf-size]')) {
					this.realElement.removeAttr('size jcf-size');
				}
			}

			// removing element will also remove its event handlers
			this.fakeElement.remove();

			// remove other event handlers
			this.doc.off('jcf-pointerup', this.onSelectAreaRelease);
			this.realElement.off({
				focus: this.onFocus
			});
		}
	});

	// listbox module
	function ListBox(options) {
		this.options = $.extend({
			wrapNative: true,
			useCustomScroll: true,
			fakeStructure: '<span class="jcf-list-box"><span class="jcf-list-wrapper"></span></span>',
			selectClassPrefix: 'jcf-select-',
			listHolder: '.jcf-list-wrapper'
		}, options);
		this.init();
	}
	$.extend(ListBox.prototype, {
		init: function () {
			this.bindHandlers();
			this.initStructure();
			this.attachEvents();
		},
		initStructure: function () {
			this.realElement = $(this.options.element);
			this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
			this.listHolder = this.fakeElement.find(this.options.listHolder);
			makeUnselectable(this.fakeElement);

			// copy classes from original select
			this.fakeElement.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));
			this.realElement.addClass(this.options.hiddenClass);

			this.list = new SelectList({
				useCustomScroll: this.options.useCustomScroll,
				holder: this.listHolder,
				selectOnClick: false,
				element: this.realElement
			});
		},
		attachEvents: function () {
			// delayed refresh handler
			var self = this;
			this.delayedRefresh = function (e) {
				if (e && e.which === 16) {
					// ignore SHIFT key
					return;
				} else {
					clearTimeout(self.refreshTimer);
					self.refreshTimer = setTimeout(function () {
						self.refresh();
						self.list.scrollToActiveOption();
					}, 1);
				}
			};

			// other event handlers
			this.realElement.on({
				focus: this.onFocus,
				click: this.delayedRefresh,
				keydown: this.delayedRefresh
			});

			// select list event handlers
			$(this.list).on({
				select: this.onSelect,
				press: this.onFakeOptionsPress,
				release: this.onFakeOptionsRelease
			});
		},
		onFakeOptionsPress: function (e, pointerEvent) {
			this.pressedFlag = true;
			if (pointerEvent.pointerType === 'mouse') {
				this.realElement.focus();
			}
		},
		onFakeOptionsRelease: function (e, pointerEvent) {
			this.pressedFlag = false;
			if (pointerEvent.pointerType === 'mouse') {
				this.realElement.focus();
			}
		},
		onSelect: function () {
			this.fireNativeEvent(this.realElement, 'change');
			this.fireNativeEvent(this.realElement, 'click');
		},
		onFocus: function () {
			if (!this.pressedFlag || !this.focusedFlag) {
				this.fakeElement.addClass(this.options.focusClass);
				this.realElement.on('blur', this.onBlur);
				this.focusedFlag = true;
			}
		},
		onBlur: function () {
			if (!this.pressedFlag) {
				this.fakeElement.removeClass(this.options.focusClass);
				this.realElement.off('blur', this.onBlur);
				this.focusedFlag = false;
			}
		},
		refresh: function () {
			this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(':disabled'));
			this.list.refresh();
		},
		destroy: function () {
			this.list.destroy();
			this.realElement.insertBefore(this.fakeElement).removeClass(this.options.hiddenClass);
			this.fakeElement.remove();
		}
	});

	// options list module
	function SelectList(options) {
		this.options = $.extend({
			holder: null,
			maxVisibleItems: 10,
			selectOnClick: true,
			useHoverClass: false,
			useCustomScroll: false,
			handleResize: true,
			multipleSelectWithoutKey: false,
			alwaysPreventMouseWheel: false,
			indexAttribute: 'data-index',
			cloneClassPrefix: 'jcf-option-',
			containerStructure: '<span class="jcf-list"><span class="jcf-list-content"></span></span>',
			containerSelector: '.jcf-list-content',
			captionClass: 'jcf-optgroup-caption',
			disabledClass: 'jcf-disabled',
			optionClass: 'jcf-option',
			groupClass: 'jcf-optgroup',
			hoverClass: 'jcf-hover',
			selectedClass: 'jcf-selected',
			scrollClass: 'jcf-scroll-active'
		}, options);
		this.init();
	}
	$.extend(SelectList.prototype, {
		init: function () {
			this.initStructure();
			this.refreshSelectedClass();
			this.attachEvents();
		},
		initStructure: function () {
			this.element = $(this.options.element);
			this.indexSelector = '[' + this.options.indexAttribute + ']';
			this.container = $(this.options.containerStructure).appendTo(this.options.holder);
			this.listHolder = this.container.find(this.options.containerSelector);
			this.lastClickedIndex = this.element.prop('selectedIndex');
			this.rebuildList();
		},
		attachEvents: function () {
			this.bindHandlers();
			this.listHolder.on('jcf-pointerdown', this.indexSelector, this.onItemPress);
			this.listHolder.on('jcf-pointerdown', this.onPress);

			if (this.options.useHoverClass) {
				this.listHolder.on('jcf-pointerover', this.indexSelector, this.onHoverItem);
			}
		},
		onPress: function (e) {
			$(this).trigger('press', e);
			this.listHolder.on('jcf-pointerup', this.onRelease);
		},
		onRelease: function (e) {
			$(this).trigger('release', e);
			this.listHolder.off('jcf-pointerup', this.onRelease);
		},
		onHoverItem: function (e) {
			var hoverIndex = parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute));
			this.fakeOptions.removeClass(this.options.hoverClass).eq(hoverIndex).addClass(this.options.hoverClass);
		},
		onItemPress: function (e) {
			if (e.pointerType === 'touch' || this.options.selectOnClick) {
				// select option after "click"
				this.tmpListOffsetTop = this.list.offset().top;
				this.listHolder.on('jcf-pointerup', this.indexSelector, this.onItemRelease);
			} else {
				// select option immediately
				this.onSelectItem(e);
			}
		},
		onItemRelease: function (e) {
			// remove event handlers and temporary data
			this.listHolder.off('jcf-pointerup', this.indexSelector, this.onItemRelease);

			// simulate item selection
			if (this.tmpListOffsetTop === this.list.offset().top) {
				this.listHolder.on('click', this.indexSelector, { savedPointerType: e.pointerType }, this.onSelectItem);
			}
			delete this.tmpListOffsetTop;
		},
		onSelectItem: function (e) {
			var clickedIndex = parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute)),
				pointerType = e.data && e.data.savedPointerType || e.pointerType || 'mouse',
				range;

			// remove click event handler
			this.listHolder.off('click', this.indexSelector, this.onSelectItem);

			// ignore clicks on disabled options
			if (e.button > 1 || this.realOptions[clickedIndex].disabled) {
				return;
			}

			if (this.element.prop('multiple')) {
				if (e.metaKey || e.ctrlKey || pointerType === 'touch' || this.options.multipleSelectWithoutKey) {
					// if CTRL/CMD pressed or touch devices - toggle selected option
					this.realOptions[clickedIndex].selected = !this.realOptions[clickedIndex].selected;
				} else if (e.shiftKey) {
					// if SHIFT pressed - update selection
					range = [this.lastClickedIndex, clickedIndex].sort(function (a, b) {
						return a - b;
					});
					this.realOptions.each(function (index, option) {
						option.selected = (index >= range[0] && index <= range[1]);
					});
				} else {
					// set single selected index
					this.element.prop('selectedIndex', clickedIndex);
				}
			} else {
				this.element.prop('selectedIndex', clickedIndex);
			}

			// save last clicked option
			if (!e.shiftKey) {
				this.lastClickedIndex = clickedIndex;
			}

			// refresh classes
			this.refreshSelectedClass();

			// scroll to active item in desktop browsers
			if (pointerType === 'mouse') {
				this.scrollToActiveOption();
			}

			// make callback when item selected
			$(this).trigger('select');
		},
		rebuildList: function () {
			// rebuild options
			var self = this,
				rootElement = this.element[0];

			// recursively create fake options
			this.storedSelectHTML = rootElement.innerHTML;
			this.optionIndex = 0;
			this.list = $(this.createOptionsList(rootElement));
			this.listHolder.empty().append(this.list);
			this.realOptions = this.element.find('option');
			this.fakeOptions = this.list.find(this.indexSelector);
			this.fakeListItems = this.list.find('.' + this.options.captionClass + ',' + this.indexSelector);
			delete this.optionIndex;

			// detect max visible items
			var maxCount = this.options.maxVisibleItems,
				sizeValue = this.element.prop('size');
			if (sizeValue > 1 && !this.element.is('[jcf-size]')) {
				maxCount = sizeValue;
			}

			// handle scrollbar
			var needScrollBar = this.fakeOptions.length > maxCount;
			this.container.toggleClass(this.options.scrollClass, needScrollBar);
			if (needScrollBar) {
				// change max-height
				this.listHolder.css({
					maxHeight: this.getOverflowHeight(maxCount),
					overflow: 'auto'
				});

				if (this.options.useCustomScroll && jcf.modules.Scrollable) {
					// add custom scrollbar if specified in options
					jcf.replace(this.listHolder, 'Scrollable', {
						handleResize: this.options.handleResize,
						alwaysPreventMouseWheel: this.options.alwaysPreventMouseWheel
					});
					return;
				}
			}

			// disable edge wheel scrolling
			if (this.options.alwaysPreventMouseWheel) {
				this.preventWheelHandler = function (e) {
					var currentScrollTop = self.listHolder.scrollTop(),
						maxScrollTop = self.listHolder.prop('scrollHeight') - self.listHolder.innerHeight();

					// check edge cases
					if ((currentScrollTop <= 0 && e.deltaY < 0) || (currentScrollTop >= maxScrollTop && e.deltaY > 0)) {
						e.preventDefault();
					}
				};
				this.listHolder.on('jcf-mousewheel', this.preventWheelHandler);
			}
		},
		refreshSelectedClass: function () {
			var self = this,
				selectedItem,
				isMultiple = this.element.prop('multiple'),
				selectedIndex = this.element.prop('selectedIndex');

			if (isMultiple) {
				this.realOptions.each(function (index, option) {
					self.fakeOptions.eq(index).toggleClass(self.options.selectedClass, !!option.selected);
				});
			} else {
				this.fakeOptions.removeClass(this.options.selectedClass + ' ' + this.options.hoverClass);
				selectedItem = this.fakeOptions.eq(selectedIndex).addClass(this.options.selectedClass);
				if (this.options.useHoverClass) {
					selectedItem.addClass(this.options.hoverClass);
				}
			}
		},
		scrollToActiveOption: function () {
			// scroll to target option
			var targetOffset = this.getActiveOptionOffset();
			if (typeof targetOffset === 'number') {
				this.listHolder.prop('scrollTop', targetOffset);
			}
		},
		getSelectedIndexRange: function () {
			var firstSelected = -1, lastSelected = -1;
			this.realOptions.each(function (index, option) {
				if (option.selected) {
					if (firstSelected < 0) {
						firstSelected = index;
					}
					lastSelected = index;
				}
			});
			return [firstSelected, lastSelected];
		},
		getChangedSelectedIndex: function () {
			var selectedIndex = this.element.prop('selectedIndex'),
				targetIndex;

			if (this.element.prop('multiple')) {
				// multiple selects handling
				if (!this.previousRange) {
					this.previousRange = [selectedIndex, selectedIndex];
				}
				this.currentRange = this.getSelectedIndexRange();
				targetIndex = this.currentRange[this.currentRange[0] !== this.previousRange[0] ? 0 : 1];
				this.previousRange = this.currentRange;
				return targetIndex;
			} else {
				// single choice selects handling
				return selectedIndex;
			}
		},
		getActiveOptionOffset: function () {
			// calc values
			var dropHeight = this.listHolder.height(),
				dropScrollTop = this.listHolder.prop('scrollTop'),
				currentIndex = this.getChangedSelectedIndex(),
				fakeOption = this.fakeOptions.eq(currentIndex),
				fakeOptionOffset = fakeOption.offset().top - this.list.offset().top,
				fakeOptionHeight = fakeOption.innerHeight();

			// scroll list
			if (fakeOptionOffset + fakeOptionHeight >= dropScrollTop + dropHeight) {
				// scroll down (always scroll to option)
				return fakeOptionOffset - dropHeight + fakeOptionHeight;
			} else if (fakeOptionOffset < dropScrollTop) {
				// scroll up to option
				return fakeOptionOffset;
			}
		},
		getOverflowHeight: function (sizeValue) {
			var item = this.fakeListItems.eq(sizeValue - 1),
				listOffset = this.list.offset().top,
				itemOffset = item.offset().top,
				itemHeight = item.innerHeight();

			return itemOffset + itemHeight - listOffset;
		},
		getScrollTop: function () {
			return this.listHolder.scrollTop();
		},
		setScrollTop: function (value) {
			this.listHolder.scrollTop(value);
		},
		createOption: function (option) {
			var newOption = document.createElement('span');
			newOption.className = this.options.optionClass;
			newOption.innerHTML = option.innerHTML;
			newOption.setAttribute(this.options.indexAttribute, this.optionIndex++);

			var optionImage, optionImageSrc = option.getAttribute('data-image');
			if (optionImageSrc) {
				optionImage = document.createElement('img');
				optionImage.src = optionImageSrc;
				newOption.insertBefore(optionImage, newOption.childNodes[0]);
			}
			if (option.disabled) {
				newOption.className += ' ' + this.options.disabledClass;
			}
			if (option.className) {
				newOption.className += ' ' + getPrefixedClasses(option.className, this.options.cloneClassPrefix);
			}
			return newOption;
		},
		createOptGroup: function (optgroup) {
			var optGroupContainer = document.createElement('span'),
				optGroupName = optgroup.getAttribute('label'),
				optGroupCaption, optGroupList;

			// create caption
			optGroupCaption = document.createElement('span');
			optGroupCaption.className = this.options.captionClass;
			optGroupCaption.innerHTML = optGroupName;
			optGroupContainer.appendChild(optGroupCaption);

			// create list of options
			if (optgroup.children.length) {
				optGroupList = this.createOptionsList(optgroup);
				optGroupContainer.appendChild(optGroupList);
			}

			optGroupContainer.className = this.options.groupClass;
			return optGroupContainer;
		},
		createOptionContainer: function () {
			var optionContainer = document.createElement('li');
			return optionContainer;
		},
		createOptionsList: function (container) {
			var self = this,
				list = document.createElement('ul');

			$.each(container.children, function (index, currentNode) {
				var item = self.createOptionContainer(currentNode),
					newNode;

				switch (currentNode.tagName.toLowerCase()) {
					case 'option': newNode = self.createOption(currentNode); break;
					case 'optgroup': newNode = self.createOptGroup(currentNode); break;
				}
				list.appendChild(item).appendChild(newNode);
			});
			return list;
		},
		refresh: function () {
			// check for select innerHTML changes
			if (this.storedSelectHTML !== this.element.prop('innerHTML')) {
				this.rebuildList();
			}

			// refresh custom scrollbar
			var scrollInstance = jcf.getInstance(this.listHolder);
			if (scrollInstance) {
				scrollInstance.refresh();
			}

			// refresh selectes classes
			this.refreshSelectedClass();
		},
		destroy: function () {
			this.listHolder.off('jcf-mousewheel', this.preventWheelHandler);
			this.listHolder.off('jcf-pointerdown', this.indexSelector, this.onSelectItem);
			this.listHolder.off('jcf-pointerover', this.indexSelector, this.onHoverItem);
			this.listHolder.off('jcf-pointerdown', this.onPress);
		}
	});

	// helper functions
	var getPrefixedClasses = function (className, prefixToAdd) {
		return className ? className.replace(/[\s]*([\S]+)+[\s]*/gi, prefixToAdd + '$1 ') : '';
	};
	var makeUnselectable = (function () {
		var unselectableClass = jcf.getOptions().unselectableClass;
		function preventHandler(e) {
			e.preventDefault();
		}
		return function (node) {
			node.addClass(unselectableClass).on('selectstart', preventHandler);
		};
	}());

}(jQuery, this));


/*!
 * JavaScript Custom Forms : Radio Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
; (function ($) {
	'use strict';

	jcf.addModule({
		name: 'Radio',
		selector: 'input[type="radio"]',
		options: {
			wrapNative: true,
			checkedClass: 'jcf-checked',
			uncheckedClass: 'jcf-unchecked',
			labelActiveClass: 'jcf-label-active',
			fakeStructure: '<span class="jcf-radio"><span></span></span>'
		},
		matchElement: function (element) {
			return element.is(':radio');
		},
		init: function () {
			this.initStructure();
			this.attachEvents();
			this.refresh();
		},
		initStructure: function () {
			// prepare structure
			this.doc = $(document);
			this.realElement = $(this.options.element);
			this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
			this.labelElement = this.getLabelFor();

			if (this.options.wrapNative) {
				// wrap native radio inside fake block
				this.realElement.prependTo(this.fakeElement).css({
					position: 'absolute',
					opacity: 0
				});
			} else {
				// just hide native radio
				this.realElement.addClass(this.options.hiddenClass);
			}
		},
		attachEvents: function () {
			// add event handlers
			this.realElement.on({
				focus: this.onFocus,
				click: this.onRealClick
			});
			this.fakeElement.on('click', this.onFakeClick);
			this.fakeElement.on('jcf-pointerdown', this.onPress);
		},
		onRealClick: function (e) {
			// redraw current radio and its group (setTimeout handles click that might be prevented)
			var self = this;
			this.savedEventObject = e;
			setTimeout(function () {
				self.refreshRadioGroup();
			}, 0);
		},
		onFakeClick: function (e) {
			// skip event if clicked on real element inside wrapper
			if (this.options.wrapNative && this.realElement.is(e.target)) {
				return;
			}

			// toggle checked class
			if (!this.realElement.is(':disabled')) {
				delete this.savedEventObject;
				this.currentActiveRadio = this.getCurrentActiveRadio();
				this.stateChecked = this.realElement.prop('checked');
				this.realElement.prop('checked', true);
				this.fireNativeEvent(this.realElement, 'click');
				if (this.savedEventObject && this.savedEventObject.isDefaultPrevented()) {
					this.realElement.prop('checked', this.stateChecked);
					this.currentActiveRadio.prop('checked', true);
				} else {
					this.fireNativeEvent(this.realElement, 'change');
				}
				delete this.savedEventObject;
			}
		},
		onFocus: function () {
			if (!this.pressedFlag || !this.focusedFlag) {
				this.focusedFlag = true;
				this.fakeElement.addClass(this.options.focusClass);
				this.realElement.on('blur', this.onBlur);
			}
		},
		onBlur: function () {
			if (!this.pressedFlag) {
				this.focusedFlag = false;
				this.fakeElement.removeClass(this.options.focusClass);
				this.realElement.off('blur', this.onBlur);
			}
		},
		onPress: function (e) {
			if (!this.focusedFlag && e.pointerType === 'mouse') {
				this.realElement.focus();
			}
			this.pressedFlag = true;
			this.fakeElement.addClass(this.options.pressedClass);
			this.doc.on('jcf-pointerup', this.onRelease);
		},
		onRelease: function (e) {
			if (this.focusedFlag && e.pointerType === 'mouse') {
				this.realElement.focus();
			}
			this.pressedFlag = false;
			this.fakeElement.removeClass(this.options.pressedClass);
			this.doc.off('jcf-pointerup', this.onRelease);
		},
		getCurrentActiveRadio: function () {
			return this.getRadioGroup(this.realElement).filter(':checked');
		},
		getRadioGroup: function (radio) {
			// find radio group for specified radio button
			var name = radio.attr('name'),
				parentForm = radio.parents('form');

			if (name) {
				if (parentForm.length) {
					return parentForm.find('input[name="' + name + '"]');
				} else {
					return $('input[name="' + name + '"]:not(form input)');
				}
			} else {
				return radio;
			}
		},
		getLabelFor: function () {
			var parentLabel = this.realElement.closest('label'),
				elementId = this.realElement.prop('id');

			if (!parentLabel.length && elementId) {
				parentLabel = $('label[for="' + elementId + '"]');
			}
			return parentLabel.length ? parentLabel : null;
		},
		refreshRadioGroup: function () {
			// redraw current radio and its group
			this.getRadioGroup(this.realElement).each(function () {
				jcf.refresh(this);
			});
		},
		refresh: function () {
			// redraw current radio button
			var isChecked = this.realElement.is(':checked'),
				isDisabled = this.realElement.is(':disabled');

			this.fakeElement.toggleClass(this.options.checkedClass, isChecked)
				.toggleClass(this.options.uncheckedClass, !isChecked)
				.toggleClass(this.options.disabledClass, isDisabled);

			if (this.labelElement) {
				this.labelElement.toggleClass(this.options.labelActiveClass, isChecked);
			}
		},
		destroy: function () {
			// restore structure
			if (this.options.wrapNative) {
				this.realElement.insertBefore(this.fakeElement).css({
					position: '',
					width: '',
					height: '',
					opacity: '',
					margin: ''
				});
			} else {
				this.realElement.removeClass(this.options.hiddenClass);
			}

			// removing element will also remove its event handlers
			this.fakeElement.off('jcf-pointerdown', this.onPress);
			this.fakeElement.remove();

			// remove other event handlers
			this.doc.off('jcf-pointerup', this.onRelease);
			this.realElement.off({
				blur: this.onBlur,
				focus: this.onFocus,
				click: this.onRealClick
			});
		}
	});

}(jQuery));


/*!
 * JavaScript Custom Forms : Checkbox Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
; (function ($) {
	'use strict';

	jcf.addModule({
		name: 'Checkbox',
		selector: 'input[type="checkbox"]',
		options: {
			wrapNative: true,
			checkedClass: 'jcf-checked',
			uncheckedClass: 'jcf-unchecked',
			labelActiveClass: 'jcf-label-active',
			fakeStructure: '<span class="jcf-checkbox"><span></span></span>'
		},
		matchElement: function (element) {
			return element.is(':checkbox');
		},
		init: function () {
			this.initStructure();
			this.attachEvents();
			this.refresh();
		},
		initStructure: function () {
			// prepare structure
			this.doc = $(document);
			this.realElement = $(this.options.element);
			this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
			this.labelElement = this.getLabelFor();

			if (this.options.wrapNative) {
				// wrap native checkbox inside fake block
				this.realElement.appendTo(this.fakeElement).css({
					position: 'absolute',
					height: '100%',
					width: '100%',
					opacity: 0,
					margin: 0
				});
			} else {
				// just hide native checkbox
				this.realElement.addClass(this.options.hiddenClass);
			}
		},
		attachEvents: function () {
			// add event handlers
			this.realElement.on({
				focus: this.onFocus,
				click: this.onRealClick
			});
			this.fakeElement.on('click', this.onFakeClick);
			this.fakeElement.on('jcf-pointerdown', this.onPress);
		},
		onRealClick: function (e) {
			// just redraw fake element (setTimeout handles click that might be prevented)
			var self = this;
			this.savedEventObject = e;
			setTimeout(function () {
				self.refresh();
			}, 0);
		},
		onFakeClick: function (e) {
			// skip event if clicked on real element inside wrapper
			if (this.options.wrapNative && this.realElement.is(e.target)) {
				return;
			}

			// toggle checked class
			if (!this.realElement.is(':disabled')) {
				delete this.savedEventObject;
				this.stateChecked = this.realElement.prop('checked');
				this.realElement.prop('checked', !this.stateChecked);
				this.fireNativeEvent(this.realElement, 'click');
				if (this.savedEventObject && this.savedEventObject.isDefaultPrevented()) {
					this.realElement.prop('checked', this.stateChecked);
				} else {
					this.fireNativeEvent(this.realElement, 'change');
				}
				delete this.savedEventObject;
			}
		},
		onFocus: function () {
			if (!this.pressedFlag || !this.focusedFlag) {
				this.focusedFlag = true;
				this.fakeElement.addClass(this.options.focusClass);
				this.realElement.on('blur', this.onBlur);
			}
		},
		onBlur: function () {
			if (!this.pressedFlag) {
				this.focusedFlag = false;
				this.fakeElement.removeClass(this.options.focusClass);
				this.realElement.off('blur', this.onBlur);
			}
		},
		onPress: function (e) {
			if (!this.focusedFlag && e.pointerType === 'mouse') {
				this.realElement.focus();
			}
			this.pressedFlag = true;
			this.fakeElement.addClass(this.options.pressedClass);
			this.doc.on('jcf-pointerup', this.onRelease);
		},
		onRelease: function (e) {
			if (this.focusedFlag && e.pointerType === 'mouse') {
				this.realElement.focus();
			}
			this.pressedFlag = false;
			this.fakeElement.removeClass(this.options.pressedClass);
			this.doc.off('jcf-pointerup', this.onRelease);
		},
		getLabelFor: function () {
			var parentLabel = this.realElement.closest('label'),
				elementId = this.realElement.prop('id');

			if (!parentLabel.length && elementId) {
				parentLabel = $('label[for="' + elementId + '"]');
			}
			return parentLabel.length ? parentLabel : null;
		},
		refresh: function () {
			// redraw custom checkbox
			var isChecked = this.realElement.is(':checked'),
				isDisabled = this.realElement.is(':disabled');

			this.fakeElement.toggleClass(this.options.checkedClass, isChecked)
				.toggleClass(this.options.uncheckedClass, !isChecked)
				.toggleClass(this.options.disabledClass, isDisabled);

			if (this.labelElement) {
				this.labelElement.toggleClass(this.options.labelActiveClass, isChecked);
			}
		},
		destroy: function () {
			// restore structure
			if (this.options.wrapNative) {
				this.realElement.insertBefore(this.fakeElement).css({
					position: '',
					width: '',
					height: '',
					opacity: '',
					margin: ''
				});
			} else {
				this.realElement.removeClass(this.options.hiddenClass);
			}

			// removing element will also remove its event handlers
			this.fakeElement.off('jcf-pointerdown', this.onPress);
			this.fakeElement.remove();

			// remove other event handlers
			this.doc.off('jcf-pointerup', this.onRelease);
			this.realElement.off({
				focus: this.onFocus,
				click: this.onRealClick
			});
		}
	});

}(jQuery));


/*!
 * JavaScript Custom Forms : Scrollbar Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
; (function ($, window) {
	'use strict';

	jcf.addModule({
		name: 'Scrollable',
		selector: '.jcf-scrollable',
		plugins: {
			ScrollBar: ScrollBar
		},
		options: {
			mouseWheelStep: 150,
			handleResize: true,
			alwaysShowScrollbars: false,
			alwaysPreventMouseWheel: false,
			scrollAreaStructure: '<div class="jcf-scrollable-wrapper"></div>'
		},
		matchElement: function (element) {
			return element.is('.jcf-scrollable');
		},
		init: function () {
			this.initStructure();
			this.attachEvents();
			this.rebuildScrollbars();
		},
		initStructure: function () {
			// prepare structure
			this.doc = $(document);
			this.win = $(window);
			this.realElement = $(this.options.element);
			this.scrollWrapper = $(this.options.scrollAreaStructure).insertAfter(this.realElement);

			// set initial styles
			this.scrollWrapper.css('position', 'relative');
			// this.realElement.css('overflow', 'hidden');
			this.realElement.css('overflow', this.options.ios && this.options.ios >= 10 ? 'auto' : 'hidden');
			this.vBarEdge = 0;
		},
		attachEvents: function () {
			// create scrollbars
			var self = this;
			this.vBar = new ScrollBar({
				holder: this.scrollWrapper,
				vertical: true,
				onScroll: function (scrollTop) {
					self.realElement.scrollTop(scrollTop);
				}
			});
			this.hBar = new ScrollBar({
				holder: this.scrollWrapper,
				vertical: false,
				onScroll: function (scrollLeft) {
					self.realElement.scrollLeft(scrollLeft);
				}
			});

			// add event handlers
			this.realElement.on('scroll', this.onScroll);
			if (this.options.handleResize) {
				this.win.on('resize orientationchange load', this.onResize);
			}

			// add pointer/wheel event handlers
			this.realElement.on('jcf-mousewheel', this.onMouseWheel);
			this.realElement.on('jcf-pointerdown', this.onTouchBody);
		},
		onScroll: function () {
			this.redrawScrollbars();
		},
		onResize: function () {
			// do not rebuild scrollbars if form field is in focus
			if (!$(document.activeElement).is(':input')) {
				this.rebuildScrollbars();
			}
		},
		onTouchBody: function (e) {
			if (e.pointerType === 'touch') {
				this.touchData = {
					scrollTop: this.realElement.scrollTop(),
					scrollLeft: this.realElement.scrollLeft(),
					left: e.pageX,
					top: e.pageY
				};
				this.doc.on({
					'jcf-pointermove': this.onMoveBody,
					'jcf-pointerup': this.onReleaseBody
				});
			}
		},
		onMoveBody: function (e) {
			var targetScrollTop,
				targetScrollLeft,
				verticalScrollAllowed = this.verticalScrollActive,
				horizontalScrollAllowed = this.horizontalScrollActive;

			if (e.pointerType === 'touch') {
				targetScrollTop = this.touchData.scrollTop - e.pageY + this.touchData.top;
				targetScrollLeft = this.touchData.scrollLeft - e.pageX + this.touchData.left;

				// check that scrolling is ended and release outer scrolling
				if (this.verticalScrollActive && (targetScrollTop < 0 || targetScrollTop > this.vBar.maxValue)) {
					verticalScrollAllowed = false;
				}
				if (this.horizontalScrollActive && (targetScrollLeft < 0 || targetScrollLeft > this.hBar.maxValue)) {
					horizontalScrollAllowed = false;
				}

				this.realElement.scrollTop(targetScrollTop);
				this.realElement.scrollLeft(targetScrollLeft);

				if (verticalScrollAllowed || horizontalScrollAllowed) {
					e.preventDefault();
				} else {
					this.onReleaseBody(e);
				}
			}
		},
		onReleaseBody: function (e) {
			if (e.pointerType === 'touch') {
				delete this.touchData;
				this.doc.off({
					'jcf-pointermove': this.onMoveBody,
					'jcf-pointerup': this.onReleaseBody
				});
			}
		},
		onMouseWheel: function (e) {
			var currentScrollTop = this.realElement.scrollTop(),
				currentScrollLeft = this.realElement.scrollLeft(),
				maxScrollTop = this.realElement.prop('scrollHeight') - this.embeddedDimensions.innerHeight,
				maxScrollLeft = this.realElement.prop('scrollWidth') - this.embeddedDimensions.innerWidth,
				extraLeft, extraTop, preventFlag;

			// check edge cases
			if (!this.options.alwaysPreventMouseWheel) {
				if (this.verticalScrollActive && e.deltaY) {
					if (!(currentScrollTop <= 0 && e.deltaY < 0) && !(currentScrollTop >= maxScrollTop && e.deltaY > 0)) {
						preventFlag = true;
					}
				}
				if (this.horizontalScrollActive && e.deltaX) {
					if (!(currentScrollLeft <= 0 && e.deltaX < 0) && !(currentScrollLeft >= maxScrollLeft && e.deltaX > 0)) {
						preventFlag = true;
					}
				}
				if (!this.verticalScrollActive && !this.horizontalScrollActive) {
					return;
				}
			}

			// prevent default action and scroll item
			if (preventFlag || this.options.alwaysPreventMouseWheel) {
				e.preventDefault();
			} else {
				return;
			}

			extraLeft = e.deltaX / 100 * this.options.mouseWheelStep;
			extraTop = e.deltaY / 100 * this.options.mouseWheelStep;

			this.realElement.scrollTop(currentScrollTop + extraTop);
			this.realElement.scrollLeft(currentScrollLeft + extraLeft);
		},
		setScrollBarEdge: function (edgeSize) {
			this.vBarEdge = edgeSize || 0;
			this.redrawScrollbars();
		},
		saveElementDimensions: function () {
			this.savedDimensions = {
				top: this.realElement.width(),
				left: this.realElement.height()
			};
			return this;
		},
		restoreElementDimensions: function () {
			if (this.savedDimensions) {
				this.realElement.css({
					width: this.savedDimensions.width,
					height: this.savedDimensions.height
				});
			}
			return this;
		},
		saveScrollOffsets: function () {
			this.savedOffsets = {
				top: this.realElement.scrollTop(),
				left: this.realElement.scrollLeft()
			};
			return this;
		},
		restoreScrollOffsets: function () {
			if (this.savedOffsets) {
				this.realElement.scrollTop(this.savedOffsets.top);
				this.realElement.scrollLeft(this.savedOffsets.left);
			}
			return this;
		},
		getContainerDimensions: function () {
			// save current styles
			var desiredDimensions,
				currentStyles,
				currentHeight,
				currentWidth;

			if (this.isModifiedStyles) {
				desiredDimensions = {
					width: this.realElement.innerWidth() + this.vBar.getThickness(),
					height: this.realElement.innerHeight() + this.hBar.getThickness()
				};
			} else {
				// unwrap real element and measure it according to CSS
				this.saveElementDimensions().saveScrollOffsets();
				this.realElement.insertAfter(this.scrollWrapper);
				this.scrollWrapper.detach();

				// measure element
				currentStyles = this.realElement.prop('style');
				currentWidth = parseFloat(currentStyles.width);
				currentHeight = parseFloat(currentStyles.height);

				// reset styles if needed
				if (this.embeddedDimensions && currentWidth && currentHeight) {
					this.isModifiedStyles |= (currentWidth !== this.embeddedDimensions.width || currentHeight !== this.embeddedDimensions.height);
					this.realElement.css({
						overflow: '',
						width: '',
						height: ''
					});
				}

				// calculate desired dimensions for real element
				desiredDimensions = {
					width: this.realElement.outerWidth(),
					height: this.realElement.outerHeight()
				};

				// restore structure and original scroll offsets
				this.scrollWrapper.insertAfter(this.realElement);
				this.realElement.css('overflow', this.options.ios && this.options.ios >= 10 ? 'auto' : 'hidden').prependTo(this.scrollWrapper);
				this.restoreElementDimensions().restoreScrollOffsets();
			}

			return desiredDimensions;
		},
		getEmbeddedDimensions: function (dimensions) {
			// handle scrollbars cropping
			var fakeBarWidth = this.vBar.getThickness(),
				fakeBarHeight = this.hBar.getThickness(),
				paddingWidth = this.realElement.outerWidth() - this.realElement.width(),
				paddingHeight = this.realElement.outerHeight() - this.realElement.height(),
				resultDimensions;

			if (this.options.alwaysShowScrollbars) {
				// simply return dimensions without custom scrollbars
				this.verticalScrollActive = true;
				this.horizontalScrollActive = true;
				resultDimensions = {
					innerWidth: dimensions.width - fakeBarWidth,
					innerHeight: dimensions.height - fakeBarHeight
				};
			} else {
				// detect when to display each scrollbar
				this.saveElementDimensions();
				this.verticalScrollActive = false;
				this.horizontalScrollActive = false;

				// fill container with full size
				this.realElement.css({
					width: dimensions.width - paddingWidth,
					height: dimensions.height - paddingHeight
				});

				this.horizontalScrollActive = this.realElement.prop('scrollWidth') > this.containerDimensions.width;
				this.verticalScrollActive = this.realElement.prop('scrollHeight') > this.containerDimensions.height;

				this.restoreElementDimensions();
				resultDimensions = {
					innerWidth: dimensions.width - (this.verticalScrollActive ? fakeBarWidth : 0),
					innerHeight: dimensions.height - (this.horizontalScrollActive ? fakeBarHeight : 0)
				};
			}
			$.extend(resultDimensions, {
				width: resultDimensions.innerWidth - paddingWidth,
				height: resultDimensions.innerHeight - paddingHeight
			});
			return resultDimensions;
		},
		rebuildScrollbars: function () {
			// resize wrapper according to real element styles
			this.containerDimensions = this.getContainerDimensions();
			this.embeddedDimensions = this.getEmbeddedDimensions(this.containerDimensions);

			// resize wrapper to desired dimensions
			this.scrollWrapper.css({
				width: this.containerDimensions.width,
				height: this.containerDimensions.height
			});

			// resize element inside wrapper excluding scrollbar size
			this.realElement.css({
				overflow: this.options.ios && this.options.ios >= 10 ? 'auto' : 'hidden',
				width: this.embeddedDimensions.width,
				height: this.embeddedDimensions.height
			});

			// redraw scrollbar offset
			this.redrawScrollbars();
		},
		redrawScrollbars: function () {
			var viewSize, maxScrollValue;

			// redraw vertical scrollbar
			if (this.verticalScrollActive) {
				viewSize = this.vBarEdge ? this.containerDimensions.height - this.vBarEdge : this.embeddedDimensions.innerHeight;
				maxScrollValue = Math.max(this.realElement.prop('offsetHeight'), this.realElement.prop('scrollHeight')) - this.vBarEdge;

				this.vBar.show().setMaxValue(maxScrollValue - viewSize).setRatio(viewSize / maxScrollValue).setSize(viewSize);
				this.vBar.setValue(this.realElement.scrollTop());
			} else {
				this.vBar.hide();
			}

			// redraw horizontal scrollbar
			if (this.horizontalScrollActive) {
				viewSize = this.embeddedDimensions.innerWidth;
				maxScrollValue = this.realElement.prop('scrollWidth');

				if (maxScrollValue === viewSize) {
					this.horizontalScrollActive = false;
				}
				this.hBar.show().setMaxValue(maxScrollValue - viewSize).setRatio(viewSize / maxScrollValue).setSize(viewSize);
				this.hBar.setValue(this.realElement.scrollLeft());
			} else {
				this.hBar.hide();
			}

			// set "touch-action" style rule
			var touchAction = '';
			if (this.verticalScrollActive && this.horizontalScrollActive) {
				touchAction = 'none';
			} else if (this.verticalScrollActive) {
				touchAction = 'pan-x';
			} else if (this.horizontalScrollActive) {
				touchAction = 'pan-y';
			}
			this.realElement.css('touchAction', touchAction);
		},
		refresh: function () {
			this.rebuildScrollbars();
		},
		destroy: function () {
			// remove event listeners
			this.win.off('resize orientationchange load', this.onResize);
			this.realElement.off({
				'jcf-mousewheel': this.onMouseWheel,
				'jcf-pointerdown': this.onTouchBody
			});
			this.doc.off({
				'jcf-pointermove': this.onMoveBody,
				'jcf-pointerup': this.onReleaseBody
			});

			// restore structure
			this.saveScrollOffsets();
			this.vBar.destroy();
			this.hBar.destroy();
			this.realElement.insertAfter(this.scrollWrapper).css({
				touchAction: '',
				overflow: '',
				width: '',
				height: ''
			});
			this.scrollWrapper.remove();
			this.restoreScrollOffsets();
		}
	});

	// custom scrollbar
	function ScrollBar(options) {
		this.options = $.extend({
			holder: null,
			vertical: true,
			inactiveClass: 'jcf-inactive',
			verticalClass: 'jcf-scrollbar-vertical',
			horizontalClass: 'jcf-scrollbar-horizontal',
			scrollbarStructure: '<div class="jcf-scrollbar"><div class="jcf-scrollbar-dec"></div><div class="jcf-scrollbar-slider"><div class="jcf-scrollbar-handle"></div></div><div class="jcf-scrollbar-inc"></div></div>',
			btnDecSelector: '.jcf-scrollbar-dec',
			btnIncSelector: '.jcf-scrollbar-inc',
			sliderSelector: '.jcf-scrollbar-slider',
			handleSelector: '.jcf-scrollbar-handle',
			scrollInterval: 300,
			scrollStep: 400 // px/sec
		}, options);
		this.init();
	}
	$.extend(ScrollBar.prototype, {
		init: function () {
			this.initStructure();
			this.attachEvents();
		},
		initStructure: function () {
			// define proporties
			this.doc = $(document);
			this.isVertical = !!this.options.vertical;
			this.sizeProperty = this.isVertical ? 'height' : 'width';
			this.fullSizeProperty = this.isVertical ? 'outerHeight' : 'outerWidth';
			this.invertedSizeProperty = this.isVertical ? 'width' : 'height';
			this.thicknessMeasureMethod = 'outer' + this.invertedSizeProperty.charAt(0).toUpperCase() + this.invertedSizeProperty.substr(1);
			this.offsetProperty = this.isVertical ? 'top' : 'left';
			this.offsetEventProperty = this.isVertical ? 'pageY' : 'pageX';

			// initialize variables
			this.value = this.options.value || 0;
			this.maxValue = this.options.maxValue || 0;
			this.currentSliderSize = 0;
			this.handleSize = 0;

			// find elements
			this.holder = $(this.options.holder);
			this.scrollbar = $(this.options.scrollbarStructure).appendTo(this.holder);
			this.btnDec = this.scrollbar.find(this.options.btnDecSelector);
			this.btnInc = this.scrollbar.find(this.options.btnIncSelector);
			this.slider = this.scrollbar.find(this.options.sliderSelector);
			this.handle = this.slider.find(this.options.handleSelector);

			// set initial styles
			this.scrollbar.addClass(this.isVertical ? this.options.verticalClass : this.options.horizontalClass).css({
				touchAction: this.isVertical ? 'pan-x' : 'pan-y',
				position: 'absolute'
			});
			this.slider.css({
				position: 'relative'
			});
			this.handle.css({
				touchAction: 'none',
				position: 'absolute'
			});
		},
		attachEvents: function () {
			this.bindHandlers();
			this.handle.on('jcf-pointerdown', this.onHandlePress);
			this.slider.add(this.btnDec).add(this.btnInc).on('jcf-pointerdown', this.onButtonPress);
		},
		onHandlePress: function (e) {
			if (e.pointerType === 'mouse' && e.button > 1) {
				return;
			} else {
				e.preventDefault();
				this.handleDragActive = true;
				this.sliderOffset = this.slider.offset()[this.offsetProperty];
				this.innerHandleOffset = e[this.offsetEventProperty] - this.handle.offset()[this.offsetProperty];

				this.doc.on('jcf-pointermove', this.onHandleDrag);
				this.doc.on('jcf-pointerup', this.onHandleRelease);
			}
		},
		onHandleDrag: function (e) {
			e.preventDefault();
			this.calcOffset = e[this.offsetEventProperty] - this.sliderOffset - this.innerHandleOffset;
			this.setValue(this.calcOffset / (this.currentSliderSize - this.handleSize) * this.maxValue);
			this.triggerScrollEvent(this.value);
		},
		onHandleRelease: function () {
			this.handleDragActive = false;
			this.doc.off('jcf-pointermove', this.onHandleDrag);
			this.doc.off('jcf-pointerup', this.onHandleRelease);
		},
		onButtonPress: function (e) {
			var direction, clickOffset;
			if (e.pointerType === 'mouse' && e.button > 1) {
				return;
			} else {
				e.preventDefault();
				if (!this.handleDragActive) {
					if (this.slider.is(e.currentTarget)) {
						// slider pressed
						direction = this.handle.offset()[this.offsetProperty] > e[this.offsetEventProperty] ? -1 : 1;
						clickOffset = e[this.offsetEventProperty] - this.slider.offset()[this.offsetProperty];
						this.startPageScrolling(direction, clickOffset);
					} else {
						// scrollbar buttons pressed
						direction = this.btnDec.is(e.currentTarget) ? -1 : 1;
						this.startSmoothScrolling(direction);
					}
					this.doc.on('jcf-pointerup', this.onButtonRelease);
				}
			}
		},
		onButtonRelease: function () {
			this.stopPageScrolling();
			this.stopSmoothScrolling();
			this.doc.off('jcf-pointerup', this.onButtonRelease);
		},
		startPageScrolling: function (direction, clickOffset) {
			var self = this,
				stepValue = direction * self.currentSize;

			// limit checker
			var isFinishedScrolling = function () {
				var handleTop = (self.value / self.maxValue) * (self.currentSliderSize - self.handleSize);

				if (direction > 0) {
					return handleTop + self.handleSize >= clickOffset;
				} else {
					return handleTop <= clickOffset;
				}
			};

			// scroll by page when track is pressed
			var doPageScroll = function () {
				self.value += stepValue;
				self.setValue(self.value);
				self.triggerScrollEvent(self.value);

				if (isFinishedScrolling()) {
					clearInterval(self.pageScrollTimer);
				}
			};

			// start scrolling
			this.pageScrollTimer = setInterval(doPageScroll, this.options.scrollInterval);
			doPageScroll();
		},
		stopPageScrolling: function () {
			clearInterval(this.pageScrollTimer);
		},
		startSmoothScrolling: function (direction) {
			var self = this, dt;
			this.stopSmoothScrolling();

			// simple animation functions
			var raf = window.requestAnimationFrame || function (func) {
				setTimeout(func, 16);
			};
			var getTimestamp = function () {
				return Date.now ? Date.now() : new Date().getTime();
			};

			// set animation limit
			var isFinishedScrolling = function () {
				if (direction > 0) {
					return self.value >= self.maxValue;
				} else {
					return self.value <= 0;
				}
			};

			// animation step
			var doScrollAnimation = function () {
				var stepValue = (getTimestamp() - dt) / 1000 * self.options.scrollStep;

				if (self.smoothScrollActive) {
					self.value += stepValue * direction;
					self.setValue(self.value);
					self.triggerScrollEvent(self.value);

					if (!isFinishedScrolling()) {
						dt = getTimestamp();
						raf(doScrollAnimation);
					}
				}
			};

			// start animation
			self.smoothScrollActive = true;
			dt = getTimestamp();
			raf(doScrollAnimation);
		},
		stopSmoothScrolling: function () {
			this.smoothScrollActive = false;
		},
		triggerScrollEvent: function (scrollValue) {
			if (this.options.onScroll) {
				this.options.onScroll(scrollValue);
			}
		},
		getThickness: function () {
			return this.scrollbar[this.thicknessMeasureMethod]();
		},
		setSize: function (size) {
			// resize scrollbar
			var btnDecSize = this.btnDec[this.fullSizeProperty](),
				btnIncSize = this.btnInc[this.fullSizeProperty]();

			// resize slider
			this.currentSize = size;
			this.currentSliderSize = size - btnDecSize - btnIncSize;
			this.scrollbar.css(this.sizeProperty, size);
			this.slider.css(this.sizeProperty, this.currentSliderSize);
			this.currentSliderSize = this.slider[this.sizeProperty]();

			// resize handle
			this.handleSize = Math.round(this.currentSliderSize * this.ratio);
			this.handle.css(this.sizeProperty, this.handleSize);
			this.handleSize = this.handle[this.fullSizeProperty]();

			return this;
		},
		setRatio: function (ratio) {
			this.ratio = ratio;
			return this;
		},
		setMaxValue: function (maxValue) {
			this.maxValue = maxValue;
			this.setValue(Math.min(this.value, this.maxValue));
			return this;
		},
		setValue: function (value) {
			this.value = value;
			if (this.value < 0) {
				this.value = 0;
			} else if (this.value > this.maxValue) {
				this.value = this.maxValue;
			}
			this.refresh();
		},
		setPosition: function (styles) {
			this.scrollbar.css(styles);
			return this;
		},
		hide: function () {
			this.scrollbar.detach();
			return this;
		},
		show: function () {
			this.scrollbar.appendTo(this.holder);
			return this;
		},
		refresh: function () {
			// recalculate handle position
			if (this.value === 0 || this.maxValue === 0) {
				this.calcOffset = 0;
			} else {
				this.calcOffset = (this.value / this.maxValue) * (this.currentSliderSize - this.handleSize);
			}
			this.handle.css(this.offsetProperty, this.calcOffset);

			// toggle inactive classes
			this.btnDec.toggleClass(this.options.inactiveClass, this.value === 0);
			this.btnInc.toggleClass(this.options.inactiveClass, this.value === this.maxValue);
			this.scrollbar.toggleClass(this.options.inactiveClass, this.maxValue === 0);
		},
		destroy: function () {
			// remove event handlers and scrollbar block itself
			this.btnDec.add(this.btnInc).off('jcf-pointerdown', this.onButtonPress);
			this.handle.off('jcf-pointerdown', this.onHandlePress);
			this.doc.off('jcf-pointermove', this.onHandleDrag);
			this.doc.off('jcf-pointerup', this.onHandleRelease);
			this.doc.off('jcf-pointerup', this.onButtonRelease);
			this.stopSmoothScrolling();
			this.stopPageScrolling();
			this.scrollbar.remove();
		}
	});

}(jQuery, this));


/*!
 * JavaScript Custom Forms : File Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
; (function ($) {
	'use strict';

	jcf.addModule({
		name: 'File',
		selector: 'input[type="file"]',
		options: {
			fakeStructure: '<span class="jcf-file"><span class="jcf-fake-input"></span><span class="jcf-upload-button"><span class="jcf-button-content"></span></span></span>',
			buttonText: 'Choose file',
			placeholderText: 'No file chosen',
			realElementClass: 'jcf-real-element',
			extensionPrefixClass: 'jcf-extension-',
			selectedFileBlock: '.jcf-fake-input',
			buttonTextBlock: '.jcf-button-content'
		},
		matchElement: function (element) {
			return element.is('input[type="file"]');
		},
		init: function () {
			this.initStructure();
			this.attachEvents();
			this.refresh();
		},
		initStructure: function () {
			this.doc = $(document);
			this.realElement = $(this.options.element).addClass(this.options.realElementClass);
			this.fakeElement = $(this.options.fakeStructure).insertBefore(this.realElement);
			this.fileNameBlock = this.fakeElement.find(this.options.selectedFileBlock);
			this.buttonTextBlock = this.fakeElement.find(this.options.buttonTextBlock).text(this.options.buttonText);

			this.realElement.appendTo(this.fakeElement).css({
				position: 'absolute',
				opacity: 0
			});
		},
		attachEvents: function () {
			this.realElement.on({
				'jcf-pointerdown': this.onPress,
				change: this.onChange,
				focus: this.onFocus
			});
		},
		onChange: function () {
			this.refresh();
		},
		onFocus: function () {
			this.fakeElement.addClass(this.options.focusClass);
			this.realElement.on('blur', this.onBlur);
		},
		onBlur: function () {
			this.fakeElement.removeClass(this.options.focusClass);
			this.realElement.off('blur', this.onBlur);
		},
		onPress: function () {
			this.fakeElement.addClass(this.options.pressedClass);
			this.doc.on('jcf-pointerup', this.onRelease);
		},
		onRelease: function () {
			this.fakeElement.removeClass(this.options.pressedClass);
			this.doc.off('jcf-pointerup', this.onRelease);
		},
		getFileName: function () {
			var resultFileName = '',
				files = this.realElement.prop('files');

			if (files && files.length) {
				$.each(files, function (index, file) {
					resultFileName += (index > 0 ? ', ' : '') + file.name;
				});
			} else {
				resultFileName = this.realElement.val().replace(/^[\s\S]*(?:\\|\/)([\s\S^\\\/]*)$/g, '$1');
			}

			return resultFileName;
		},
		getFileExtension: function () {
			var fileName = this.realElement.val();
			return fileName.lastIndexOf('.') < 0 ? '' : fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
		},
		updateExtensionClass: function () {
			var currentExtension = this.getFileExtension(),
				currentClassList = this.fakeElement.prop('className'),
				cleanedClassList = currentClassList.replace(new RegExp('(\\s|^)' + this.options.extensionPrefixClass + '[^ ]+', 'gi'), '');

			this.fakeElement.prop('className', cleanedClassList);
			if (currentExtension) {
				this.fakeElement.addClass(this.options.extensionPrefixClass + currentExtension);
			}
		},
		refresh: function () {
			var selectedFileName = this.getFileName() || this.options.placeholderText;
			this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(':disabled'));
			this.fileNameBlock.text(selectedFileName);
			this.updateExtensionClass();
		},
		destroy: function () {
			// reset styles and restore element position
			this.realElement.insertBefore(this.fakeElement).removeClass(this.options.realElementClass).css({
				position: '',
				opacity: ''
			});
			this.fakeElement.remove();

			// remove event handlers
			this.realElement.off({
				'jcf-pointerdown': this.onPress,
				change: this.onChange,
				focus: this.onFocus,
				blur: this.onBlur
			});
			this.doc.off('jcf-pointerup', this.onRelease);
		}
	});

}(jQuery));


/*!
 * JavaScript Custom Forms : Range Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
; (function ($) {
	'use strict';

	jcf.addModule({
		name: 'Range',
		selector: 'input[type="range"]',
		options: {
			realElementClass: 'jcf-real-element',
			fakeStructure: '<span class="jcf-range"><span class="jcf-range-wrapper"><span class="jcf-range-track"><span class="jcf-range-handle"></span></span></span></span>',
			dataListMark: '<span class="jcf-range-mark"></span>',
			rangeDisplayWrapper: '<span class="jcf-range-display-wrapper"></span>',
			rangeDisplay: '<span class="jcf-range-display"></span>',
			handleSelector: '.jcf-range-handle',
			trackSelector: '.jcf-range-track',
			activeHandleClass: 'jcf-active-handle',
			verticalClass: 'jcf-vertical',
			orientation: 'horizontal',
			range: false, // or "min", "max", "all"
			dragHandleCenter: true,
			snapToMarks: true,
			snapRadius: 5
		},
		matchElement: function (element) {
			return element.is(this.selector);
		},
		init: function () {
			this.initStructure();
			this.attachEvents();
			this.refresh();
		},
		initStructure: function () {
			this.page = $('html');
			this.realElement = $(this.options.element).addClass(this.options.hiddenClass);
			this.fakeElement = $(this.options.fakeStructure).insertBefore(this.realElement).prepend(this.realElement);
			this.track = this.fakeElement.find(this.options.trackSelector);
			this.trackHolder = this.track.parent();
			this.handle = this.fakeElement.find(this.options.handleSelector);
			this.createdHandleCount = 0;
			this.activeDragHandleIndex = 0;
			this.isMultiple = this.realElement.prop('multiple') || typeof this.realElement.attr('multiple') === 'string';
			this.values = this.isMultiple ? this.realElement.attr('value').split(',') : [this.realElement.val()];
			this.handleCount = this.isMultiple ? this.values.length : 1;

			// create range display
			this.rangeDisplayWrapper = $(this.options.rangeDisplayWrapper).insertBefore(this.track);
			if (this.options.range === 'min' || this.options.range === 'all') {
				this.rangeMin = $(this.options.rangeDisplay).addClass('jcf-range-min').prependTo(this.rangeDisplayWrapper);
			}
			if (this.options.range === 'max' || this.options.range === 'all') {
				this.rangeMax = $(this.options.rangeDisplay).addClass('jcf-range-max').prependTo(this.rangeDisplayWrapper);
			}

			// clone handles if needed
			while (this.createdHandleCount < this.handleCount) {
				this.createdHandleCount++;
				this.handle.clone().addClass('jcf-index-' + this.createdHandleCount).insertBefore(this.handle);

				// create mid ranges
				if (this.createdHandleCount > 1) {
					if (!this.rangeMid) {
						this.rangeMid = $();
					}
					this.rangeMid = this.rangeMid.add($(this.options.rangeDisplay).addClass('jcf-range-mid').prependTo(this.rangeDisplayWrapper));
				}
			}

			// grab all handles
			this.handle.detach();
			this.handle = null;
			this.handles = this.fakeElement.find(this.options.handleSelector);
			this.handles.eq(0).addClass(this.options.activeHandleClass);

			// handle orientation
			this.isVertical = (this.options.orientation === 'vertical');
			this.directionProperty = this.isVertical ? 'top' : 'left';
			this.offsetProperty = this.isVertical ? 'bottom' : 'left';
			this.eventProperty = this.isVertical ? 'pageY' : 'pageX';
			this.sizeProperty = this.isVertical ? 'height' : 'width';
			this.sizeMethod = this.isVertical ? 'innerHeight' : 'innerWidth';
			this.fakeElement.css('touchAction', this.isVertical ? 'pan-x' : 'pan-y');
			if (this.isVertical) {
				this.fakeElement.addClass(this.options.verticalClass);
			}

			// set initial values
			this.minValue = parseFloat(this.realElement.attr('min'));
			this.maxValue = parseFloat(this.realElement.attr('max'));
			this.stepValue = parseFloat(this.realElement.attr('step')) || 1;

			// check attribute values
			this.minValue = isNaN(this.minValue) ? 0 : this.minValue;
			this.maxValue = isNaN(this.maxValue) ? 100 : this.maxValue;

			// handle range
			if (this.stepValue !== 1) {
				this.maxValue -= (this.maxValue - this.minValue) % this.stepValue;
			}
			this.stepsCount = (this.maxValue - this.minValue) / this.stepValue;
			this.createDataList();
		},
		attachEvents: function () {
			this.realElement.on({
				focus: this.onFocus
			});
			this.trackHolder.on('jcf-pointerdown', this.onTrackPress);
			this.handles.on('jcf-pointerdown', this.onHandlePress);
		},
		createDataList: function () {
			var self = this,
				dataValues = [],
				dataListId = this.realElement.attr('list');

			if (dataListId) {
				$('#' + dataListId).find('option').each(function () {
					var itemValue = parseFloat(this.value || this.innerHTML),
						mark, markOffset;

					if (!isNaN(itemValue)) {
						markOffset = self.valueToOffset(itemValue);
						dataValues.push({
							value: itemValue,
							offset: markOffset
						});
						mark = $(self.options.dataListMark).text(itemValue).attr({
							'data-mark-value': itemValue
						}).css(self.offsetProperty, markOffset + '%').appendTo(self.track);
					}
				});
				if (dataValues.length) {
					self.dataValues = dataValues;
				}
			}
		},
		getDragHandleRange: function (handleIndex) {
			// calculate range for slider with multiple handles
			var minStep = -Infinity,
				maxStep = Infinity;

			if (handleIndex > 0) {
				minStep = this.valueToStepIndex(this.values[handleIndex - 1]);
			}
			if (handleIndex < this.handleCount - 1) {
				maxStep = this.valueToStepIndex(this.values[handleIndex + 1]);
			}

			return {
				minStepIndex: minStep,
				maxStepIndex: maxStep
			};
		},
		getNearestHandle: function (percent) {
			// handle vertical sliders
			if (this.isVertical) {
				percent = 1 - percent;
			}

			// detect closest handle when track is pressed
			var closestHandle = this.handles.eq(0),
				closestDistance = Infinity,
				self = this;

			if (this.handleCount > 1) {
				this.handles.each(function () {
					var handleOffset = parseFloat(this.style[self.offsetProperty]) / 100,
						handleDistance = Math.abs(handleOffset - percent);

					if (handleDistance < closestDistance) {
						closestDistance = handleDistance;
						closestHandle = $(this);
					}
				});
			}
			return closestHandle;
		},
		onTrackPress: function (e) {
			var trackSize, trackOffset, innerOffset;

			e.preventDefault();
			if (!this.realElement.is(':disabled') && !this.activeDragHandle) {
				trackSize = this.track[this.sizeMethod]();
				trackOffset = this.track.offset()[this.directionProperty];
				this.activeDragHandle = this.getNearestHandle((e[this.eventProperty] - trackOffset) / this.trackHolder[this.sizeMethod]());
				this.activeDragHandleIndex = this.handles.index(this.activeDragHandle);
				this.handles.removeClass(this.options.activeHandleClass).eq(this.activeDragHandleIndex).addClass(this.options.activeHandleClass);
				innerOffset = this.activeDragHandle[this.sizeMethod]() / 2;

				this.dragData = {
					trackSize: trackSize,
					innerOffset: innerOffset,
					trackOffset: trackOffset,
					min: trackOffset,
					max: trackOffset + trackSize
				};
				this.page.on({
					'jcf-pointermove': this.onHandleMove,
					'jcf-pointerup': this.onHandleRelease
				});

				if (e.pointerType === 'mouse') {
					this.realElement.focus();
				}

				this.onHandleMove(e);
			}
		},
		onHandlePress: function (e) {
			var trackSize, trackOffset, innerOffset;

			e.preventDefault();
			if (!this.realElement.is(':disabled') && !this.activeDragHandle) {
				this.activeDragHandle = $(e.currentTarget);
				this.activeDragHandleIndex = this.handles.index(this.activeDragHandle);
				this.handles.removeClass(this.options.activeHandleClass).eq(this.activeDragHandleIndex).addClass(this.options.activeHandleClass);
				trackSize = this.track[this.sizeMethod]();
				trackOffset = this.track.offset()[this.directionProperty];
				innerOffset = this.options.dragHandleCenter ? this.activeDragHandle[this.sizeMethod]() / 2 : e[this.eventProperty] - this.handle.offset()[this.directionProperty];

				this.dragData = {
					trackSize: trackSize,
					innerOffset: innerOffset,
					trackOffset: trackOffset,
					min: trackOffset,
					max: trackOffset + trackSize
				};
				this.page.on({
					'jcf-pointermove': this.onHandleMove,
					'jcf-pointerup': this.onHandleRelease
				});

				if (e.pointerType === 'mouse') {
					this.realElement.focus();
				}
			}
		},
		onHandleMove: function (e) {
			var self = this,
				newOffset, dragPercent, stepIndex, valuePercent, handleDragRange;

			// calculate offset
			if (this.isVertical) {
				newOffset = this.dragData.max + (this.dragData.min - e[this.eventProperty]) - this.dragData.innerOffset;
			} else {
				newOffset = e[this.eventProperty] - this.dragData.innerOffset;
			}

			// fit in range
			if (newOffset < this.dragData.min) {
				newOffset = this.dragData.min;
			} else if (newOffset > this.dragData.max) {
				newOffset = this.dragData.max;
			}

			e.preventDefault();
			if (this.options.snapToMarks && this.dataValues) {
				// snap handle to marks
				var dragOffset = newOffset - this.dragData.trackOffset;
				dragPercent = (newOffset - this.dragData.trackOffset) / this.dragData.trackSize * 100;

				$.each(this.dataValues, function (index, item) {
					var markOffset = item.offset / 100 * self.dragData.trackSize,
						markMin = markOffset - self.options.snapRadius,
						markMax = markOffset + self.options.snapRadius;

					if (dragOffset >= markMin && dragOffset <= markMax) {
						dragPercent = item.offset;
						return false;
					}
				});
			} else {
				// snap handle to steps
				dragPercent = (newOffset - this.dragData.trackOffset) / this.dragData.trackSize * 100;
			}

			// move handle only in range
			stepIndex = Math.round(dragPercent * this.stepsCount / 100);
			if (this.handleCount > 1) {
				handleDragRange = this.getDragHandleRange(this.activeDragHandleIndex);
				if (stepIndex < handleDragRange.minStepIndex) {
					stepIndex = Math.max(handleDragRange.minStepIndex, stepIndex);
				} else if (stepIndex > handleDragRange.maxStepIndex) {
					stepIndex = Math.min(handleDragRange.maxStepIndex, stepIndex);
				}
			}
			valuePercent = stepIndex * (100 / this.stepsCount);

			if (this.dragData.stepIndex !== stepIndex) {
				this.dragData.stepIndex = stepIndex;
				this.dragData.offset = valuePercent;
				this.activeDragHandle.css(this.offsetProperty, this.dragData.offset + '%');

				// update value(s) and trigger "input" event
				this.values[this.activeDragHandleIndex] = '' + this.stepIndexToValue(stepIndex);
				this.updateValues();
				this.realElement.trigger('input');
			}
		},
		onHandleRelease: function () {
			var newValue;
			if (typeof this.dragData.offset === 'number') {
				newValue = this.stepIndexToValue(this.dragData.stepIndex);
				this.realElement.val(newValue).trigger('change');
			}

			this.page.off({
				'jcf-pointermove': this.onHandleMove,
				'jcf-pointerup': this.onHandleRelease
			});
			delete this.activeDragHandle;
			delete this.dragData;
		},
		onFocus: function () {
			if (!this.fakeElement.hasClass(this.options.focusClass)) {
				this.fakeElement.addClass(this.options.focusClass);
				this.realElement.on({
					blur: this.onBlur,
					keydown: this.onKeyPress
				});
			}
		},
		onBlur: function () {
			this.fakeElement.removeClass(this.options.focusClass);
			this.realElement.off({
				blur: this.onBlur,
				keydown: this.onKeyPress
			});
		},
		onKeyPress: function (e) {
			var incValue = (e.which === 38 || e.which === 39),
				decValue = (e.which === 37 || e.which === 40);

			// handle TAB key in slider with multiple handles
			if (e.which === 9 && this.handleCount > 1) {
				if (e.shiftKey && this.activeDragHandleIndex > 0) {
					this.activeDragHandleIndex--;
				} else if (!e.shiftKey && this.activeDragHandleIndex < this.handleCount - 1) {
					this.activeDragHandleIndex++;
				} else {
					return;
				}
				e.preventDefault();
				this.handles.removeClass(this.options.activeHandleClass).eq(this.activeDragHandleIndex).addClass(this.options.activeHandleClass);
			}

			// handle cursor keys
			if (decValue || incValue) {
				e.preventDefault();
				this.step(incValue ? this.stepValue : -this.stepValue);
			}
		},
		updateValues: function () {
			var value = this.values.join(',');
			if (this.values.length > 1) {
				this.realElement.prop('valueLow', this.values[0]);
				this.realElement.prop('valueHigh', this.values[this.values.length - 1]);
				this.realElement.val(value);

				// if browser does not accept multiple values set only one
				if (this.realElement.val() !== value) {
					this.realElement.val(this.values[this.values.length - 1]);
				}
			} else {
				this.realElement.val(value);
			}

			this.updateRanges();
		},
		updateRanges: function () {
			// update display ranges
			var self = this,
				handle;

			if (this.rangeMin) {
				handle = this.handles[0];
				this.rangeMin.css(this.offsetProperty, 0).css(this.sizeProperty, handle.style[this.offsetProperty]);
			}
			if (this.rangeMax) {
				handle = this.handles[this.handles.length - 1];
				this.rangeMax.css(this.offsetProperty, handle.style[this.offsetProperty]).css(this.sizeProperty, 100 - parseFloat(handle.style[this.offsetProperty]) + '%');
			}
			if (this.rangeMid) {
				this.handles.each(function (index, curHandle) {
					var prevHandle, midBox;
					if (index > 0) {
						prevHandle = self.handles[index - 1];
						midBox = self.rangeMid[index - 1];
						midBox.style[self.offsetProperty] = prevHandle.style[self.offsetProperty];
						midBox.style[self.sizeProperty] = parseFloat(curHandle.style[self.offsetProperty]) - parseFloat(prevHandle.style[self.offsetProperty]) + '%';
					}
				});
			}
		},
		step: function (changeValue) {
			var originalValue = parseFloat(this.values[this.activeDragHandleIndex || 0]),
				newValue = originalValue,
				minValue = this.minValue,
				maxValue = this.maxValue;

			if (isNaN(originalValue)) {
				newValue = 0;
			}

			newValue += changeValue;

			if (this.handleCount > 1) {
				if (this.activeDragHandleIndex > 0) {
					minValue = parseFloat(this.values[this.activeDragHandleIndex - 1]);
				}
				if (this.activeDragHandleIndex < this.handleCount - 1) {
					maxValue = parseFloat(this.values[this.activeDragHandleIndex + 1]);
				}
			}

			if (newValue > maxValue) {
				newValue = maxValue;
			} else if (newValue < minValue) {
				newValue = minValue;
			}

			if (newValue !== originalValue) {
				this.values[this.activeDragHandleIndex || 0] = '' + newValue;
				this.updateValues();
				this.realElement.trigger('input').trigger('change');
				this.setSliderValue(this.values);
			}
		},
		valueToStepIndex: function (value) {
			return (value - this.minValue) / this.stepValue;
		},
		stepIndexToValue: function (stepIndex) {
			return this.minValue + this.stepValue * stepIndex;
		},
		valueToOffset: function (value) {
			var range = this.maxValue - this.minValue,
				percent = (value - this.minValue) / range;

			return percent * 100;
		},
		getSliderValue: function () {
			return $.map(this.values, function (value) {
				return parseFloat(value) || 0;
			});
		},
		setSliderValue: function (values) {
			// set handle position accordion according to value
			var self = this;
			this.handles.each(function (index, handle) {
				handle.style[self.offsetProperty] = self.valueToOffset(values[index]) + '%';
			});
		},
		refresh: function () {
			// handle disabled state
			var isDisabled = this.realElement.is(':disabled');
			this.fakeElement.toggleClass(this.options.disabledClass, isDisabled);

			// refresh handle position according to current value
			this.setSliderValue(this.getSliderValue());
			this.updateRanges();
		},
		destroy: function () {
			this.realElement.removeClass(this.options.hiddenClass).insertBefore(this.fakeElement);
			this.fakeElement.remove();

			this.realElement.off({
				keydown: this.onKeyPress,
				focus: this.onFocus,
				blur: this.onBlur
			});
		}
	});

}(jQuery));


/*!
 * JavaScript Custom Forms : Number Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
; (function ($) {
	'use strict';

	jcf.addModule({
		name: 'Number',
		selector: 'input[type="number"]',
		options: {
			realElementClass: 'jcf-real-element',
			fakeStructure: '<span class="jcf-number"><span class="jcf-btn-inc"></span><span class="jcf-btn-dec"></span></span>',
			btnIncSelector: '.jcf-btn-inc',
			btnDecSelector: '.jcf-btn-dec',
			pressInterval: 150
		},
		matchElement: function (element) {
			return element.is(this.selector);
		},
		init: function () {
			this.initStructure();
			this.attachEvents();
			this.refresh();
		},
		initStructure: function () {
			this.page = $('html');
			this.realElement = $(this.options.element).addClass(this.options.realElementClass);
			this.fakeElement = $(this.options.fakeStructure).insertBefore(this.realElement).prepend(this.realElement);
			this.btnDec = this.fakeElement.find(this.options.btnDecSelector);
			this.btnInc = this.fakeElement.find(this.options.btnIncSelector);

			// set initial values
			this.initialValue = parseFloat(this.realElement.val()) || 0;
			this.minValue = parseFloat(this.realElement.attr('min'));
			this.maxValue = parseFloat(this.realElement.attr('max'));
			this.stepValue = parseFloat(this.realElement.attr('step')) || 1;

			// check attribute values
			this.minValue = isNaN(this.minValue) ? -Infinity : this.minValue;
			this.maxValue = isNaN(this.maxValue) ? Infinity : this.maxValue;

			// handle range
			if (isFinite(this.maxValue)) {
				this.maxValue -= (this.maxValue - this.minValue) % this.stepValue;
			}
		},
		attachEvents: function () {
			this.realElement.on({
				focus: this.onFocus
			});
			this.btnDec.add(this.btnInc).on('jcf-pointerdown', this.onBtnPress);
		},
		onBtnPress: function (e) {
			var self = this,
				increment;

			if (!this.realElement.is(':disabled')) {
				increment = this.btnInc.is(e.currentTarget);

				self.step(increment);
				clearInterval(this.stepTimer);
				this.stepTimer = setInterval(function () {
					self.step(increment);
				}, this.options.pressInterval);

				this.page.on('jcf-pointerup', this.onBtnRelease);
			}
		},
		onBtnRelease: function () {
			clearInterval(this.stepTimer);
			this.page.off('jcf-pointerup', this.onBtnRelease);
		},
		onFocus: function () {
			this.fakeElement.addClass(this.options.focusClass);
			this.realElement.on({
				blur: this.onBlur,
				keydown: this.onKeyPress
			});
		},
		onBlur: function () {
			this.fakeElement.removeClass(this.options.focusClass);
			this.realElement.off({
				blur: this.onBlur,
				keydown: this.onKeyPress
			});
		},
		onKeyPress: function (e) {
			if (e.which === 38 || e.which === 40) {
				e.preventDefault();
				this.step(e.which === 38);
			}
		},
		step: function (increment) {
			var originalValue = parseFloat(this.realElement.val()),
				newValue = originalValue || 0,
				addValue = this.stepValue * (increment ? 1 : -1),
				edgeNumber = isFinite(this.minValue) ? this.minValue : this.initialValue - Math.abs(newValue * this.stepValue),
				diff = Math.abs(edgeNumber - newValue) % this.stepValue;

			// handle step diff
			if (diff) {
				if (increment) {
					newValue += addValue - diff;
				} else {
					newValue -= diff;
				}
			} else {
				newValue += addValue;
			}

			// handle min/max limits
			if (newValue < this.minValue) {
				newValue = this.minValue;
			} else if (newValue > this.maxValue) {
				newValue = this.maxValue;
			}

			// update value in real input if its changed
			if (newValue !== originalValue) {
				this.realElement.val(newValue).trigger('change');
				this.refresh();
			}
		},
		refresh: function () {
			var isDisabled = this.realElement.is(':disabled'),
				currentValue = parseFloat(this.realElement.val());

			// handle disabled state
			this.fakeElement.toggleClass(this.options.disabledClass, isDisabled);

			// refresh button classes
			this.btnDec.toggleClass(this.options.disabledClass, currentValue === this.minValue);
			this.btnInc.toggleClass(this.options.disabledClass, currentValue === this.maxValue);
		},
		destroy: function () {
			// restore original structure
			this.realElement.removeClass(this.options.realElementClass).insertBefore(this.fakeElement);
			this.fakeElement.remove();
			clearInterval(this.stepTimer);

			// remove event handlers
			this.page.off('jcf-pointerup', this.onBtnRelease);
			this.realElement.off({
				keydown: this.onKeyPress,
				focus: this.onFocus,
				blur: this.onBlur
			});
		}
	});

}(jQuery))

	/*
	HOME
	 */
	/**
	 * bxSlider v4.2.1d
	 * Copyright 2013-2017 Steven Wanderski
	 * Written while drinking Belgian ales and listening to jazz
	 * Licensed under MIT (http://opensource.org/licenses/MIT)
	 */

	; (function ($) {

		var defaults = {

			// GENERAL
			mode: 'horizontal',
			slideSelector: '',
			infiniteLoop: true,
			hideControlOnEnd: false,
			speed: 500,
			easing: null,
			slideMargin: 0,
			startSlide: 0,
			randomStart: false,
			captions: false,
			ticker: false,
			tickerHover: false,
			adaptiveHeight: false,
			adaptiveHeightSpeed: 500,
			video: false,
			useCSS: true,
			preloadImages: 'visible',
			responsive: true,
			slideZIndex: 50,
			wrapperClass: 'bx-wrapper',

			// TOUCH
			touchEnabled: false,
			swipeThreshold: 50,
			oneToOneTouch: true,
			preventDefaultSwipeX: true,
			preventDefaultSwipeY: false,

			// ACCESSIBILITY
			ariaLive: true,
			ariaHidden: true,

			// KEYBOARD
			keyboardEnabled: false,

			// PAGER
			pager: true,
			pagerType: 'full',
			pagerShortSeparator: ' / ',
			pagerSelector: null,
			buildPager: null,
			pagerCustom: null,

			// CONTROLS
			controls: true,
			nextText: 'Next',
			prevText: 'Prev',
			nextSelector: null,
			prevSelector: null,
			autoControls: false,
			startText: 'Start',
			stopText: 'Stop',
			autoControlsCombine: false,
			autoControlsSelector: null,

			// AUTO
			auto: false,
			pause: 4000,
			autoStart: true,
			autoDirection: 'next',
			stopAutoOnClick: false,
			autoHover: false,
			autoDelay: 0,
			autoSlideForOnePage: false,

			// CAROUSEL
			minSlides: 1,
			maxSlides: 1,
			moveSlides: 0,
			slideWidth: 0,
			shrinkItems: false,

			// CALLBACKS
			onSliderLoad: function () { return true; },
			onSlideBefore: function () { return true; },
			onSlideAfter: function () { return true; },
			onSlideNext: function () { return true; },
			onSlidePrev: function () { return true; },
			onSliderResize: function () { return true; },
			onAutoChange: function () { return true; } //calls when auto slides starts and stops
		};

		$.fn.bxSlider = function (options) {

			if (this.length === 0) {
				return this;
			}

			// support multiple elements
			if (this.length > 1) {
				this.each(function () {
					$(this).bxSlider(options);
				});
				return this;
			}

			// create a namespace to be used throughout the plugin
			var slider = {},
				// set a reference to our slider element
				el = this,
				// get the original window dimens (thanks a lot IE)
				windowWidth = $(window).width(),
				windowHeight = $(window).height();

			// Return if slider is already initialized
			if ($(el).data('bxSlider')) { return; }

			/**
			 * ===================================================================================
			 * = PRIVATE FUNCTIONS
			 * ===================================================================================
			 */

			/**
			 * Initializes namespace settings to be used throughout plugin
			 */
			var init = function () {
				// Return if slider is already initialized
				if ($(el).data('bxSlider')) { return; }
				// merge user-supplied options with the defaults
				slider.settings = $.extend({}, defaults, options);
				// parse slideWidth setting
				slider.settings.slideWidth = parseInt(slider.settings.slideWidth);
				// store the original children
				slider.children = el.children(slider.settings.slideSelector);
				// check if actual number of slides is less than minSlides / maxSlides
				if (slider.children.length < slider.settings.minSlides) { slider.settings.minSlides = slider.children.length; }
				if (slider.children.length < slider.settings.maxSlides) { slider.settings.maxSlides = slider.children.length; }
				// if random start, set the startSlide setting to random number
				if (slider.settings.randomStart) { slider.settings.startSlide = Math.floor(Math.random() * slider.children.length); }
				// store active slide information
				slider.active = { index: slider.settings.startSlide };
				// store if the slider is in carousel mode (displaying / moving multiple slides)
				slider.carousel = slider.settings.minSlides > 1 || slider.settings.maxSlides > 1;
				// if carousel, force preloadImages = 'all'
				if (slider.carousel) { slider.settings.preloadImages = 'all'; }
				// calculate the min / max width thresholds based on min / max number of slides
				// used to setup and update carousel slides dimensions
				slider.minThreshold = (slider.settings.minSlides * slider.settings.slideWidth) + ((slider.settings.minSlides - 1) * slider.settings.slideMargin);
				slider.maxThreshold = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
				// store the current state of the slider (if currently animating, working is true)
				slider.working = false;
				// initialize the controls object
				slider.controls = {};
				// initialize an auto interval
				slider.interval = null;
				// determine which property to use for transitions
				slider.animProp = slider.settings.mode === 'vertical' ? 'top' : 'left';
				// determine if hardware acceleration can be used
				slider.usingCSS = slider.settings.useCSS && slider.settings.mode !== 'fade' && (function () {
					// create our test div element
					var div = document.createElement('div'),
						// css transition properties
						props = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
					// test for each property
					for (var i = 0; i < props.length; i++) {
						if (div.style[props[i]] !== undefined) {
							slider.cssPrefix = props[i].replace('Perspective', '').toLowerCase();
							slider.animProp = '-' + slider.cssPrefix + '-transform';
							return true;
						}
					}
					return false;
				}());
				// if vertical mode always make maxSlides and minSlides equal
				if (slider.settings.mode === 'vertical') { slider.settings.maxSlides = slider.settings.minSlides; }
				// save original style data
				el.data('origStyle', el.attr('style'));
				el.children(slider.settings.slideSelector).each(function () {
					$(this).data('origStyle', $(this).attr('style'));
				});

				// perform all DOM / CSS modifications
				setup();
			};

			/**
			 * Performs all DOM and CSS modifications
			 */
			var setup = function () {
				var preloadSelector = slider.children.eq(slider.settings.startSlide); // set the default preload selector (visible)

				// wrap el in a wrapper
				el.wrap('<div class="' + slider.settings.wrapperClass + '"><div class="bx-viewport"></div></div>');
				// store a namespace reference to .bx-viewport
				slider.viewport = el.parent();

				// add aria-live if the setting is enabled and ticker mode is disabled
				if (slider.settings.ariaLive && !slider.settings.ticker) {
					slider.viewport.attr('aria-live', 'polite');
				}
				// add a loading div to display while images are loading
				slider.loader = $('<div class="bx-loading" />');
				slider.viewport.prepend(slider.loader);
				// set el to a massive width, to hold any needed slides
				// also strip any margin and padding from el
				el.css({
					width: slider.settings.mode === 'horizontal' ? (slider.children.length * 1000 + 215) + '%' : 'auto',
					position: 'relative'
				});
				// if using CSS, add the easing property
				if (slider.usingCSS && slider.settings.easing) {
					el.css('-' + slider.cssPrefix + '-transition-timing-function', slider.settings.easing);
					// if not using CSS and no easing value was supplied, use the default JS animation easing (swing)
				} else if (!slider.settings.easing) {
					slider.settings.easing = 'swing';
				}
				// make modifications to the viewport (.bx-viewport)
				slider.viewport.css({
					width: '100%',
					overflow: 'hidden',
					position: 'relative'
				});
				slider.viewport.parent().css({
					maxWidth: getViewportMaxWidth()
				});
				// apply css to all slider children
				slider.children.css({
					// the float attribute is a reserved word in compressors like YUI compressor and need to be quoted #48
					'float': slider.settings.mode === 'horizontal' ? 'left' : 'none',
					listStyle: 'none',
					position: 'relative'
				});
				// apply the calculated width after the float is applied to prevent scrollbar interference
				slider.children.css('width', getSlideWidth());
				// if slideMargin is supplied, add the css
				if (slider.settings.mode === 'horizontal' && slider.settings.slideMargin > 0) { slider.children.css('marginRight', slider.settings.slideMargin); }
				if (slider.settings.mode === 'vertical' && slider.settings.slideMargin > 0) { slider.children.css('marginBottom', slider.settings.slideMargin); }
				// if "fade" mode, add positioning and z-index CSS
				if (slider.settings.mode === 'fade') {
					slider.children.css({
						position: 'absolute',
						zIndex: 0,
						display: 'none'
					});
					// prepare the z-index on the showing element
					slider.children.eq(slider.settings.startSlide).css({ zIndex: slider.settings.slideZIndex, display: 'block' });
				}
				// create an element to contain all slider controls (pager, start / stop, etc)
				slider.controls.el = $('<div class="bx-controls" />');
				// if captions are requested, add them
				if (slider.settings.captions) { appendCaptions(); }
				// check if startSlide is last slide
				slider.active.last = slider.settings.startSlide === getPagerQty() - 1;
				// if video is true, set up the fitVids plugin
				if (slider.settings.video) { el.fitVids(); }
				//preloadImages
				if (slider.settings.preloadImages === 'none') {
					preloadSelector = null;
				}
				else if (slider.settings.preloadImages === 'all' || slider.settings.ticker) {
					preloadSelector = slider.children;
				}
				// only check for control addition if not in "ticker" mode
				if (!slider.settings.ticker) {
					// if controls are requested, add them
					if (slider.settings.controls) { appendControls(); }
					// if auto is true, and auto controls are requested, add them
					if (slider.settings.auto && slider.settings.autoControls) { appendControlsAuto(); }
					// if pager is requested, add it
					if (slider.settings.pager) { appendPager(); }
					// if any control option is requested, add the controls wrapper
					if (slider.settings.controls || slider.settings.autoControls || slider.settings.pager) { slider.viewport.after(slider.controls.el); }
					// if ticker mode, do not allow a pager
				} else {
					slider.settings.pager = false;
				}
				if (preloadSelector === null) {
					start();
				} else {
					loadElements(preloadSelector, start);
				}
			};

			var loadElements = function (selector, callback) {
				var total = selector.find('img:not([src=""]), iframe').length,
					count = 0;
				if (total === 0) {
					callback();
					return;
				}
				selector.find('img:not([src=""]), iframe').each(function () {
					$(this).one('load error', function () {
						if (++count === total) { callback(); }
					}).each(function () {
						if (this.complete || this.src == '') { $(this).trigger('load'); }
					});
				});
			};

			/**
			 * Start the slider
			 */
			var start = function () {
				// if infinite loop, prepare additional slides
				if (slider.settings.infiniteLoop && slider.settings.mode !== 'fade' && !slider.settings.ticker) {
					var slice = slider.settings.mode === 'vertical' ? slider.settings.minSlides : slider.settings.maxSlides,
						sliceAppend = slider.children.slice(0, slice).clone(true).addClass('bx-clone'),
						slicePrepend = slider.children.slice(-slice).clone(true).addClass('bx-clone');
					if (slider.settings.ariaHidden) {
						sliceAppend.attr('aria-hidden', true);
						slicePrepend.attr('aria-hidden', true);
					}
					el.append(sliceAppend).prepend(slicePrepend);
				}
				// remove the loading DOM element
				slider.loader.remove();
				// set the left / top position of "el"
				setSlidePosition();
				// if "vertical" mode, always use adaptiveHeight to prevent odd behavior
				if (slider.settings.mode === 'vertical') { slider.settings.adaptiveHeight = true; }
				// set the viewport height
				slider.viewport.height(getViewportHeight());
				// make sure everything is positioned just right (same as a window resize)
				el.redrawSlider();
				// onSliderLoad callback
				slider.settings.onSliderLoad.call(el, slider.active.index);
				// slider has been fully initialized
				slider.initialized = true;
				// add the resize call to the window
				if (slider.settings.responsive) { $(window).on('resize', resizeWindow); }
				// if auto is true and has more than 1 page, start the show
				if (slider.settings.auto && slider.settings.autoStart && (getPagerQty() > 1 || slider.settings.autoSlideForOnePage)) { initAuto(); }
				// if ticker is true, start the ticker
				if (slider.settings.ticker) { initTicker(); }
				// if pager is requested, make the appropriate pager link active
				if (slider.settings.pager) { updatePagerActive(slider.settings.startSlide); }
				// check for any updates to the controls (like hideControlOnEnd updates)
				if (slider.settings.controls) { updateDirectionControls(); }
				// if touchEnabled is true, setup the touch events
				if (slider.settings.touchEnabled && !slider.settings.ticker) { initTouch(); }
				// if keyboardEnabled is true, setup the keyboard events
				if (slider.settings.keyboardEnabled && !slider.settings.ticker) {
					$(document).keydown(keyPress);
				}
			};

			/**
			 * Returns the calculated height of the viewport, used to determine either adaptiveHeight or the maxHeight value
			 */
			var getViewportHeight = function () {
				var height = 0;
				// first determine which children (slides) should be used in our height calculation
				var children = $();
				// if mode is not "vertical" and adaptiveHeight is false, include all children
				if (slider.settings.mode !== 'vertical' && !slider.settings.adaptiveHeight) {
					children = slider.children;
				} else {
					// if not carousel, return the single active child
					if (!slider.carousel) {
						children = slider.children.eq(slider.active.index);
						// if carousel, return a slice of children
					} else {
						// get the individual slide index
						var currentIndex = slider.settings.moveSlides === 1 ? slider.active.index : slider.active.index * getMoveBy();
						// add the current slide to the children
						children = slider.children.eq(currentIndex);
						// cycle through the remaining "showing" slides
						for (i = 1; i <= slider.settings.maxSlides - 1; i++) {
							// if looped back to the start
							if (currentIndex + i >= slider.children.length) {
								children = children.add(slider.children.eq(i - 1));
							} else {
								children = children.add(slider.children.eq(currentIndex + i));
							}
						}
					}
				}
				// if "vertical" mode, calculate the sum of the heights of the children
				if (slider.settings.mode === 'vertical') {
					children.each(function (index) {
						height += $(this).outerHeight();
					});
					// add user-supplied margins
					if (slider.settings.slideMargin > 0) {
						height += slider.settings.slideMargin * (slider.settings.minSlides - 1);
					}
					// if not "vertical" mode, calculate the max height of the children
				} else {
					height = Math.max.apply(Math, children.map(function () {
						return $(this).outerHeight(false);
					}).get());
				}

				if (slider.viewport.css('box-sizing') === 'border-box') {
					height += parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom')) +
						parseFloat(slider.viewport.css('border-top-width')) + parseFloat(slider.viewport.css('border-bottom-width'));
				} else if (slider.viewport.css('box-sizing') === 'padding-box') {
					height += parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom'));
				}

				return height;
			};

			/**
			 * Returns the calculated width to be used for the outer wrapper / viewport
			 */
			var getViewportMaxWidth = function () {
				var width = '100%';
				if (slider.settings.slideWidth > 0) {
					if (slider.settings.mode === 'horizontal') {
						width = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
					} else {
						width = slider.settings.slideWidth;
					}
				}
				return width;
			};

			/**
			 * Returns the calculated width to be applied to each slide
			 */
			var getSlideWidth = function () {
				var newElWidth = slider.settings.slideWidth, // start with any user-supplied slide width
					wrapWidth = slider.viewport.width();    // get the current viewport width
				// if slide width was not supplied, or is larger than the viewport use the viewport width
				if (slider.settings.slideWidth === 0 ||
					(slider.settings.slideWidth > wrapWidth && !slider.carousel) ||
					slider.settings.mode === 'vertical') {
					newElWidth = wrapWidth;
					// if carousel, use the thresholds to determine the width
				} else if (slider.settings.maxSlides > 1 && slider.settings.mode === 'horizontal') {
					if (wrapWidth > slider.maxThreshold) {
						return newElWidth;
					} else if (wrapWidth < slider.minThreshold) {
						newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.minSlides - 1))) / slider.settings.minSlides;
					} else if (slider.settings.shrinkItems) {
						newElWidth = Math.floor((wrapWidth + slider.settings.slideMargin) / (Math.ceil((wrapWidth + slider.settings.slideMargin) / (newElWidth + slider.settings.slideMargin))) - slider.settings.slideMargin);
					}
				}
				return newElWidth;
			};

			/**
			 * Returns the number of slides currently visible in the viewport (includes partially visible slides)
			 */
			var getNumberSlidesShowing = function () {
				var slidesShowing = 1,
					childWidth = null;
				if (slider.settings.mode === 'horizontal' && slider.settings.slideWidth > 0) {
					// if viewport is smaller than minThreshold, return minSlides
					if (slider.viewport.width() < slider.minThreshold) {
						slidesShowing = slider.settings.minSlides;
						// if viewport is larger than maxThreshold, return maxSlides
					} else if (slider.viewport.width() > slider.maxThreshold) {
						slidesShowing = slider.settings.maxSlides;
						// if viewport is between min / max thresholds, divide viewport width by first child width
					} else {
						childWidth = slider.children.first().width() + slider.settings.slideMargin;
						slidesShowing = Math.floor((slider.viewport.width() +
							slider.settings.slideMargin) / childWidth) || 1;
					}
					// if "vertical" mode, slides showing will always be minSlides
				} else if (slider.settings.mode === 'vertical') {
					slidesShowing = slider.settings.minSlides;
				}
				return slidesShowing;
			};

			/**
			 * Returns the number of pages (one full viewport of slides is one "page")
			 */
			var getPagerQty = function () {
				var pagerQty = 0,
					breakPoint = 0,
					counter = 0;
				// if moveSlides is specified by the user
				if (slider.settings.moveSlides > 0) {
					if (slider.settings.infiniteLoop) {
						pagerQty = Math.ceil(slider.children.length / getMoveBy());
					} else {
						// when breakpoint goes above children length, counter is the number of pages
						while (breakPoint < slider.children.length) {
							++pagerQty;
							breakPoint = counter + getNumberSlidesShowing();
							counter += slider.settings.moveSlides <= getNumberSlidesShowing() ? slider.settings.moveSlides : getNumberSlidesShowing();
						}
						return counter;
					}
					// if moveSlides is 0 (auto) divide children length by sides showing, then round up
				} else {
					pagerQty = Math.ceil(slider.children.length / getNumberSlidesShowing());
				}
				return pagerQty;
			};

			/**
			 * Returns the number of individual slides by which to shift the slider
			 */
			var getMoveBy = function () {
				// if moveSlides was set by the user and moveSlides is less than number of slides showing
				if (slider.settings.moveSlides > 0 && slider.settings.moveSlides <= getNumberSlidesShowing()) {
					return slider.settings.moveSlides;
				}
				// if moveSlides is 0 (auto)
				return getNumberSlidesShowing();
			};

			/**
			 * Sets the slider's (el) left or top position
			 */
			var setSlidePosition = function () {
				var position, lastChild, lastShowingIndex;
				// if last slide, not infinite loop, and number of children is larger than specified maxSlides
				if (slider.children.length > slider.settings.maxSlides && slider.active.last && !slider.settings.infiniteLoop) {
					if (slider.settings.mode === 'horizontal') {
						// get the last child's position
						lastChild = slider.children.last();
						position = lastChild.position();
						// set the left position
						setPositionProperty(-(position.left - (slider.viewport.width() - lastChild.outerWidth())), 'reset', 0);
					} else if (slider.settings.mode === 'vertical') {
						// get the last showing index's position
						lastShowingIndex = slider.children.length - slider.settings.minSlides;
						position = slider.children.eq(lastShowingIndex).position();
						// set the top position
						setPositionProperty(-position.top, 'reset', 0);
					}
					// if not last slide
				} else {
					// get the position of the first showing slide
					position = slider.children.eq(slider.active.index * getMoveBy()).position();
					// check for last slide
					if (slider.active.index === getPagerQty() - 1) { slider.active.last = true; }
					// set the respective position
					if (position !== undefined) {
						if (slider.settings.mode === 'horizontal') { setPositionProperty(-position.left, 'reset', 0); }
						else if (slider.settings.mode === 'vertical') { setPositionProperty(-position.top, 'reset', 0); }
					}
				}
			};

			/**
			 * Sets the el's animating property position (which in turn will sometimes animate el).
			 * If using CSS, sets the transform property. If not using CSS, sets the top / left property.
			 *
			 * @param value (int)
			 *  - the animating property's value
			 *
			 * @param type (string) 'slide', 'reset', 'ticker'
			 *  - the type of instance for which the function is being
			 *
			 * @param duration (int)
			 *  - the amount of time (in ms) the transition should occupy
			 *
			 * @param params (array) optional
			 *  - an optional parameter containing any variables that need to be passed in
			 */
			var setPositionProperty = function (value, type, duration, params) {
				var animateObj, propValue;
				// use CSS transform
				if (slider.usingCSS) {
					// determine the translate3d value
					propValue = slider.settings.mode === 'vertical' ? 'translate3d(0, ' + value + 'px, 0)' : 'translate3d(' + value + 'px, 0, 0)';
					// add the CSS transition-duration
					el.css('-' + slider.cssPrefix + '-transition-duration', duration / 1000 + 's');
					if (type === 'slide') {
						// set the property value
						el.css(slider.animProp, propValue);
						if (duration !== 0) {
							// add a callback method - executes when CSS transition completes
							el.on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function (e) {
								//make sure it's the correct one
								if (!$(e.target).is(el)) { return; }
								// remove the callback
								el.off('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
								updateAfterSlideTransition();
							});
						} else { //duration = 0
							updateAfterSlideTransition();
						}
					} else if (type === 'reset') {
						el.css(slider.animProp, propValue);
					} else if (type === 'ticker') {
						// make the transition use 'linear'
						el.css('-' + slider.cssPrefix + '-transition-timing-function', 'linear');
						el.css(slider.animProp, propValue);
						if (duration !== 0) {
							el.on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function (e) {
								//make sure it's the correct one
								if (!$(e.target).is(el)) { return; }
								// remove the callback
								el.off('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
								// reset the position
								setPositionProperty(params.resetValue, 'reset', 0);
								// start the loop again
								tickerLoop();
							});
						} else { //duration = 0
							setPositionProperty(params.resetValue, 'reset', 0);
							tickerLoop();
						}
					}
					// use JS animate
				} else {
					animateObj = {};
					animateObj[slider.animProp] = value;
					if (type === 'slide') {
						el.animate(animateObj, duration, slider.settings.easing, function () {
							updateAfterSlideTransition();
						});
					} else if (type === 'reset') {
						el.css(slider.animProp, value);
					} else if (type === 'ticker') {
						el.animate(animateObj, duration, 'linear', function () {
							setPositionProperty(params.resetValue, 'reset', 0);
							// run the recursive loop after animation
							tickerLoop();
						});
					}
				}
			};

			/**
			 * Populates the pager with proper amount of pages
			 */
			var populatePager = function () {
				var pagerHtml = '',
					linkContent = '',
					pagerQty = getPagerQty();
				// loop through each pager item
				for (var i = 0; i < pagerQty; i++) {
					linkContent = '';
					// if a buildPager function is supplied, use it to get pager link value, else use index + 1
					if (slider.settings.buildPager && $.isFunction(slider.settings.buildPager) || slider.settings.pagerCustom) {
						linkContent = slider.settings.buildPager(i);
						slider.pagerEl.addClass('bx-custom-pager');
					} else {
						linkContent = i + 1;
						slider.pagerEl.addClass('bx-default-pager');
					}
					// var linkContent = slider.settings.buildPager && $.isFunction(slider.settings.buildPager) ? slider.settings.buildPager(i) : i + 1;
					// add the markup to the string
					pagerHtml += '<div class="bx-pager-item"><a href="" data-slide-index="' + i + '" class="bx-pager-link">' + linkContent + '</a></div>';
				}
				// populate the pager element with pager links
				slider.pagerEl.html(pagerHtml);
			};

			/**
			 * Appends the pager to the controls element
			 */
			var appendPager = function () {
				if (!slider.settings.pagerCustom) {
					// create the pager DOM element
					slider.pagerEl = $('<div class="bx-pager" />');
					// if a pager selector was supplied, populate it with the pager
					if (slider.settings.pagerSelector) {
						$(slider.settings.pagerSelector).html(slider.pagerEl);
						// if no pager selector was supplied, add it after the wrapper
					} else {
						slider.controls.el.addClass('bx-has-pager').append(slider.pagerEl);
					}
					// populate the pager
					populatePager();
				} else {
					slider.pagerEl = $(slider.settings.pagerCustom);
				}
				// assign the pager click binding
				slider.pagerEl.on('click touchend', 'a', clickPagerBind);
			};

			/**
			 * Appends prev / next controls to the controls element
			 */
			var appendControls = function () {
				slider.controls.next = $('<a class="bx-next" href="">' + slider.settings.nextText + '</a>');
				slider.controls.prev = $('<a class="bx-prev" href="">' + slider.settings.prevText + '</a>');
				// add click actions to the controls
				slider.controls.next.on('click touchend', clickNextBind);
				slider.controls.prev.on('click touchend', clickPrevBind);
				// if nextSelector was supplied, populate it
				if (slider.settings.nextSelector) {
					$(slider.settings.nextSelector).append(slider.controls.next);
				}
				// if prevSelector was supplied, populate it
				if (slider.settings.prevSelector) {
					$(slider.settings.prevSelector).append(slider.controls.prev);
				}
				// if no custom selectors were supplied
				if (!slider.settings.nextSelector && !slider.settings.prevSelector) {
					// add the controls to the DOM
					slider.controls.directionEl = $('<div class="bx-controls-direction" />');
					// add the control elements to the directionEl
					slider.controls.directionEl.append(slider.controls.prev).append(slider.controls.next);
					// slider.viewport.append(slider.controls.directionEl);
					slider.controls.el.addClass('bx-has-controls-direction').append(slider.controls.directionEl);
				}
			};

			/**
			 * Appends start / stop auto controls to the controls element
			 */
			var appendControlsAuto = function () {
				slider.controls.start = $('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + slider.settings.startText + '</a></div>');
				slider.controls.stop = $('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + slider.settings.stopText + '</a></div>');
				// add the controls to the DOM
				slider.controls.autoEl = $('<div class="bx-controls-auto" />');
				// on click actions to the controls
				slider.controls.autoEl.on('click', '.bx-start', clickStartBind);
				slider.controls.autoEl.on('click', '.bx-stop', clickStopBind);
				// if autoControlsCombine, insert only the "start" control
				if (slider.settings.autoControlsCombine) {
					slider.controls.autoEl.append(slider.controls.start);
					// if autoControlsCombine is false, insert both controls
				} else {
					slider.controls.autoEl.append(slider.controls.start).append(slider.controls.stop);
				}
				// if auto controls selector was supplied, populate it with the controls
				if (slider.settings.autoControlsSelector) {
					$(slider.settings.autoControlsSelector).html(slider.controls.autoEl);
					// if auto controls selector was not supplied, add it after the wrapper
				} else {
					slider.controls.el.addClass('bx-has-controls-auto').append(slider.controls.autoEl);
				}
				// update the auto controls
				updateAutoControls(slider.settings.autoStart ? 'stop' : 'start');
			};

			/**
			 * Appends image captions to the DOM
			 */
			var appendCaptions = function () {
				// cycle through each child
				slider.children.each(function (index) {
					// get the image title attribute
					var title = $(this).find('img:first').attr('title');
					// append the caption
					if (title !== undefined && ('' + title).length) {
						$(this).append('<div class="bx-caption"><span>' + title + '</span></div>');
					}
				});
			};

			/**
			 * Click next binding
			 *
			 * @param e (event)
			 *  - DOM event object
			 */
			var clickNextBind = function (e) {
				e.preventDefault();
				if (slider.controls.el.hasClass('disabled')) { return; }
				// if auto show is running, stop it
				if (slider.settings.auto && slider.settings.stopAutoOnClick) { el.stopAuto(); }
				el.goToNextSlide();
			};

			/**
			 * Click prev binding
			 *
			 * @param e (event)
			 *  - DOM event object
			 */
			var clickPrevBind = function (e) {
				e.preventDefault();
				if (slider.controls.el.hasClass('disabled')) { return; }
				// if auto show is running, stop it
				if (slider.settings.auto && slider.settings.stopAutoOnClick) { el.stopAuto(); }
				el.goToPrevSlide();
			};

			/**
			 * Click start binding
			 *
			 * @param e (event)
			 *  - DOM event object
			 */
			var clickStartBind = function (e) {
				el.startAuto();
				e.preventDefault();
			};

			/**
			 * Click stop binding
			 *
			 * @param e (event)
			 *  - DOM event object
			 */
			var clickStopBind = function (e) {
				el.stopAuto();
				e.preventDefault();
			};

			/**
			 * Click pager binding
			 *
			 * @param e (event)
			 *  - DOM event object
			 */
			var clickPagerBind = function (e) {
				var pagerLink, pagerIndex;
				e.preventDefault();
				if (slider.controls.el.hasClass('disabled')) {
					return;
				}
				// if auto show is running, stop it
				if (slider.settings.auto && slider.settings.stopAutoOnClick) { el.stopAuto(); }
				pagerLink = $(e.currentTarget);
				if (pagerLink.attr('data-slide-index') !== undefined) {
					pagerIndex = parseInt(pagerLink.attr('data-slide-index'));
					// if clicked pager link is not active, continue with the goToSlide call
					if (pagerIndex !== slider.active.index) { el.goToSlide(pagerIndex); }
				}
			};

			/**
			 * Updates the pager links with an active class
			 *
			 * @param slideIndex (int)
			 *  - index of slide to make active
			 */
			var updatePagerActive = function (slideIndex) {
				// if "short" pager type
				var len = slider.children.length; // nb of children
				if (slider.settings.pagerType === 'short') {
					if (slider.settings.maxSlides > 1) {
						len = Math.ceil(slider.children.length / slider.settings.maxSlides);
					}
					slider.pagerEl.html((slideIndex + 1) + slider.settings.pagerShortSeparator + len);
					return;
				}
				// remove all pager active classes
				slider.pagerEl.find('a').removeClass('active');
				// apply the active class for all pagers
				slider.pagerEl.each(function (i, el) { $(el).find('a').eq(slideIndex).addClass('active'); });
			};

			/**
			 * Performs needed actions after a slide transition
			 */
			var updateAfterSlideTransition = function () {
				// if infinite loop is true
				if (slider.settings.infiniteLoop) {
					var position = '';
					// first slide
					if (slider.active.index === 0) {
						// set the new position
						position = slider.children.eq(0).position();
						// carousel, last slide
					} else if (slider.active.index === getPagerQty() - 1 && slider.carousel) {
						position = slider.children.eq((getPagerQty() - 1) * getMoveBy()).position();
						// last slide
					} else if (slider.active.index === slider.children.length - 1) {
						position = slider.children.eq(slider.children.length - 1).position();
					}
					if (position) {
						if (slider.settings.mode === 'horizontal') { setPositionProperty(-position.left, 'reset', 0); }
						else if (slider.settings.mode === 'vertical') { setPositionProperty(-position.top, 'reset', 0); }
					}
				}
				// declare that the transition is complete
				slider.working = false;
				// onSlideAfter callback
				slider.settings.onSlideAfter.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
			};

			/**
			 * Updates the auto controls state (either active, or combined switch)
			 *
			 * @param state (string) "start", "stop"
			 *  - the new state of the auto show
			 */
			var updateAutoControls = function (state) {
				// if autoControlsCombine is true, replace the current control with the new state
				if (slider.settings.autoControlsCombine) {
					slider.controls.autoEl.html(slider.controls[state]);
					// if autoControlsCombine is false, apply the "active" class to the appropriate control
				} else {
					slider.controls.autoEl.find('a').removeClass('active');
					slider.controls.autoEl.find('a:not(.bx-' + state + ')').addClass('active');
				}
			};

			/**
			 * Updates the direction controls (checks if either should be hidden)
			 */
			var updateDirectionControls = function () {
				if (getPagerQty() === 1) {
					slider.controls.prev.addClass('disabled');
					slider.controls.next.addClass('disabled');
				} else if (!slider.settings.infiniteLoop && slider.settings.hideControlOnEnd) {
					// if first slide
					if (slider.active.index === 0) {
						slider.controls.prev.addClass('disabled');
						slider.controls.next.removeClass('disabled');
						// if last slide
					} else if (slider.active.index === getPagerQty() - 1) {
						slider.controls.next.addClass('disabled');
						slider.controls.prev.removeClass('disabled');
						// if any slide in the middle
					} else {
						slider.controls.prev.removeClass('disabled');
						slider.controls.next.removeClass('disabled');
					}
				}
			};
			/* auto start and stop functions */
			var windowFocusHandler = function () { el.startAuto(); };
			var windowBlurHandler = function () { el.stopAuto(); };
			/**
			 * Initializes the auto process
			 */
			var initAuto = function () {
				// if autoDelay was supplied, launch the auto show using a setTimeout() call
				if (slider.settings.autoDelay > 0) {
					setTimeout(el.startAuto, slider.settings.autoDelay);
					// if autoDelay was not supplied, start the auto show normally
				} else {
					el.startAuto();

					//add focus and blur events to ensure its running if timeout gets paused
					$(window).focus(windowFocusHandler).blur(windowBlurHandler);
				}
				// if autoHover is requested
				if (slider.settings.autoHover) {
					// on el hover
					el.hover(function () {
						// if the auto show is currently playing (has an active interval)
						if (slider.interval) {
							// stop the auto show and pass true argument which will prevent control update
							el.stopAuto(true);
							// create a new autoPaused value which will be used by the relative "mouseout" event
							slider.autoPaused = true;
						}
					}, function () {
						// if the autoPaused value was created be the prior "mouseover" event
						if (slider.autoPaused) {
							// start the auto show and pass true argument which will prevent control update
							el.startAuto(true);
							// reset the autoPaused value
							slider.autoPaused = null;
						}
					});
				}
			};

			/**
			 * Initializes the ticker process
			 */
			var initTicker = function () {
				var startPosition = 0,
					position, transform, value, idx, ratio, property, newSpeed, totalDimens;
				// if autoDirection is "next", append a clone of the entire slider
				if (slider.settings.autoDirection === 'next') {
					el.append(slider.children.clone().addClass('bx-clone'));
					// if autoDirection is "prev", prepend a clone of the entire slider, and set the left position
				} else {
					el.prepend(slider.children.clone().addClass('bx-clone'));
					position = slider.children.first().position();
					startPosition = slider.settings.mode === 'horizontal' ? -position.left : -position.top;
				}
				setPositionProperty(startPosition, 'reset', 0);
				// do not allow controls in ticker mode
				slider.settings.pager = false;
				slider.settings.controls = false;
				slider.settings.autoControls = false;
				// if autoHover is requested
				if (slider.settings.tickerHover) {
					if (slider.usingCSS) {
						idx = slider.settings.mode === 'horizontal' ? 4 : 5;
						slider.viewport.hover(function () {
							transform = el.css('-' + slider.cssPrefix + '-transform');
							value = parseFloat(transform.split(',')[idx]);
							setPositionProperty(value, 'reset', 0);
						}, function () {
							totalDimens = 0;
							slider.children.each(function (index) {
								totalDimens += slider.settings.mode === 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
							});
							// calculate the speed ratio (used to determine the new speed to finish the paused animation)
							ratio = slider.settings.speed / totalDimens;
							// determine which property to use
							property = slider.settings.mode === 'horizontal' ? 'left' : 'top';
							// calculate the new speed
							newSpeed = ratio * (totalDimens - (Math.abs(parseInt(value))));
							tickerLoop(newSpeed);
						});
					} else {
						// on el hover
						slider.viewport.hover(function () {
							el.stop();
						}, function () {
							// calculate the total width of children (used to calculate the speed ratio)
							totalDimens = 0;
							slider.children.each(function (index) {
								totalDimens += slider.settings.mode === 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
							});
							// calculate the speed ratio (used to determine the new speed to finish the paused animation)
							ratio = slider.settings.speed / totalDimens;
							// determine which property to use
							property = slider.settings.mode === 'horizontal' ? 'left' : 'top';
							// calculate the new speed
							newSpeed = ratio * (totalDimens - (Math.abs(parseInt(el.css(property)))));
							tickerLoop(newSpeed);
						});
					}
				}
				// start the ticker loop
				tickerLoop();
			};

			/**
			 * Runs a continuous loop, news ticker-style
			 */
			var tickerLoop = function (resumeSpeed) {
				var speed = resumeSpeed ? resumeSpeed : slider.settings.speed,
					position = { left: 0, top: 0 },
					reset = { left: 0, top: 0 },
					animateProperty, resetValue, params;

				// if "next" animate left position to last child, then reset left to 0
				if (slider.settings.autoDirection === 'next') {
					position = el.find('.bx-clone').first().position();
					// if "prev" animate left position to 0, then reset left to first non-clone child
				} else {
					reset = slider.children.first().position();
				}
				animateProperty = slider.settings.mode === 'horizontal' ? -position.left : -position.top;
				resetValue = slider.settings.mode === 'horizontal' ? -reset.left : -reset.top;
				params = { resetValue: resetValue };
				setPositionProperty(animateProperty, 'ticker', speed, params);
			};

			/**
			 * Check if el is on screen
			 */
			var isOnScreen = function (el) {
				var win = $(window),
					viewport = {
						top: win.scrollTop(),
						left: win.scrollLeft()
					},
					bounds = el.offset();

				viewport.right = viewport.left + win.width();
				viewport.bottom = viewport.top + win.height();
				bounds.right = bounds.left + el.outerWidth();
				bounds.bottom = bounds.top + el.outerHeight();

				return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
			};

			/**
			 * Initializes keyboard events
			 */
			var keyPress = function (e) {
				var activeElementTag = document.activeElement.tagName.toLowerCase(),
					tagFilters = 'input|textarea',
					p = new RegExp(activeElementTag, ['i']),
					result = p.exec(tagFilters);

				if (result == null && isOnScreen(el)) {
					if (e.keyCode === 39) {
						clickNextBind(e);
						return false;
					} else if (e.keyCode === 37) {
						clickPrevBind(e);
						return false;
					}
				}
			};

			/**
			 * Initializes touch events
			 */
			var initTouch = function () {
				// initialize object to contain all touch values
				slider.touch = {
					start: { x: 0, y: 0 },
					end: { x: 0, y: 0 }
				};
				slider.viewport.on('touchstart MSPointerDown pointerdown', onTouchStart);

				//for browsers that have implemented pointer events and fire a click after
				//every pointerup regardless of whether pointerup is on same screen location as pointerdown or not
				slider.viewport.on('click', '.bxslider a', function (e) {
					if (slider.viewport.hasClass('click-disabled')) {
						e.preventDefault();
						slider.viewport.removeClass('click-disabled');
					}
				});
			};

			/**
			 * Event handler for "touchstart"
			 *
			 * @param e (event)
			 *  - DOM event object
			 */
			var onTouchStart = function (e) {
				// watch only for left mouse, touch contact and pen contact
				// touchstart event object doesn`t have button property
				if (e.type !== 'touchstart' && e.button !== 0) {
					return;
				}
				e.preventDefault();
				//disable slider controls while user is interacting with slides to avoid slider freeze that happens on touch devices when a slide swipe happens immediately after interacting with slider controls
				slider.controls.el.addClass('disabled');

				if (slider.working) {
					slider.controls.el.removeClass('disabled');
				} else {
					// record the original position when touch starts
					slider.touch.originalPos = el.position();
					var orig = e.originalEvent,
						touchPoints = (typeof orig.changedTouches !== 'undefined') ? orig.changedTouches : [orig];
					var chromePointerEvents = typeof PointerEvent === 'function';
					if (chromePointerEvents) {
						if (orig.pointerId === undefined) {
							return;
						}
					}
					// record the starting touch x, y coordinates
					slider.touch.start.x = touchPoints[0].pageX;
					slider.touch.start.y = touchPoints[0].pageY;

					if (slider.viewport.get(0).setPointerCapture) {
						slider.pointerId = orig.pointerId;
						slider.viewport.get(0).setPointerCapture(slider.pointerId);
					}
					// store original event data for click fixation
					slider.originalClickTarget = orig.originalTarget || orig.target;
					slider.originalClickButton = orig.button;
					slider.originalClickButtons = orig.buttons;
					slider.originalEventType = orig.type;
					// at this moment we don`t know what it is click or swipe
					slider.hasMove = false;
					// on a "touchmove" event to the viewport
					slider.viewport.on('touchmove MSPointerMove pointermove', onTouchMove);
					// on a "touchend" event to the viewport
					slider.viewport.on('touchend MSPointerUp pointerup', onTouchEnd);
					slider.viewport.on('MSPointerCancel pointercancel', onPointerCancel);
				}
			};

			/**
			 * Cancel Pointer for Windows Phone
			 *
			 * @param e (event)
			 *  - DOM event object
			 */
			var onPointerCancel = function (e) {
				e.preventDefault();
				/* onPointerCancel handler is needed to deal with situations when a touchend
				doesn't fire after a touchstart (this happens on windows phones only) */
				setPositionProperty(slider.touch.originalPos.left, 'reset', 0);

				//remove handlers
				slider.controls.el.removeClass('disabled');
				slider.viewport.off('MSPointerCancel pointercancel', onPointerCancel);
				slider.viewport.off('touchmove MSPointerMove pointermove', onTouchMove);
				slider.viewport.off('touchend MSPointerUp pointerup', onTouchEnd);
				if (slider.viewport.get(0).releasePointerCapture) {
					slider.viewport.get(0).releasePointerCapture(slider.pointerId);
				}
			};

			/**
			 * Event handler for "touchmove"
			 *
			 * @param e (event)
			 *  - DOM event object
			 */
			var onTouchMove = function (e) {
				var orig = e.originalEvent,
					touchPoints = (typeof orig.changedTouches !== 'undefined') ? orig.changedTouches : [orig],
					// if scrolling on y axis, do not prevent default
					xMovement = Math.abs(touchPoints[0].pageX - slider.touch.start.x),
					yMovement = Math.abs(touchPoints[0].pageY - slider.touch.start.y),
					value = 0,
					change = 0;
				// this is swipe
				slider.hasMove = true;

				// x axis swipe
				if ((xMovement * 3) > yMovement && slider.settings.preventDefaultSwipeX) {
					e.preventDefault();
					// y axis swipe
				} else if ((yMovement * 3) > xMovement && slider.settings.preventDefaultSwipeY) {
					e.preventDefault();
				}
				if (e.type !== 'touchmove') {
					e.preventDefault();
				}

				if (slider.settings.mode !== 'fade' && slider.settings.oneToOneTouch) {
					// if horizontal, drag along x axis
					if (slider.settings.mode === 'horizontal') {
						change = touchPoints[0].pageX - slider.touch.start.x;
						value = slider.touch.originalPos.left + change;
						// if vertical, drag along y axis
					} else {
						change = touchPoints[0].pageY - slider.touch.start.y;
						value = slider.touch.originalPos.top + change;
					}
					setPositionProperty(value, 'reset', 0);
				}
			};

			/**
			 * Event handler for "touchend"
			 *
			 * @param e (event)
			 *  - DOM event object
			 */
			var onTouchEnd = function (e) {
				e.preventDefault();
				slider.viewport.off('touchmove MSPointerMove pointermove', onTouchMove);
				//enable slider controls as soon as user stops interacing with slides
				slider.controls.el.removeClass('disabled');
				var orig = e.originalEvent,
					touchPoints = (typeof orig.changedTouches !== 'undefined') ? orig.changedTouches : [orig],
					value = 0,
					distance = 0;
				// record end x, y positions
				slider.touch.end.x = touchPoints[0].pageX;
				slider.touch.end.y = touchPoints[0].pageY;
				// if fade mode, check if absolute x distance clears the threshold
				if (slider.settings.mode === 'fade') {
					distance = Math.abs(slider.touch.start.x - slider.touch.end.x);
					if (distance >= slider.settings.swipeThreshold) {
						if (slider.touch.start.x > slider.touch.end.x) {
							el.goToNextSlide();
						} else {
							el.goToPrevSlide();
						}
						el.stopAuto();
					}
					// not fade mode
				} else {
					// calculate distance and el's animate property
					if (slider.settings.mode === 'horizontal') {
						distance = slider.touch.end.x - slider.touch.start.x;
						value = slider.touch.originalPos.left;
					} else {
						distance = slider.touch.end.y - slider.touch.start.y;
						value = slider.touch.originalPos.top;
					}
					// if not infinite loop and first / last slide, do not attempt a slide transition
					if (!slider.settings.infiniteLoop && ((slider.active.index === 0 && distance > 0) || (slider.active.last && distance < 0))) {
						setPositionProperty(value, 'reset', 200);
					} else {
						// check if distance clears threshold
						if (Math.abs(distance) >= slider.settings.swipeThreshold) {
							if (distance < 0) {
								el.goToNextSlide();
							} else {
								el.goToPrevSlide();
							}
							el.stopAuto();
						} else {
							// el.animate(property, 200);
							setPositionProperty(value, 'reset', 200);
						}
					}
				}
				slider.viewport.off('touchend MSPointerUp pointerup', onTouchEnd);

				if (slider.viewport.get(0).releasePointerCapture) {
					slider.viewport.get(0).releasePointerCapture(slider.pointerId);
				}
				// if slider had swipe with left mouse, touch contact and pen contact
				if (slider.hasMove === false && (slider.originalClickButton === 0 || slider.originalEventType === 'touchstart')) {
					// trigger click event (fix for Firefox59 and PointerEvent standard compatibility)
					$(slider.originalClickTarget).trigger({
						type: 'click',
						button: slider.originalClickButton,
						buttons: slider.originalClickButtons
					});
				}
			};

			/**
			 * Window resize event callback
			 */
			var resizeWindow = function (e) {
				// don't do anything if slider isn't initialized.
				if (!slider.initialized) { return; }
				// Delay if slider working.
				if (slider.working) {
					window.setTimeout(resizeWindow, 10);
				} else {
					// get the new window dimens (again, thank you IE)
					var windowWidthNew = $(window).width(),
						windowHeightNew = $(window).height();
					// make sure that it is a true window resize
					// *we must check this because our dinosaur friend IE fires a window resize event when certain DOM elements
					// are resized. Can you just die already?*
					if (windowWidth !== windowWidthNew || windowHeight !== windowHeightNew) {
						// set the new window dimens
						windowWidth = windowWidthNew;
						windowHeight = windowHeightNew;
						// update all dynamic elements
						el.redrawSlider();
						// Call user resize handler
						slider.settings.onSliderResize.call(el, slider.active.index);
					}
				}
			};

			/**
			 * Adds an aria-hidden=true attribute to each element
			 *
			 * @param startVisibleIndex (int)
			 *  - the first visible element's index
			 */
			var applyAriaHiddenAttributes = function (startVisibleIndex) {
				var numberOfSlidesShowing = getNumberSlidesShowing();
				// only apply attributes if the setting is enabled and not in ticker mode
				if (slider.settings.ariaHidden && !slider.settings.ticker) {
					// add aria-hidden=true to all elements
					slider.children.attr('aria-hidden', 'true');
					// get the visible elements and change to aria-hidden=false
					slider.children.slice(startVisibleIndex, startVisibleIndex + numberOfSlidesShowing).attr('aria-hidden', 'false');
				}
			};

			/**
			 * Returns index according to present page range
			 *
			 * @param slideOndex (int)
			 *  - the desired slide index
			 */
			var setSlideIndex = function (slideIndex) {
				if (slideIndex < 0) {
					if (slider.settings.infiniteLoop) {
						return getPagerQty() - 1;
					} else {
						//we don't go to undefined slides
						return slider.active.index;
					}
					// if slideIndex is greater than children length, set active index to 0 (this happens during infinite loop)
				} else if (slideIndex >= getPagerQty()) {
					if (slider.settings.infiniteLoop) {
						return 0;
					} else {
						//we don't move to undefined pages
						return slider.active.index;
					}
					// set active index to requested slide
				} else {
					return slideIndex;
				}
			};

			/**
			 * ===================================================================================
			 * = PUBLIC FUNCTIONS
			 * ===================================================================================
			 */

			/**
			 * Performs slide transition to the specified slide
			 *
			 * @param slideIndex (int)
			 *  - the destination slide's index (zero-based)
			 *
			 * @param direction (string)
			 *  - INTERNAL USE ONLY - the direction of travel ("prev" / "next")
			 */
			el.goToSlide = function (slideIndex, direction) {
				// onSlideBefore, onSlideNext, onSlidePrev callbacks
				// Allow transition canceling based on returned value
				var performTransition = true,
					moveBy = 0,
					position = { left: 0, top: 0 },
					lastChild = null,
					lastShowingIndex, eq, value, requestEl;
				// store the old index
				slider.oldIndex = slider.active.index;
				//set new index
				slider.active.index = setSlideIndex(slideIndex);

				// if plugin is currently in motion, ignore request
				if (slider.working || slider.active.index === slider.oldIndex) { return; }
				// declare that plugin is in motion
				slider.working = true;

				performTransition = slider.settings.onSlideBefore.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);

				// If transitions canceled, reset and return
				if (typeof (performTransition) !== 'undefined' && !performTransition) {
					slider.active.index = slider.oldIndex; // restore old index
					slider.working = false; // is not in motion
					return;
				}

				if (direction === 'next') {
					// Prevent canceling in future functions or lack there-of from negating previous commands to cancel
					if (!slider.settings.onSlideNext.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index)) {
						performTransition = false;
					}
				} else if (direction === 'prev') {
					// Prevent canceling in future functions or lack there-of from negating previous commands to cancel
					if (!slider.settings.onSlidePrev.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index)) {
						performTransition = false;
					}
				}

				// check if last slide
				slider.active.last = slider.active.index >= getPagerQty() - 1;
				// update the pager with active class
				if (slider.settings.pager || slider.settings.pagerCustom) { updatePagerActive(slider.active.index); }
				// // check for direction control update
				if (slider.settings.controls) { updateDirectionControls(); }
				// if slider is set to mode: "fade"
				if (slider.settings.mode === 'fade') {
					// if adaptiveHeight is true and next height is different from current height, animate to the new height
					if (slider.settings.adaptiveHeight && slider.viewport.height() !== getViewportHeight()) {
						slider.viewport.animate({ height: getViewportHeight() }, slider.settings.adaptiveHeightSpeed);
					}
					// fade out the visible child and reset its z-index value
					slider.children.filter(':visible').fadeOut(slider.settings.speed).css({ zIndex: 0 });
					// fade in the newly requested slide
					slider.children.eq(slider.active.index).css('zIndex', slider.settings.slideZIndex + 1).fadeIn(slider.settings.speed, function () {
						$(this).css('zIndex', slider.settings.slideZIndex);
						updateAfterSlideTransition();
					});
					// slider mode is not "fade"
				} else {
					// if adaptiveHeight is true and next height is different from current height, animate to the new height
					if (slider.settings.adaptiveHeight && slider.viewport.height() !== getViewportHeight()) {
						slider.viewport.animate({ height: getViewportHeight() }, slider.settings.adaptiveHeightSpeed);
					}
					// if carousel and not infinite loop
					if (!slider.settings.infiniteLoop && slider.carousel && slider.active.last) {
						if (slider.settings.mode === 'horizontal') {
							// get the last child position
							lastChild = slider.children.eq(slider.children.length - 1);
							position = lastChild.position();
							// calculate the position of the last slide
							moveBy = slider.viewport.width() - lastChild.outerWidth();
						} else {
							// get last showing index position
							lastShowingIndex = slider.children.length - slider.settings.minSlides;
							position = slider.children.eq(lastShowingIndex).position();
						}
						// horizontal carousel, going previous while on first slide (infiniteLoop mode)
					} else if (slider.carousel && slider.active.last && direction === 'prev') {
						// get the last child position
						eq = slider.settings.moveSlides === 1 ? slider.settings.maxSlides - getMoveBy() : ((getPagerQty() - 1) * getMoveBy()) - (slider.children.length - slider.settings.maxSlides);
						lastChild = el.children('.bx-clone').eq(eq);
						position = lastChild.position();
						// if infinite loop and "Next" is clicked on the last slide
					} else if (direction === 'next' && slider.active.index === 0) {
						// get the last clone position
						position = el.find('> .bx-clone').eq(slider.settings.maxSlides).position();
						slider.active.last = false;
						// normal non-zero requests
					} else if (slideIndex >= 0) {
						//parseInt is applied to allow floats for slides/page
						requestEl = slideIndex * parseInt(getMoveBy());
						position = slider.children.eq(requestEl).position();
					}

					/* If the position doesn't exist
					 * (e.g. if you destroy the slider on a next click),
					 * it doesn't throw an error.
					 */
					if (typeof (position) !== 'undefined') {
						value = slider.settings.mode === 'horizontal' ? -(position.left - moveBy) : -position.top;
						// plugin values to be animated
						setPositionProperty(value, 'slide', slider.settings.speed);
					}
					slider.working = false;
				}
				if (slider.settings.ariaHidden) { applyAriaHiddenAttributes(slider.active.index * getMoveBy()); }
			};

			/**
			 * Transitions to the next slide in the show
			 */
			el.goToNextSlide = function () {
				// if infiniteLoop is false and last page is showing, disregard call
				if (!slider.settings.infiniteLoop && slider.active.last) { return; }
				if (slider.working === true) { return; }
				var pagerIndex = parseInt(slider.active.index) + 1;
				el.goToSlide(pagerIndex, 'next');
			};

			/**
			 * Transitions to the prev slide in the show
			 */
			el.goToPrevSlide = function () {
				// if infiniteLoop is false and last page is showing, disregard call
				if (!slider.settings.infiniteLoop && slider.active.index === 0) { return; }
				if (slider.working === true) { return; }
				var pagerIndex = parseInt(slider.active.index) - 1;
				el.goToSlide(pagerIndex, 'prev');
			};

			/**
			 * Starts the auto show
			 *
			 * @param preventControlUpdate (boolean)
			 *  - if true, auto controls state will not be updated
			 */
			el.startAuto = function (preventControlUpdate) {
				// if an interval already exists, disregard call
				if (slider.interval) { return; }
				// create an interval
				slider.interval = setInterval(function () {
					if (slider.settings.autoDirection === 'next') {
						el.goToNextSlide();
					} else {
						el.goToPrevSlide();
					}
				}, slider.settings.pause);
				//allback for when the auto rotate status changes
				slider.settings.onAutoChange.call(el, true);
				// if auto controls are displayed and preventControlUpdate is not true
				if (slider.settings.autoControls && preventControlUpdate !== true) { updateAutoControls('stop'); }
			};

			/**
			 * Stops the auto show
			 *
			 * @param preventControlUpdate (boolean)
			 *  - if true, auto controls state will not be updated
			 */
			el.stopAuto = function (preventControlUpdate) {
				// if slider is auto paused, just clear that state
				if (slider.autoPaused) slider.autoPaused = false;
				// if no interval exists, disregard call
				if (!slider.interval) { return; }
				// clear the interval
				clearInterval(slider.interval);
				slider.interval = null;
				//allback for when the auto rotate status changes
				slider.settings.onAutoChange.call(el, false);
				// if auto controls are displayed and preventControlUpdate is not true
				if (slider.settings.autoControls && preventControlUpdate !== true) { updateAutoControls('start'); }
			};

			/**
			 * Returns current slide index (zero-based)
			 */
			el.getCurrentSlide = function () {
				return slider.active.index;
			};

			/**
			 * Returns current slide element
			 */
			el.getCurrentSlideElement = function () {
				return slider.children.eq(slider.active.index);
			};

			/**
			 * Returns a slide element
			 * @param index (int)
			 *  - The index (zero-based) of the element you want returned.
			 */
			el.getSlideElement = function (index) {
				return slider.children.eq(index);
			};

			/**
			 * Returns number of slides in show
			 */
			el.getSlideCount = function () {
				return slider.children.length;
			};

			/**
			 * Return slider.working variable
			 */
			el.isWorking = function () {
				return slider.working;
			};

			/**
			 * Update all dynamic slider elements
			 */
			el.redrawSlider = function () {
				// resize all children in ratio to new screen size
				slider.children.add(el.find('.bx-clone')).outerWidth(getSlideWidth());
				// adjust the height
				slider.viewport.css('height', getViewportHeight());
				// update the slide position
				if (!slider.settings.ticker) { setSlidePosition(); }
				// if active.last was true before the screen resize, we want
				// to keep it last no matter what screen size we end on
				if (slider.active.last) { slider.active.index = getPagerQty() - 1; }
				// if the active index (page) no longer exists due to the resize, simply set the index as last
				if (slider.active.index >= getPagerQty()) { slider.active.last = true; }
				// if a pager is being displayed and a custom pager is not being used, update it
				if (slider.settings.pager && !slider.settings.pagerCustom) {
					populatePager();
					updatePagerActive(slider.active.index);
				}
				if (slider.settings.ariaHidden) { applyAriaHiddenAttributes(slider.active.index * getMoveBy()); }
			};

			/**
			 * Destroy the current instance of the slider (revert everything back to original state)
			 */
			el.destroySlider = function () {
				// don't do anything if slider has already been destroyed
				if (!slider.initialized) { return; }
				slider.initialized = false;
				$('.bx-clone', this).remove();
				slider.children.each(function () {
					if ($(this).data('origStyle') !== undefined) {
						$(this).attr('style', $(this).data('origStyle'));
					} else {
						$(this).removeAttr('style');
					}
				});
				if ($(this).data('origStyle') !== undefined) {
					this.attr('style', $(this).data('origStyle'));
				} else {
					$(this).removeAttr('style');
				}
				$(this).unwrap().unwrap();
				if (slider.controls.el) { slider.controls.el.remove(); }
				if (slider.controls.next) { slider.controls.next.remove(); }
				if (slider.controls.prev) { slider.controls.prev.remove(); }
				if (slider.pagerEl && slider.settings.controls && !slider.settings.pagerCustom) { slider.pagerEl.remove(); }
				$('.bx-caption', this).remove();
				if (slider.controls.autoEl) { slider.controls.autoEl.remove(); }
				clearInterval(slider.interval);
				if (slider.settings.responsive) { $(window).off('resize', resizeWindow); }
				if (slider.settings.keyboardEnabled) { $(document).off('keydown', keyPress); }
				//remove self reference in data
				$(this).removeData('bxSlider');
				// remove global window handlers
				$(window).off('blur', windowBlurHandler).off('focus', windowFocusHandler);
			};

			/**
			 * Reload the slider (revert all DOM changes, and re-initialize)
			 */
			el.reloadSlider = function (settings) {
				if (settings !== undefined) { options = settings; }
				el.destroySlider();
				init();
				//store reference to self in order to access public functions later
				$(el).data('bxSlider', this);
			};

			init();

			$(el).data('bxSlider', this);

			// returns the current jQuery object
			return this;
		};

	})(jQuery);


/*
 * jQuery Cycle Carousel plugin
 */
; (function ($) {
	'use strict';
	// detect device type
	var isTouchDevice = /Windows Phone/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

	function ScrollAbsoluteGallery(options) {
		this.options = $.extend({
			activeClass: 'active',
			mask: 'div.slides-mask',
			slider: '>ul',
			slides: '>li',
			btnPrev: '.btn-prev',
			btnNext: '.btn-next',
			pagerLinks: 'ul.pager > li',
			generatePagination: false,
			pagerList: '<ul>',
			pagerListItem: '<li><a href="#"></a></li>',
			pagerListItemText: 'a',
			galleryReadyClass: 'gallery-js-ready',
			currentNumber: 'span.current-num',
			totalNumber: 'span.total-num',
			maskAutoSize: true,
			autoRotation: false,
			pauseOnHover: false,
			stretchSlideToMask: false,
			switchTime: 3000,
			animSpeed: 500,
			handleTouch: true,
			swipeThreshold: 15,
			vertical: false
		}, options);
		this.init();
	}
	ScrollAbsoluteGallery.prototype = {
		init: function () {
			if (this.options.holder) {
				this.findElements();
				this.attachEvents();
				this.makeCallback('onInit', this);
			}
		},
		findElements: function () {
			// find structure elements
			this.holder = $(this.options.holder).addClass(this.options.galleryReadyClass);
			this.mask = this.holder.find(this.options.mask);
			this.slider = this.mask.find(this.options.slider);
			this.slides = this.slider.find(this.options.slides);
			this.btnPrev = this.holder.find(this.options.btnPrev);
			this.btnNext = this.holder.find(this.options.btnNext);

			// slide count display
			this.currentNumber = this.holder.find(this.options.currentNumber);
			this.totalNumber = this.holder.find(this.options.totalNumber);

			// create gallery pagination
			if (typeof this.options.generatePagination === 'string') {
				this.pagerLinks = this.buildPagination();
			} else {
				this.pagerLinks = this.holder.find(this.options.pagerLinks);
			}

			// define index variables
			this.sizeProperty = this.options.vertical ? 'height' : 'width';
			this.positionProperty = this.options.vertical ? 'top' : 'left';
			this.animProperty = this.options.vertical ? 'marginTop' : 'marginLeft';

			this.slideSize = this.slides[this.sizeProperty]();
			this.currentIndex = 0;
			this.prevIndex = 0;

			// reposition elements
			this.options.maskAutoSize = this.options.vertical ? false : this.options.maskAutoSize;
			if (this.options.vertical) {
				this.mask.css({
					height: this.slides.innerHeight()
				});
			}
			if (this.options.maskAutoSize) {
				this.mask.css({
					height: this.slider.height()
				});
			}
			this.slider.css({
				position: 'relative',
				height: this.options.vertical ? this.slideSize * this.slides.length : '100%'
			});
			this.slides.css({
				position: 'absolute'
			}).css(this.positionProperty, -9999).eq(this.currentIndex).css(this.positionProperty, 0);
			this.refreshState();
			this.isInit = true;
		},
		buildPagination: function () {
			var pagerLinks = $();
			if (!this.pagerHolder) {
				this.pagerHolder = this.holder.find(this.options.generatePagination);
			}
			if (this.pagerHolder.length) {
				this.pagerHolder.empty();
				this.pagerList = $(this.options.pagerList).appendTo(this.pagerHolder);
				for (var i = 0; i < this.slides.length; i++) {
					$(this.options.pagerListItem).appendTo(this.pagerList).find(this.options.pagerListItemText).text(i + 1);
				}
				pagerLinks = this.pagerList.children();
			}
			return pagerLinks;
		},
		attachEvents: function () {
			// attach handlers
			var self = this;
			if (this.btnPrev.length) {
				this.btnPrevHandler = function (e) {
					e.preventDefault();
					self.prevSlide();
				};
				this.btnPrev.click(this.btnPrevHandler);
			}
			if (this.btnNext.length) {
				this.btnNextHandler = function (e) {
					e.preventDefault();
					self.nextSlide();
				};
				this.btnNext.click(this.btnNextHandler);
			}
			if (this.pagerLinks.length) {
				this.pagerLinksHandler = function (e) {
					e.preventDefault();
					self.numSlide(self.pagerLinks.index(e.currentTarget));
				};
				this.pagerLinks.click(this.pagerLinksHandler);
			}

			// handle autorotation pause on hover
			if (this.options.pauseOnHover) {
				this.hoverHandler = function () {
					clearTimeout(self.timer);
				};
				this.leaveHandler = function () {
					self.autoRotate();
				};
				this.holder.bind({
					mouseenter: this.hoverHandler,
					mouseleave: this.leaveHandler
				});
			}

			// handle holder and slides dimensions
			this.resizeHandler = function () {
				if (!self.animating && self.isInit) {
					if (self.options.stretchSlideToMask) {
						self.resizeSlides();
					}
					self.resizeHolder();
					self.setSlidesPosition(self.currentIndex);
				}
			};
			$(window).bind('load resize orientationchange', this.resizeHandler);
			if (self.options.stretchSlideToMask) {
				self.resizeSlides();
			}

			// handle swipe on mobile devices
			if (this.options.handleTouch && window.Hammer && this.mask.length && this.slides.length > 1 && isTouchDevice) {
				this.swipeHandler = new Hammer.Manager(this.mask[0]);
				this.swipeHandler.add(new Hammer.Pan({
					direction: self.options.vertical ? Hammer.DIRECTION_VERTICAL : Hammer.DIRECTION_HORIZONTAL,
					threshold: self.options.swipeThreshold
				}));

				this.swipeHandler.on('panstart', function () {
					if (self.animating) {
						self.swipeHandler.stop();
					} else {
						clearTimeout(self.timer);
					}
				}).on('panmove', function (e) {
					self.swipeOffset = -self.slideSize + e[self.options.vertical ? 'deltaY' : 'deltaX'];
					self.slider.css(self.animProperty, self.swipeOffset);
					clearTimeout(self.timer);
				}).on('panend', function (e) {
					if (e.distance > self.options.swipeThreshold) {
						if (e.offsetDirection === Hammer.DIRECTION_RIGHT || e.offsetDirection === Hammer.DIRECTION_DOWN) {
							self.prevSlide();
						} else {
							self.nextSlide();
						}
					} else {
						var tmpObj = {};
						tmpObj[self.animProperty] = -self.slideSize;
						self.slider.animate(tmpObj, {
							duration: self.options.animSpeed
						});
						self.autoRotate();
					}
					self.swipeOffset = 0;
				});
			}

			// start autorotation
			this.autoRotate();
			this.resizeHolder();
			this.setSlidesPosition(this.currentIndex);
		},
		resizeSlides: function () {
			this.slideSize = this.mask[this.options.vertical ? 'height' : 'width']();
			this.slides.css(this.sizeProperty, this.slideSize);
		},
		resizeHolder: function () {
			if (this.options.maskAutoSize) {
				this.mask.css({
					height: this.slides.eq(this.currentIndex).outerHeight(true)
				});
			}
		},
		prevSlide: function () {
			if (!this.animating && this.slides.length > 1) {
				this.direction = -1;
				this.prevIndex = this.currentIndex;
				if (this.currentIndex > 0) this.currentIndex--;
				else this.currentIndex = this.slides.length - 1;
				this.switchSlide();
			}
		},
		nextSlide: function (fromAutoRotation) {
			if (!this.animating && this.slides.length > 1) {
				this.direction = 1;
				this.prevIndex = this.currentIndex;
				if (this.currentIndex < this.slides.length - 1) this.currentIndex++;
				else this.currentIndex = 0;
				this.switchSlide();
			}
		},
		numSlide: function (c) {
			if (!this.animating && this.currentIndex !== c && this.slides.length > 1) {
				this.direction = c > this.currentIndex ? 1 : -1;
				this.prevIndex = this.currentIndex;
				this.currentIndex = c;
				this.switchSlide();
			}
		},
		preparePosition: function () {
			// prepare slides position before animation
			this.setSlidesPosition(this.prevIndex, this.direction < 0 ? this.currentIndex : null, this.direction > 0 ? this.currentIndex : null, this.direction);
		},
		setSlidesPosition: function (index, slideLeft, slideRight, direction) {
			// reposition holder and nearest slides
			if (this.slides.length > 1) {
				var prevIndex = (typeof slideLeft === 'number' ? slideLeft : index > 0 ? index - 1 : this.slides.length - 1);
				var nextIndex = (typeof slideRight === 'number' ? slideRight : index < this.slides.length - 1 ? index + 1 : 0);

				this.slider.css(this.animProperty, this.swipeOffset ? this.swipeOffset : -this.slideSize);
				this.slides.css(this.positionProperty, -9999).eq(index).css(this.positionProperty, this.slideSize);
				if (prevIndex === nextIndex && typeof direction === 'number') {
					var calcOffset = direction > 0 ? this.slideSize * 2 : 0;
					this.slides.eq(nextIndex).css(this.positionProperty, calcOffset);
				} else {
					this.slides.eq(prevIndex).css(this.positionProperty, 0);
					this.slides.eq(nextIndex).css(this.positionProperty, this.slideSize * 2);
				}
			}
		},
		switchSlide: function () {
			// prepare positions and calculate offset
			var self = this;
			var oldSlide = this.slides.eq(this.prevIndex);
			var newSlide = this.slides.eq(this.currentIndex);
			this.animating = true;

			// resize mask to fit slide
			if (this.options.maskAutoSize) {
				this.mask.animate({
					height: newSlide.outerHeight(true)
				}, {
					duration: this.options.animSpeed
				});
			}

			// start animation
			var animProps = {};
			animProps[this.animProperty] = this.direction > 0 ? -this.slideSize * 2 : 0;
			this.preparePosition();
			this.slider.animate(animProps, {
				duration: this.options.animSpeed,
				complete: function () {
					self.setSlidesPosition(self.currentIndex);

					// start autorotation
					self.animating = false;
					self.autoRotate();

					// onchange callback
					self.makeCallback('onChange', self);
				}
			});

			// refresh classes
			this.refreshState();

			// onchange callback
			this.makeCallback('onBeforeChange', this);
		},
		refreshState: function (initial) {
			// slide change function
			this.slides.removeClass(this.options.activeClass).eq(this.currentIndex).addClass(this.options.activeClass);
			this.pagerLinks.removeClass(this.options.activeClass).eq(this.currentIndex).addClass(this.options.activeClass);

			// display current slide number
			this.currentNumber.html(this.currentIndex + 1);
			this.totalNumber.html(this.slides.length);

			// add class if not enough slides
			this.holder.toggleClass('not-enough-slides', this.slides.length === 1);
		},
		autoRotate: function () {
			var self = this;
			clearTimeout(this.timer);
			if (this.options.autoRotation) {
				this.timer = setTimeout(function () {
					self.nextSlide();
				}, this.options.switchTime);
			}
		},
		makeCallback: function (name) {
			if (typeof this.options[name] === 'function') {
				var args = Array.prototype.slice.call(arguments);
				args.shift();
				this.options[name].apply(this, args);
			}
		},
		destroy: function () {
			// destroy handler
			this.isInit = false;
			this.btnPrev.unbind('click', this.btnPrevHandler);
			this.btnNext.unbind('click', this.btnNextHandler);
			this.pagerLinks.unbind('click', this.pagerLinksHandler);
			this.holder.unbind('mouseenter', this.hoverHandler);
			this.holder.unbind('mouseleave', this.leaveHandler);
			$(window).unbind('load resize orientationchange', this.resizeHandler);
			clearTimeout(this.timer);

			// destroy swipe handler
			if (this.swipeHandler) {
				this.swipeHandler.destroy();
			}

			// remove inline styles, classes and pagination
			this.holder.removeClass(this.options.galleryReadyClass).removeData('ScrollAbsoluteGallery');
			this.slider.add(this.slides).add(this.mask).removeAttr('style');
			this.slides.removeClass(this.options.activeClass);
			if (typeof this.options.generatePagination === 'string') {
				this.pagerHolder.empty();
			}
		}
	};

	// jquery plugin
	$.fn.scrollAbsoluteGallery = function (opt) {
		var args = Array.prototype.slice.call(arguments);
		var method = args[0];

		return this.each(function () {
			var $holder = jQuery(this);
			var instance = $holder.data('ScrollAbsoluteGallery');

			if (typeof opt === 'object' || typeof opt === 'undefined') {
				$holder.data('ScrollAbsoluteGallery', new ScrollAbsoluteGallery($.extend({
					holder: this
				}, opt)));
			} else if (typeof method === 'string' && instance) {
				if (typeof instance[method] === 'function') {
					args.shift();
					instance[method].apply(instance, args);
				}
			}
		});
	};
}(jQuery));

/*! Hammer.JS - v2.0.8 - 2016-04-23
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
!function (a, b, c, d) { "use strict"; function e(a, b, c) { return setTimeout(j(a, c), b) } function f(a, b, c) { return Array.isArray(a) ? (g(a, c[b], c), !0) : !1 } function g(a, b, c) { var e; if (a) if (a.forEach) a.forEach(b, c); else if (a.length !== d) for (e = 0; e < a.length;)b.call(c, a[e], e, a), e++; else for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a) } function h(b, c, d) { var e = "DEPRECATED METHOD: " + c + "\n" + d + " AT \n"; return function () { var c = new Error("get-stack-trace"), d = c && c.stack ? c.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace", f = a.console && (a.console.warn || a.console.log); return f && f.call(a.console, e, d), b.apply(this, arguments) } } function i(a, b, c) { var d, e = b.prototype; d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && la(d, c) } function j(a, b) { return function () { return a.apply(b, arguments) } } function k(a, b) { return typeof a == oa ? a.apply(b ? b[0] || d : d, b) : a } function l(a, b) { return a === d ? b : a } function m(a, b, c) { g(q(b), function (b) { a.addEventListener(b, c, !1) }) } function n(a, b, c) { g(q(b), function (b) { a.removeEventListener(b, c, !1) }) } function o(a, b) { for (; a;) { if (a == b) return !0; a = a.parentNode } return !1 } function p(a, b) { return a.indexOf(b) > -1 } function q(a) { return a.trim().split(/\s+/g) } function r(a, b, c) { if (a.indexOf && !c) return a.indexOf(b); for (var d = 0; d < a.length;) { if (c && a[d][c] == b || !c && a[d] === b) return d; d++ } return -1 } function s(a) { return Array.prototype.slice.call(a, 0) } function t(a, b, c) { for (var d = [], e = [], f = 0; f < a.length;) { var g = b ? a[f][b] : a[f]; r(e, g) < 0 && d.push(a[f]), e[f] = g, f++ } return c && (d = b ? d.sort(function (a, c) { return a[b] > c[b] }) : d.sort()), d } function u(a, b) { for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ma.length;) { if (c = ma[g], e = c ? c + f : b, e in a) return e; g++ } return d } function v() { return ua++ } function w(b) { var c = b.ownerDocument || b; return c.defaultView || c.parentWindow || a } function x(a, b) { var c = this; this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function (b) { k(a.options.enable, [a]) && c.handler(b) }, this.init() } function y(a) { var b, c = a.options.inputClass; return new (b = c ? c : xa ? M : ya ? P : wa ? R : L)(a, z) } function z(a, b, c) { var d = c.pointers.length, e = c.changedPointers.length, f = b & Ea && d - e === 0, g = b & (Ga | Ha) && d - e === 0; c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, A(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c } function A(a, b) { var c = a.session, d = b.pointers, e = d.length; c.firstInput || (c.firstInput = D(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = D(b) : 1 === e && (c.firstMultiple = !1); var f = c.firstInput, g = c.firstMultiple, h = g ? g.center : f.center, i = b.center = E(d); b.timeStamp = ra(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = I(h, i), b.distance = H(h, i), B(c, b), b.offsetDirection = G(b.deltaX, b.deltaY); var j = F(b.deltaTime, b.deltaX, b.deltaY); b.overallVelocityX = j.x, b.overallVelocityY = j.y, b.overallVelocity = qa(j.x) > qa(j.y) ? j.x : j.y, b.scale = g ? K(g.pointers, d) : 1, b.rotation = g ? J(g.pointers, d) : 0, b.maxPointers = c.prevInput ? b.pointers.length > c.prevInput.maxPointers ? b.pointers.length : c.prevInput.maxPointers : b.pointers.length, C(c, b); var k = a.element; o(b.srcEvent.target, k) && (k = b.srcEvent.target), b.target = k } function B(a, b) { var c = b.center, d = a.offsetDelta || {}, e = a.prevDelta || {}, f = a.prevInput || {}; b.eventType !== Ea && f.eventType !== Ga || (e = a.prevDelta = { x: f.deltaX || 0, y: f.deltaY || 0 }, d = a.offsetDelta = { x: c.x, y: c.y }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y) } function C(a, b) { var c, e, f, g, h = a.lastInterval || b, i = b.timeStamp - h.timeStamp; if (b.eventType != Ha && (i > Da || h.velocity === d)) { var j = b.deltaX - h.deltaX, k = b.deltaY - h.deltaY, l = F(i, j, k); e = l.x, f = l.y, c = qa(l.x) > qa(l.y) ? l.x : l.y, g = G(j, k), a.lastInterval = b } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction; b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g } function D(a) { for (var b = [], c = 0; c < a.pointers.length;)b[c] = { clientX: pa(a.pointers[c].clientX), clientY: pa(a.pointers[c].clientY) }, c++; return { timeStamp: ra(), pointers: b, center: E(b), deltaX: a.deltaX, deltaY: a.deltaY } } function E(a) { var b = a.length; if (1 === b) return { x: pa(a[0].clientX), y: pa(a[0].clientY) }; for (var c = 0, d = 0, e = 0; b > e;)c += a[e].clientX, d += a[e].clientY, e++; return { x: pa(c / b), y: pa(d / b) } } function F(a, b, c) { return { x: b / a || 0, y: c / a || 0 } } function G(a, b) { return a === b ? Ia : qa(a) >= qa(b) ? 0 > a ? Ja : Ka : 0 > b ? La : Ma } function H(a, b, c) { c || (c = Qa); var d = b[c[0]] - a[c[0]], e = b[c[1]] - a[c[1]]; return Math.sqrt(d * d + e * e) } function I(a, b, c) { c || (c = Qa); var d = b[c[0]] - a[c[0]], e = b[c[1]] - a[c[1]]; return 180 * Math.atan2(e, d) / Math.PI } function J(a, b) { return I(b[1], b[0], Ra) + I(a[1], a[0], Ra) } function K(a, b) { return H(b[0], b[1], Ra) / H(a[0], a[1], Ra) } function L() { this.evEl = Ta, this.evWin = Ua, this.pressed = !1, x.apply(this, arguments) } function M() { this.evEl = Xa, this.evWin = Ya, x.apply(this, arguments), this.store = this.manager.session.pointerEvents = [] } function N() { this.evTarget = $a, this.evWin = _a, this.started = !1, x.apply(this, arguments) } function O(a, b) { var c = s(a.touches), d = s(a.changedTouches); return b & (Ga | Ha) && (c = t(c.concat(d), "identifier", !0)), [c, d] } function P() { this.evTarget = bb, this.targetIds = {}, x.apply(this, arguments) } function Q(a, b) { var c = s(a.touches), d = this.targetIds; if (b & (Ea | Fa) && 1 === c.length) return d[c[0].identifier] = !0, [c, c]; var e, f, g = s(a.changedTouches), h = [], i = this.target; if (f = c.filter(function (a) { return o(a.target, i) }), b === Ea) for (e = 0; e < f.length;)d[f[e].identifier] = !0, e++; for (e = 0; e < g.length;)d[g[e].identifier] && h.push(g[e]), b & (Ga | Ha) && delete d[g[e].identifier], e++; return h.length ? [t(f.concat(h), "identifier", !0), h] : void 0 } function R() { x.apply(this, arguments); var a = j(this.handler, this); this.touch = new P(this.manager, a), this.mouse = new L(this.manager, a), this.primaryTouch = null, this.lastTouches = [] } function S(a, b) { a & Ea ? (this.primaryTouch = b.changedPointers[0].identifier, T.call(this, b)) : a & (Ga | Ha) && T.call(this, b) } function T(a) { var b = a.changedPointers[0]; if (b.identifier === this.primaryTouch) { var c = { x: b.clientX, y: b.clientY }; this.lastTouches.push(c); var d = this.lastTouches, e = function () { var a = d.indexOf(c); a > -1 && d.splice(a, 1) }; setTimeout(e, cb) } } function U(a) { for (var b = a.srcEvent.clientX, c = a.srcEvent.clientY, d = 0; d < this.lastTouches.length; d++) { var e = this.lastTouches[d], f = Math.abs(b - e.x), g = Math.abs(c - e.y); if (db >= f && db >= g) return !0 } return !1 } function V(a, b) { this.manager = a, this.set(b) } function W(a) { if (p(a, jb)) return jb; var b = p(a, kb), c = p(a, lb); return b && c ? jb : b || c ? b ? kb : lb : p(a, ib) ? ib : hb } function X() { if (!fb) return !1; var b = {}, c = a.CSS && a.CSS.supports; return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function (d) { b[d] = c ? a.CSS.supports("touch-action", d) : !0 }), b } function Y(a) { this.options = la({}, this.defaults, a || {}), this.id = v(), this.manager = null, this.options.enable = l(this.options.enable, !0), this.state = nb, this.simultaneous = {}, this.requireFail = [] } function Z(a) { return a & sb ? "cancel" : a & qb ? "end" : a & pb ? "move" : a & ob ? "start" : "" } function $(a) { return a == Ma ? "down" : a == La ? "up" : a == Ja ? "left" : a == Ka ? "right" : "" } function _(a, b) { var c = b.manager; return c ? c.get(a) : a } function aa() { Y.apply(this, arguments) } function ba() { aa.apply(this, arguments), this.pX = null, this.pY = null } function ca() { aa.apply(this, arguments) } function da() { Y.apply(this, arguments), this._timer = null, this._input = null } function ea() { aa.apply(this, arguments) } function fa() { aa.apply(this, arguments) } function ga() { Y.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0 } function ha(a, b) { return b = b || {}, b.recognizers = l(b.recognizers, ha.defaults.preset), new ia(a, b) } function ia(a, b) { this.options = la({}, ha.defaults, b || {}), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = a, this.input = y(this), this.touchAction = new V(this, this.options.touchAction), ja(this, !0), g(this.options.recognizers, function (a) { var b = this.add(new a[0](a[1])); a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3]) }, this) } function ja(a, b) { var c = a.element; if (c.style) { var d; g(a.options.cssProps, function (e, f) { d = u(c.style, f), b ? (a.oldCssProps[d] = c.style[d], c.style[d] = e) : c.style[d] = a.oldCssProps[d] || "" }), b || (a.oldCssProps = {}) } } function ka(a, c) { var d = b.createEvent("Event"); d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d) } var la, ma = ["", "webkit", "Moz", "MS", "ms", "o"], na = b.createElement("div"), oa = "function", pa = Math.round, qa = Math.abs, ra = Date.now; la = "function" != typeof Object.assign ? function (a) { if (a === d || null === a) throw new TypeError("Cannot convert undefined or null to object"); for (var b = Object(a), c = 1; c < arguments.length; c++) { var e = arguments[c]; if (e !== d && null !== e) for (var f in e) e.hasOwnProperty(f) && (b[f] = e[f]) } return b } : Object.assign; var sa = h(function (a, b, c) { for (var e = Object.keys(b), f = 0; f < e.length;)(!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++; return a }, "extend", "Use `assign`."), ta = h(function (a, b) { return sa(a, b, !0) }, "merge", "Use `assign`."), ua = 1, va = /mobile|tablet|ip(ad|hone|od)|android/i, wa = "ontouchstart" in a, xa = u(a, "PointerEvent") !== d, ya = wa && va.test(navigator.userAgent), za = "touch", Aa = "pen", Ba = "mouse", Ca = "kinect", Da = 25, Ea = 1, Fa = 2, Ga = 4, Ha = 8, Ia = 1, Ja = 2, Ka = 4, La = 8, Ma = 16, Na = Ja | Ka, Oa = La | Ma, Pa = Na | Oa, Qa = ["x", "y"], Ra = ["clientX", "clientY"]; x.prototype = { handler: function () { }, init: function () { this.evEl && m(this.element, this.evEl, this.domHandler), this.evTarget && m(this.target, this.evTarget, this.domHandler), this.evWin && m(w(this.element), this.evWin, this.domHandler) }, destroy: function () { this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(w(this.element), this.evWin, this.domHandler) } }; var Sa = { mousedown: Ea, mousemove: Fa, mouseup: Ga }, Ta = "mousedown", Ua = "mousemove mouseup"; i(L, x, { handler: function (a) { var b = Sa[a.type]; b & Ea && 0 === a.button && (this.pressed = !0), b & Fa && 1 !== a.which && (b = Ga), this.pressed && (b & Ga && (this.pressed = !1), this.callback(this.manager, b, { pointers: [a], changedPointers: [a], pointerType: Ba, srcEvent: a })) } }); var Va = { pointerdown: Ea, pointermove: Fa, pointerup: Ga, pointercancel: Ha, pointerout: Ha }, Wa = { 2: za, 3: Aa, 4: Ba, 5: Ca }, Xa = "pointerdown", Ya = "pointermove pointerup pointercancel"; a.MSPointerEvent && !a.PointerEvent && (Xa = "MSPointerDown", Ya = "MSPointerMove MSPointerUp MSPointerCancel"), i(M, x, { handler: function (a) { var b = this.store, c = !1, d = a.type.toLowerCase().replace("ms", ""), e = Va[d], f = Wa[a.pointerType] || a.pointerType, g = f == za, h = r(b, a.pointerId, "pointerId"); e & Ea && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Ga | Ha) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, { pointers: b, changedPointers: [a], pointerType: f, srcEvent: a }), c && b.splice(h, 1)) } }); var Za = { touchstart: Ea, touchmove: Fa, touchend: Ga, touchcancel: Ha }, $a = "touchstart", _a = "touchstart touchmove touchend touchcancel"; i(N, x, { handler: function (a) { var b = Za[a.type]; if (b === Ea && (this.started = !0), this.started) { var c = O.call(this, a, b); b & (Ga | Ha) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: za, srcEvent: a }) } } }); var ab = { touchstart: Ea, touchmove: Fa, touchend: Ga, touchcancel: Ha }, bb = "touchstart touchmove touchend touchcancel"; i(P, x, { handler: function (a) { var b = ab[a.type], c = Q.call(this, a, b); c && this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: za, srcEvent: a }) } }); var cb = 2500, db = 25; i(R, x, { handler: function (a, b, c) { var d = c.pointerType == za, e = c.pointerType == Ba; if (!(e && c.sourceCapabilities && c.sourceCapabilities.firesTouchEvents)) { if (d) S.call(this, b, c); else if (e && U.call(this, c)) return; this.callback(a, b, c) } }, destroy: function () { this.touch.destroy(), this.mouse.destroy() } }); var eb = u(na.style, "touchAction"), fb = eb !== d, gb = "compute", hb = "auto", ib = "manipulation", jb = "none", kb = "pan-x", lb = "pan-y", mb = X(); V.prototype = { set: function (a) { a == gb && (a = this.compute()), fb && this.manager.element.style && mb[a] && (this.manager.element.style[eb] = a), this.actions = a.toLowerCase().trim() }, update: function () { this.set(this.manager.options.touchAction) }, compute: function () { var a = []; return g(this.manager.recognizers, function (b) { k(b.options.enable, [b]) && (a = a.concat(b.getTouchAction())) }), W(a.join(" ")) }, preventDefaults: function (a) { var b = a.srcEvent, c = a.offsetDirection; if (this.manager.session.prevented) return void b.preventDefault(); var d = this.actions, e = p(d, jb) && !mb[jb], f = p(d, lb) && !mb[lb], g = p(d, kb) && !mb[kb]; if (e) { var h = 1 === a.pointers.length, i = a.distance < 2, j = a.deltaTime < 250; if (h && i && j) return } return g && f ? void 0 : e || f && c & Na || g && c & Oa ? this.preventSrc(b) : void 0 }, preventSrc: function (a) { this.manager.session.prevented = !0, a.preventDefault() } }; var nb = 1, ob = 2, pb = 4, qb = 8, rb = qb, sb = 16, tb = 32; Y.prototype = { defaults: {}, set: function (a) { return la(this.options, a), this.manager && this.manager.touchAction.update(), this }, recognizeWith: function (a) { if (f(a, "recognizeWith", this)) return this; var b = this.simultaneous; return a = _(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this }, dropRecognizeWith: function (a) { return f(a, "dropRecognizeWith", this) ? this : (a = _(a, this), delete this.simultaneous[a.id], this) }, requireFailure: function (a) { if (f(a, "requireFailure", this)) return this; var b = this.requireFail; return a = _(a, this), -1 === r(b, a) && (b.push(a), a.requireFailure(this)), this }, dropRequireFailure: function (a) { if (f(a, "dropRequireFailure", this)) return this; a = _(a, this); var b = r(this.requireFail, a); return b > -1 && this.requireFail.splice(b, 1), this }, hasRequireFailures: function () { return this.requireFail.length > 0 }, canRecognizeWith: function (a) { return !!this.simultaneous[a.id] }, emit: function (a) { function b(b) { c.manager.emit(b, a) } var c = this, d = this.state; qb > d && b(c.options.event + Z(d)), b(c.options.event), a.additionalEvent && b(a.additionalEvent), d >= qb && b(c.options.event + Z(d)) }, tryEmit: function (a) { return this.canEmit() ? this.emit(a) : void (this.state = tb) }, canEmit: function () { for (var a = 0; a < this.requireFail.length;) { if (!(this.requireFail[a].state & (tb | nb))) return !1; a++ } return !0 }, recognize: function (a) { var b = la({}, a); return k(this.options.enable, [this, b]) ? (this.state & (rb | sb | tb) && (this.state = nb), this.state = this.process(b), void (this.state & (ob | pb | qb | sb) && this.tryEmit(b))) : (this.reset(), void (this.state = tb)) }, process: function (a) { }, getTouchAction: function () { }, reset: function () { } }, i(aa, Y, { defaults: { pointers: 1 }, attrTest: function (a) { var b = this.options.pointers; return 0 === b || a.pointers.length === b }, process: function (a) { var b = this.state, c = a.eventType, d = b & (ob | pb), e = this.attrTest(a); return d && (c & Ha || !e) ? b | sb : d || e ? c & Ga ? b | qb : b & ob ? b | pb : ob : tb } }), i(ba, aa, { defaults: { event: "pan", threshold: 10, pointers: 1, direction: Pa }, getTouchAction: function () { var a = this.options.direction, b = []; return a & Na && b.push(lb), a & Oa && b.push(kb), b }, directionTest: function (a) { var b = this.options, c = !0, d = a.distance, e = a.direction, f = a.deltaX, g = a.deltaY; return e & b.direction || (b.direction & Na ? (e = 0 === f ? Ia : 0 > f ? Ja : Ka, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Ia : 0 > g ? La : Ma, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction }, attrTest: function (a) { return aa.prototype.attrTest.call(this, a) && (this.state & ob || !(this.state & ob) && this.directionTest(a)) }, emit: function (a) { this.pX = a.deltaX, this.pY = a.deltaY; var b = $(a.direction); b && (a.additionalEvent = this.options.event + b), this._super.emit.call(this, a) } }), i(ca, aa, { defaults: { event: "pinch", threshold: 0, pointers: 2 }, getTouchAction: function () { return [jb] }, attrTest: function (a) { return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & ob) }, emit: function (a) { if (1 !== a.scale) { var b = a.scale < 1 ? "in" : "out"; a.additionalEvent = this.options.event + b } this._super.emit.call(this, a) } }), i(da, Y, { defaults: { event: "press", pointers: 1, time: 251, threshold: 9 }, getTouchAction: function () { return [hb] }, process: function (a) { var b = this.options, c = a.pointers.length === b.pointers, d = a.distance < b.threshold, f = a.deltaTime > b.time; if (this._input = a, !d || !c || a.eventType & (Ga | Ha) && !f) this.reset(); else if (a.eventType & Ea) this.reset(), this._timer = e(function () { this.state = rb, this.tryEmit() }, b.time, this); else if (a.eventType & Ga) return rb; return tb }, reset: function () { clearTimeout(this._timer) }, emit: function (a) { this.state === rb && (a && a.eventType & Ga ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = ra(), this.manager.emit(this.options.event, this._input))) } }), i(ea, aa, { defaults: { event: "rotate", threshold: 0, pointers: 2 }, getTouchAction: function () { return [jb] }, attrTest: function (a) { return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & ob) } }), i(fa, aa, { defaults: { event: "swipe", threshold: 10, velocity: .3, direction: Na | Oa, pointers: 1 }, getTouchAction: function () { return ba.prototype.getTouchAction.call(this) }, attrTest: function (a) { var b, c = this.options.direction; return c & (Na | Oa) ? b = a.overallVelocity : c & Na ? b = a.overallVelocityX : c & Oa && (b = a.overallVelocityY), this._super.attrTest.call(this, a) && c & a.offsetDirection && a.distance > this.options.threshold && a.maxPointers == this.options.pointers && qa(b) > this.options.velocity && a.eventType & Ga }, emit: function (a) { var b = $(a.offsetDirection); b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a) } }), i(ga, Y, { defaults: { event: "tap", pointers: 1, taps: 1, interval: 300, time: 250, threshold: 9, posThreshold: 10 }, getTouchAction: function () { return [ib] }, process: function (a) { var b = this.options, c = a.pointers.length === b.pointers, d = a.distance < b.threshold, f = a.deltaTime < b.time; if (this.reset(), a.eventType & Ea && 0 === this.count) return this.failTimeout(); if (d && f && c) { if (a.eventType != Ga) return this.failTimeout(); var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0, h = !this.pCenter || H(this.pCenter, a.center) < b.posThreshold; this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a; var i = this.count % b.taps; if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function () { this.state = rb, this.tryEmit() }, b.interval, this), ob) : rb } return tb }, failTimeout: function () { return this._timer = e(function () { this.state = tb }, this.options.interval, this), tb }, reset: function () { clearTimeout(this._timer) }, emit: function () { this.state == rb && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input)) } }), ha.VERSION = "2.0.8", ha.defaults = { domEvents: !1, touchAction: gb, enable: !0, inputTarget: null, inputClass: null, preset: [[ea, { enable: !1 }], [ca, { enable: !1 }, ["rotate"]], [fa, { direction: Na }], [ba, { direction: Na }, ["swipe"]], [ga], [ga, { event: "doubletap", taps: 2 }, ["tap"]], [da]], cssProps: { userSelect: "none", touchSelect: "none", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)" } }; var ub = 1, vb = 2; ia.prototype = { set: function (a) { return la(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this }, stop: function (a) { this.session.stopped = a ? vb : ub }, recognize: function (a) { var b = this.session; if (!b.stopped) { this.touchAction.preventDefaults(a); var c, d = this.recognizers, e = b.curRecognizer; (!e || e && e.state & rb) && (e = b.curRecognizer = null); for (var f = 0; f < d.length;)c = d[f], b.stopped === vb || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (ob | pb | qb) && (e = b.curRecognizer = c), f++ } }, get: function (a) { if (a instanceof Y) return a; for (var b = this.recognizers, c = 0; c < b.length; c++)if (b[c].options.event == a) return b[c]; return null }, add: function (a) { if (f(a, "add", this)) return this; var b = this.get(a.options.event); return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a }, remove: function (a) { if (f(a, "remove", this)) return this; if (a = this.get(a)) { var b = this.recognizers, c = r(b, a); -1 !== c && (b.splice(c, 1), this.touchAction.update()) } return this }, on: function (a, b) { if (a !== d && b !== d) { var c = this.handlers; return g(q(a), function (a) { c[a] = c[a] || [], c[a].push(b) }), this } }, off: function (a, b) { if (a !== d) { var c = this.handlers; return g(q(a), function (a) { b ? c[a] && c[a].splice(r(c[a], b), 1) : delete c[a] }), this } }, emit: function (a, b) { this.options.domEvents && ka(a, b); var c = this.handlers[a] && this.handlers[a].slice(); if (c && c.length) { b.type = a, b.preventDefault = function () { b.srcEvent.preventDefault() }; for (var d = 0; d < c.length;)c[d](b), d++ } }, destroy: function () { this.element && ja(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null } }, la(ha, { INPUT_START: Ea, INPUT_MOVE: Fa, INPUT_END: Ga, INPUT_CANCEL: Ha, STATE_POSSIBLE: nb, STATE_BEGAN: ob, STATE_CHANGED: pb, STATE_ENDED: qb, STATE_RECOGNIZED: rb, STATE_CANCELLED: sb, STATE_FAILED: tb, DIRECTION_NONE: Ia, DIRECTION_LEFT: Ja, DIRECTION_RIGHT: Ka, DIRECTION_UP: La, DIRECTION_DOWN: Ma, DIRECTION_HORIZONTAL: Na, DIRECTION_VERTICAL: Oa, DIRECTION_ALL: Pa, Manager: ia, Input: x, TouchAction: V, TouchInput: P, MouseInput: L, PointerEventInput: M, TouchMouseInput: R, SingleTouchInput: N, Recognizer: Y, AttrRecognizer: aa, Tap: ga, Pan: ba, Swipe: fa, Pinch: ca, Rotate: ea, Press: da, on: m, off: n, each: g, merge: ta, extend: sa, assign: la, inherit: i, bindFn: j, prefixed: u }); var wb = "undefined" != typeof a ? a : "undefined" != typeof self ? self : {}; wb.Hammer = ha, "function" == typeof define && define.amd ? define(function () { return ha }) : "undefined" != typeof module && module.exports ? module.exports = ha : a[c] = ha }(window, document, "Hammer");

//STATIC

/*
 * jQuery Tabs plugin
 */

; (function ($, $win) {

	'use strict';

	function Tabset($holder, options) {
		this.$holder = $holder;
		this.options = options;

		this.init();
	}

	Tabset.prototype = {
		init: function () {
			this.$tabLinks = this.$holder.find(this.options.tabLinks);

			this.setStartActiveIndex();
			this.setActiveTab();

			if (this.options.autoHeight) {
				this.$tabHolder = $(this.$tabLinks.eq(0).attr(this.options.attrib)).parent();
			}

			this.makeCallback('onInit', this);
		},

		setStartActiveIndex: function () {
			var $classTargets = this.getClassTarget(this.$tabLinks);
			var $activeLink = $classTargets.filter('.' + this.options.activeClass);
			var $hashLink = this.$tabLinks.filter('[' + this.options.attrib + '="' + location.hash + '"]');
			var activeIndex;

			if (this.options.checkHash && $hashLink.length) {
				$activeLink = $hashLink;
			}

			activeIndex = $classTargets.index($activeLink);

			this.activeTabIndex = this.prevTabIndex = (activeIndex === -1 ? (this.options.defaultTab ? 0 : null) : activeIndex);
		},

		setActiveTab: function () {
			var self = this;

			this.$tabLinks.each(function (i, link) {
				var $link = $(link);
				var $classTarget = self.getClassTarget($link);
				var $tab = $($link.attr(self.options.attrib));

				if (i !== self.activeTabIndex) {
					$classTarget.removeClass(self.options.activeClass);
					$tab.addClass(self.options.tabHiddenClass).removeClass(self.options.activeClass);
				} else {
					$classTarget.addClass(self.options.activeClass);
					$tab.removeClass(self.options.tabHiddenClass).addClass(self.options.activeClass);
				}

				self.attachTabLink($link, i);
			});
		},

		attachTabLink: function ($link, i) {
			var self = this;

			$link.on(this.options.event + '.tabset', function (e) {
				e.preventDefault();

				if (self.activeTabIndex === self.prevTabIndex && self.activeTabIndex !== i) {
					self.activeTabIndex = i;
					self.switchTabs();
				}
			});
		},

		resizeHolder: function (height) {
			var self = this;

			if (height) {
				this.$tabHolder.height(height);
				setTimeout(function () {
					self.$tabHolder.addClass('transition');
				}, 10);
			} else {
				self.$tabHolder.removeClass('transition').height('');
			}
		},

		switchTabs: function () {
			var self = this;

			var $prevLink = this.$tabLinks.eq(this.prevTabIndex);
			var $nextLink = this.$tabLinks.eq(this.activeTabIndex);

			var $prevTab = this.getTab($prevLink);
			var $nextTab = this.getTab($nextLink);

			$prevTab.removeClass(this.options.activeClass);

			if (self.haveTabHolder()) {
				this.resizeHolder($prevTab.outerHeight());
			}

			setTimeout(function () {
				self.getClassTarget($prevLink).removeClass(self.options.activeClass);

				$prevTab.addClass(self.options.tabHiddenClass);
				$nextTab.removeClass(self.options.tabHiddenClass).addClass(self.options.activeClass);

				self.getClassTarget($nextLink).addClass(self.options.activeClass);

				if (self.haveTabHolder()) {
					self.resizeHolder($nextTab.outerHeight());

					setTimeout(function () {
						self.resizeHolder();
						self.prevTabIndex = self.activeTabIndex;
						self.makeCallback('onChange', self);
					}, self.options.animSpeed);
				} else {
					self.prevTabIndex = self.activeTabIndex;
				}
			}, this.options.autoHeight ? this.options.animSpeed : 1);
		},

		getClassTarget: function ($link) {
			return this.options.addToParent ? $link.parent() : $link;
		},

		getActiveTab: function () {
			return this.getTab(this.$tabLinks.eq(this.activeTabIndex));
		},

		getTab: function ($link) {
			return $($link.attr(this.options.attrib));
		},

		haveTabHolder: function () {
			return this.$tabHolder && this.$tabHolder.length;
		},

		destroy: function () {
			var self = this;

			this.$tabLinks.off('.tabset').each(function () {
				var $link = $(this);

				self.getClassTarget($link).removeClass(self.options.activeClass);
				$($link.attr(self.options.attrib)).removeClass(self.options.activeClass + ' ' + self.options.tabHiddenClass);
			});

			this.$holder.removeData('Tabset');
		},

		makeCallback: function (name) {
			if (typeof this.options[name] === 'function') {
				var args = Array.prototype.slice.call(arguments);
				args.shift();
				this.options[name].apply(this, args);
			}
		}
	};

	$.fn.tabset = function (opt) {
		var args = Array.prototype.slice.call(arguments);
		var method = args[0];

		var options = $.extend({
			activeClass: 'active',
			addToParent: false,
			autoHeight: false,
			checkHash: false,
			defaultTab: true,
			animSpeed: 500,
			tabLinks: 'a',
			attrib: 'href',
			event: 'click',
			tabHiddenClass: 'js-tab-hidden'
		}, opt);
		options.autoHeight = options.autoHeight;

		return this.each(function () {
			var $holder = jQuery(this);
			var instance = $holder.data('Tabset');

			if (typeof opt === 'object' || typeof opt === 'undefined') {
				$holder.data('Tabset', new Tabset($holder, options));
			} else if (typeof method === 'string' && instance) {
				if (typeof instance[method] === 'function') {
					args.shift();
					instance[method].apply(instance, args);
				}
			}
		});
	};
}(jQuery, jQuery(window)));
/*
 * jQuery Accordion plugin new
 */
; (function (root, factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require('jquery'));
	} else {
		root.SlideAccordion = factory(jQuery);
	}
}(this, function ($) {
	'use strict';
	var accHiddenClass = 'js-acc-hidden';

	function SlideAccordion(options) {
		this.options = $.extend(true, {
			allowClickWhenExpanded: false,
			activeClass: 'active',
			opener: '.opener',
			slider: '.slide',
			animSpeed: 300,
			collapsible: true,
			event: 'click',
			scrollToActiveItem: {
				enable: false,
				breakpoint: 767, // max-width
				animSpeed: 600,
				extraOffset: null
			}
		}, options);
		this.init();
	}

	SlideAccordion.prototype = {
		init: function () {
			if (this.options.holder) {
				this.findElements();
				this.setStateOnInit();
				this.attachEvents();
				this.makeCallback('onInit');
			}
		},

		findElements: function () {
			this.$holder = $(this.options.holder).data('SlideAccordion', this);
			this.$items = this.$holder.find(':has(' + this.options.slider + ')');
		},

		setStateOnInit: function () {
			var self = this;

			this.$items.each(function () {
				if (!$(this).hasClass(self.options.activeClass)) {
					$(this).find(self.options.slider).addClass(accHiddenClass);
				}
			});
		},

		attachEvents: function () {
			var self = this;

			this.accordionToggle = function (e) {
				var $item = jQuery(this).closest(self.$items);
				var $actiItem = self.getActiveItem($item);

				if (!self.options.allowClickWhenExpanded || !$item.hasClass(self.options.activeClass)) {
					e.preventDefault();
					self.toggle($item, $actiItem);
				}
			};

			this.$items.on(this.options.event, this.options.opener, this.accordionToggle);
		},

		toggle: function ($item, $prevItem) {
			if (!$item.hasClass(this.options.activeClass)) {
				this.show($item);
			} else if (this.options.collapsible) {
				this.hide($item);
			}

			if (!$item.is($prevItem) && $prevItem.length) {
				this.hide($prevItem);
			}

			this.makeCallback('beforeToggle');
		},

		show: function ($item) {
			var $slider = $item.find(this.options.slider);

			$item.addClass(this.options.activeClass);
			$slider.stop().hide().removeClass(accHiddenClass).slideDown({
				duration: this.options.animSpeed,
				complete: function () {
					$slider.removeAttr('style');
					if (
						this.options.scrollToActiveItem.enable &&
						window.innerWidth <= this.options.scrollToActiveItem.breakpoint
					) {
						this.goToItem($item);
					}
					this.makeCallback('onShow', $item);
				}.bind(this)
			});

			this.makeCallback('beforeShow', $item);
		},

		hide: function ($item) {
			var $slider = $item.find(this.options.slider);

			$item.removeClass(this.options.activeClass);
			$slider.stop().show().slideUp({
				duration: this.options.animSpeed,
				complete: function () {
					$slider.addClass(accHiddenClass);
					$slider.removeAttr('style');
					this.makeCallback('onHide', $item);
				}.bind(this)
			});

			this.makeCallback('beforeHide', $item);
		},

		goToItem: function ($item) {
			var itemOffset = $item.offset().top;

			if (itemOffset < $(window).scrollTop()) {
				// handle extra offset
				if (typeof this.options.scrollToActiveItem.extraOffset === 'number') {
					itemOffset -= this.options.scrollToActiveItem.extraOffset;
				} else if (typeof this.options.scrollToActiveItem.extraOffset === 'function') {
					itemOffset -= this.options.scrollToActiveItem.extraOffset();
				}

				$('body, html').animate({
					scrollTop: itemOffset
				}, this.options.scrollToActiveItem.animSpeed);
			}
		},

		getActiveItem: function ($item) {
			return $item.siblings().filter('.' + this.options.activeClass);
		},

		makeCallback: function (name) {
			if (typeof this.options[name] === 'function') {
				var args = Array.prototype.slice.call(arguments);
				args.shift();
				this.options[name].apply(this, args);
			}
		},

		destroy: function () {
			this.$holder.removeData('SlideAccordion');
			this.$items.off(this.options.event, this.options.opener, this.accordionToggle);
			this.$items.removeClass(this.options.activeClass).each(function (i, item) {
				$(item).find(this.options.slider).removeAttr('style').removeClass(accHiddenClass);
			}.bind(this));
			this.makeCallback('onDestroy');
		}
	};

	$.fn.slideAccordion = function (opt) {
		var args = Array.prototype.slice.call(arguments);
		var method = args[0];

		return this.each(function () {
			var $holder = jQuery(this);
			var instance = $holder.data('SlideAccordion');

			if (typeof opt === 'object' || typeof opt === 'undefined') {
				new SlideAccordion($.extend(true, {
					holder: this
				}, opt));
			} else if (typeof method === 'string' && instance) {
				if (typeof instance[method] === 'function') {
					args.shift();
					instance[method].apply(instance, args);
				}
			}
		});
	};

	(function () {
		var tabStyleSheet = $('<style type="text/css">')[0];
		var tabStyleRule = '.' + accHiddenClass;
		tabStyleRule += '{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important; width: 100% !important;}';
		if (tabStyleSheet.styleSheet) {
			tabStyleSheet.styleSheet.cssText = tabStyleRule;
		} else {
			tabStyleSheet.appendChild(document.createTextNode(tabStyleRule));
		}
		$('head').append(tabStyleSheet);
	}());

	return SlideAccordion;
}));


//BLOG

/*
 * jQuery Open/Close plugin
 */
; (function ($) {
	function OpenClose(options) {
		this.options = $.extend({
			addClassBeforeAnimation: true,
			hideOnClickOutside: false,
			activeClass: 'active',
			opener: '.opener',
			slider: '.slide',
			animSpeed: 400,
			effect: 'fade',
			event: 'click'
		}, options);
		this.init();
	}
	OpenClose.prototype = {
		init: function () {
			if (this.options.holder) {
				this.findElements();
				this.attachEvents();
				this.makeCallback('onInit', this);
			}
		},
		findElements: function () {
			this.holder = $(this.options.holder);
			this.opener = this.holder.find(this.options.opener);
			this.slider = this.holder.find(this.options.slider);
		},
		attachEvents: function () {
			// add handler
			var self = this;
			this.eventHandler = function (e) {
				e.preventDefault();
				if (self.slider.hasClass(slideHiddenClass)) {
					self.showSlide();
				} else {
					self.hideSlide();
				}
			};
			self.opener.on(self.options.event, this.eventHandler);

			// hover mode handler
			if (self.options.event === 'hover') {
				self.opener.on('mouseenter', function () {
					if (!self.holder.hasClass(self.options.activeClass)) {
						self.showSlide();
					}
				});
				self.holder.on('mouseleave', function () {
					self.hideSlide();
				});
			}

			// outside click handler
			self.outsideClickHandler = function (e) {
				if (self.options.hideOnClickOutside) {
					var target = $(e.target);
					if (!target.is(self.holder) && !target.closest(self.holder).length) {
						self.hideSlide();
					}
				}
			};

			// set initial styles
			if (this.holder.hasClass(this.options.activeClass)) {
				$(document).on('click touchstart', self.outsideClickHandler);
			} else {
				this.slider.addClass(slideHiddenClass);
			}
		},
		showSlide: function () {
			var self = this;
			if (self.options.addClassBeforeAnimation) {
				self.holder.addClass(self.options.activeClass);
			}
			self.slider.removeClass(slideHiddenClass);
			$(document).on('click touchstart', self.outsideClickHandler);

			self.makeCallback('animStart', true);
			toggleEffects[self.options.effect].show({
				box: self.slider,
				speed: self.options.animSpeed,
				complete: function () {
					if (!self.options.addClassBeforeAnimation) {
						self.holder.addClass(self.options.activeClass);
					}
					self.makeCallback('animEnd', true);
				}
			});
		},
		hideSlide: function () {
			var self = this;
			if (self.options.addClassBeforeAnimation) {
				self.holder.removeClass(self.options.activeClass);
			}
			$(document).off('click touchstart', self.outsideClickHandler);

			self.makeCallback('animStart', false);
			toggleEffects[self.options.effect].hide({
				box: self.slider,
				speed: self.options.animSpeed,
				complete: function () {
					if (!self.options.addClassBeforeAnimation) {
						self.holder.removeClass(self.options.activeClass);
					}
					self.slider.addClass(slideHiddenClass);
					self.makeCallback('animEnd', false);
				}
			});
		},
		destroy: function () {
			this.slider.removeClass(slideHiddenClass).css({
				display: ''
			});
			this.opener.off(this.options.event, this.eventHandler);
			this.holder.removeClass(this.options.activeClass).removeData('OpenClose');
			$(document).off('click touchstart', this.outsideClickHandler);
		},
		makeCallback: function (name) {
			if (typeof this.options[name] === 'function') {
				var args = Array.prototype.slice.call(arguments);
				args.shift();
				this.options[name].apply(this, args);
			}
		}
	};

	// add stylesheet for slide on DOMReady
	var slideHiddenClass = 'js-slide-hidden';
	(function () {
		var tabStyleSheet = $('<style type="text/css">')[0];
		var tabStyleRule = '.' + slideHiddenClass;
		tabStyleRule += '{left:-9999px !important;top:-9999px !important;display:none !important}';
		if (tabStyleSheet.styleSheet) {
			tabStyleSheet.styleSheet.cssText = tabStyleRule;
		} else {
			tabStyleSheet.appendChild(document.createTextNode(tabStyleRule));
		}
		$('head').append(tabStyleSheet);
	}());

	// animation effects
	var toggleEffects = {
		slide: {
			show: function (o) {
				o.box.stop(true).hide().slideDown(o.speed, o.complete);
			},
			hide: function (o) {
				o.box.stop(true).slideUp(o.speed, o.complete);
			}
		},
		fade: {
			show: function (o) {
				o.box.stop(true).hide().fadeIn(o.speed, o.complete);
			},
			hide: function (o) {
				o.box.stop(true).fadeOut(o.speed, o.complete);
			}
		},
		none: {
			show: function (o) {
				o.box.hide().show(0, o.complete);
			},
			hide: function (o) {
				o.box.hide(0, o.complete);
			}
		}
	};

	// jQuery plugin interface
	$.fn.openClose = function (opt) {
		var args = Array.prototype.slice.call(arguments);
		var method = args[0];

		return this.each(function () {
			var $holder = jQuery(this);
			var instance = $holder.data('OpenClose');

			if (typeof opt === 'object' || typeof opt === 'undefined') {
				$holder.data('OpenClose', new OpenClose($.extend({
					holder: this
				}, opt)));
			} else if (typeof method === 'string' && instance) {
				if (typeof instance[method] === 'function') {
					args.shift();
					instance[method].apply(instance, args);
				}
			}
		});
	};
}(jQuery));

/*
 _ _      _       _
 ___| (_) ___| | __  (_)___
 / __| | |/ __| |/ /  | / __|
 \__ \ | | (__|   < _ | \__ \
 |___/_|_|\___|_|\_(_)/ |___/
 |__/

 Version: 1.6.0
 Author: Ken Wheeler
 Website: http://kenwheeler.github.io
 Docs: http://kenwheeler.github.io/slick
 Repo: http://github.com/kenwheeler/slick
 Issues: http://github.com/kenwheeler/slick/issues

 */
!function (a) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery) }(function (a) {
	"use strict"; var b = window.Slick || {}; b = function () { function c(c, d) { var f, e = this; e.defaults = { accessibility: !0, adaptiveHeight: !1, appendArrows: a(c), appendDots: a(c), arrows: !0, asNavFor: null, prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>', nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>', autoplay: !1, autoplaySpeed: 3e3, centerMode: !1, centerPadding: "50px", cssEase: "ease", customPaging: function (b, c) { return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c + 1) }, dots: !1, dotsClass: "slick-dots", draggable: !0, easing: "linear", edgeFriction: .35, fade: !1, focusOnSelect: !1, infinite: !0, initialSlide: 0, lazyLoad: "ondemand", mobileFirst: !1, pauseOnHover: !0, pauseOnFocus: !0, pauseOnDotsHover: !1, respondTo: "window", responsive: null, rows: 1, rtl: !1, slide: "", slidesPerRow: 1, slidesToShow: 1, slidesToScroll: 1, speed: 500, swipe: !0, swipeToSlide: !1, touchMove: !0, touchThreshold: 5, useCSS: !0, useTransform: !0, variableWidth: !1, vertical: !1, verticalSwiping: !1, waitForAnimate: !0, zIndex: 1e3 }, e.initials = { animating: !1, dragging: !1, autoPlayTimer: null, currentDirection: 0, currentLeft: null, currentSlide: 0, direction: 1, $dots: null, listWidth: null, listHeight: null, loadIndex: 0, $nextArrow: null, $prevArrow: null, slideCount: null, slideWidth: null, $slideTrack: null, $slides: null, sliding: !1, slideOffset: 0, swipeLeft: null, $list: null, touchObject: {}, transformsEnabled: !1, unslicked: !1 }, a.extend(e, e.initials), e.activeBreakpoint = null, e.animType = null, e.animProp = null, e.breakpoints = [], e.breakpointSettings = [], e.cssTransitions = !1, e.focussed = !1, e.interrupted = !1, e.hidden = "hidden", e.paused = !0, e.positionProp = null, e.respondTo = null, e.rowCount = 1, e.shouldClick = !0, e.$slider = a(c), e.$slidesCache = null, e.transformType = null, e.transitionType = null, e.visibilityChange = "visibilitychange", e.windowWidth = 0, e.windowTimer = null, f = a(c).data("slick") || {}, e.options = a.extend({}, e.defaults, d, f), e.currentSlide = e.options.initialSlide, e.originalSettings = e.options, "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden", e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden", e.visibilityChange = "webkitvisibilitychange"), e.autoPlay = a.proxy(e.autoPlay, e), e.autoPlayClear = a.proxy(e.autoPlayClear, e), e.autoPlayIterator = a.proxy(e.autoPlayIterator, e), e.changeSlide = a.proxy(e.changeSlide, e), e.clickHandler = a.proxy(e.clickHandler, e), e.selectHandler = a.proxy(e.selectHandler, e), e.setPosition = a.proxy(e.setPosition, e), e.swipeHandler = a.proxy(e.swipeHandler, e), e.dragHandler = a.proxy(e.dragHandler, e), e.keyHandler = a.proxy(e.keyHandler, e), e.instanceUid = b++, e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, e.registerBreakpoints(), e.init(!0) } var b = 0; return c }(), b.prototype.activateADA = function () { var a = this; a.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" }) }, b.prototype.addSlide = b.prototype.slickAdd = function (b, c, d) { var e = this; if ("boolean" == typeof c) d = c, c = null; else if (0 > c || c >= e.slideCount) return !1; e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function (b, c) { a(c).attr("data-slick-index", b) }), e.$slidesCache = e.$slides, e.reinit() }, b.prototype.animateHeight = function () { var a = this; if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) { var b = a.$slides.eq(a.currentSlide).outerHeight(!0); a.$list.animate({ height: b }, a.options.speed) } }, b.prototype.animateSlide = function (b, c) { var d = {}, e = this; e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({ left: b }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({ top: b }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({ animStart: e.currentLeft }).animate({ animStart: b }, { duration: e.options.speed, easing: e.options.easing, step: function (a) { a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d)) }, complete: function () { c && c.call() } })) : (e.applyTransition(), b = Math.ceil(b), e.options.vertical === !1 ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function () { e.disableTransition(), c.call() }, e.options.speed)) }, b.prototype.getNavTarget = function () { var b = this, c = b.options.asNavFor; return c && null !== c && (c = a(c).not(b.$slider)), c }, b.prototype.asNavFor = function (b) { var c = this, d = c.getNavTarget(); null !== d && "object" == typeof d && d.each(function () { var c = a(this).slick("getSlick"); c.unslicked || c.slideHandler(b, !0) }) }, b.prototype.applyTransition = function (a) { var b = this, c = {}; b.options.fade === !1 ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c) }, b.prototype.autoPlay = function () { var a = this; a.autoPlayClear(), a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed)) }, b.prototype.autoPlayClear = function () { var a = this; a.autoPlayTimer && clearInterval(a.autoPlayTimer) }, b.prototype.autoPlayIterator = function () { var a = this, b = a.currentSlide + a.options.slidesToScroll; a.paused || a.interrupted || a.focussed || (a.options.infinite === !1 && (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1 ? a.direction = 0 : 0 === a.direction && (b = a.currentSlide - a.options.slidesToScroll, a.currentSlide - 1 === 0 && (a.direction = 1))), a.slideHandler(b)) }, b.prototype.buildArrows = function () { var b = this; b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" })) }, b.prototype.buildDots = function () { var c, d, b = this; if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) { for (b.$slider.addClass("slick-dotted"), d = a("<ul />").addClass(b.options.dotsClass), c = 0; c <= b.getDotCount(); c += 1)d.append(a("<li />").append(b.options.customPaging.call(this, b, c))); b.$dots = d.appendTo(b.options.appendDots), b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false") } }, b.prototype.buildOut = function () { var b = this; b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function (b, c) { a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "") }), b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable") }, b.prototype.buildRows = function () { var b, c, d, e, f, g, h, a = this; if (e = document.createDocumentFragment(), g = a.$slider.children(), a.options.rows > 1) { for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) { var i = document.createElement("div"); for (c = 0; c < a.options.rows; c++) { var j = document.createElement("div"); for (d = 0; d < a.options.slidesPerRow; d++) { var k = b * h + (c * a.options.slidesPerRow + d); g.get(k) && j.appendChild(g.get(k)) } i.appendChild(j) } e.appendChild(i) } a.$slider.empty().append(e), a.$slider.children().children().children().css({ width: 100 / a.options.slidesPerRow + "%", display: "inline-block" }) } }, b.prototype.checkResponsive = function (b, c) { var e, f, g, d = this, h = !1, i = d.$slider.width(), j = window.innerWidth || a(window).width(); if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)), d.options.responsive && d.options.responsive.length && null !== d.options.responsive) { f = null; for (e in d.breakpoints) d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e])); null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = d.originalSettings, b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b), h = f), b || h === !1 || d.$slider.trigger("breakpoint", [d, h]) } }, b.prototype.changeSlide = function (b, c) { var f, g, h, d = this, e = a(b.currentTarget); switch (e.is("a") && b.preventDefault(), e.is("li") || (e = e.closest("li")), h = d.slideCount % d.options.slidesToScroll !== 0, f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll, b.data.message) { case "previous": g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c); break; case "next": g = 0 === f ? d.options.slidesToScroll : f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c); break; case "index": var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll; d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger("focus"); break; default: return } }, b.prototype.checkNavigable = function (a) { var c, d, b = this; if (c = b.getNavigableIndexes(), d = 0, a > c[c.length - 1]) a = c[c.length - 1]; else for (var e in c) { if (a < c[e]) { a = d; break } d = c[e] } return a }, b.prototype.cleanUpEvents = function () { var b = this; b.options.dots && null !== b.$dots && a("li", b.$dots).off("click.slick", b.changeSlide).off("mouseenter.slick", a.proxy(b.interrupt, b, !0)).off("mouseleave.slick", a.proxy(b.interrupt, b, !1)), b.$slider.off("focus.slick blur.slick"), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.cleanUpSlideEvents(), b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition) }, b.prototype.cleanUpSlideEvents = function () { var b = this; b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1)) }, b.prototype.cleanUpRows = function () { var b, a = this; a.options.rows > 1 && (b = a.$slides.children().children(), b.removeAttr("style"), a.$slider.empty().append(b)) }, b.prototype.clickHandler = function (a) { var b = this; b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault()) }, b.prototype.destroy = function (b) { var c = this; c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () { a(this).attr("style", a(this).data("originalStyling")) }), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.$slider.removeClass("slick-dotted"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c]) }, b.prototype.disableTransition = function (a) { var b = this, c = {}; c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c) }, b.prototype.fadeSlide = function (a, b) { var c = this; c.cssTransitions === !1 ? (c.$slides.eq(a).css({ zIndex: c.options.zIndex }), c.$slides.eq(a).animate({ opacity: 1 }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({ opacity: 1, zIndex: c.options.zIndex }), b && setTimeout(function () { c.disableTransition(a), b.call() }, c.options.speed)) }, b.prototype.fadeSlideOut = function (a) { var b = this; b.cssTransitions === !1 ? b.$slides.eq(a).animate({ opacity: 0, zIndex: b.options.zIndex - 2 }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({ opacity: 0, zIndex: b.options.zIndex - 2 })) }, b.prototype.filterSlides = b.prototype.slickFilter = function (a) { var b = this; null !== a && (b.$slidesCache = b.$slides, b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit()) }, b.prototype.focusHandler = function () { var b = this; b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function (c) { c.stopImmediatePropagation(); var d = a(this); setTimeout(function () { b.options.pauseOnFocus && (b.focussed = d.is(":focus"), b.autoPlay()) }, 0) }) }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function () { var a = this; return a.currentSlide }, b.prototype.getDotCount = function () { var a = this, b = 0, c = 0, d = 0; if (a.options.infinite === !0) for (; b < a.slideCount;)++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow; else if (a.options.centerMode === !0) d = a.slideCount; else if (a.options.asNavFor) for (; b < a.slideCount;)++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow; else d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll); return d - 1 }, b.prototype.getLeft = function (a) { var c, d, f, b = this, e = 0; return b.slideOffset = 0, d = b.$slides.first().outerHeight(!0), b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = b.slideWidth * b.options.slidesToShow * -1, e = d * b.options.slidesToShow * -1), b.slideCount % b.options.slidesToScroll !== 0 && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1, e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1) : (b.slideOffset = b.slideCount % b.options.slidesToScroll * b.slideWidth * -1, e = b.slideCount % b.options.slidesToScroll * d * -1))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth, e = (a + b.options.slidesToShow - b.slideCount) * d), b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0, e = 0), b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0, b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)), c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e, b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, b.options.centerMode === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, c += (b.$list.width() - f.outerWidth()) / 2)), c }, b.prototype.getOption = b.prototype.slickGetOption = function (a) { var b = this; return b.options[a] }, b.prototype.getNavigableIndexes = function () { var e, a = this, b = 0, c = 0, d = []; for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll, c = -1 * a.options.slidesToScroll, e = 2 * a.slideCount); e > b;)d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow; return d }, b.prototype.getSlick = function () { return this }, b.prototype.getSlideCount = function () { var c, d, e, b = this; return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0, b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function (c, f) { return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f, !1) : void 0 }), c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll }, b.prototype.goTo = b.prototype.slickGoTo = function (a, b) { var c = this; c.changeSlide({ data: { message: "index", index: parseInt(a) } }, b) }, b.prototype.init = function (b) { var c = this; a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots(), c.checkResponsive(!0), c.focusHandler()), b && c.$slider.trigger("init", [c]), c.options.accessibility === !0 && c.initADA(), c.options.autoplay && (c.paused = !1, c.autoPlay()) }, b.prototype.initADA = function () { var b = this; b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function (c) { a(this).attr({ role: "option", "aria-describedby": "slick-slide" + b.instanceUid + c }) }), null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function (c) { a(this).attr({ role: "presentation", "aria-selected": "false", "aria-controls": "navigation" + b.instanceUid + c, id: "slick-slide" + b.instanceUid + c }) }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA() }, b.prototype.initArrowEvents = function () { var a = this; a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, a.changeSlide), a.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, a.changeSlide)) }, b.prototype.initDotEvents = function () { var b = this; b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", { message: "index" }, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.interrupt, b, !0)).on("mouseleave.slick", a.proxy(b.interrupt, b, !1)) }, b.prototype.initSlideEvents = function () { var b = this; b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1))) }, b.prototype.initializeEvents = function () { var b = this; b.initArrowEvents(), b.initDotEvents(), b.initSlideEvents(), b.$list.on("touchstart.slick mousedown.slick", { action: "start" }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", { action: "move" }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", { action: "end" }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition) }, b.prototype.initUI = function () { var a = this; a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show() }, b.prototype.keyHandler = function (a) { var b = this; a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({ data: { message: b.options.rtl === !0 ? "next" : "previous" } }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({ data: { message: b.options.rtl === !0 ? "previous" : "next" } })) }, b.prototype.lazyLoad = function () { function g(c) { a("img[data-lazy]", c).each(function () { var c = a(this), d = a(this).attr("data-lazy"), e = document.createElement("img"); e.onload = function () { c.animate({ opacity: 0 }, 100, function () { c.attr("src", d).animate({ opacity: 1 }, 200, function () { c.removeAttr("data-lazy").removeClass("slick-loading") }), b.$slider.trigger("lazyLoaded", [b, c, d]) }) }, e.onerror = function () { c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), b.$slider.trigger("lazyLoadError", [b, c, d]) }, e.src = d }) } var c, d, e, f, b = this; b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1), f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)), f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide, f = Math.ceil(e + b.options.slidesToShow), b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)), c = b.$slider.find(".slick-slide").slice(e, f), g(c), b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"), g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow), g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow), g(d)) }, b.prototype.loadSlider = function () { var a = this; a.setPosition(), a.$slideTrack.css({ opacity: 1 }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad() }, b.prototype.next = b.prototype.slickNext = function () { var a = this; a.changeSlide({ data: { message: "next" } }) }, b.prototype.orientationChange = function () { var a = this; a.checkResponsive(), a.setPosition() }, b.prototype.pause = b.prototype.slickPause = function () { var a = this; a.autoPlayClear(), a.paused = !0 }, b.prototype.play = b.prototype.slickPlay = function () { var a = this; a.autoPlay(), a.options.autoplay = !0, a.paused = !1, a.focussed = !1, a.interrupted = !1 }, b.prototype.postSlide = function (a) { var b = this; b.unslicked || (b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay && b.autoPlay(), b.options.accessibility === !0 && b.initADA()) }, b.prototype.prev = b.prototype.slickPrev = function () { var a = this; a.changeSlide({ data: { message: "previous" } }) }, b.prototype.preventDefault = function (a) { a.preventDefault() }, b.prototype.progressiveLazyLoad = function (b) { b = b || 1; var e, f, g, c = this, d = a("img[data-lazy]", c.$slider); d.length ? (e = d.first(), f = e.attr("data-lazy"), g = document.createElement("img"), g.onload = function () { e.attr("src", f).removeAttr("data-lazy").removeClass("slick-loading"), c.options.adaptiveHeight === !0 && c.setPosition(), c.$slider.trigger("lazyLoaded", [c, e, f]), c.progressiveLazyLoad() }, g.onerror = function () { 3 > b ? setTimeout(function () { c.progressiveLazyLoad(b + 1) }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), c.$slider.trigger("lazyLoadError", [c, e, f]), c.progressiveLazyLoad()) }, g.src = f) : c.$slider.trigger("allImagesLoaded", [c]) }, b.prototype.refresh = function (b) { var d, e, c = this; e = c.slideCount - c.options.slidesToShow, !c.options.infinite && c.currentSlide > e && (c.currentSlide = e), c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0), d = c.currentSlide, c.destroy(!0), a.extend(c, c.initials, { currentSlide: d }), c.init(), b || c.changeSlide({ data: { message: "index", index: d } }, !1) }, b.prototype.registerBreakpoints = function () { var c, d, e, b = this, f = b.options.responsive || null; if ("array" === a.type(f) && f.length) { b.respondTo = b.options.respondTo || "window"; for (c in f) if (e = b.breakpoints.length - 1, d = f[c].breakpoint, f.hasOwnProperty(c)) { for (; e >= 0;)b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--; b.breakpoints.push(d), b.breakpointSettings[d] = f[c].settings } b.breakpoints.sort(function (a, c) { return b.options.mobileFirst ? a - c : c - a }) } }, b.prototype.reinit = function () { var b = this; b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.cleanUpSlideEvents(), b.initSlideEvents(), b.checkResponsive(!1, !0), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.setPosition(), b.focusHandler(), b.paused = !b.options.autoplay, b.autoPlay(), b.$slider.trigger("reInit", [b]) }, b.prototype.resize = function () { var b = this; a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function () { b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition() }, 50)) }, b.prototype.removeSlide = b.prototype.slickRemove = function (a, b, c) { var d = this; return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, void d.reinit()) }, b.prototype.setCSS = function (a) { var d, e, b = this, c = {}; b.options.rtl === !0 && (a = -a), d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px", e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px", c[b.positionProp] = a, b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {}, b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")", b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)", b.$slideTrack.css(c))) }, b.prototype.setDimensions = function () { var a = this; a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({ padding: "0px " + a.options.centerPadding }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({ padding: a.options.centerPadding + " 0px" })), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length))); var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width(); a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b) }, b.prototype.setFade = function () { var c, b = this; b.$slides.each(function (d, e) { c = b.slideWidth * d * -1, b.options.rtl === !0 ? a(e).css({ position: "relative", right: c, top: 0, zIndex: b.options.zIndex - 2, opacity: 0 }) : a(e).css({ position: "relative", left: c, top: 0, zIndex: b.options.zIndex - 2, opacity: 0 }) }), b.$slides.eq(b.currentSlide).css({ zIndex: b.options.zIndex - 1, opacity: 1 }) }, b.prototype.setHeight = function () { var a = this; if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) { var b = a.$slides.eq(a.currentSlide).outerHeight(!0); a.$list.css("height", b) } }, b.prototype.setOption = b.prototype.slickSetOption = function () { var c, d, e, f, h, b = this, g = !1; if ("object" === a.type(arguments[0]) ? (e = arguments[0], g = arguments[1], h = "multiple") : "string" === a.type(arguments[0]) && (e = arguments[0], f = arguments[1], g = arguments[2], "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? h = "responsive" : "undefined" != typeof arguments[1] && (h = "single")), "single" === h) b.options[e] = f; else if ("multiple" === h) a.each(e, function (a, c) { b.options[a] = c }); else if ("responsive" === h) for (d in f) if ("array" !== a.type(b.options.responsive)) b.options.responsive = [f[d]]; else { for (c = b.options.responsive.length - 1; c >= 0;)b.options.responsive[c].breakpoint === f[d].breakpoint && b.options.responsive.splice(c, 1), c--; b.options.responsive.push(f[d]) } g && (b.unload(), b.reinit()) }, b.prototype.setPosition = function () { var a = this; a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a]) }, b.prototype.setProps = function () { var a = this, b = document.body.style; a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1 }, b.prototype.setSlideClasses = function (a) {
		var c, d, e, f, b = this; d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), b.$slides.eq(a).addClass("slick-current"), b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2), b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a,
			d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")), b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow, e = b.options.infinite === !0 ? b.options.slidesToShow + a : a, b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === b.options.lazyLoad && b.lazyLoad()
	}, b.prototype.setupInfinite = function () { var c, d, e, b = this; if (b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && (d = null, b.slideCount > b.options.slidesToShow)) { for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1)d = c - 1, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned"); for (c = 0; e > c; c += 1)d = c, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned"); b.$slideTrack.find(".slick-cloned").find("[id]").each(function () { a(this).attr("id", "") }) } }, b.prototype.interrupt = function (a) { var b = this; a || b.autoPlay(), b.interrupted = a }, b.prototype.selectHandler = function (b) { var c = this, d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"), e = parseInt(d.attr("data-slick-index")); return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), void c.asNavFor(e)) : void c.slideHandler(e) }, b.prototype.slideHandler = function (a, b, c) { var d, e, f, g, j, h = null, i = this; return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void (i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () { i.postSlide(d) }) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void (i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () { i.postSlide(d) }) : i.postSlide(d))) : (i.options.autoplay && clearInterval(i.autoPlayTimer), e = 0 > d ? i.slideCount % i.options.slidesToScroll !== 0 ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? i.slideCount % i.options.slidesToScroll !== 0 ? 0 : d - i.slideCount : d, i.animating = !0, i.$slider.trigger("beforeChange", [i, i.currentSlide, e]), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.options.asNavFor && (j = i.getNavTarget(), j = j.slick("getSlick"), j.slideCount <= j.options.slidesToShow && j.setSlideClasses(i.currentSlide)), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f), i.fadeSlide(e, function () { i.postSlide(e) })) : i.postSlide(e), void i.animateHeight()) : void (c !== !0 ? i.animateSlide(h, function () { i.postSlide(e) }) : i.postSlide(e)))) }, b.prototype.startLoad = function () { var a = this; a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading") }, b.prototype.swipeDirection = function () { var a, b, c, d, e = this; return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "down" : "up" : "vertical" }, b.prototype.swipeEnd = function (a) { var c, d, b = this; if (b.dragging = !1, b.interrupted = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX) return !1; if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe) { switch (d = b.swipeDirection()) { case "left": case "down": c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(), b.currentDirection = 0; break; case "right": case "up": c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(), b.currentDirection = 1 }"vertical" != d && (b.slideHandler(c), b.touchObject = {}, b.$slider.trigger("swipe", [b, d])) } else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {}) }, b.prototype.swipeHandler = function (a) { var b = this; if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) { case "start": b.swipeStart(a); break; case "move": b.swipeMove(a); break; case "end": b.swipeEnd(a) } }, b.prototype.swipeMove = function (a) { var d, e, f, g, h, b = this; return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide), b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX, b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY, b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))), b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))), e = b.swipeDirection(), "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(), g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1), b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1), f = b.touchObject.swipeLength, b.touchObject.edgeHit = !1, b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction, b.touchObject.edgeHit = !0), b.options.vertical === !1 ? b.swipeLeft = d + f * g : b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g, b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g), b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null, !1) : void b.setCSS(b.swipeLeft)) : void 0) }, b.prototype.swipeStart = function (a) { var c, b = this; return b.interrupted = !0, 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]), b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX, b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY, void (b.dragging = !0)) }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function () { var a = this; null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit()) }, b.prototype.unload = function () { var b = this; a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "") }, b.prototype.unslick = function (a) { var b = this; b.$slider.trigger("unslick", [b, a]), b.destroy() }, b.prototype.updateArrows = function () { var b, a = this; b = Math.floor(a.options.slidesToShow / 2), a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))) }, b.prototype.updateDots = function () { var a = this; null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false")) }, b.prototype.visibility = function () { var a = this; a.options.autoplay && (document[a.hidden] ? a.interrupted = !0 : a.interrupted = !1) }, a.fn.slick = function () { var f, g, a = this, c = arguments[0], d = Array.prototype.slice.call(arguments, 1), e = a.length; for (f = 0; e > f; f++)if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f], c) : g = a[f].slick[c].apply(a[f].slick, d), "undefined" != typeof g) return g; return a }
});

//Custom Module

/**
 * jQuery-viewport-checker - v1.8.8 - 2017-09-25
 * https://github.com/dirkgroenen/jQuery-viewport-checker
 *
 * Copyright (c) 2017 Dirk Groenen
 * Licensed MIT <https://github.com/dirkgroenen/jQuery-viewport-checker/blob/master/LICENSE>
 */

!function (a) { a.fn.viewportChecker = function (b) { var c = { classToAdd: "visible", classToRemove: "invisible", classToAddForFullView: "full-visible", removeClassAfterAnimation: !1, offset: 100, repeat: !1, invertBottomOffset: !0, callbackFunction: function (a, b) { }, scrollHorizontal: !1, scrollBox: window }; a.extend(c, b); var d = this, e = { height: a(c.scrollBox).height(), width: a(c.scrollBox).width() }; return this.checkElements = function () { var b, f; c.scrollHorizontal ? (b = Math.max(a("html").scrollLeft(), a("body").scrollLeft(), a(window).scrollLeft()), f = b + e.width) : (b = Math.max(a("html").scrollTop(), a("body").scrollTop(), a(window).scrollTop()), f = b + e.height), d.each(function () { var d = a(this), g = {}, h = {}; if (d.data("vp-add-class") && (h.classToAdd = d.data("vp-add-class")), d.data("vp-remove-class") && (h.classToRemove = d.data("vp-remove-class")), d.data("vp-add-class-full-view") && (h.classToAddForFullView = d.data("vp-add-class-full-view")), d.data("vp-keep-add-class") && (h.removeClassAfterAnimation = d.data("vp-remove-after-animation")), d.data("vp-offset") && (h.offset = d.data("vp-offset")), d.data("vp-repeat") && (h.repeat = d.data("vp-repeat")), d.data("vp-scrollHorizontal") && (h.scrollHorizontal = d.data("vp-scrollHorizontal")), d.data("vp-invertBottomOffset") && (h.scrollHorizontal = d.data("vp-invertBottomOffset")), a.extend(g, c), a.extend(g, h), !d.data("vp-animated") || g.repeat) { String(g.offset).indexOf("%") > 0 && (g.offset = parseInt(g.offset) / 100 * e.height); var i = g.scrollHorizontal ? d.offset().left : d.offset().top, j = g.scrollHorizontal ? i + d.width() : i + d.height(), k = Math.round(i) + g.offset, l = g.scrollHorizontal ? k + d.width() : k + d.height(); g.invertBottomOffset && (l -= 2 * g.offset), k < f && l > b ? (d.removeClass(g.classToRemove), d.addClass(g.classToAdd), g.callbackFunction(d, "add"), j <= f && i >= b ? d.addClass(g.classToAddForFullView) : d.removeClass(g.classToAddForFullView), d.data("vp-animated", !0), g.removeClassAfterAnimation && d.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () { d.removeClass(g.classToAdd) })) : d.hasClass(g.classToAdd) && g.repeat && (d.removeClass(g.classToAdd + " " + g.classToAddForFullView), g.callbackFunction(d, "remove"), d.data("vp-animated", !1)) } }) }, ("ontouchstart" in window || "onmsgesturechange" in window) && a(document).bind("touchmove MSPointerMove pointermove", this.checkElements), a(c.scrollBox).bind("load scroll", this.checkElements), a(window).resize(function (b) { e = { height: a(c.scrollBox).height(), width: a(c.scrollBox).width() }, d.checkElements() }), this.checkElements(), this } }(jQuery);