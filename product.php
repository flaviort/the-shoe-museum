<?php
	$current_page = 'product';
	include('components/head.php');
?>

<section class='top-part pt-medium pt-md-smaller'>
	<div class='container'>	
		<div class='row'>

			<div class='col-md-6 left'>

				<div class='bg'>
					<img
						src='assets/img/banner.jpg'
						alt='Banner'
						width='1920'
						height='400'
						loading='eager'
						class='cover'
					/>
				</div>

				<div class='infos mb-smaller'>

					<h1 class='title text-40 bold uppercas'>
						The Shoe Museum Original Classic T-Shirt - Kelly Green
					</h1>

					<h2 class='text-20 designer'>
						<i>Designer: Flávio R. Troszczanczuk</i>
					</h2>

					<div class='tags'>

						<span class='tag'>
							Just arrived
						</span>

					</div>

				</div>

				<div class='product-slider swiper'>

					<button class='prev' aria-label='Previous slide'>
						<i data-lucide='arrow-left'></i>
					</button>

					<button class='next' aria-label='Next slide'>
						<i data-lucide='arrow-right'></i>
					</button>

					<div class='swiper-wrapper'>

						<div class='swiper-slide'>
							<img
								src='assets/img/shirt-01.webp'
								alt='Product Image'
								width='1000'
								height='1000'
								loading='lazy'
								class='cover'
							>
						</div>

						<div class='swiper-slide'>
							<img
								src='assets/img/shirt-02.webp'
								alt='Product Image'
								width='1000'
								height='1000'
								loading='lazy'
								class='cover'
							>
						</div>

						<div class='swiper-slide'>
							<img
								src='assets/img/shirt-03.webp'
								alt='Product Image'
								width='1000'
								height='1000'
								loading='lazy'
								class='cover'
							>
						</div>

					</div>
				</div>

				<div class='product-slider-thumbs swiper'>
					<div class='swiper-wrapper'>

						<div class='swiper-slide'>
							<img
								src='assets/img/shirt-01.webp'
								alt='Product Image'
								width='1000'
								height='1000'
								loading='lazy'
							>
						</div>

						<div class='swiper-slide'>
							<img
								src='assets/img/shirt-02.webp'
								alt='Product Image'
								width='1000'
								height='1000'
								loading='lazy'
							>
						</div>

						<div class='swiper-slide'>
							<img
								src='assets/img/shirt-03.webp'
								alt='Product Image'
								width='1000'
								height='1000'
								loading='lazy'
							>
						</div>

					</div>
				</div>

			</div>

			<div class='col-md-6 mt-smallest mt-md-0 right'>

				<div class='infos mb-smaller'>

					<h1 class='title text-40 bold uppercas'>
						The Shoe Museum Original Classic T-Shirt - Kelly Green
					</h1>

					<h2 class='text-20 designer'>
						<i>Designer: Flávio R. Troszczanczuk</i>
					</h2>

					<div class='tags'>

						<span class='tag'>
							Just arrived
						</span>

					</div>

				</div>

				<div class='description text-20'>

					<p>
						Clean, minimal, and easy to wear. This vibrant green T-shirt features the TSM – The Shoe Museum graphic front and center. Made from soft, breathable fabric for all-day comfort. Classic fit that works effortlessly with jeans or sneakers. A simple statement piece for sneaker lovers and design fans alike.
					</p>

				</div>

				<a href='#specs' class='read-more sliding-link hover-underline-white text-20'>
					Read more
				</a>

				<div class='options'>

					<div class='size'>

						<label for='size'>
							Size
						</label>

						<div class='form-line'>
							<div class='line-wrapper'>

								<select
									name='size'
									id='size'
									class='input select text-20'
								>
									<option value='' disabled>Select Size</option>
									<option value='S' selected>Small</option>
									<option value='M'>Medium</option>
									<option value='L'>Large</option>
									<option value='XL'>Extra Large</option>
								</select>

								<div class='icon'>
									<i data-lucide='chevron-down'></i>
								</div>

							</div>
						</div>
					</div>

					<div class='quantity'>

						<label>
							Quantity
						</label>

						<div class='form-line'>
							<div class='line-wrapper'>

								<button class='decrease'>
									<i data-lucide='minus'></i>
								</button>

								<input
									type='number'
									name='quantity'
									required
									min='1'
									max='8'
									value='1'
									placeholder='Qty'
									class='input text-20'
								>

								<button class='increase'>
									<i data-lucide='plus'></i>
								</button>

							</div>
						</div>
					</div>

				</div>

				<button class='open-cart button button--green uppercase text-20'>

					<span class='text'>
						Buy now - 
					</span>

					<span class='price bold'>
						$59.95
					</span>

				</button>

				<div class='accept'>

					<p class='medium'>
						Accepted payment methods
					</p>

					<?= file_get_contents('assets/svg/ux/cards.svg'); ?>

				</div>

			</div>

		</div>
	</div>
