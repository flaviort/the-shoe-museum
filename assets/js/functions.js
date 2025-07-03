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
			that.nextElementSibling.style.display = that.classList.contains('active') ? 'block' : 'none'
			//ScrollTrigger.refresh()
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

	lenis.on('scroll', ScrollTrigger.update)

	gsap.ticker.add((time)=>{
		lenis.raf(time * 1000)
	})

	gsap.ticker.lagSmoothing(0)
}

// fire all scripts
function initScripts() {
	initLenis()
	initClickAndKeyFunctions()
	initSliders()
	initFancybox()
	scrollTriggerAnimations()
	initLucide()
	showHideGrid()
}

window.addEventListener('load', () => {
	requestAnimationFrame(() => {
		initScripts()
	})
})