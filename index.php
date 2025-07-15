<?php
	$current_page = 'home';
	include('components/head.php');
?>

<section class='banner'>

	<div class='video play-pause'>
		<video playsinline muted loop class='cover'>
			<source src='assets/videos/banner.mp4' type='video/mp4'>
		</video>
	</div>

	<h1 class='text-25 font-title'>
		<strong>
			Every shoe has a history
		</strong>
	</h1>
	
</section>

<section class='about pt-small bg-gray-lightest'>
	<div class='container'>
		
		<h2 class='text-45 bold'>
			About
		</h2>

		<div class='content pt-small'>

			<div class='text-45 text-reveal'>
				<strong>
					Every shoe has a history
				</strong>
			</div>

			<div class='text-30 desc mt-smallest mx-auto text-reveal'>
				At The Shoe Museum we understand the power of personal style and the impact it can have on one's confidence and self-expression. We are committed sharing designer stories while offering a curated collection that seamlessly blends fashion and functionality.
			</div>

			<div class='image mx-auto mt-small'>

				<img
					src='assets/img/shoe.png'
					alt='Shoe'
					loading='lazy'
					width='2152'
					height='985'
					class='shoe'
				/>

				<img
					src='assets/img/rock.png'
					alt='Rock'
					loading='lazy'
					width='2000'
					height='519'
					class='rock'
				/>

			</div>

		</div>

	</div>
</section>

<section class='exhibits py-small'>
	<div class='container'>
		
		<h2 class='text-45 bold'>
			Exhibits
		</h2>

		<div class='content'>

			<div class='grid py-small' data-stagger-up>

				<a
					href='#'
					class='exhibit-block'
				>

					<span class='infos'>

						<span class='title text-25 bold'>
							Terra Manta
						</span>

						<span class='artist text-18'>
							Justin Taylor
						</span>

					</span>

					<span class='year text-16'>
						2022
					</span>

					<img
						src='assets/img/exhibits/01.avif'
						alt='Orbix'
						loading='lazy'
						width='592'
						height='592'
						class='cover'
					/>

				</a>

				<div class='exhibit-block exhibit-block--text hide-mobile'>
					<p class='text-30'>
						Celebrating the art, design, and soul <span>behind every sole</span>
					</p>
				</div>

				<a
					href='#'
					class='exhibit-block'
				>

					<span class='infos'>

						<span class='title text-25 bold'>
							Air Max 95
						</span>

						<span class='artist text-18'>
							Peter Max
						</span>

					</span>

					<span class='year text-16'>
						2025
					</span>

					<img
						src='assets/img/exhibits/02.avif'
						alt='Art / Wear'
						loading='lazy'
						width='592'
						height='592'
						class='cover'
					/>

				</a>

				<div class='exhibit-block exhibit-block--text hide-tablet'>
					<p class='text-30'>
						Where <span>every step tells a story</span> of style and creativity
					</p>
				</div>

				<a
					href='#'
					class='exhibit-block'
				>

					<span class='infos'>

						<span class='title text-25 bold'>
							Flex Runner 4
						</span>

						<span class='artist text-18'>
							Keith Haring
						</span>

					</span>

					<span class='year text-16'>
						2024
					</span>

					<img
						src='assets/img/exhibits/03.avif'
						alt='Flex Runner 4'
						loading='lazy'
						width='592'
						height='592'
						class='cover'
					/>

				</a>

				<a
					href='#'
					class='exhibit-block'
				>

					<span class='infos'>

						<span class='title text-25 bold'>
							Air Jordan
						</span>

						<span class='artist text-18'>
							Takashi Murakami
						</span>

					</span>

					<span class='year text-16'>
						2021
					</span>

					<img
						src='assets/img/exhibits/04.avif'
						alt='Air Jordan'
						loading='lazy'
						width='592'
						height='592'
						class='cover'
					/>

				</a>

				<a
					href='#'
					class='exhibit-block'
				>

					<span class='infos'>

						<span class='title text-25 bold'>
							Zoom Vomero 5
						</span>

						<span class='artist text-18'>
							Virgil Abloh
						</span>

					</span>

					<span class='year text-16'>
						2024
					</span>

					<img
						src='assets/img/exhibits/05.avif'
						alt='Zoom Vomero 5'
						loading='lazy'
						width='592'
						height='592'
						class='cover'
					/>

				</a>

				<div class='exhibit-block exhibit-block--text hide-mobile'>
					<p class='text-30'>
						<span>Health & wellbeing</span> through resilience, perseverance, and passion for excellence
					</p>
				</div>

				<a
					href='#'
					class='exhibit-block'
				>

					<span class='infos'>

						<span class='title text-25 bold'>
							Dunk Low
						</span>

						<span class='artist text-18'>
							Vicky Vuong
						</span>

					</span>

					<span class='year text-16'>
						2023
					</span>

					<img
						src='assets/img/exhibits/06.avif'
						alt='Dunk Low'
						loading='lazy'
						width='592'
						height='592'
						class='cover'
					/>

				</a>

			</div>

			<a href='#' class='button button--hollow'>
				<span class='text'>
					View all
				</span>
			</a>

		</div>

	</div>
</section>

<div data-invert-bg></div>

<?php include('components/blog-section.php'); ?>

<?php include('components/newsletter-section.php'); ?>

<?php include('components/footer.php'); ?>