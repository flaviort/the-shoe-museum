<?php
	$current_page = 'product';
	$page_title = 'Organic Full Spectrum CBD + MCT + BCP';
	include('components/head.php');
?>

<section class='breadcrumbs'>
	<div class='container'>
		<ul>
			
			<li>
				<a href='<?= $home; ?>' class='hover-underline'>
					Home
				</a>
			</li>

			<li>
				<?= file_get_contents('assets/svg/ux/angle-right.svg'); ?>
			</li>

			<li>
				<a href='<?= $products; ?>' class='hover-underline'>
					Products
				</a>
			</li>

			<li>
				<?= file_get_contents('assets/svg/ux/angle-right.svg'); ?>
			</li>

			<li>
				<p>
					Organic Full Spectrum CBD + MCT + BCP
				</p>
			</li>

		</ul>
	</div>
</section>

<section class='product-infos padding-top-smallest padding-bottom-small'>
	<div class='container'>

		<div class='top padding-bottom-smaller'>
			<div class='row'>

				<div class='col-md-6 left'>

					<div class='product-slider-thumbs swiper-container'>
						<div class='swiper-wrapper'>

							<div class='swiper-slide'>
								<div class='image'>
									<img src='assets/img/products/product-01.png' alt='Organic Full Spectrum CBD + MCT + BCP' loading='lazy'>
								</div>
							</div>

							<div class='swiper-slide'>
								<div class='image'>
									<img src='assets/img/products/product-02.png' alt='Organic Full Spectrum CBD + MCT + BCP' loading='lazy'>
								</div>
							</div>

						</div>
					</div>

					<div class='product-slider swiper-container'>
						
						<div class='swiper-wrapper'>

							<div class='swiper-slide'>

								<div class='badge'>
									<?= file_get_contents('assets/svg/other/usda-organic.svg') ?>
								</div>

								<div class='image'>
									<img src='assets/img/products/product-01.png' alt='Organic Full Spectrum CBD + MCT + BCP' loading='lazy'>
								</div>

							</div>

							<div class='swiper-slide'>
								<div class='image'>
									<img src='assets/img/products/product-02.png' alt='Organic Full Spectrum CBD + MCT + BCP' loading='lazy'>
								</div>
							</div>

						</div>

						<button class='prev'>
							<?= file_get_contents('assets/svg/ux/arrow-left.svg'); ?>
						</button>

						<button class='next'>
							<?= file_get_contents('assets/svg/ux/arrow-right.svg'); ?>
						</button>
						
					</div>
				</div>

				<div class='col-md-6 right'>

					<div class='top-tags'>

						<span class='rating'>

							<span class='stars'>

								<?= file_get_contents('assets/svg/ux/star.svg'); ?>

								<span class='bold text-small'>
									4.9
								</span>

							</span>

							<span class='text-small'>
								Tincture
							</span>

						</span>

						<div class='category text-small'>
							<span class='bg-groove-relief'>
								Relief
							</span>
						</div>

					</div>

					<h1 class='product-title bold text-medium-big'>
						Organic Full Spectrum CBD + MCT + BCP
					</h1>

					<p class='product-price medium text-medium-small'>
						<small>$</small>45.00
					</p>

					<p class='small-desc'>
						Our USDA Certified Organic CBD oils are here - with MCT oil and added BCP! The Full Spectrum oils is available in 3 different. <a href='#more-information' class='sliding-link hover-underline-white orange medium'>Read More</a>
					</p>

					<div class='buying-options'>

						<div class='top-line'>

							<div class='form-line'>

								<label for='product-strength' class='label'>
									Strength
								</label>

								<div class='line-wrapper'>

									<select
										id='product-strength'
										name='Strength'
										class='input select'
										required
									>
										<option value='' disabled>Select one</option>
										<option value='900g' selected>900g</option>
										<option value='1800g'>1800g</option>
										<option value='5400g'>5400g</option>
									</select>

									<span class='icon'>
										<?= file_get_contents('assets/svg/ux/angle-down.svg'); ?>
									</span>

								</div>

							</div>

							<div class='form-line'>

								<label for='product-flavor' class='label'>
									Flavor
								</label>

								<div class='line-wrapper'>

									<select
										type='text'
										id='product-flavor'
										name='Flavor'
										class='input select'
										required
									>
										<option value='' disabled>Select one</option>
										<option value='Original' selected>Original</option>
										<option value='Peppermint'>Peppermint</option>
										<option value='Tangerine'>Tangerine</option>
									</select>

									<span class='icon'>
										<?= file_get_contents('assets/svg/ux/angle-down.svg'); ?>
									</span>

								</div>

							</div>

						</div>

						<div class='bottom-line'>

							<div class='quantity'>
								<div class='form-line'>
									<div class='line-wrapper'>

										<input class='input' type='number' value='1' min='1' max='8' />

										<button class='increase bold'>
											+
										</button>

										<button class='decrease bold'>
											-
										</button>

									</div>
								</div>
							</div>

							<button type='button' class='button button--gradient open-cart'>
								<span>
									Add to Cart
								</span>
							</button>

						</div>
						
					</div>

				</div>

			</div>
		</div>

		<div id='more-information' class='bottom'>

			<div class='row'>

				<div class='col-md-6 left'>

					<h2 class='font-title text-big bold'>
						USDA Certified <br />
						Organic CBD Oils 
					</h2>

					<ul class='text-medium-small bold ul'>

						<li>
							With MCT oil and added BCP
						</li>

						<li>
							Available in 3 different strengths
						</li>

						<li>
							CBG, CBDa, CBC, CBDv for maximum benefits!
						</li>

					</ul>
					
				</div>

				<div class='col-md-6 right'>

					<p>
						The Full Spectrum oils is available in 3 different strengths: 900mg, 1800mg, and 5400mg. Each bottle has 30 servings.
					</p>

					<p>
						<b>
							Here is the cannibinoid breakdown per serving:
						</b>
					</p>

					<ul class='ul'>

						<li>
							1800mg: 60mg of CBD and 2mg of THC per serving
						</li>

						<li>
							900mg: 30mg of CBD and 1 mg of THC per serving
						</li>

						<li>
							5400mg: 180mg of CBD + up to 2mg of THC per serving of oil.
						</li>

					</ul>

					<p>
						All oils are formulated with a full spectrum extract that also includes CBG, CBDa, CBC, CBDv for maximum benefits!
					</p>

					<p>
						The 900mg and 1800mg are avaiable in 3 different options - Original, Peppermint and Tangerine.
					</p>

				</div>

			</div>

			<div class='faq'>

				<div class='accordion'>
								
					<div class='question'>

						<?= file_get_contents('assets/svg/ux/angle-down.svg'); ?>

						<p class='bold'>
							Key Ingredients
						</p>

					</div>

					<div class='answer'>
						<div class='answer-wrapper'>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus voluptatibus hic atque iusto, alias voluptas deleniti officia laboriosam facilis numquam.
							</p>
						</div>
					</div>

				</div>

				<div class='accordion'>
								
					<div class='question'>

						<?= file_get_contents('assets/svg/ux/angle-down.svg'); ?>

						<p class='bold'>
							Ingredients
						</p>

					</div>

					<div class='answer'>
						<div class='answer-wrapper'>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus voluptatibus hic atque iusto, alias voluptas deleniti officia laboriosam facilis numquam.
							</p>
						</div>
					</div>

				</div>

				<div class='accordion'>
								
					<div class='question'>

						<?= file_get_contents('assets/svg/ux/angle-down.svg'); ?>

						<p class='bold'>
							Shopping Info
						</p>

					</div>

					<div class='answer'>
						<div class='answer-wrapper'>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus voluptatibus hic atque iusto, alias voluptas deleniti officia laboriosam facilis numquam.
							</p>
						</div>
					</div>

				</div>

				<div class='accordion'>
								
					<div class='question'>

						<?= file_get_contents('assets/svg/ux/angle-down.svg'); ?>

						<p class='bold'>
							Suggested Use
						</p>

					</div>

					<div class='answer'>
						<div class='answer-wrapper'>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus voluptatibus hic atque iusto, alias voluptas deleniti officia laboriosam facilis numquam.
							</p>
						</div>
					</div>

				</div>

			</div>

		</div>

	</div>
</section>

<section class='reviews'>

	<div class='top bg-brown-dark white'>

		<?= file_get_contents('assets/svg/other/rainbow.svg') ?>

		<div class='container relative z2 padding-y-small'>

			<h2 class='font-title text-big medium'>
				What our Customers are saying
			</h2>

		</div>

	</div>

	<div class='bottom padding-top-smaller padding-bottom'>
		<div class='container'>

			<div class='yotpo text-medium-small font-title medium'>
				Yotpo reviews goes here
			</div>

		</div>
	</div>

</section>

<?php include('components/four-icons-banner.php'); ?>

<section class='best-sellers padding-y'>
	<div class='container'>

		<h2 class='top-title font-title text-big medium'>
			Our Best Sellers
		</h2>

		<div class='best-sellers-slider swiper-container'>

			<div class='swiper-wrapper'>
				<?php for ($i = 0; $i < 4; $i++): ?>
					<div class='swiper-slide'>
						<?php include('components/product-card.php'); ?>
					</div>
				<?php endfor; ?>
			</div>

			<div class='pagination'></div>

		</div>

	</div>
</section>

<?php include('components/footer.php'); ?>