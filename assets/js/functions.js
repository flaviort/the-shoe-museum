// register plugins
gsap.registerPlugin(ScrollTrigger)

// global selectors
const body = document.body
const select = (e) => document.querySelector(e)
const selectAll = (e) => document.querySelectorAll(e)
const selectId = (id) => document.getElementById(id)
const vh = (coef) => window.innerHeight * (coef/100)
const vw = (coef) => window.innerWidth * (coef/100)

let lenis

// cookies
function setCookie(name, value, days) {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    const expires = 'expires=' + date.toUTCString()
    document.cookie = name + '=' + value + ';' + expires + ';path=/'
}

function getCookie(name) {
    const nameEQ = name + '='
    const ca = document.cookie.split(';')
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == ' ') c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
    }
    return null
}

// init all click, mouseover and keyup functions
function initClickAndKeyFunctions() {

	// make anchor links scroll smoothy
	$('.sliding-link').click(function(e) {
		e.preventDefault()
		var aid = $(this).attr('href')
		$('html, body').animate({ scrollTop: $(aid).offset().top }, 1000)
	})

	// show / hide password
	$('.show-pass').click(function(e){
		e.preventDefault()
		var that = $(this)
		that.toggleClass('hidden')	

		setTimeout(function() {
			if (that.hasClass('hidden')){
				that.siblings('input').attr('type','text')
			} else {
				that.siblings('input').attr('type','password')
			}
		}, 30)
	})

	// correct label click
	$('label').click(function(e){
		e.stopImmediatePropagation()
	})

	// open / close fs menu
	$('.open-fs').click(function(){

		var tl = gsap.timeline()

		tl.to('body', {
			overflow: 'hidden',
			duration: 0
		})

		tl.to('#fs-menu', {
			display: 'block',
			duration: 0
		})

		tl.to('.blur-everything', {
			opacity: 1,
			pointerEvents: 'auto',
			duration: .3
		})

		tl.to('#fs-menu', {
			transform: 'none',
			duration: .3
		}, '-=.3s')

		tl.call(function() {
			lenis.stop()
		})

	})

	// close fs
	function closeFs() {

		var tl = gsap.timeline()

		tl.to('body', {
			overflow: 'auto',
			duration: 0
		})

		tl.to('.blur-everything', {
			opacity: 0,
			pointerEvents: 'none',
			duration: .3
		})

		tl.to('#fs-menu', {
			transform: 'translateX(110%)',
			duration: .3
		}, '-=.3s')

		tl.to('.blur-everything', {
			pointerEvents: 'none',
			duration: 0
		})

		tl.call(function() {
			lenis.start()
		})
	}

	// close fs menu
	$('.close-fs, #fs-menu .menu a, #fs-menu .menu button, .blur-everything').click(function(){
		closeFs()
	})

	// open / close cart menu
	$('.open-cart').click(function(){

		var tl = gsap.timeline()

		tl.to('body', {
			overflow: 'hidden',
			duration: 0
		})

		tl.to('#cart-menu', {
			display: 'block',
			duration: 0
		})

		tl.to('.blur-everything', {
			opacity: 1,
			pointerEvents: 'auto',
			duration: .3
		})

		tl.to('#cart-menu', {
			transform: 'none',
			duration: .3
		}, '-=.3s')

		tl.call(function() {
			lenis.stop()
		})

	})

	// close cart
	function closeCart() {

		var tl = gsap.timeline()

		tl.to('body', {
			overflow: 'auto',
			duration: 0
		})

		tl.to('.blur-everything', {
			opacity: 0,
			pointerEvents: 'none',
			duration: .3
		})

		tl.to('#cart-menu', {
			transform: 'translateX(110%)',
			duration: .3
		}, '-=.3s')

		tl.to('.blur-everything', {
			pointerEvents: 'none',
			duration: 0
		})

		tl.call(function() {
			lenis.start()
		})
	}

	// close cart menu
	$('.close-cart, .blur-everything').click(function(){
		closeCart()
	})

	// close all opened menus when pressing the ESC key
	$(document).keyup(function(e) {
		if(e.key === 'Escape') {
			closeFs()
			closeCart()
		}
	})

	// accordion open / close
	$('.accordion .question').click(function(){
		$(this).toggleClass('active')
		$(this).siblings('.answer').slideToggle(function(){
			//ScrollTrigger.refresh()
		})
	})

	// increase / decrease quantity
	$('.quantity .increase').click(function() {
		var $input = $(this).closest('.quantity').find('input')
		var value = parseInt($input.val())
		if (value < 8) {
			$input.val(value + 1)
		}
	})
	
	$('.quantity .decrease').click(function() {
		var $input = $(this).closest('.quantity').find('input')
		var value = parseInt($input.val())
		if (value > 1) {
			$input.val(value - 1)
		}
	})

	// shipping address toggle on wholesale page
	$('#shipping-address').on('change', function() {
		$('#shipping-address-fields').slideToggle($(this).is(':checked'))
	})

}

