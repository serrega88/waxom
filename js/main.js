$(document).ready(function(){
	
	let heading = $(".heading");
	let headerH = $("header").innerHeight();
	let scrollOffset = $(window).scrollTop();

	checkScroll(scrollOffset);



	//Фиксированный блок навигации

	$(window).on("scroll", function() {
		scrollOffset = $(this).scrollTop();

		checkScroll(scrollOffset);
	})

	function checkScroll() {
		if(scrollOffset >= headerH) {
			heading.addClass("fixed");
		} else {
			heading.removeClass("fixed");
		}
	}


	//Открытие и закрытие бургер-меню

	$(".burger-menu").on("click", function(event) {
		event.preventDefault();

		$(".burger-menu").toggleClass("active");

		if( $("nav").hasClass("active") ) {
			$("nav").removeClass("active");
		} else {
			$("nav").addClass("active");
		}
	})


	//Скролл при нажатии на лого Waxom

	$(".logo").on("click", function(event) {

		event.preventDefault();
		$("html, body").animate({scrollTop:0}, "300");

	})


	// Слайдер на главном экране

	$(".slider").slick({
		arrows: true,
		dots: true,
		draggable: false
		});

	// Слайдер на экране Recent Posts

	$("slider-2").slick({
		arrows: false,
		dots: true,
		draggable: false
		});

	
})