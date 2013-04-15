jQuery(document).ready(function($) {

	var active = 'current-menu-ancestor';
	
	$('#topmenu').each(function() {
		$menu = $(this);
		var $links = $menu.find('a');
		var $active = $($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
		$active.parent().addClass(active);
		var $content = $($active.attr('href'));

		$links.not($active).each(function() {
			$($(this).attr('href')).hide();
		});

		$('a[href^=#]').on('click', function(e) {
			$active.parent().removeClass(active);
			$content.hide();

			$active = $($links.filter('[href="' + this.hash + '"]', $menu)[0]);
			$active.parent().addClass(active);
			$content = $($active.attr('href')).show({
				complete : function() {
					$('#topmenu').animate({ scrollTop: 0 }, 'slow');
				}
			});

			e.preventDefault();
		});
	});


// Smooth Scrolling of ID anchors	
  function filterPath(string) {
  return string
    .replace(/^\//,'')
    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
    .replace(/\/$/,'');
  }
  var locationPath = filterPath(location.pathname);
  var scrollElem = scrollableElement('html', 'body');
 
  $('a[href*=#].anchor').each(function() {
    $(this).click(function(event) {
    var thisPath = filterPath(this.pathname) || locationPath;
    if (  locationPath == thisPath
    && (location.hostname == this.hostname || !this.hostname)
    && this.hash.replace(/#/,'') ) {
      var $target = $(this.hash), target = this.hash;
      if (target && $target.length != 0) {
        var targetOffset = $target.offset().top;
          event.preventDefault();
          $(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
            location.hash = target;
          });
      }
    }
   });	
  });
 
  // use the first element that is "scrollable"
  function scrollableElement(els) {
    for (var i = 0, argLength = arguments.length; i <argLength; i++) {
      var el = arguments[i],
          $scrollElement = $(el);
      if ($scrollElement.scrollTop()> 0) {
        return el;
      } else {
        $scrollElement.scrollTop(1);
        var isScrollable = $scrollElement.scrollTop()> 0;
        $scrollElement.scrollTop(0);
        if (isScrollable) {
          return el;
        }
      }
    }
    return [];
  }
  
// Remove links outline in IE 7
	$("a").attr("hideFocus", "true").css("outline", "none");

// style Select, Radio, Checkboxe
	if ($("select").hasClass("select_styled")) {
		cuSel({changedEl: ".select_styled", visRows: 7});
	}
	if ($("div,p").hasClass("input_styled")) {
		$(".input_styled input").customInput();
	}
	
// responsive 			
	var screenRes = $(window).width();   
	if (screenRes > 600) {
		$(".slide-item .frame_box:nth-child(3n)").addClass("omega");
	}	
		
	$(".dropdown ul").parent("li").addClass("parent");
	$(".dropdown li:first-child").addClass("first");
	$(".dropdown li:last-child").addClass("last");
	$(".dropdown li:only-child").removeClass("last").addClass("only");	
	
	$(".dropdown li").hover(function(){
		var dropDown = $(this).children("ul");
		var ulWidth = dropDown.width();
		var liWidth = $(this).width();
		var posLeft = (liWidth - ulWidth)/2;
		dropDown.css("left",posLeft);		
	});	
	
// cols
	$(".row .col:first-child").addClass("alpha");
	$(".row .col:last-child").addClass("omega"); 
	
// preload images plugin
/*  v1.4 https://github.com/farinspace/jquery.imgpreload */
if("undefined"!=typeof jQuery){(function(a){a.imgpreload=function(b,c){c=a.extend({},a.fn.imgpreload.defaults,c instanceof Function?{all:c}:c);if("string"==typeof b){b=new Array(b)}var d=new Array;a.each(b,function(e,f){var g=new Image;var h=f;var i=g;if("string"!=typeof f){h=a(f).attr("src");i=f}a(g).bind("load error",function(e){d.push(i);a.data(i,"loaded","error"==e.type?false:true);if(c.each instanceof Function){c.each.call(i)}if(d.length>=b.length&&c.all instanceof Function){c.all.call(d)}a(this).unbind("load error")});g.src=h})};a.fn.imgpreload=function(b){a.imgpreload(this,b);return this};a.fn.imgpreload.defaults={each:null,all:null}})(jQuery)}

	/* $.imgpreload([
	'/wedding/PurpleOrange/images/dropdown_sprite.png',
	'/wedding/PurpleOrange/images/dropdown_sprite2.png',
	'/wedding/PurpleOrange/images/corner_big.png',
	'/wedding/PurpleOrange/images/corner_mid.png',
	'/wedding/PurpleOrange/images/corner_small.png'
	]);*/ 

	

// Topmenu <ul> replace to <select>
	$(function() {

	   if (screenRes < 600) {
		  
		  var mainNavigation = $('#topmenu').clone();

		  /* Replace unordered list with a "select" element to be populated with options, and create a variable to select our new empty option menu */
		  $('#topmenu').html('<div class="topmenu_select"><select class="select_styled" id="topm-select"></select></div>');
		  var selectMenu = $('#topm-select');

		  /* Navigate our nav clone for information needed to populate options */
		  $(mainNavigation).children('ul').children('li').each(function() {

			 /* Get top-level link and text */
			 var href = $(this).children('a').attr('href');
			 var text = $(this).children('a').text();
			 
			 /* Append this option to our "select" */
			if ($(this).is(".current-menu-item") && href != '#') {				 
				$(selectMenu).append('<option value="'+href+'" selected>'+text+'</option>');			
			} else if ( href == '#' ) {				 
				$(selectMenu).append('<option value="'+href+'" disabled="disabled">'+text+'</option>');
			} else {
				$(selectMenu).append('<option value="'+href+'">'+text+'</option>');
			}

			 /* Check for "children" and navigate for more options if they exist */
			 if ($(this).children('ul').length > 0) {
				$(this).children('ul').children('li').each(function() {

				   /* Get child-level link and text */
				   var href2 = $(this).children('a').attr('href');
				   var text2 = $(this).children('a').text();

					/* Append this option to our "select" */
					if ($(this).is(".current-menu-item") && href2 != '#') {				 
						$(selectMenu).append('<option value="'+href2+'" selected> - '+text2+'</option>');
					} else if ( href2 == '#' ) {				 
						$(selectMenu).append('<option value="'+href2+'" disabled="disabled"># '+text2+'</option>');
					} else {
						$(selectMenu).append('<option value="'+href2+'"> - '+text2+'</option>');
					}
					
					/* Check for "children" and navigate for more options if they exist */
					 if ($(this).children('ul').length > 0) {
						$(this).children('ul').children('li').each(function() {

						   /* Get child-level link and text */
						   var href3 = $(this).children('a').attr('href');
						   var text3 = $(this).children('a').text();

						   /* Append this option to our "select" */
						   if ($(this).is(".current-menu-item")) {				 
								$(selectMenu).append('<option value="'+href3+'" class="select-current" selected>'+text3+'</option>');
							} else {
								$(selectMenu).append('<option value="'+href3+'"> -- '+text3+'</option>');
							}
											   
						});
					 }
									   
				});
			 }
			
		  });
	   }

	   /* When our select menu is changed, change the window location to match the value of the selected option. */
	   $(selectMenu).change(function() {
		  location = this.options[this.selectedIndex].value;
	   });
	});	

	// prettyPhoto lightbox, check if <a> has atrr data-rel and hide for Mobiles
	if($('a').is('[data-rel]') && screenRes > 600) {
        $('a[data-rel]').each(function() {
			$(this).attr('rel', $(this).data('rel'));
		});
		//$("a[rel^='prettyPhoto']").prettyPhoto({social_tools:false});	
    }
	
});
