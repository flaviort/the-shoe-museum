<?php
	$current_page = 'home';
	include('components/head.php');
?>

<section class='banner'>

	<img
		src='assets/img/banner.jpg'
		width='1710'
		height='960'
		alt='Banner'
		class='cover'
	/>

	<div class='container relative z2'>
		<div class='flex'>

			<div class='left'>
			
				<p class='uppercase text-24 medium'>
					Welcome to
				</p>

				<h1 class='text-100 uppercase'>
					<strong>
						The <br />
						Shoe <br />
						Museum
					</strong>
				</h1>

				<a
					href='#newsletter'
					class='button button--hollow uppercase sliding-link'
				>
					<span class='text'>
						Join our mailing list
					</span>
				</a>

			</div>

			<img
				src='assets/img/banner.png'
				loading='lazy'
				width='943'
				height='655'
				class='shoe'
				alt='TSM'
			/>

		</div>
	</div>
	
</section>

<section class='about pt-small'>
	<div class='container'>
		<div class='flex'>
			<div class='capitalize text-40 text-reveal'>
				Where passion fuels creation, stories add <br />
				meaning, and wearing becomes expression.
			</div>
		</div>
	</div>
</section>

<section class='exhibits py-medium py-md-small bg-gray-lightest'>
	<div class='container'>
		
		<div class='top'>

			<h2 class='text-60 uppercase bold'>
				Exhibits
			</h2>

			<p class='text-20'>
				Every shoe has a <i>history</i>.
			</p>

		</div>

		<div class='grid mt-smaller'>

			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>

		</div>

		<a
			href='#'
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

<?php include('components/newsletter-section.php'); ?>

<?php include('components/footer.php'); ?>