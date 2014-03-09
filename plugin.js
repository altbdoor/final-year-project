/* enclosed to prevent namespace pollution */
(function ($) {
	/* setup
	==================================================*/
	var defaultSetup = {
		navMenuAnimation: 'show',
		dropdownTrigger: 'click',
		dropdownAnimation: 'show',
		modalBoxAnimation: 'fade'
	};
	
	if (typeof(pxSetup) !== 'undefined') {
		defaultSetup = $.extend(defaultSetup, pxSetup);
	}
	
	/* animate object
	==================================================*/
	function animateObject (object, animation, display, callback) {
		var promise;
		
		if (display == 'block') {
			if (animation == 'fade') {
				promise = $(object).stop(true, true).fadeIn(200).promise();
			}
			else if (animation == 'slide') {
				promise = $(object).stop(true, true).slideDown(200).promise();
			}
			else {
				promise = $(object).stop(true, true).show().promise();
			}
		}
		else if (display == 'none') {
			if (animation == 'fade') {
				promise = $(object).stop(true, true).fadeOut(200).promise();
			}
			else if (animation == 'slide') {
				promise = $(object).stop(true, true).slideUp(200).promise();
			}
			else {
				promise = $(object).stop(true, true).hide().promise();
			}
		}
		else if (display == 'toggle') {
			if (animation == 'fade') {
				promise = $(object).stop(true, true).fadeToggle(200).promise();
			}
			else if (animation == 'slide') {
				promise = $(object).stop(true, true).slideToggle(200).promise();
			}
			else {
				promise = $(object).stop(true, true).toggle().promise();
			}
		}
		
		if (typeof(callback) !== 'undefined') {
			$.when(promise).done(function () {
				callback(this);
			});
		}
	}
	
	/* nav trigger
	==================================================*/
	var navTrigger = $('.nav-trigger');
	if (navTrigger.length > 0) {
		$(navTrigger).each(function () {
			$(this).on('click', function (e) {
				e.preventDefault();
				e.stopPropagation();
				
				var animation = $(this).data('nav-menu-animation') || defaultSetup.navMenuAnimation,
					navmenu = $(this).parent().siblings('.nav-menu').stop(true, true);
				
				animateObject(navmenu, animation, 'toggle');
			});
		});
	}
	
	/* dropdown
	==================================================*/
	$.fn.dropdown = function (operation) {
		if (typeof(operation) === 'undefined') {
			return this.each(function () {
				var dropdown = this,
					trigger = $(dropdown).data('dropdown-trigger') || defaultSetup.dropdownTrigger,
					animation = $(dropdown).data('dropdown-animation') || defaultSetup.dropdownAnimation,
					menu = $(dropdown).children('.dropdown-menu').first(),
					button = $(dropdown).children('button, a').first();
				
				if (trigger == 'hover' || trigger == 'mouseover') {
					var hoverTimer;
					
					dropdown.hoverState = false;
					
					$(dropdown).on('mouseenter', function () {
						dropdown.hoverState = true;
						
						animateObject($('.dropdown-menu').not(menu), '', 'none');
						animateObject(menu, animation, 'block');
					}).on('mouseleave', function () {
						dropdown.hoverState = false;
						clearTimeout(hoverTimer);
						hoverTimer = setTimeout(function () {
							if (!dropdown.hoverState) {
								animateObject(menu, animation, 'none');
							}
						}, 200);
					});
				}
				else {
					$(button).on('click', function (e) {
						e.preventDefault();
						e.stopPropagation();
						
						animateObject($('.dropdown-menu').not(menu), '', 'none');
						animateObject(menu, animation, 'toggle');
					});
				}
			});
		}
		else if (operation == 'show' || operation == 'hide') {
			return this.each(function () {
				var dropdown = this,
					animation = $(dropdown).data('dropdown-animation') || defaultSetup.dropdownAnimation,
					menu = $(dropdown).children('.dropdown-menu').first(),
					display = (operation == 'show' ? 'block' : 'none');
				
				animateObject($('.dropdown-menu').not(menu), '', 'none');
				animateObject(menu, animation, display);
			});
		}
	};
	
	$('.dropdown').dropdown();
	
	/* modal
	==================================================*/
	$.fn.modal = function (operation) {
		var modal = $('.modal').first();
		
		if (typeof(operation) === 'undefined') {
			return this.each(function () {
				var modalBox = $('#' + $(this).data('modal-box-target')),
					animation = $(modalBox).data('modal-box-animation') || defaultSetup.modalBoxAnimation;
				
				$(this).on('click', function (e) {
					e.preventDefault();
					e.stopPropagation();
					
					$(modal).fadeIn(200, function () {
						animateObject(modalBox, animation, 'block');
					});
				});
			});
		}
		else if (operation == 'show' || operation == 'hide') {
			var animation = $(this).data('modal-box-animation') || defaultSetup.modalBoxAnimation;
			
			if (operation == 'show') {
				$(modal).fadeIn(200, function () {
					animateObject(this, animation, 'block');
				});
			}
			else {
				animateObject(this, animation, 'none');
				$(modal).fadeOut(200);
			}
			
			return this;
		}
	};
	
	$('.modal-trigger').modal();
	
	
})(jQuery);