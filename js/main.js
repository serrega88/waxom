$(document).ready(function(){
	


	//Отмена перехода наверх страницы при при клике на ссылки

	$(function () {
	  $(document).click((e) => {
	    const {target} = e;
	    if(target.nodeName === 'A' && target.getAttribute('href') === '#') {
	      e.preventDefault();
	    }
	  });
	});



	//Инициализация AOS (анимации при скроллинге)

	AOS.init({
	  // Global settings:
	  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
	  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
	  initClassName: 'aos-init', // class applied after initialization
	  animatedClassName: 'aos-animate', // class applied on animation
	  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
	  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
	  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
	  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
	  
	  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
	  offset: 120, // offset (in px) from the original trigger point
	  delay: 0, // values from 0 to 3000, with step 50ms
	  duration: 400, // values from 0 to 3000, with step 50ms
	  easing: 'ease', // default easing for AOS animations
	  once: false, // whether animation should happen only once - while scrolling down
	  mirror: false, // whether elements should animate out while scrolling past them
	  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
	});



	//Инициация Wow.js

	new WOW().init();



	//Фиксированный блок навигации

	let heading = $(".heading");
	let headerH = $("header").innerHeight();
	let scrollOffset = $(window).scrollTop();

	checkScroll(scrollOffset);

	$(window).on("scroll", function() {
		scrollOffset = $(this).scrollTop();

		checkScroll(scrollOffset);
	});

	function checkScroll() {
		if(scrollOffset >= headerH) {
			heading.addClass("fixed");
		} else {
			heading.removeClass("fixed");
		};
	};



	//Открытие и закрытие бургер-меню

	$(".burger-menu").on("click", function(event) {
		event.preventDefault();

		$(".burger-menu").toggleClass("active");

		if( $("nav").hasClass("active") ) {
			$("nav").removeClass("active");
		} else {
			$("nav").addClass("active");
		};
	});



	//Скролл при нажатии на лого Waxom

	$(".logo").on("click", function(event) {

		event.preventDefault();
		$("html, body").animate({scrollTop:0}, "300");

	});



	// Слайдер на главном экране

	$(".slider").slick({
		arrows: true,
		dots: true,
		draggable: false
	});



	//Кнопка "Load More" на экране Projects

	$("#load-more").on("click", function() {
	  if ( $(".projects-item-hidden").is(":hidden") && $(this).text() == "Load more" ) {
	    $(".projects-item-hidden").show("slow");
	    $(this).text("Hide");
	  } else {
	    $(".projects-item-hidden").slideUp();
	    $(this).text("Load more");
	  }
	});



	// Большой cлайдер на экране Recent Posts

	$(".slider-3").slick({
		dots: false,
		draggable: false,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 3,
		appendArrows: ".arrows",
		prevArrow: ".left",
		nextArrow: ".right",
		responsive: [
			{
				breakpoint: 1220,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 840,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});



	//Скрыть видео по умолчанию и показать при клике

	$("#vid").hide();

	let vid = $("#vid");
	let poster = $("#poster");

	$("#play").on("click", function() {

		if (vid.is(":hidden")) {
			poster.fadeOut("300");
			vid.fadeIn("300");
		};
	});



	//Скрыть видео при скролле вверх и вниз

	let counters = $(".counters");
	let projects = $(".projects");

	$(window).on("scroll", function() {
		let scroll = $(window).scrollTop() + $(window).height();
		let offsetCo = counters.offset().top;
		let offsetPro = projects.offset().top;
		let iframe = $("iframe");
		let leg = iframe.attr("src");

		if(scroll > offsetCo || scroll < offsetPro) {
			iframe.attr("src", leg);
			vid.fadeOut();
			poster.fadeIn();
		};
	});
	


	//Раскрытие и сокрытие блока с текстом Recent

	$(".read-more-arrow").on("click", function() {
		$(this).prev().find(".dots").toggle();
		$(this).prev().find(".more").slideToggle();
		if ($(this).text() == "Read More") {
			$(this).text("Read Less");
			$(this).next().css({
			"border-left": "none",
			"border-right": "5px solid #c7b299"
			});
		} else {
			$(this).text("Read More");
			$(this).next().css({
			"border-right": "none",
			"border-left": "5px solid #c7b299"
			});
		};
	});
	


	//Анимация цифр блока counters

	var show = true;
    $(window).on("scroll", function() {
    	if (!show) return false; // Отменяем показ анимации, если она уже была выполнена
        var offsetCo = counters.offset().top; // Расстояние от блока со счетчиками до верха всего документа
        var windowHeight = $(window).height(); // Высота окна браузера
        var docHeight = $(document).height(); // Высота всего документа
        var heightCo = counters.outerHeight(); // Полная высота блока со счетчиками
		if (scrollOffset + 500 >= offsetCo || windowHeight + scrollOffset == docHeight || heightCo + offsetCo < windowHeight) {
			$('.numeral').spincrement({
		        thousandSeparator: "",
		        duration: 1200
	    	});
	    	show = false;
		};

	});


});