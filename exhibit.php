<?php
	$current_page = 'exhibit';
	include('components/head.php');
?>

<section class='main-content'>
	<div class='container z2'>
		<div class='row'>

			<div class='col-xl-8 left-side'>
				
				<div class='top'>

					<img
						src='assets/img/banner.jpg'
						alt='Background'
						width='1920'
						height='400'
						loading='eager'
						class='bg'
					/>

					<div class='left-inner'>

						<h1 class='text-40 bold uppercase'>
							Orbix
						</h1>

						<p class='uppercase medium date'>
							Drop Date: May 2025
						</p>

					</div>

					<a href='<?= $product; ?>' class='uppercase hover-underline-white medium'>
						Shop this shoe
					</a>

				</div>

				<div class='featured-image'>
					<img
						src='assets/img/exhibits/01.png'
						alt='Orbix'
						width='800'
						height='450'
						loading='lazy'
						class='cover'
					/>
				</div>

				<div class='exhibit-content'>
					<div class='rich-text'>

						<p>
							Had to take my shot at a Wemby signature shoe. I absolutely love the extra terrestrial narrative around him and his style of play, so I used that as my starting point, most obviously referenced in the graphic on the quarter panels. The rest of the upper is a dynamic shell that is part upper, part midsole, part outsole. This was inspired by the idea of an alien life form with an exoskeleton. The shell provides support for the upper as well as protects the new cushioning unit I am calling ORBIX. 
						</p>

						<h2>
							Final Design
						</h2>

						<img
							src='assets/img/exhibits/02.png'
							alt='Final Design'
							width='800'
							height='450'
							loading='lazy'
						/>

						<p>
							Orbix was designed to provide dynamic cushioning that can adapt to different angles of impact. It is a 3D printed unit, so it would be easily scalable for production and easy to customize or adapt for different sizes/athletes. It is basically a soft shell filled with a varying matrix structure that is tighter in the forefoot for more response and more open in the heel for softer cushioning. The shoe's design is highlighted by several details that call back to Wemby.
						</p>

						<img
							src='assets/img/exhibits/03.png'
							alt='Final Design'
							width='800'
							height='450'
							loading='lazy'
						/>

						<h2>
							Ideation
						</h2>

						<p>
							The pull loop is shaped to resemble the Eiffel Tower and features the number 1. The heel rubber has a small book detail that is inspired by his reading habit. The book is positioned so the cover and pages represent the hour of 9:30-10:30 pm. The arch plate is representative of a chess board, and the omni directional traction pattern is inspired by crop circles, further enhancing the extra terrestrial theme.
						</p>

						<iframe width='560' height='315' src='https://www.youtube.com/embed/N7T6B2Xgbng?si=0nn1aoerticHuPKS' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>

						<h2>
							Inspiration
						</h2>

						<img
							src='assets/img/exhibits/01.png'
							alt='Final Design'
							width='800'
							height='450'
							loading='lazy'
						/>

					</div>
				</div>

			</div>

			<div class='col-xl-4 right-side'>
				<div class='wrapper'>

					<div class='bg'></div>

					<div class='relative z2'>

						<button class='toggle-sidebar'>
							<i data-lucide='chevron-right'></i>
							<i data-lucide='chevron-left'></i>
						</button>

						<div class='infos'>

							<div class='image'>
								<img
									src='assets/img/exhibits/designer.jpg'
									alt='Justin Taylor'
									width='300'
									height='300'
									loading='lazy'
									class='cover'
								/>
							</div>

							<h3 class='name text-20 bold'>
								Justin Taylor
							</h3>

							<p class='text-14 title'>
								<i>
									Creative Director and Leading Footwear Designer
								</i>
							</p>

							<div class='description text-14'>
								<div class='read-more-wrapper'>

									<div class='read-more-content'>
										<p>
											Lorem ipsum dolor sit amet consectetur. Eu odio dui elementum elementum purus. Lacus nec sed quam tortor lorem enim malesuada. Vitae aliquam convallis id auctor netus dolor fames. Enim ac et fusce tempus aliquam urna vel et. <br /><br />

											Lorem ipsum dolor sit amet consectetur. Eu odio dui elementum elementum purus. Lacus nec sed quam tortor lorem enim malesuada. Vitae aliquam convallis id auctor netus dolor fames. Enim ac et fusce tempus aliquam urna vel et.<br /><br >

											Lorem ipsum dolor sit amet consectetur. Eu odio dui elementum elementum purus. Lacus nec sed quam tortor lorem enim malesuada. Vitae aliquam convallis id auctor netus dolor fames. Enim ac et fusce tempus aliquam urna vel et.<br /><br >

											Lorem ipsum dolor sit amet consectetur. Eu odio dui elementum elementum purus. Lacus nec sed quam tortor lorem enim malesuada. Vitae aliquam convallis id auctor netus dolor fames. Enim ac et fusce tempus aliquam urna vel et.
										</p>
									</div>

									<button class='hover-underline text-14 green bold read-more-button'>
										Read more
									</button>

								</div>
							</div>

							<a
								href='#'
								target='_blank'
								rel='noopener noreferrer'
								class='hover-underline text-14 website'
							>
								Designer's Portfolio <i data-lucide='arrow-right'></i>
							</a>

							<ul class='social'>
								
								<li>
									<a
										href='#'
										target='_blank'
										rel='noopener noreferrer'
									>
										<?= file_get_contents('assets/svg/social/instagram.svg'); ?>
									</a>
								</li>

								<li>
									<a
										href='#'
										target='_blank'
										rel='noopener noreferrer'
									>
										<?= file_get_contents('assets/svg/social/linkedin.svg'); ?>
									</a>
								</li>

								<li>
									<a
										href='#'
										target='_blank'
										rel='noopener noreferrer'
									>
										<?= file_get_contents('assets/svg/social/behance.svg'); ?>
									</a>
								</li>

							</ul>

							<a
								href='<?= $product; ?>'
								class='button button--green'
							>

								<span class='text'>
									Shop this shoe
								</span>

								<span class='icon'>
									<i data-lucide='arrow-right'></i>
								</span>

							</a>

						</div>

					</div>
					
				</div>
			</div>
			
		</div>
	</div>
</section>

<section class='related py-medium pt-md-small'>
	<div class='container'>

		<div class='top'>
			<h2 class='text-60 uppercase bold'>
				Other Projects
			</h2>
		</div>
		
		<div class='grid mt-smaller'>

			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>

		</div>

		<a
			href='<?= $exhibits; ?>'
			class='button button--hollow uppercase mt-smallest'
		>
			<span class='text'>
				View All
			</span>

			<span class='icon'>
				<i data-lucide='arrow-right'></i>
			</span>

		</a>

	</div>
</section>

<?php include('components/footer.php'); ?>