// here goes all the scroll related animations
function scrollTriggerAnimations() {

	// scrolling image / video
	if($('.scrolling-bg').length) {

		const bg = selectAll('.scrolling-bg')
    
        bg.forEach(item => {
			let calcSize = 'calc(100% + 7rem)'
			let size = '-7rem'
			const children = item.querySelector('.bg')

			gsap.set(children, {
				height: calcSize
			})

			gsap.from(children, {
				y: size,
				scrollTrigger: {
					trigger: item,
					scrub: 2,
					end: 'bottom top',
					//markers: true
				}
			})

		})
	}

	// image reveal animation
	if($('.image-reveal')) {

		const imageReveal = $('.image-reveal')
	
		imageReveal.each(function() {
			const reveal = $(this).find('.reveal')
			const image = $(this).find('img')
	
			const timeline = gsap.timeline({
				paused: true
			})
	
			timeline.set(image, {
				scale: 1.5
			})
	
			timeline.to(reveal, {
				width: '100%',
				ease: Power4.easeInOut,
				duration: 0.75
			})
	
			timeline.to(reveal, {
				x: '102%',
				ease: Power4.easeIn,
				duration: 1.0
			})
	
			timeline.to(image, {
				visibility: 'visible',
				scale: 1,
				duration: 2.5,
				ease: Power4.easeOut
			}, '=-1')
	
			ScrollTrigger.create({
				trigger: this,
				start: '0% 100%',
				end: '100% 0%',
				onEnter: () => timeline.play(),
				onLeaveBack: () => timeline.reverse()
			})
		})
	}

	// stagger fadeInUp effect
	if(select('.stagger-children')) {

		gsap.set('.stagger-children > *', {
			autoAlpha: 0,
			y: '3rem',
		})

		ScrollTrigger.batch('.stagger-children > *', {
			start: '0 97%',
			onEnter: elements => {
			  	gsap.to(elements, {
					autoAlpha: 1,
					y: '=-3rem',
					stagger: 0.15,
					duration: 1
			  	});
			},
			onLeaveBack: elements => {
				gsap.to(elements, {
					autoAlpha: 0,
					y: '3rem',
					stagger: 0.15,
					duration: 1,
				})
			}
		})
	}
}

// init fancybox
function initFancybox() {
	Fancybox.bind('[data-fancybox]', {
		autoFocus: false,
		dragToClose: false,
		placeFocusBack: false,
		on: {
			ready: () => {
				lenis.stop()
			},
			close: () => {
				lenis.start()
			}
		}
	})
}

