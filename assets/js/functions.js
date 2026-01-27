// register gsap plugins
gsap.registerPlugin(ScrollTrigger, SplitText)

// global selectors
const body = document.body
const select = (e) => document.querySelector(e)
const selectAll = (e) => document.querySelectorAll(e)
const selectId = (id) => document.getElementById(id)
const vh = (coef) => window.innerHeight * (coef/100)
const vw = (coef) => window.innerWidth * (coef/100)

// lenis
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

	// toggle sidebar
	const toggleSidebarButton = document.querySelector('.toggle-sidebar')

	if (toggleSidebarButton) {
		toggleSidebarButton.addEventListener('click', function(e) {
			e.preventDefault()
			const parent = this.closest('.main-content')
			if (parent) {
				parent.classList.toggle('active')
			}
		})
	}

	// make anchor links scroll smoothy
	document.querySelectorAll('.sliding-link').forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault()
			const aid = this.getAttribute('href')
			const targetElement = document.querySelector(aid)
			if (targetElement) {
				targetElement.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				})
			}
		})
	})

	// show / hide password
	document.querySelectorAll('.show-pass').forEach(button => {
		button.addEventListener('click', function(e) {
			e.preventDefault()
			const that = this
			that.classList.toggle('hidden')

			setTimeout(function() {
				const input = that.nextElementSibling
				if (that.classList.contains('hidden')) {
					input.setAttribute('type', 'text')
				} else {
					input.setAttribute('type', 'password')
				}
			}, 30)
		})
	})

	// correct label click
	document.querySelectorAll('label').forEach(label => {
		label.addEventListener('click', function(e) {
			e.stopImmediatePropagation()
		})
	})

	// open / close fs menu
	document.querySelectorAll('.open-fs').forEach(element => {
		element.addEventListener('click', function(e) {
			e.preventDefault()

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
	document.querySelectorAll('.close-fs, #fs-menu .menu a, #fs-menu .menu button, .blur-everything').forEach(element => {
		element.addEventListener('click', function(e) {
			e.preventDefault()
			closeFs()
		})
	})

	// open / close cart menu
	document.querySelectorAll('.open-cart').forEach(element => {
		element.addEventListener('click', function(e) {
			e.preventDefault()

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
	document.querySelectorAll('.close-cart, .blur-everything').forEach(element => {
		element.addEventListener('click', function(e) {
			e.preventDefault()
			closeCart()
		})
	})

	// close all opened menus when pressing the ESC key
	document.addEventListener('keyup', function(e) {
		if(e.key === 'Escape') {
			closeFs()
			closeCart()
		}
	})

	// accordion open / close
	document.querySelectorAll('.accordion .question').forEach(element => {
		element.addEventListener('click', function(e) {
			e.preventDefault()
			const that = this
			that.classList.toggle('active')
		})
	})

	// increase / decrease quantity
	document.querySelectorAll('.quantity .increase').forEach(element => {
		element.addEventListener('click', function(e) {
			e.preventDefault()
			const that = this
			const input = that.closest('.quantity').querySelector('input')
			const value = parseInt(input.value)

			if (value < 8) {
				input.value = value + 1
			}
		})
	})

	document.querySelectorAll('.quantity .decrease').forEach(element => {
		element.addEventListener('click', function(e) {
			e.preventDefault()
			const that = this
			const input = that.closest('.quantity').querySelector('input')
			const value = parseInt(input.value)
			if (value > 1) {
				input.value = value - 1
			}
		})
	})

	// shipping address toggle on wholesale page
	document.querySelectorAll('#shipping-address').forEach(element => {
		element.addEventListener('change', function(e) {
			e.preventDefault()
			const that = this
			const shippingAddressFields = that.closest('#shipping-address-fields')
			shippingAddressFields.style.display = that.checked ? 'block' : 'none'
		})
	})

}

// init top menu
function initTopMenu() {
	const topMenu = select('.top-menu')
	
	if (!topMenu) return
	
	function handleScroll() {
		if (window.scrollY > 100) {
			topMenu.classList.add('invisible')
		} else {
			topMenu.classList.remove('invisible')
		}
	}
	
	if (lenis) {
		lenis.on('scroll', handleScroll)
	} else {
		window.addEventListener('scroll', handleScroll)
	}
	
	handleScroll()
}

// here goes all the scroll related animations
function scrollTriggerAnimations() {

	// scrolling image / video
	if(selectAll('.scrolling-bg').length) {

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

	// text reveal
	if(selectAll('.text-reveal').length){
		const textReveal = selectAll('.text-reveal')

		textReveal.forEach(item => {
			const split = new SplitText(item, {
				type: 'lines',
				linesClass: 'line'
			})

			split.lines.forEach(line => {
				line.innerHTML = `<span class='span'>${line.innerHTML}</span>`
			})

			const lines = item.querySelectorAll('.span')

			gsap.set(lines, {
				yPercent: 150
			})

			gsap.timeline({
				scrollTrigger: {
					trigger: item,
					start: 'top 80%',
					end: 'bottom 80%',
					toggleActions: 'play none none reverse',
					//markers: true
				}
			})
			.to(lines, {
				yPercent: 0,
				duration: 1,
				stagger: 0.1,
				ease: 'power2.out'
			})
			
		})
	}

	// play videos when in view
	if(selectAll('.play-pause').length) {

		const allVideos = selectAll('.play-pause')
  
		allVideos.forEach((video) => {
	
			const videoEl = video.querySelector('video')
	
			ScrollTrigger.create({
				trigger: videoEl,
				start: '0% 120%',
				end: '100% -20%',
				onEnter: () => {
					videoEl.play()
					console.log('enter')
				},
				onEnterBack: () => {
					videoEl.play()
					console.log('enter back')
				},
				onLeave: () => {
					videoEl.pause()
					console.log('leave')
				},
				onLeaveBack: () => {
					videoEl.pause()
					console.log('leave back')
				}
			})
	
		})
	}

	// stagger scale animation
	if(selectAll('[data-stagger-scale]').length) {

		const staggerElements = selectAll('[data-stagger-scale]')

		staggerElements.forEach(item => {
			const children = item.children

			Array.from(children).forEach(child => {
				gsap.from(child, {
					scale: 0,
					scrollTrigger: {
						trigger: child,
						scrub: 2,
						start: 'top 100%',
						end: 'bottom 70%'
					}
				})
			})
		})
	}

	// stagger scale
	if(selectAll('[data-stagger-scale-cascade]').length) {

		// find all elements with data-stagger-up attribute
		const staggerElements = selectAll('[data-stagger-scale-cascade]')
		
		staggerElements.forEach(item => {
			const children = item.children

			if (children.length > 0) {
				gsap.set(children, {
					scale: 0
				})

				ScrollTrigger.batch(children, {
					start: '0% 100%',
					onEnter: elements => {
						gsap.to(elements, {
							scale: 1,
							stagger: 0.1,
							duration: .6,
							delay: .2
						})
					}
				})
			}
		})
	}

	// stagger up animation
	if(selectAll('[data-stagger-up]').length) {

		const staggerUpElements = selectAll('[data-stagger-up]')

		staggerUpElements.forEach(item => {
			const children = Array.from(item.children)
			const infinite = item.hasAttribute('data-infinite')

			gsap.set(children, {
				opacity: 0,
				y: '20vh'
			})

			const batchConfig = {
				start: '-50% 100%',
				onEnter: elements => {
					gsap.to(elements, {
						opacity: 1,
						y: 0,
						stagger: 0.25,
						duration: 1
					})
				}
			}

			if (infinite) {
				batchConfig.onLeaveBack = elements => {
					gsap.to(elements, {
						opacity: 0,
						y: '20vh',
						stagger: 0.15,
						duration: 1
					})
				}
			}

			ScrollTrigger.batch(children, batchConfig)
		})
	}

	// invert background colors
	if(selectAll('[data-invert-bg]').length) {

		const invertElements = selectAll('[data-invert-bg]')

		invertElements.forEach(item => {
			gsap.timeline({
				scrollTrigger: {
					trigger: item,
					start: 'top bottom',
					end: 'bottom top',
					scrub: 2,
					onUpdate: self => {
						const progress = self.progress
						const mainContent = selectId('main-content')
						
						// Custom colors: white #f2f1ed (242,241,237) to black #0d0e13 (13,14,19)
						// Interpolate from white to black for background
						const bgRed = Math.round(242 + (13 - 242) * progress)
						const bgGreen = Math.round(241 + (14 - 241) * progress)
						const bgBlue = Math.round(237 + (19 - 237) * progress)
						
						// Interpolate from black to white for text
						const textRed = Math.round(13 + (242 - 13) * progress)
						const textGreen = Math.round(14 + (241 - 14) * progress)
						const textBlue = Math.round(19 + (237 - 19) * progress)
						
						mainContent.style.backgroundColor = `rgb(${bgRed}, ${bgGreen}, ${bgBlue})`
						mainContent.style.color = `rgb(${textRed}, ${textGreen}, ${textBlue})`
					}
				}
			})
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

	// blog slider
	const blogSliderEl = selectAll('.blog-slider')
	
	if (blogSliderEl) {
		const blog_slider = new Swiper('.blog-slider', {
			slidesPerView: 1.1,
			spaceBetween: 15,
			simulateTouch: true,
			allowTouchMove: true,
			autoHeight: false,
			calculateHeight: false,
			speed: 600,
			mousewheel: {  
				forceToAxis: true
			},
			freeMode: true,
			navigation: {
				nextEl: '.blog-slider .next',
				prevEl: '.blog-slider .prev'
			},
			breakpoints: {
				575: {
					slidesPerView: 2,
					spaceBetween: 20
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20
				}
			}
		})
	}

	// also like slider
	const alsoLikeSliderEl = selectAll('.also-like-slider')
	
	if (alsoLikeSliderEl) {
		const alsoLikeSlider = new Swiper('.also-like-slider', {
			slidesPerView: 1.2,
			spaceBetween: 15,
			simulateTouch: true,
			allowTouchMove: true,
			autoHeight: false,
			calculateHeight: false,
			speed: 600,
			mousewheel: {  
				forceToAxis: true
			},
			freeMode: true,
			pagination: {
				el: '.also-like-slider .scrollbar',
				type: 'progressbar',
			},
			breakpoints: {
				420: {
					slidesPerView: 2,
					spaceBetween: 20
				},
				767: {
					slidesPerView: 3,
					spaceBetween: 20
				},
				1200: {
					slidesPerView: 4,
					spaceBetween: 20
				}
			}
		})
	}

	// specs slider
	const specsSliderEl = selectAll('.specs-slider')
	
	if (specsSliderEl) {
		const specsSlider = new Swiper('.specs-slider', {
			slidesPerView: 1,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			spaceBetween: 0,
			simulateTouch: false,
			allowTouchMove: false,
			autoHeight: true,
			calculateHeight: true,
			speed: 600,
			pagination: {
				el: '.specs-slider .specs-pagination',
				clickable: true,
				renderBullet: function (index, className) {
					const slides = document.querySelectorAll('.specs-slider .swiper-slide')
	
					const title = slides[index]
						.querySelector('h2')
						.textContent
						.trim()
	
					return `
						<button class="${className}">
							${title}
						</button>
					`
				}
			}
		})
	}

	// product slider
	const productSliderEl = selectAll('.product-slider')
	
	if (productSliderEl) {

		const productThumbsSlider = new Swiper('.product-slider-thumbs', {
			slidesPerView: 6,
			watchSlidesProgress: true,
			slideToClickedSlide: true,
			spaceBetween: 10
		})

		const productSlider = new Swiper('.product-slider', {
			slidesPerView: 1,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			spaceBetween: 0,
			simulateTouch: true,
			allowTouchMove: true,
			autoHeight: true,
			calculateHeight: true,
			speed: 600,
			navigation: {
				nextEl: '.product-slider .next',
				prevEl: '.product-slider .prev'
			},
			thumbs: {
				swiper: productThumbsSlider
			}
		})
	}

}

// init lucide
function initLucide() {
	lucide.createIcons();
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

function initLenis() {
	lenis = new Lenis({
		duration: 2,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
	})

	lenis.on('scroll', (e) => {
		ScrollTrigger.update()
		
		// get scroll direction: 1 = down, -1 = up
		const direction = e.direction
		
		// add / remove css based on direction
		document.body.classList.toggle('scrolling-down', direction === 1)
		document.body.classList.toggle('scrolling-up', direction === -1)
	})

	gsap.ticker.add((time)=>{
		lenis.raf(time * 1000)
	})

	gsap.ticker.lagSmoothing(0)
}

// init read more
function initReadMore() {

	const readMoreWrappers = selectAll('.read-more-wrapper')

	readMoreWrappers.forEach(wrapper => {
		const readMoreButton = wrapper.querySelector('.read-more-button')
		const readMoreContent = wrapper.querySelector('.read-more-content')

		readMoreButton.addEventListener('click', () => {
			readMoreContent.classList.toggle('active')
			readMoreButton.innerHTML = readMoreContent.classList.contains('active') ? 'Read less' : 'Read more'
		})
	})
}

// fire all scripts
function initScripts() {
	initLenis()
	initClickAndKeyFunctions()
	initSliders()
	initFancybox()
	scrollTriggerAnimations()
	initLucide()
	initReadMore()
	initTopMenu()
	showHideGrid()
}


// wait for fonts to load before initializing scripts
function waitForFontsAndInit() {
	// check if fonts are already loaded
	if (document.fonts && document.fonts.ready) {
		document.fonts.ready.then(() => {
			requestAnimationFrame(() => {
				initScripts()
			})
		})
	} else {
		// fallback for browsers without font loading API
		setTimeout(() => {
			requestAnimationFrame(() => {
				initScripts()
			})
		}, 100)
	}
}

window.addEventListener('load', waitForFontsAndInit)