</section>

<section id='specs' class='specs my-medium my-md-small'>
	<div class='container'>
		<div class='specs-slider swiper'>

			<div class='specs-slider__nav mb-smallest'>

				<div class='specs-pagination'></div>

				<a href='<?= $exhibit; ?>'>
					Exhibit
				</a>

			</div>

			<div class='swiper-wrapper'>

				<div class='swiper-slide'>
					<div class='specs-slider__flex'>

						<h2 class='text-40 bold green uppercase'>
							Description
						</h2>

						<div class='specs-slider__details'>
							<div class='rich-text'>
								<p>
									Clean, minimal, and easy to wear. This vibrant green T-shirt features the TSM – The Shoe Museum graphic front and center. Made from soft, breathable fabric for all-day comfort. Classic fit that works effortlessly with jeans or sneakers. A simple statement piece for sneaker lovers and design fans alike.								
								</p>
							</div>
						</div>

					</div>
				</div>

				<div class='swiper-slide'>
					<div class='specs-slider__flex'>

						<h2 class='text-40 bold green uppercase'>
							Product Details
						</h2>

						<div class='specs-slider__details'>
							<div class='rich-text'>

								<p>
									<b>Fabric:</b>
								</p>

								<ul>

									<li>
										4.3 oz., 100% combed ringspun cotton fine jersey
									</li>

									<li>
										90 Cotton/10 Poly
									</li>

									<li>
										32 singles
									</li>

									<li>
										Fabric laundered for reduced shrinkage
									</li>

								</ul>
							</div>
						</div>

					</div>
				</div>

			</div>

		</div>
	</div>
</section>

<section class='video my-medium my-md-small'>
	<div class='container'>
		<a
			href='https://www.youtube.com/watch?v=mH1-J8vyBo0'
			data-fancybox
			class='video__block'
		>

			<span class='video__play-icon'>
				<i data-lucide='play'></i>
			</span>

			<video
				autoplay
				playsinline
				muted
				loop
				loading='lazy'
				class='cover'
			>
				<source
					src='assets/videos/banner.mp4'
					type='video/mp4'
				>
			</video>

		</a>
	</div>
</section>

<section class='also-like mb-big mt-medium mt-md-small'>
	<div class='container'>

		<h2 class='also-like__title text-60 uppercase bold mb-smaller'>
			You might also like
		</h2>

		<div class='also-like-slider swiper'>
			<div class='swiper-wrapper'>

				<div class='swiper-slide'>
					<a href='<?= $product; ?>' class='product-block'>

						<span class='product-block__image'>
							<img
								src='assets/img/banner.png'
								alt='Another product with a long title'
								width='1000'
								height='1000'
								loading='lazy'
							/>
						</span>

						<span class='product-block__infos'>

							<p class='product-block__name'>
								Another product with a long title
							</p>

							<p class='product-block__price'>
								<small>from</small>
								$330.00
							</p>

						</span>

					</a>
				</div>

				<div class='swiper-slide'>
					<a href='<?= $product; ?>' class='product-block'>

						<span class='product-block__image'>
							<img
								src='assets/img/banner.png'
								alt='Another product with a long title'
								width='1000'
								height='1000'
								loading='lazy'
							/>
						</span>

						<span class='product-block__infos'>

							<p class='product-block__name'>
								Another product with a long title
							</p>

							<p class='product-block__price'>
								<small>from</small>
								$330.00
							</p>

						</span>

					</a>
				</div>

				<div class='swiper-slide'>
					<a href='<?= $product; ?>' class='product-block'>

						<span class='product-block__image'>
							<img
								src='assets/img/banner.png'
								alt='Another product with a long title'
								width='1000'
								height='1000'
								loading='lazy'
							/>
						</span>

						<span class='product-block__infos'>

							<p class='product-block__name'>
								Another product with a long title
							</p>

							<p class='product-block__price'>
								<small>from</small>
								$330.00
							</p>

						</span>

					</a>
				</div>

				<div class='swiper-slide'>
					<a href='<?= $product; ?>' class='product-block'>

						<span class='product-block__image'>
							<img
								src='assets/img/banner.png'
								alt='Another product with a long title'
								width='1000'
								height='1000'
								loading='lazy'
							/>
						</span>

						<span class='product-block__infos'>

							<p class='product-block__name'>
								Another product with a long title
							</p>

							<p class='product-block__price'>
								<small>from</small>
								$330.00
							</p>

						</span>

					</a>
				</div>

			</div>

			<div class='scrollbar'></div>

		</div>

	</div>
</section>

			

<?php include('components/footer.php'); ?>