// init all sliders
function initSliders() {

	// home slider
	if($('.home-slider').length) {

		const autoplayIndicator = select('.autoplay-indicator span')

		const home_slider = new Swiper('.home-slider', {
			slidesPerView: 1,
			loop: true,
			simulateTouch: true,
			allowTouchMove: true,
			autoHeight: false,
			calculateHeight: false,
			spaceBetween: 0,
			speed: 400,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			autoplay: {
				delay: 4000,
				disableOnInteraction: false
			},
			pagination: {
				el: '#banner .pagination',
				type: 'bullets',
				clickable: true
			},
			on: {
				slideChangeTransitionStart: () => {
					autoplayIndicator.style.setProperty('--progress', 1)
				},
				transitionEnd: (swiper) => {
					const activeSlide = select('.home-slider .swiper-slide-active')
					const color = activeSlide.getAttribute('data-color')
					const pagination = select('#banner .pagination')
		
					if (color === 'dark') {
						pagination.classList.add('brown-dark')
						pagination.classList.remove('yellow-light')
					} else if (color === 'light') {
						pagination.classList.add('yellow-light')
						pagination.classList.remove('brown-dark')
					}

					swiper.autoplay.start()
				},
				autoplayTimeLeft(s, time, progress) {
					autoplayIndicator.style.setProperty('--progress', 1 - progress)
				}
			}
		})
	}

	// products slider
	if($('.products-slider').length) {

		const products_slider = new Swiper('.products-slider', {
			slidesPerView: 1.1,
			spaceBetween: 15,
			loop: true,
			simulateTouch: true,
			allowTouchMove: true,
			autoHeight: false,
			calculateHeight: false,
			speed: 600,
			mousewheel: {  
				forceToAxis: true
			},
			navigation: {
                nextEl: '.products-section .arrows .next',
                prevEl: '.products-section .arrows .prev'
            },
			breakpoints: {
				575: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				}
			}
		})
	}

	// logos slider
	if($('.logos-slider').length) {

		const logos_slider = new Swiper('.logos-slider', {
			slidesPerView: 2.5,
			loop: false,
			simulateTouch: true,
			allowTouchMove: true,
			autoHeight: true,
			calculateHeight: false,
			spaceBetween: 20,
			speed: 600,
			freeMode: true,
			mousewheel: {  
				forceToAxis: true
			},
			autoplay: {
				delay: 3000
			},
			breakpoints: {
				420: {
					slidesPerView: 3,
					spaceBetween: 25,
				},
				575: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
				992: {
					slidesPerView: 5,
					spaceBetween: 40,
				},
				1200: {
					slidesPerView: 6,
					spaceBetween: 50,
				}
			}
		})
	}

	// product slider (internal product page)
	if($('.product-slider').length) {

		const product_slider_thumbs = new Swiper('.product-slider-thumbs', {
			centeredSlides: true,
			centeredSlidesBounds: true,
			spaceBetween: 10,
			slidesPerView: 3,
			watchOverflow: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			breakpoints: {
				1200: {
					direction: 'vertical',
					slidesPerView: 5,
				}
			}
		})

		const product_slider = new Swiper('.product-slider', {
			watchOverflow: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			preventInteractionOnTransition: true,
			slidesPerView: 1,
			loop: false,
			simulateTouch: true,
			allowTouchMove: true,
			autoHeight: false,
			calculateHeight: false,
			spaceBetween: 0,
			speed: 600,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			navigation: {
                nextEl: '.product-slider .next',
                prevEl: '.product-slider .prev'
            },
			thumbs: {
				swiper: product_slider_thumbs,
			}
		})

		product_slider.on('slideChangeTransitionStart', function() {
			product_slider_thumbs.slideTo(product_slider.activeIndex)
		})
		  
		product_slider_thumbs.on('transitionStart', function(){
			product_slider.slideTo(product_slider_thumbs.activeIndex)
		})

	}

	// related slider (blog internal page)
	if($('.related-slider').length) {

		const related_slider = new Swiper('.related-slider', {
			slidesPerView: 1.1,
			loop: false,
			simulateTouch: true,
			allowTouchMove: true,
			autoHeight: true,
			calculateHeight: false,
			spaceBetween: 15,
			speed: 600,
			mousewheel: {  
				forceToAxis: true
			},
			navigation: {
                nextEl: '.review-slider-section .next',
                prevEl: '.review-slider-section .prev'
            },
			breakpoints: {
				767: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				1200: {
					slidesPerView: 3,
					spaceBetween: 30,
				}
			}
		})
	}

}

