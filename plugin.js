/* enclosed to prevent namespace pollution */
(function () {
	/* setup
	==================================================*/
	var defaultSetup = {
		dropdownAnimation: 'show',
		dropdownTrigger: 'click'
		
	}
	
	function checkSetup (name, value) {
		if (typeof(psSetup[name]) !== 'undefined') {
			
		}
	}
	
	if (typeof(psSetup) !== 'undefined' && typeof(psSetup) === 'object') {
		if (checkSetup())
		
		if (typeof(psSetup.dropdownAnimation) !== 'undefined' && (psSetup.dropdownAnimation == 'fade' || psSetup.dropdownAnimation == 'slide')) {
			defaultSetup.dropdownAnimation = psSetup.dropdownAnimation;
		}
		
		
		
	}
	
	/* dropdown
	==================================================*/
	var allMenu = $('.dropdown-menu');
	
	$('.dropdown').each(function () {
		var mode = $(this).data('dropdown-trigger'),
			anim = $(this).data('dropdown-animation'),
			btn = $(this).children('button, a').first(),
			menu = $(this).children('.dropdown-menu').first();
		
		if (mode == 'hover' || mode == 'mouseover') {
			var hoverState = false,
				hoverTimer;
			
			$(this).on('mouseenter', function () {
				hoverState = true;
				
				$(allMenu).not(menu).hide();
				
				if (anim == 'fade') {
					$(menu).stop(true, true).fadeIn();
				}
				else if (anim == 'slide') {
					$(menu).stop(true, true).slideDown();
				}
				else {
					$(menu).show();
				}
			}).on('mouseleave', function () {
				hoverState = false;
				clearTimeout(hoverTimer);
				hoverTimer = setTimeout(function () {
					if (!hoverState) {
						if (anim == 'fade') {
							$(menu).stop(true, true).fadeOut();
						}
						else if (anim == 'slide') {
							$(menu).stop(true, true).slideUp();
						}
						else {
							$(menu).hide();
						}
					}
				}, 200);
			});
		}
		else {
			$(btn).on('click', function () {
				$(allMenu).not(menu).hide();
				
				if (anim == 'fade') {
					$(menu).stop(true, true).fadeToggle();
				}
				else if (anim == 'slide') {
					$(menu).stop(true, true).slideToggle();
				}
				else {
					$(menu).toggle();
				}
			});
		}
	});
	
	/* 
	==================================================*/
})();