// init lucide
function initLucide() {
	lucide.createIcons();
}

// init lenis
function initLenis() {
	lenis = new Lenis({
		duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
	})

	lenis.on('scroll', ScrollTrigger.update)

	gsap.ticker.add((time)=>{
		lenis.raf(time * 1000)
	})

	gsap.ticker.lagSmoothing(0)
}

// validate forms
function validateAndSubmitForms() {
	if ($('.form-validate').length) {
		$('.form-validate').each(function () {
			var theForm = $(this)

			// initialize the jquery validation plugin for the form
			theForm.validate({
				errorPlacement: function (error, element) {
					error.appendTo(element.closest('.form-line'))
					error.addClass('error-msg')
				},
				highlight: function(element) {
					$(element).closest('.form-line').addClass('error')
				},
				unhighlight: function(element) {
					$(element).closest('.form-line').removeClass('error')
				},
				submitHandler: function(form) {
					let originalForm = $(form).get(0)
					let dataparam = new FormData(originalForm)

					// adjust the url of the mailer.php to dev or prod automatically
					let url = location.href.indexOf('dev').length <= -1 ? location.origin + '/the-shoe-museum/assets/php/mailer.php' : location.origin + '/assets/php/mailer.php';

					$.ajax({
						type: 'POST',
						url: url,
						data: dataparam,
						dataType: 'html',
                		crossDomain: true,
						async: true,
						cache: false,
						contentType: false,
						processData: false,
						beforeSend: function() {
							theForm.addClass('sending')
						},
						success: function(response) {
							if(response == '1'){
								setTimeout(function() {
									Fancybox.show([{
										src: '#contact-error',
										type: 'inline',
									}])
									return false
								}, 2000)
							}

							setTimeout(function() {
								theForm[0].reset()
								Fancybox.show([{
									src: '#contact-success',
									type: 'inline',
								}])
							}, 2000)
						},
						error: function() {
							setTimeout(function() {
								Fancybox.show([{
									src: '#contact-error',
									type: 'inline',
								}])
							}, 2000)
						},
						complete: function() {
							setTimeout(function() {
								theForm.removeClass('sending')
							}, 2000)
						}
					})
				}
			})
		})
	}
}

// play videos when in view
function playVideoInView() {

	let allVideoDivs = gsap.utils.toArray('.play-pause')
  
	allVideoDivs.forEach((videoDiv) => {
  
		let videoElem = videoDiv.querySelector('video')
  
		ScrollTrigger.create({
			trigger: videoElem,
			start: '0% 120%',
			end: '100% -20%',
			onEnter: () => videoElem.play(),
			onEnterBack: () => videoElem.play(),
			onLeave: () => videoElem.pause(),
			onLeaveBack: () => videoElem.pause(),
		})
  
	})
}

// show / hide grid for dev
function showHideGrid() {
	let grid = document.querySelector('.dev-grid')
	
	document.addEventListener('keydown', function(e) {
		if (e.shiftKey && e.key.toLowerCase() === 'g') {
			e.preventDefault()
			grid.classList.toggle('active')
		}
	})
}

// fire all scripts
function initScripts() {
	initLenis()
	initClickAndKeyFunctions()
	initSliders()
	initFancybox()
	scrollTriggerAnimations()
	validateAndSubmitForms()
	initLucide()
	playVideoInView()
	showHideGrid()

	setTimeout(function() {
		ScrollTrigger.refresh()
	}, 1000)
}

initScripts()